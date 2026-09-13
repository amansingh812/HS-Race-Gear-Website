import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import {
  BRAND,
  escapeHtml,
  money,
  generateOrderId,
  formatPlacedAt,
  normaliseAddress,
  getTransporter,
} from "@/lib/orderEmail";

/**
 * Custom order API — LEAD CAPTURE (no payment).
 *
 * 1. Saves the order to MongoDB (status: "pending", payment.status: "pending")
 * 2. Sends ONE internal email → BUSINESS_EMAIL (info@hsracegear.com)
 *    with all lead info so the team can contact the customer.
 *    NO email is sent to the customer — they only see a thank-you screen.
 *
 * Payment is collected later after mockup approval — this is a lead/quote,
 * not a transaction.
 */
export async function POST(request) {
  try {
    const orderData = await request.json();
    console.log("[/api/custom-order] Received fields:", {
      productType: orderData.productType,
      hasCustomer: !!orderData.customer,
      hasPackage: !!orderData.package,
      hasSuitMockup: !!orderData.suitMockup,
      hasGlovesMockup: !!orderData.glovesMockup,
      hasShoesMockup: !!orderData.shoesMockup,
    });

    const { customer, package: pkg, suitMockup, glovesMockup, shoesMockup, shoeSize, colors, productType, customLogoUrl, customLogoNotes } = orderData;
    const productLabels = {
      "karting-suit": "Custom Karting Suit",
      "powerboat-suit": "Custom Power Boat Suit",
      "custom-shoes": "Custom Shoes",
      "custom-gloves": "Custom Gloves",
    };
    const productLabel = productLabels[productType] || "Custom Race Suit";

    // Validate required fields
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json({ error: "Missing required customer information" }, { status: 400 });
    }

    if (!pkg) {
      return NextResponse.json({ error: "Missing package selection" }, { status: 400 });
    }

    // Validate the mockup field based on product type
    if (productType === "custom-shoes" && !shoesMockup) {
      return NextResponse.json({ error: "Missing shoe design selection" }, { status: 400 });
    } else if (productType === "custom-gloves" && !glovesMockup) {
      return NextResponse.json({ error: "Missing gloves design selection" }, { status: 400 });
    } else if (productType !== "custom-shoes" && productType !== "custom-gloves" && !suitMockup) {
      return NextResponse.json({ error: "Missing suit design selection" }, { status: 400 });
    }

    // ---- Order reference ----
    const orderId = generateOrderId();

    // ---- Pricing ----
    const pricing = computePricing({ pkg, quantity: orderData.quantity });

    // ---- Shipping address ----
    const address = normaliseAddress(customer);

    const orderPlacedAt = formatPlacedAt();

    // ---- Save to MongoDB ----
    await dbConnect();

    // Price in cents for DB consistency (DB stores cents)
    const totalCents = Math.round(pricing.total * 100);
    const subtotalCents = Math.round(pricing.subtotal * 100);

    // NOTE: We intentionally skip shippingAddress for custom leads.
    // The Order schema requires all address fields (zipCode, city, etc.)
    // but the custom order form doesn't collect a full address upfront.
    // Shipping is confirmed later after mockup approval.

    const dbOrder = await Order.create({
      orderNumber: orderId,
      isGuest: true,
      guestEmail: customer.email,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      items: [
        {
          productSnapshot: {
            name: `${productLabel} — ${pkg.name}`,
            slug: productType,
            price: subtotalCents,
            image: suitMockup?.image || glovesMockup?.image || shoesMockup?.image || "",
          },
          size: shoeSize?.label || "Custom",
          quantity: pricing.quantity,
          basePrice: subtotalCents,
          itemTotal: subtotalCents,
        },
      ],
      subtotal: subtotalCents,
      shippingCost: 0,
      total: totalCents,
      currency: "USD",
      payment: {
        method: "other",
        status: "pending",
      },
      status: "pending",
      statusHistory: [{ status: "pending", note: "Custom order lead received — awaiting mockup approval and payment" }],
      hasCustomFit: true,
      customLogoUrl: customLogoUrl || "",
      customLogoNotes: customLogoNotes || "",
      customerNotes: JSON.stringify({
        productType,
        packageId: pkg.id,
        suitMockup: suitMockup?.name || null,
        glovesMockup: glovesMockup?.name || null,
        shoesMockup: shoesMockup?.name || null,
        shoeSize: shoeSize?.label || null,
        colors: colors || {},
      }),
    });

    console.log(`[/api/custom-order] Saved to DB: ${dbOrder._id} / ${orderId}`);

    // ---- Email to HS Race Gear (internal / admin) ----
    const internalEmailHtml = renderAdminNotification({
      orderId,
      orderPlacedAt,
      customer,
      productLabel,
      pkg,
      pricing,
      address,
      colors,
      suitMockup,
      glovesMockup,
      shoesMockup,
      shoeSize,
      customLogoUrl,
      customLogoNotes,
    });

    const internalEmailText = renderAdminNotificationText({
      orderId,
      orderPlacedAt,
      customer,
      productLabel,
      pkg,
      pricing,
      address,
      colors,
      suitMockup,
      glovesMockup,
      shoesMockup,
      shoeSize,
      customLogoUrl,
      customLogoNotes,
    });

    // ---- Send Email ----
    // Fails loud if SMTP is missing or auth fails — orders are
    // business-critical and must never be silently lost.
    const mail = await getTransporter();
    if (!mail.ok) {
      console.error("[/api/custom-order] mailer unavailable", {
        customer: customer?.email,
        productLabel,
      });
      return NextResponse.json({ error: mail.error }, { status: 500 });
    }
    const { transporter, smtpUser, businessEmail } = mail;

    // Send internal notification to info@hsracegear.com (BUSINESS_EMAIL)
    // Order ID leads the subject so the inbox sorts and searches cleanly.
    // NO customer email — customer only sees the thank-you screen.
    await transporter.sendMail({
      from: `"HS Race Gear Orders" <${smtpUser}>`,
      to: businessEmail,
      replyTo: customer.email, // replies go straight to the customer
      subject: `[${orderId}] New ${productLabel} — ${customer.name} — ${pricing.totalText}`,
      text: internalEmailText,
      html: internalEmailHtml,
    });

    console.log(`[/api/custom-order] ${orderId} — ${productLabel} — ${customer.email} — ${money(pricing.total)}`);

    // Return the order ID so the frontend can show it on the success screen.
    return NextResponse.json({
      success: true,
      orderId,
      message: "Order submitted successfully",
      pricing: {
        subtotal: pricing.subtotal,
        shipping: pricing.shipping,
        total: pricing.total,
        currency: pricing.currency,
      },
    });
  } catch (error) {
    console.error("[/api/custom-order] Uncaught error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please contact us at info@hsracegear.com or +1 (617) 319 6993 to complete your order." },
      { status: 500 }
    );
  }
}

/* ────────────────────────────────────────────────────────────────
 * Internal admin notification → info@hsracegear.com
 *
 * Redesigned to be concise and branded. Matches the HS Racegear
 * internal notification style:
 *   - branded header with diagonal red/grey stripe
 *   - order number badge, date + total
 *   - package/offer details with item list
 *   - colour swatches displayed horizontally
 *   - customer contact info (name, phone, email)
 *   - "What happens next" numbered steps
 *   - WhatsApp footer with "Race Ready. Always." tagline
 *
 * ALL lead info is preserved — the team needs everything to contact
 * the customer. No email goes to the customer.
 *
 * Email-client constraints observed throughout:
 *   - tables for all layout (no flex/grid — Outlook strips them)
 *   - inline styles only (no <style> blocks, no classes)
 *   - explicit widths, bgcolor attributes alongside CSS
 *   - web-safe fonts with serif stack for display type
 * ──────────────────────────────────────────────────────────────── */
function renderAdminNotification({
  orderId, orderPlacedAt, customer, productLabel, pkg, pricing,
  address, colors, suitMockup, glovesMockup, shoesMockup, shoeSize, customLogoUrl, customLogoNotes
}) {
  const designs = [suitMockup, glovesMockup, shoesMockup].filter(Boolean);
  const designNames = designs.map(d => d.name).filter(Boolean);
  const colourList = normaliseColors(colors);

  // Build items bullet list
  const itemBullets = [];
  if (suitMockup) itemBullets.push(`Suit Design: ${escapeHtml(suitMockup.name)}`);
  if (glovesMockup) itemBullets.push(`Gloves Design: ${escapeHtml(glovesMockup.name)}`);
  if (shoesMockup) itemBullets.push(`Shoes Design: ${escapeHtml(shoesMockup.name)}`);
  if (shoeSize?.label) itemBullets.push(`Shoe Size: ${escapeHtml(shoeSize.label)}`);
  if (customLogoUrl) itemBullets.push(`Custom Logo: <a href="${escapeHtml(customLogoUrl)}" style="color:${BRAND.red};">View</a>`);
  if (customLogoNotes) itemBullets.push(`Logo Notes: ${escapeHtml(customLogoNotes)}`);

  // Determine if this is a deal/offer (package with id) or single item
  const isOffer = pkg.id && /offer|deal|package/i.test(pkg.name);
  const offerLabel = isOffer ? `OFFER #${escapeHtml(String(pkg.id))}` : null;

  // Colour swatches — horizontal circles with labels below
  const swatchHtml = colourList.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
         <tr>
           ${colourList.map(c => `<td align="center" style="padding:0 10px 0 0;">
             <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
               <td width="36" height="36" bgcolor="${escapeHtml(c.hex || "#cccccc")}" style="width:36px; height:36px; border-radius:50%; border:2px solid #e0e0e0;">&nbsp;</td>
             </tr></table>
           </td>`).join("")}
         </tr>
         <tr>
           ${colourList.map(c => `<td align="center" style="padding:6px 10px 0 0; font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft};">
             ${escapeHtml(c.name)}
           </td>`).join("")}
         </tr>
       </table>`
    : `<div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.redDeep}; font-weight:bold;">⚠ No colours selected — confirm with customer.</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(orderId)} — New ${escapeHtml(productLabel)}</title>
</head>
<body style="margin:0; padding:0; background:#f4f4f4; -webkit-text-size-adjust:100%;">

<div style="display:none; font-size:1px; color:#f4f4f4; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
  New lead: ${escapeHtml(customer.name)} · ${escapeHtml(pkg.name)} · ${escapeHtml(pricing.totalText)}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4" style="background:#f4f4f4;">
  <tr>
    <td align="center" style="padding:20px 0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden;">

        <!-- ── BRANDED HEADER with diagonal stripe ── -->
        <tr>
          <td style="background: linear-gradient(135deg, ${BRAND.red} 0%, ${BRAND.red} 50%, #4a4a4a 50%, #4a4a4a 100%); height:8px; font-size:1px; line-height:1px;">&nbsp;</td>
        </tr>
        <tr>
          <td style="background:${BRAND.redDark}; padding:20px 30px;" align="center">
            <div style="font-family:Georgia,'Times New Roman',serif; font-size:22px; font-weight:bold; color:#ffffff; letter-spacing:3px;">
              HS RACEGEAR
            </div>
          </td>
        </tr>

        <!-- ── ORDER NUMBER BADGE ── -->
        <tr>
          <td align="center" style="padding:28px 30px 0;">
            <div style="display:inline-block; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:#fff; background:${BRAND.red}; padding:8px 20px; border-radius:4px;">
              ORDER ${escapeHtml(orderId)}
            </div>
          </td>
        </tr>

        <!-- ── DATE + TOTAL ROW ── -->
        <tr>
          <td style="padding:20px 30px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.inkSoft};">
                  <strong style="color:${BRAND.ink};">Order Date:</strong> ${escapeHtml(orderPlacedAt)}
                </td>
                <td align="right" style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.inkSoft};">
                  <strong style="color:${BRAND.ink};">Total:</strong> <span style="color:${BRAND.red}; font-size:16px; font-weight:bold;">${escapeHtml(pricing.totalText)}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="padding:20px 30px 0;"><div style="border-top:1px solid #e8e8e8; height:1px; line-height:1px;">&nbsp;</div></td></tr>

        <!-- ── OFFER / PACKAGE DETAILS ── -->
        <tr>
          <td style="padding:20px 30px 0;">
            ${offerLabel ? `<div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.red}; margin-bottom:6px;">${offerLabel}</div>` : ""}
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:16px; font-weight:bold; color:${BRAND.ink}; margin-bottom:4px;">
              ${escapeHtml(pkg.name)}
            </div>
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.inkSoft}; margin-bottom:14px;">
              ${escapeHtml(productLabel)} · Qty: ${escapeHtml(String(pricing.quantity))}
            </div>
            ${itemBullets.length ? `
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink};">
              ${itemBullets.map(b => `<tr>
                <td valign="top" style="padding:3px 8px 3px 0; color:${BRAND.red}; font-size:16px; line-height:1;">•</td>
                <td valign="top" style="padding:3px 0; line-height:1.5;">${b}</td>
              </tr>`).join("")}
            </table>` : ""}
          </td>
        </tr>

        <tr><td style="padding:20px 30px 0;"><div style="border-top:1px solid #e8e8e8; height:1px; line-height:1px;">&nbsp;</div></td></tr>

        <!-- ── COLOURS ── -->
        <tr>
          <td style="padding:20px 30px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.ink}; margin-bottom:14px;">
              Colours Selected
            </div>
            ${swatchHtml}
          </td>
        </tr>

        <tr><td style="padding:20px 30px 0;"><div style="border-top:1px solid #e8e8e8; height:1px; line-height:1px;">&nbsp;</div></td></tr>

        <!-- ── CUSTOMER CONTACT ── -->
        <tr>
          <td style="padding:20px 30px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.ink}; margin-bottom:12px;">
              Customer Details
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px; background:#fafafa; border:1px solid #e8e8e8; border-radius:6px;">
              <tr>
                <td style="padding:14px 16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="70" style="padding:3px 8px 3px 0; color:${BRAND.inkSoft};">Name</td>
                      <td style="padding:3px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(customer.name)}</td>
                    </tr>
                    <tr>
                      <td width="70" style="padding:3px 8px 3px 0; color:${BRAND.inkSoft};">Email</td>
                      <td style="padding:3px 0;"><a href="mailto:${escapeHtml(customer.email)}?subject=${encodeURIComponent(`Re: Order ${orderId}`)}" style="color:${BRAND.red}; font-weight:bold; text-decoration:none;">${escapeHtml(customer.email)}</a></td>
                    </tr>
                    <tr>
                      <td width="70" style="padding:3px 8px 3px 0; color:${BRAND.inkSoft};">Phone</td>
                      <td style="padding:3px 0;"><a href="tel:${escapeHtml(String(customer.phone).replace(/[^0-9+]/g, ""))}" style="color:${BRAND.red}; font-weight:bold; text-decoration:none;">${escapeHtml(customer.phone)}</a></td>
                    </tr>
                    ${address.present ? `<tr>
                      <td width="70" style="padding:3px 8px 3px 0; color:${BRAND.inkSoft}; vertical-align:top;">Address</td>
                      <td style="padding:3px 0; color:${BRAND.ink};">${address.lines.map(l => escapeHtml(l)).join("<br>")}</td>
                    </tr>` : ""}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="padding:20px 30px 0;"><div style="border-top:1px solid #e8e8e8; height:1px; line-height:1px;">&nbsp;</div></td></tr>

        <!-- ── WHAT HAPPENS NEXT ── -->
        <tr>
          <td style="padding:20px 30px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.ink}; margin-bottom:14px;">
              What Happens Next
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink};">
              <tr>
                <td valign="top" width="28" style="padding:0 0 8px; color:${BRAND.red}; font-weight:bold; font-size:15px;">1</td>
                <td valign="top" style="padding:0 0 8px; line-height:1.5;">Contact the customer within 24 hours</td>
              </tr>
              <tr>
                <td valign="top" width="28" style="padding:0 0 8px; color:${BRAND.red}; font-weight:bold; font-size:15px;">2</td>
                <td valign="top" style="padding:0 0 8px; line-height:1.5;">Send mockup for approval</td>
              </tr>
              <tr>
                <td valign="top" width="28" style="padding:0 0 8px; color:${BRAND.red}; font-weight:bold; font-size:15px;">3</td>
                <td valign="top" style="padding:0 0 8px; line-height:1.5;">Confirm measurements and collect payment</td>
              </tr>
              <tr>
                <td valign="top" width="28" style="padding:0; color:${BRAND.red}; font-weight:bold; font-size:15px;">4</td>
                <td valign="top" style="padding:0; line-height:1.5;">Production, QC and ship</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── WHATSAPP + FOOTER ── -->
        <tr>
          <td style="padding:28px 0 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.redDark}" style="background:${BRAND.redDark};">
              <tr>
                <td align="center" style="padding:24px 30px;">
                  <div style="font-family:Georgia,'Times New Roman',serif; font-size:16px; font-weight:bold; color:#ffffff; letter-spacing:2px;">
                    HS RACEGEAR
                  </div>
                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:rgba(255,255,255,0.7); margin-top:6px; letter-spacing:1px;">
                    Race Ready. Always.
                  </div>
                  <div style="margin-top:14px;">
                    <a href="https://wa.me/16173196993" style="display:inline-block; padding:8px 20px; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; color:#ffffff; background:#25D366; border-radius:4px; text-decoration:none; letter-spacing:0.5px;">
                      WhatsApp: +1 (617) 319-6993
                    </a>
                  </div>
                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:rgba(255,255,255,0.5); margin-top:12px;">
                    ${escapeHtml(orderId)} · Replying goes straight to the customer
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Plain-text admin notification — concise version. */
function renderAdminNotificationText({
  orderId, orderPlacedAt, customer, productLabel, pkg, pricing,
  address, colors, suitMockup, glovesMockup, shoesMockup, shoeSize, customLogoUrl, customLogoNotes
}) {
  const colourList = normaliseColors(colors);
  const L = [];

  L.push("NEW ORDER — HS RACEGEAR");
  L.push("=".repeat(40), "");
  L.push(`Order:    ${orderId}`);
  L.push(`Date:     ${orderPlacedAt}`);
  L.push(`Total:    ${pricing.totalText}`, "");
  L.push(`Package:  ${pkg.name}`);
  L.push(`Product:  ${productLabel}`);
  L.push(`Qty:      ${pricing.quantity}`);
  if (suitMockup) L.push(`Suit Design:   ${suitMockup.name}`);
  if (glovesMockup) L.push(`Gloves Design: ${glovesMockup.name}`);
  if (shoesMockup) L.push(`Shoes Design:  ${shoesMockup.name}`);
  if (shoeSize?.label) L.push(`Shoe Size: ${shoeSize.label}`);
  if (customLogoUrl) L.push(`Custom Logo: ${customLogoUrl}`);
  if (customLogoNotes) L.push(`Logo Notes: ${customLogoNotes}`);
  L.push("");
  L.push("Colours:");
  if (colourList.length) {
    colourList.forEach((c) => L.push(`  ${c.label}: ${c.name}${c.hex ? ` (${c.hex})` : ""}`));
  } else {
    L.push("  NONE — confirm with customer");
  }
  L.push("");
  L.push("-".repeat(40));
  L.push("CUSTOMER");
  L.push("-".repeat(40));
  L.push(`Name:  ${customer.name}`);
  L.push(`Email: ${customer.email}`);
  L.push(`Phone: ${customer.phone}`);
  if (address.present) {
    L.push(`Address: ${address.lines.join(", ")}`);
  }
  L.push("");
  L.push("NEXT: Contact within 24h, send mockup, confirm measurements.");
  L.push("");
  L.push("Replying to this email goes straight to the customer.");
  L.push("Race Ready. Always. | WhatsApp: +1 (617) 319-6993");

  return L.join("\n");
}

/* Customer email functions removed — customer no longer receives
   a confirmation email on custom orders. They only see the thank-you
   screen. All lead info goes to the internal admin email above. */


/**
 * Compute the order price breakdown.
 *
 * Deliberately simple and transparent — this is a quote confirmation, not a
 * payment capture. Nothing here charges a card; the designer confirms final
 * pricing before production.
 *
 * No tax is calculated. Shown price is exactly the package price the
 * customer selected on the site (times quantity), plus free shipping.
 * Previously this added a Massachusetts sales-tax estimate, but sales tax
 * isn't something this business collects at order time, so it's removed —
 * showing an unrequested tax line implied a charge that doesn't exist.
 */
function computePricing({ pkg, quantity }) {
  const rawPrice = String(pkg?.price ?? "").trim();
  const parsed = Number(rawPrice.replace(/[^0-9.]/g, ""));

  // Some products are quote-only (e.g. custom gloves send
  // price: "Contact for pricing"). Rendering those as "$0.00" would look
  // broken and could imply the order is free, so flag them instead.
  const quoteOnly = !Number.isFinite(parsed) || parsed <= 0;

  const unitPrice = quoteOnly ? 0 : parsed;
  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  const subtotal = unitPrice * qty;

  // Free shipping on custom orders.
  const shipping = 0;

  const total = Math.round((subtotal + shipping) * 100) / 100;

  return {
    quoteOnly,
    rawPrice,
    unitPrice,
    quantity: qty,
    subtotal,
    shipping,
    total,
    currency: "USD",
    // Pre-formatted display strings so both email templates agree.
    subtotalText: quoteOnly ? "Quote on request" : money(subtotal),
    totalText: quoteOnly ? "Quote on request" : `${money(total)} USD`,
  };
}


/**
 * Normalise the `colors` payload into a flat [{ label, hex, name }] list.
 *
 * The order pages send TWO different shapes and the email template previously
 * only handled one, so custom RACE SUIT orders arrived with the colours either
 * missing or rendered as the literal text "undefined":
 *
 *   CustomOrderPage (race suit)  → { primary: [ {hex,name}, ... ] }   // ARRAY, unlimited
 *   Karting / Powerboat /
 *   Gloves / Shoes               → { primary: {hex,name},
 *                                    secondary: {hex,name},
 *                                    accent: {hex,name} }             // single objects
 *
 * With the array shape, `colors.primary` is truthy (even when empty) but
 * `colors.primary.hex` is undefined — which is why the swatch broke and the
 * name printed as "undefined". This handles both, plus arrays appearing in
 * secondary/accent, and ignores entries with no usable hex or name.
 */
function normaliseColors(colors) {
  if (!colors || typeof colors !== "object") return [];

  const out = [];
  const seen = new Set();

  const push = (label, c) => {
    if (!c || typeof c !== "object") return;
    const hex = typeof c.hex === "string" ? c.hex.trim() : "";
    const name = typeof c.name === "string" ? c.name.trim() : "";
    if (!hex && !name) return;
    // Only allow simple hex values through into a CSS background declaration.
    const safeHex = /^#?[0-9a-fA-F]{3,8}$/.test(hex)
      ? (hex.startsWith("#") ? hex : `#${hex}`)
      : "";
    const key = `${label}|${safeHex}|${name}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, hex: safeHex, name: name || safeHex || "—" });
  };

  const LABELS = { primary: "Primary", secondary: "Secondary", accent: "Accent" };

  for (const [slot, label] of Object.entries(LABELS)) {
    const val = colors[slot];
    if (Array.isArray(val)) {
      // Race-suit shape: unlimited colours in an array.
      val.forEach((c, i) => push(val.length > 1 ? `${label} ${i + 1}` : label, c));
    } else {
      push(label, val);
    }
  }

  // Catch any additional slots the order pages might add later so new colour
  // fields don't silently vanish from the email again.
  for (const [slot, val] of Object.entries(colors)) {
    if (slot in LABELS) continue;
    const label = slot.charAt(0).toUpperCase() + slot.slice(1);
    if (Array.isArray(val)) {
      val.forEach((c, i) => push(val.length > 1 ? `${label} ${i + 1}` : label, c));
    } else {
      push(label, val);
    }
  }

  return out;
}

/**
 * Render colours as a TABLE, not flexbox — Outlook and several other clients
 * strip `display:flex`, which would collapse the swatch layout.
 */
function renderColorRows(colors) {
  const list = normaliseColors(colors);

  if (list.length === 0) {
    return `<p style="color: #888; font-size: 14px; margin: 0;">No colours were selected on the form.</p>`;
  }

  const rows = list
    .map(({ label, hex, name }) => {
      const swatch = hex
        ? `<td width="34" style="padding: 4px 10px 4px 0;"><div style="width: 28px; height: 28px; border-radius: 6px; background: ${escapeHtml(hex)}; border: 1px solid rgba(255,255,255,0.25);">&nbsp;</div></td>`
        : `<td width="34" style="padding: 4px 10px 4px 0;">&nbsp;</td>`;
      return `<tr>
        ${swatch}
        <td style="padding: 4px 12px 4px 0; color: #888; font-size: 13px; white-space: nowrap;">${escapeHtml(label)}</td>
        <td style="padding: 4px 0; font-weight: 600; font-size: 14px;">${escapeHtml(name)}${hex ? ` <span style="color:#666; font-weight:400;">${escapeHtml(hex)}</span>` : ""}</td>
      </tr>`;
    })
    .join("");

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">${rows}</table>`;
}

// Minimal HTML escape to prevent injection in the rendered email

