import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import {
  BRAND,
  CONTACT,
  escapeHtml,
  money,
  generateOrderId,
  formatPlacedAt,
  getTransporter,
} from "@/lib/orderEmail";

/**
 * POST /api/stripe/webhook
 *
 * Stripe sends events here after a checkout completes (or expires).
 * This is the SOURCE OF TRUTH for payment — the client redirect is
 * just a convenience. Never trust the client alone.
 *
 * Events handled:
 *   - checkout.session.completed  → create order, send emails
 *   - checkout.session.expired    → log (optional cleanup)
 *
 * IMPORTANT: Next.js App Router does NOT auto-parse the body when we
 * call request.text(), which is exactly what Stripe signature
 * verification needs (the raw body).
 */

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[stripe/webhook] Signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutComplete(event.data.object);
        break;

      case "checkout.session.expired":
        console.log(
          "[stripe/webhook] Session expired:",
          event.data.object.id
        );
        break;

      default:
        console.log(`[stripe/webhook] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    // Log but return 200 — Stripe will retry on 4xx/5xx and we don't
    // want duplicate orders from retries on transient failures.
    console.error(
      `[stripe/webhook] Error handling ${event.type}:`,
      err.message || err
    );
  }

  return NextResponse.json({ received: true });
}

/* ────────────────────────────────────────────────────────────────
 * Helper: extract payment method details from a PaymentIntent.
 * Handles card (brand + last4) and PayPal. Works across Stripe
 * API versions — tries latest_charge first (2025+ APIs), falls
 * back to charges.data[0] (legacy).
 * ──────────────────────────────────────────────────────────────── */
async function getCardDetails(paymentIntent) {
  if (!paymentIntent) return { brand: "", last4: "" };

  // Try to get the charge object (contains payment_method_details)
  let pmd = null;

  // Modern API: latest_charge is a string ID — retrieve the Charge object
  if (paymentIntent.latest_charge) {
    try {
      const chargeId =
        typeof paymentIntent.latest_charge === "string"
          ? paymentIntent.latest_charge
          : paymentIntent.latest_charge.id;
      const charge = typeof paymentIntent.latest_charge === "object"
        ? paymentIntent.latest_charge
        : await stripe.charges.retrieve(chargeId);
      pmd = charge.payment_method_details;
    } catch (e) {
      // fall through to legacy path
    }
  }

  // Legacy API: charges list is expanded inline
  if (!pmd) {
    pmd = paymentIntent.charges?.data?.[0]?.payment_method_details;
  }

  if (!pmd) return { brand: "", last4: "" };

  // PayPal payments
  if (pmd.type === "paypal" || pmd.paypal) {
    return { brand: "paypal", last4: "" };
  }

  // Card payments
  if (pmd.card) {
    return { brand: pmd.card.brand || "", last4: pmd.card.last4 || "" };
  }

  return { brand: "", last4: "" };
}

/* ────────────────────────────────────────────────────────────────
 * checkout.session.completed
 *
 * The customer has paid. This handler:
 *   1. Checks idempotency (has this session already been processed?)
 *   2. Creates an Order in MongoDB
 *   3. Decrements inventory (shop orders only)
 *   4. Clears the cart (authenticated shop orders only)
 *   5. Sends confirmation emails to customer + admin
 * ──────────────────────────────────────────────────────────────── */
async function handleCheckoutComplete(session) {
  await dbConnect();

  // ── Idempotency: don't process the same session twice ──
  const existing = await Order.findOne({
    "payment.stripeSessionId": session.id,
  });
  if (existing) {
    console.log(
      `[stripe/webhook] Session ${session.id} already processed → order ${existing.orderNumber}`
    );
    return;
  }

  const { orderType } = session.metadata;

  if (orderType === "shop") {
    await processShopOrder(session);
  } else if (orderType === "custom") {
    await processCustomOrder(session);
  } else {
    console.warn(
      `[stripe/webhook] Unknown orderType "${orderType}" in session ${session.id}`
    );
  }
}

/* ────────────────────────────────────────────────────────────────
 * SHOP ORDER
 * ──────────────────────────────────────────────────────────────── */
async function processShopOrder(session) {
  const { userId, customerName, customerPhone } = session.metadata;
  const cartItemsRaw = session.metadata.cartItems;

  // Parse cart items from metadata
  let cartItems = [];
  try {
    cartItems = JSON.parse(cartItemsRaw || "[]");
  } catch (e) {
    console.error("[stripe/webhook] Failed to parse cartItems metadata:", e);
  }

  // Retrieve line items from Stripe for the full product details
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });

  // Retrieve payment details + card info
  let paymentIntent = null;
  if (session.payment_intent) {
    paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
  }
  const cardDetails = await getCardDetails(paymentIntent);

  // Build order items from cart metadata + Stripe line items
  const orderItems = [];
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const stripeItem = lineItems.data[i];

    // Look up the product for the snapshot
    let product = null;
    if (cartItem.productId) {
      product = await Product.findById(cartItem.productId);
    }

    // Stripe amounts are in cents — Order model stores in cents too
    const itemTotalCents = stripeItem?.amount_total || 0;
    const qty = cartItem.quantity || stripeItem?.quantity || 1;
    const unitCents = Math.round(itemTotalCents / qty);

    orderItems.push({
      product: cartItem.productId || null,
      productSnapshot: {
        name: stripeItem?.description || product?.name || "Racing Gear",
        slug: product?.slug || "",
        price: unitCents,
        image: product?.images?.[0]?.url || "",
        certification: product?.certification || "",
      },
      size: cartItem.size || "Standard",
      isCustomFit: cartItem.isCustomFit || false,
      quantity: qty,
      basePrice: unitCents,
      customFitPrice: 0,
      optionsPrice: 0,
      itemTotal: itemTotalCents,
    });

    // Decrement inventory
    if (product && cartItem.size) {
      const sizeEntry = product.inventory?.find(
        (inv) => inv.size === cartItem.size
      );
      if (sizeEntry) {
        sizeEntry.stock = Math.max(0, (sizeEntry.stock || 0) - (cartItem.quantity || 1));
        await product.save();
      }
    }
  }

  // Build shipping address from Stripe's collected address
  // Newer Stripe API nests shipping under collected_information
  const stripeShipping =
    session.shipping_details ||
    session.collected_information?.shipping_details ||
    session.customer_details;
  const shippingAddress = buildShippingAddress(stripeShipping, {
    name: customerName || session.customer_details?.name || "",
    email: session.customer_email || session.customer_details?.email || "",
    phone: customerPhone || session.customer_details?.phone || "",
  });

  // Calculate totals (all in cents, matching Order model convention)
  const subtotal = orderItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const total = session.amount_total || 0;

  const orderId = generateOrderId();

  // Create the Order
  const order = await Order.create({
    orderNumber: orderId,
    user: userId !== "guest" ? userId : null,
    isGuest: userId === "guest",
    guestEmail: userId === "guest" ? session.customer_email : null,
    customer: {
      name: customerName || session.customer_details?.name || "",
      email: session.customer_email || "",
      phone: customerPhone || "",
    },
    items: orderItems,
    shippingAddress,
    billingAddress: shippingAddress,
    sameAsBilling: true,
    subtotal,
    shippingCost: 0,
    shippingMethod: { name: "Free Shipping" },
    tax: 0,
    total,
    payment: {
      method: "stripe",
      status: "captured",
      transactionId: session.payment_intent || "",
      stripeSessionId: session.id,
      last4: cardDetails.last4,
      brand: cardDetails.brand,
      paidAt: new Date(),
    },
    status: "confirmed",
  });

  // Clear the user's cart
  if (userId && userId !== "guest") {
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], subtotal: 0 } }
    );
  }

  // Send confirmation emails
  await sendShopConfirmationEmails(order, orderItems);

  console.log(
    `[stripe/webhook] Shop order ${orderId} created — ${session.customer_email} — ${money(total / 100)}`
  );
}

/* ────────────────────────────────────────────────────────────────
 * CUSTOM ORDER
 * ──────────────────────────────────────────────────────────────── */
async function processCustomOrder(session) {
  const {
    productType,
    productLabel,
    packageId,
    packageName,
    packagePrice,
    quantity,
    customerName,
    customerEmail,
    customerPhone,
    suitMockup: suitMockupStr,
    glovesMockup: glovesMockupStr,
    shoesMockup: shoesMockupStr,
    shoeSize: shoeSizeStr,
    colors: colorsStr,
    customLogoUrl,
    customLogoNotes,
  } = session.metadata;

  // Parse JSON metadata
  const safeParse = (str) => {
    try { return JSON.parse(str || "null"); }
    catch { return null; }
  };

  const suitMockup = safeParse(suitMockupStr);
  const glovesMockup = safeParse(glovesMockupStr);
  const shoesMockup = safeParse(shoesMockupStr);
  const shoeSize = safeParse(shoeSizeStr);
  const colors = safeParse(colorsStr) || {};

  const qty = parseInt(quantity, 10) || 1;
  // packagePrice is in dollars (from CUSTOM_PACKAGE_PRICES) — convert to cents for Order model
  const unitPriceCents = Math.round((parseFloat(packagePrice) || 0) * 100);
  const total = session.amount_total || 0; // already in cents from Stripe

  // Retrieve payment details + card info
  let paymentIntent = null;
  if (session.payment_intent) {
    paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
  }
  const cardDetails = await getCardDetails(paymentIntent);

  // Build shipping address from Stripe
  // Newer Stripe API nests shipping under collected_information
  const stripeShipping =
    session.shipping_details ||
    session.collected_information?.shipping_details ||
    session.customer_details;
  const shippingAddress = buildShippingAddress(stripeShipping, {
    name: customerName || session.customer_details?.name || "",
    email: customerEmail || session.customer_email || "",
    phone: customerPhone || session.customer_details?.phone || "",
  });

  const orderId = generateOrderId();

  // Create the Order
  const order = await Order.create({
    orderNumber: orderId,
    isGuest: true,
    guestEmail: customerEmail || session.customer_email,
    customer: {
      name: customerName || "",
      email: customerEmail || session.customer_email || "",
      phone: customerPhone || "",
    },
    items: [
      {
        productSnapshot: {
          name: packageName || productLabel || "Custom Racing Gear",
          price: unitPriceCents,
        },
        size: "Custom",
        isCustomFit: true,
        quantity: qty,
        basePrice: unitPriceCents,
        customFitPrice: 0,
        optionsPrice: 0,
        itemTotal: unitPriceCents * qty,
      },
    ],
    shippingAddress,
    billingAddress: shippingAddress,
    sameAsBilling: true,
    subtotal: unitPriceCents * qty,
    shippingCost: 0,
    shippingMethod: { name: "Free Shipping" },
    tax: 0,
    total,
    payment: {
      method: "stripe",
      status: "captured",
      transactionId: session.payment_intent || "",
      stripeSessionId: session.id,
      last4: cardDetails.last4,
      brand: cardDetails.brand,
      paidAt: new Date(),
    },
    status: "confirmed",
    hasCustomFit: true,
    customFitLeadTime: "2-3 weeks",
    internalNotes: [
      `Product: ${productLabel}`,
      `Package: ${packageName} (${packageId})`,
      `Suit mockup: ${suitMockup?.name || "—"}`,
      `Gloves mockup: ${glovesMockup?.name || "—"}`,
      `Shoes mockup: ${shoesMockup?.name || "—"}`,
      `Shoe size: ${shoeSize?.label || "—"}`,
      `Colors: ${JSON.stringify(colors)}`,
      `Custom Logo: ${customLogoUrl ? customLogoUrl : "None"}`,
      `Logo Notes: ${customLogoNotes ? customLogoNotes : "None"}`,
    ].join("\n"),
    customLogoUrl,
    customLogoNotes,
  });

  // Send confirmation emails
  await sendCustomConfirmationEmails(order, {
    productType,
    productLabel,
    packageName,
    unitPrice: unitPriceCents,
    qty,
    suitMockup,
    glovesMockup,
    shoesMockup,
    shoeSize,
    colors,
    customLogoUrl,
    customLogoNotes,
  });

  console.log(
    `[stripe/webhook] Custom order ${orderId} created — ${productLabel} — ${customerEmail} — ${money(total / 100)}`
  );
}

/* ────────────────────────────────────────────────────────────────
 * EMAIL HELPERS
 * ──────────────────────────────────────────────────────────────── */

/**
 * Send shop order confirmation emails (customer + admin).
 * Reuses the editorial template style from /api/shop-enquiry but
 * with "Payment received" instead of "no payment taken".
 */
async function sendShopConfirmationEmails(order, orderItems) {
  const mail = await getTransporter();
  if (!mail.ok) {
    console.error("[stripe/webhook] Mailer unavailable — emails NOT sent for", order.orderNumber);
    return;
  }
  const { transporter, smtpUser, businessEmail } = mail;

  const customer = order.customer;
  const orderId = order.orderNumber;
  const orderPlacedAt = formatPlacedAt();
  const total = order.total;
  const firstName = String(customer.name || "").trim().split(/\s+/)[0] || "there";

  const lineItemsForEmail = orderItems.map((item) => ({
    name: item.productSnapshot?.name || "Racing Gear",
    quantity: item.quantity,
    unitPrice: item.basePrice,
    lineTotal: item.itemTotal,
    variant: item.size !== "Standard" ? `Size ${item.size}` : "",
    image: item.productSnapshot?.image || "",
  }));

  // ── Customer email ──
  const customerHtml = renderPaidCustomerEmail({
    orderId,
    orderPlacedAt,
    firstName,
    customer,
    lineItems: lineItemsForEmail,
    total,
    paymentLast4: order.payment.last4,
    paymentBrand: order.payment.brand,
    shippingAddress: order.shippingAddress,
  });

  await transporter.sendMail({
    from: `"HS Race Gear" <${smtpUser}>`,
    to: customer.email,
    replyTo: businessEmail,
    subject: `Order ${orderId} confirmed & paid — thank you! | HS Race Gear`,
    html: customerHtml,
    text: `HS RACE GEAR — ORDER RECEIPT\n\nThank you, ${firstName}! Your payment has been received.\n\nOrder: ${orderId}\nTotal: ${money(total / 100)}\n\nYour order is being processed and you'll receive tracking shortly.\n\nQuestions? Contact us at ${CONTACT.email} or ${CONTACT.phone}`,
  });

  // ── Admin email ──
  const adminHtml = renderPaidAdminEmail({
    orderId,
    orderPlacedAt,
    customer,
    lineItems: lineItemsForEmail,
    total,
    paymentLast4: order.payment.last4,
    paymentBrand: order.payment.brand,
    transactionId: order.payment.transactionId,
    shippingAddress: order.shippingAddress,
  });

  await transporter.sendMail({
    from: `"HS Race Gear Orders" <${smtpUser}>`,
    to: businessEmail,
    replyTo: customer.email,
    subject: `[${orderId}] PAID shop order — ${customer.name} — ${money(total / 100)} USD`,
    html: adminHtml,
    text: `PAID SHOP ORDER — ${orderId}\n\nCustomer: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nTotal: ${money(total / 100)}\nPayment: ${order.payment.brand || "Card"} ending ${order.payment.last4 || "****"}\nStripe: ${order.payment.transactionId}\n\nItems:\n${lineItemsForEmail.map((li) => `  ${li.quantity}x ${li.name} — ${money(li.lineTotal / 100)}`).join("\n")}\n\nShip to: ${order.shippingAddress ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}, ${order.shippingAddress.address1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}` : "No address"}`,
  });
}

/**
 * Send custom order confirmation emails (customer + admin).
 * "Payment received" version of the custom order emails.
 */
async function sendCustomConfirmationEmails(order, details) {
  const mail = await getTransporter();
  if (!mail.ok) {
    console.error("[stripe/webhook] Mailer unavailable — emails NOT sent for", order.orderNumber);
    return;
  }
  const { transporter, smtpUser, businessEmail } = mail;

  const customer = order.customer;
  const orderId = order.orderNumber;
  const orderPlacedAt = formatPlacedAt();
  const firstName = String(customer.name || "").trim().split(/\s+/)[0] || "there";

  // ── Customer email ──
  const customerHtml = renderPaidCustomCustomerEmail({
    orderId,
    orderPlacedAt,
    firstName,
    customer,
    productLabel: details.productLabel,
    packageName: details.packageName,
    unitPrice: details.unitPrice,
    quantity: details.qty,
    total: order.total,
    paymentLast4: order.payment.last4,
    paymentBrand: order.payment.brand,
    shippingAddress: order.shippingAddress,
    customLogoUrl: details.customLogoUrl,
    customLogoNotes: details.customLogoNotes,
  });

  await transporter.sendMail({
    from: `"HS Race Gear" <${smtpUser}>`,
    to: customer.email,
    replyTo: businessEmail,
    subject: `Order ${orderId} confirmed & paid — thank you! | HS Race Gear`,
    html: customerHtml,
    text: `HS RACE GEAR — ORDER RECEIPT\n\nThank you, ${firstName}! Your payment of ${money(order.total / 100)} has been received.\n\nOrder: ${orderId}\nProduct: ${details.productLabel}\nPackage: ${details.packageName}\n\nWhat happens next:\n1. A designer emails you a digital mockup within 24 hours.\n2. Revisions are unlimited and free.\n3. Production takes 2-3 weeks after mockup approval.\n4. You'll get tracking once it ships.\n\nIf we can't produce exactly what you want, we'll refund in full.\n\nQuestions? ${CONTACT.email} or ${CONTACT.phone}`,
  });

  // ── Admin email ──
  await transporter.sendMail({
    from: `"HS Race Gear Orders" <${smtpUser}>`,
    to: businessEmail,
    replyTo: customer.email,
    subject: `[${orderId}] PAID ${details.productLabel} — ${customer.name} — ${money(order.total / 100)} USD`,
    text: `PAID CUSTOM ORDER — ${orderId}\n\nCustomer: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nProduct: ${details.productLabel}\nPackage: ${details.packageName}\nQuantity: ${details.qty}\nTotal: ${money(order.total / 100)}\nPayment: ${order.payment.brand || "Card"} ending ${order.payment.last4 || "****"}\nStripe: ${order.payment.transactionId}\n\nSuit mockup: ${details.suitMockup?.name || "—"}\nGloves mockup: ${details.glovesMockup?.name || "—"}\nShoes mockup: ${details.shoesMockup?.name || "—"}\nShoe size: ${details.shoeSize?.label || "—"}\nColors: ${JSON.stringify(details.colors)}\nLogo: ${details.customLogoUrl || "—"}\nLogo Notes: ${details.customLogoNotes || "—"}\n\nShip to: ${order.shippingAddress ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}, ${order.shippingAddress.address1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}` : "No address"}\n\n⚠ PAYMENT CAPTURED — proceed to mockup design.`,
    html: renderPaidCustomAdminEmail({
      orderId,
      orderPlacedAt,
      customer,
      productLabel: details.productLabel,
      packageName: details.packageName,
      quantity: details.qty,
      total: order.total,
      paymentLast4: order.payment.last4,
      paymentBrand: order.payment.brand,
      transactionId: order.payment.transactionId,
      shippingAddress: order.shippingAddress,
      suitMockup: details.suitMockup,
      glovesMockup: details.glovesMockup,
      shoesMockup: details.shoesMockup,
      shoeSize: details.shoeSize,
      colors: details.colors,
      customLogoUrl: details.customLogoUrl,
      customLogoNotes: details.customLogoNotes,
    }),
  });
}

/* ────────────────────────────────────────────────────────────────
 * HTML Email Renderers (paid versions)
 *
 * Streamlined versions of the existing editorial templates.
 * Key differences from the email-only flow:
 *   - Says "Receipt" / "Payment received" instead of "no payment taken"
 *   - Shows payment method (card brand + last4)
 *   - Admin email says "PAID" prominently
 * ──────────────────────────────────────────────────────────────── */

function emailShell(innerRows) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>HS Race Gear</title></head>
<body style="margin:0; padding:0; background:${BRAND.blush};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.blush}" style="background:${BRAND.blush}; padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; background:${BRAND.card}; border-radius:10px; overflow:hidden;">
${innerRows}
</table></td></tr></table></body></html>`;
}

function renderFooter() {
  return `<tr><td bgcolor="${BRAND.redDark}" style="background:${BRAND.redDark}; padding:30px 34px; text-align:center;">
<div style="font-family:Georgia,'Times New Roman',serif; font-size:20px; letter-spacing:3px; color:#fff; text-transform:uppercase;">HS Race Gear</div>
<div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#f0d9d5; line-height:1.8; margin-top:12px;">
${escapeHtml(CONTACT.address)}<br>
<a href="tel:${CONTACT.phoneHref}" style="color:#fff; text-decoration:none;">${escapeHtml(CONTACT.phone)}</a>
&nbsp;·&nbsp;
<a href="mailto:${CONTACT.email}" style="color:#fff; text-decoration:none;">${escapeHtml(CONTACT.email)}</a>
</div></td></tr>`;
}

function paymentBadge(brand, last4) {
  let label;
  if (brand === "paypal") {
    label = "PayPal";
  } else if (brand) {
    label = `${brand.charAt(0).toUpperCase() + brand.slice(1)} ending ${last4 || "****"}`;
  } else {
    label = `Card ending ${last4 || "****"}`;
  }
  return `<div style="display:inline-block; background:#e6f4ea; border:1px solid #34a853; border-radius:6px; padding:8px 16px; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#1e7e34; font-weight:bold;">
✓ Payment received — ${escapeHtml(label)}
</div>`;
}

function renderPaidCustomerEmail({ orderId, orderPlacedAt, firstName, customer, lineItems, total, paymentLast4, paymentBrand, shippingAddress }) {
  const itemRows = lineItems.map((li) => {
    let imgUrl = li.image || "";
    if (imgUrl && imgUrl.startsWith("/")) imgUrl = `${BRAND.site}${imgUrl}`;
    const imgCell = imgUrl
      ? `<td width="64" valign="top" style="padding:12px 8px 12px 0; border-bottom:1px solid ${BRAND.rule};">
           <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(li.name)}" width="64" height="80" style="display:block; width:64px; height:80px; object-fit:cover; border-radius:4px; border:1px solid ${BRAND.rule};" />
         </td>` : "";
    return `<tr>${imgCell}
      <td style="padding:12px 0; border-bottom:1px solid ${BRAND.rule}; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink};">
        <div style="font-weight:bold;">${escapeHtml(li.name)}</div>
        ${li.variant ? `<div style="font-size:12px; color:${BRAND.inkSoft}; margin-top:3px;">${escapeHtml(li.variant)}</div>` : ""}
        <div style="font-size:12px; color:${BRAND.inkSoft}; margin-top:3px;">Qty ${li.quantity} × ${money(li.unitPrice / 100)}</div>
      </td>
      <td align="right" valign="top" style="padding:12px 0; border-bottom:1px solid ${BRAND.rule}; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:${BRAND.ink}; white-space:nowrap;">${money(li.lineTotal / 100)}</td>
    </tr>`;
  }).join("");

  const addressLines = shippingAddress
    ? [shippingAddress.address1, shippingAddress.address2, `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`, shippingAddress.country].filter(Boolean).map(l => escapeHtml(l)).join("<br>")
    : "We'll confirm your delivery address.";

  return emailShell(`
    <tr><td style="padding:34px 34px 0; text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif; font-size:17px; letter-spacing:4px; color:${BRAND.redDeep}; text-transform:uppercase;">HS Race Gear</div>
    </td></tr>
    <tr><td style="padding:26px 34px 0; text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif; font-size:40px; line-height:1.15; color:${BRAND.redDeep}; letter-spacing:2px;">THANK YOU</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:${BRAND.ink}; line-height:1.7; margin-top:16px;">
        ${escapeHtml(firstName)}, your payment has been received and your order is confirmed!
      </div>
    </td></tr>
    <tr><td style="padding:22px 34px 0; text-align:center;">
      <div style="display:inline-block; border:1px solid ${BRAND.rule}; border-radius:6px; padding:12px 22px;">
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft};">Order Reference</div>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:19px; font-weight:bold; color:${BRAND.redDeep}; letter-spacing:1px; margin-top:4px;">${escapeHtml(orderId)}</div>
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:10px;">${escapeHtml(orderPlacedAt)}</div>
      <div style="margin-top:14px;">${paymentBadge(paymentBrand, paymentLast4)}</div>
    </td></tr>
    <tr><td style="padding:30px 34px 0;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Your Order</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${itemRows}</table>
    </td></tr>
    <tr><td style="padding:18px 34px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td width="42%">&nbsp;</td><td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px;">
            <tr>
              <td style="padding:10px 0 0; font-weight:bold; text-transform:uppercase; letter-spacing:1px; color:${BRAND.ink};">Total Paid</td>
              <td align="right" style="padding:10px 0 0; font-size:17px; font-weight:bold; color:${BRAND.redDeep};">${money(total / 100)} USD</td>
            </tr>
            <tr><td colspan="2" style="padding:4px 0 0; font-size:11px; color:${BRAND.inkSoft};">Free shipping included</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:26px 34px 0;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Delivery Address</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; line-height:1.7;">${addressLines}</div>
    </td></tr>
    <tr><td style="padding:26px 34px 34px;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">What Happens Next</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; line-height:1.9;">
        1. We process and prepare your order.<br>
        2. Your gear ships and you get tracking via email.<br>
        3. Enjoy the race!
      </div>
    </td></tr>
    ${renderFooter()}
  `);
}

function renderPaidAdminEmail({ orderId, orderPlacedAt, customer, lineItems, total, paymentLast4, paymentBrand, transactionId, shippingAddress }) {
  const itemRows = lineItems.map((li) => `<tr>
    <td style="padding:8px 0; border-bottom:1px solid ${BRAND.rule}; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink};">
      <strong>${escapeHtml(li.name)}</strong>${li.variant ? ` <span style="color:${BRAND.inkSoft};">(${escapeHtml(li.variant)})</span>` : ""}
      <div style="font-size:12px; color:${BRAND.inkSoft};">Qty ${li.quantity} × ${money(li.unitPrice / 100)}</div>
    </td>
    <td align="right" valign="top" style="padding:8px 0; border-bottom:1px solid ${BRAND.rule}; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:${BRAND.ink};">${money(li.lineTotal / 100)}</td>
  </tr>`).join("");

  const addressStr = shippingAddress
    ? `${shippingAddress.firstName} ${shippingAddress.lastName}<br>${escapeHtml(shippingAddress.address1)}${shippingAddress.address2 ? "<br>" + escapeHtml(shippingAddress.address2) : ""}<br>${escapeHtml(shippingAddress.city)}, ${escapeHtml(shippingAddress.state)} ${escapeHtml(shippingAddress.zipCode)}<br>${escapeHtml(shippingAddress.country)}`
    : "<strong style='color:" + BRAND.red + ";'>⚠ No address</strong>";

  return emailShell(`
    <tr><td style="padding:34px; text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif; font-size:17px; letter-spacing:4px; color:${BRAND.redDeep}; text-transform:uppercase;">HS Race Gear</div>
      <div style="font-family:Georgia,'Times New Roman',serif; font-size:34px; line-height:1.15; color:${BRAND.redDeep}; letter-spacing:2px; margin-top:18px;">PAID ORDER</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.inkSoft}; margin-top:10px;">${escapeHtml(orderId)} · ${escapeHtml(orderPlacedAt)}</div>
      <div style="margin-top:14px;">${paymentBadge(paymentBrand, paymentLast4)}</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft}; margin-top:8px;">Stripe: ${escapeHtml(transactionId || "—")}</div>
    </td></tr>
    <tr><td style="padding:0 34px 26px;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Customer</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:${BRAND.ink}; line-height:1.8;">
        <strong>${escapeHtml(customer.name)}</strong><br>
        <a href="mailto:${escapeHtml(customer.email)}" style="color:${BRAND.red}; text-decoration:none;">${escapeHtml(customer.email)}</a><br>
        ${escapeHtml(customer.phone || "")}
      </div>
    </td></tr>
    <tr><td style="padding:0 34px 26px;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Items</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${itemRows}</table>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:bold; color:${BRAND.redDeep}; margin-top:12px; text-align:right;">${money(total / 100)} USD</div>
    </td></tr>
    <tr><td style="padding:0 34px 34px;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Ship To</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; line-height:1.7;">${addressStr}</div>
    </td></tr>
    ${renderFooter()}
  `);
}

function renderPaidCustomCustomerEmail({ orderId, orderPlacedAt, firstName, customer, productLabel, packageName, unitPrice, quantity, total, paymentLast4, paymentBrand, shippingAddress, customLogoUrl }) {
  const addressLines = shippingAddress
    ? [shippingAddress.address1, shippingAddress.address2, `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`, shippingAddress.country].filter(Boolean).map(l => escapeHtml(l)).join("<br>")
    : "We'll confirm your delivery address.";

  return emailShell(`
    <tr><td style="padding:34px 34px 0; text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif; font-size:17px; letter-spacing:4px; color:${BRAND.redDeep}; text-transform:uppercase;">HS Race Gear</div>
    </td></tr>
    <tr><td style="padding:26px 34px 0; text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif; font-size:40px; line-height:1.15; color:${BRAND.redDeep}; letter-spacing:2px;">THANK YOU</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:${BRAND.ink}; line-height:1.7; margin-top:16px;">
        ${escapeHtml(firstName)}, your payment has been received and your order is confirmed!
      </div>
    </td></tr>
    <tr><td style="padding:22px 34px 0; text-align:center;">
      <div style="display:inline-block; border:1px solid ${BRAND.rule}; border-radius:6px; padding:12px 22px;">
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft};">Order Reference</div>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:19px; font-weight:bold; color:${BRAND.redDeep}; letter-spacing:1px; margin-top:4px;">${escapeHtml(orderId)}</div>
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:10px;">${escapeHtml(orderPlacedAt)}</div>
      <div style="margin-top:14px;">${paymentBadge(paymentBrand, paymentLast4)}</div>
    </td></tr>
    <tr><td style="padding:30px 34px 0;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Your Order</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.card}" style="background:${BRAND.card}; border:1px solid ${BRAND.rule}; border-radius:4px;">
        <tr><td style="padding:18px;">
          <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:bold; color:${BRAND.ink};">${escapeHtml(packageName)}</div>
          <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:4px;">${escapeHtml(productLabel)} × ${quantity}</div>
          ${customLogoUrl ? `<div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:4px;"><a href="${escapeHtml(customLogoUrl)}" style="color:${BRAND.red};">View Uploaded Logo</a></div>` : ""}
          <div style="font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:bold; color:${BRAND.redDeep}; margin-top:10px;">${money(total / 100)} USD</div>
          <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft}; margin-top:4px;">Free shipping included</div>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:26px 34px 0;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Delivery Address</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; line-height:1.7;">${addressLines}</div>
    </td></tr>
    <tr><td style="padding:26px 34px 34px;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">What Happens Next</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; line-height:1.9;">
        1. A designer emails you a digital mockup within 24 hours.<br>
        2. Revisions are unlimited and free — nothing is cut until you approve.<br>
        3. Production takes 2–3 weeks after approval.<br>
        4. You'll get tracking once it ships.
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; line-height:1.6; margin-top:14px; padding:12px; background:#f8f8f8; border-radius:6px;">
        If we can't produce exactly what you want, we'll refund in full — no questions asked.
      </div>
    </td></tr>
    ${renderFooter()}
  `);
}

function renderPaidCustomAdminEmail({ orderId, orderPlacedAt, customer, productLabel, packageName, quantity, total, paymentLast4, paymentBrand, transactionId, shippingAddress, suitMockup, glovesMockup, shoesMockup, shoeSize, colors, customLogoUrl, customLogoNotes }) {
  const design = suitMockup?.name || glovesMockup?.name || shoesMockup?.name || "—";
  const addressStr = shippingAddress
    ? `${shippingAddress.firstName} ${shippingAddress.lastName}<br>${escapeHtml(shippingAddress.address1)}<br>${escapeHtml(shippingAddress.city)}, ${escapeHtml(shippingAddress.state)} ${escapeHtml(shippingAddress.zipCode)}<br>${escapeHtml(shippingAddress.country)}`
    : "<strong style='color:" + BRAND.red + ";'>⚠ No address</strong>";

  return emailShell(`
    <tr><td style="padding:34px; text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif; font-size:17px; letter-spacing:4px; color:${BRAND.redDeep}; text-transform:uppercase;">HS Race Gear</div>
      <div style="font-family:Georgia,'Times New Roman',serif; font-size:34px; line-height:1.15; color:${BRAND.redDeep}; letter-spacing:2px; margin-top:18px;">PAID CUSTOM ORDER</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.inkSoft}; margin-top:10px;">${escapeHtml(orderId)} · ${escapeHtml(orderPlacedAt)}</div>
      <div style="margin-top:14px;">${paymentBadge(paymentBrand, paymentLast4)}</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft}; margin-top:8px;">Stripe: ${escapeHtml(transactionId || "—")}</div>
    </td></tr>
    <tr><td style="padding:0 34px 20px;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Customer</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:${BRAND.ink}; line-height:1.8;">
        <strong>${escapeHtml(customer.name)}</strong><br>
        <a href="mailto:${escapeHtml(customer.email)}" style="color:${BRAND.red}; text-decoration:none;">${escapeHtml(customer.email)}</a><br>
        ${escapeHtml(customer.phone || "")}
      </div>
    </td></tr>
    <tr><td style="padding:0 34px 20px;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Build Spec</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px;">
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.inkSoft};">Product</td><td style="padding:4px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(productLabel)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.inkSoft};">Package</td><td style="padding:4px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(packageName)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.inkSoft};">Quantity</td><td style="padding:4px 0; color:${BRAND.ink}; font-weight:bold;">${quantity}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.inkSoft};">Design</td><td style="padding:4px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(design)}</td></tr>
        ${shoeSize?.label ? `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.inkSoft};">Shoe Size</td><td style="padding:4px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(shoeSize.label)}</td></tr>` : ""}
      </table>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:bold; color:${BRAND.redDeep}; margin-top:12px;">${money(total / 100)} USD</div>
    </td></tr>
    <tr><td style="padding:0 34px 20px;">
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">Ship To</div>
      <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; line-height:1.7;">${addressStr}</div>
    </td></tr>
    <tr><td style="padding:0 34px 34px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#e6f4ea; border:1px solid #34a853; border-radius:6px;">
        <tr><td style="padding:14px 18px; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#1e7e34; font-weight:bold;">
          ✓ Payment captured — proceed to mockup design within 24 hours.
        </td></tr>
      </table>
    </td></tr>
    ${renderFooter()}
  `);
}

/* ────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────── */

/**
 * Build a shippingAddress subdoc from Stripe's shipping_details.
 * Falls back to customer_details if no shipping was collected.
 */
function buildShippingAddress(stripeDetails, fallback) {
  const addr = stripeDetails?.address || {};
  const name = stripeDetails?.name || fallback.name || "";
  const nameParts = name.split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    firstName,
    lastName,
    address1: addr.line1 || "",
    address2: addr.line2 || "",
    city: addr.city || "",
    state: addr.state || "",
    zipCode: addr.postal_code || "",
    country: addr.country || "US",
    phone: fallback.phone || "",
    email: fallback.email || "",
  };
}
