import { NextResponse } from "next/server";
import {
  BRAND,
  CONTACT,
  escapeHtml,
  money,
  generateOrderId,
  formatPlacedAt,
  normaliseAddress,
  getTransporter,
} from "@/lib/orderEmail";

/**
 * Off-the-rack shop order (cart checkout).
 *
 * Mirrors /api/custom-order exactly in behaviour: it confirms the order and
 * emails BOTH the customer and info@hsracegear.com, then the team contacts
 * the customer to arrange payment directly. No card details are collected,
 * transmitted or stored anywhere — the previous checkout had card fields on
 * the form that were validated and then silently discarded, which meant
 * customers believed they had paid when nothing had happened.
 *
 * Differences from the custom-order route:
 *   - many line items instead of one package + colour selections
 *   - no login required (the old flow blocked guests from ordering at all)
 *   - shipping method is a customer choice, so it can be non-zero
 *
 * No tax is applied, matching the custom-order flow — prices shown are
 * exactly the listed product prices plus whatever shipping the customer
 * chose at checkout.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, items, shippingMethod } = body;

    // ---- Validate ----
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { error: "Missing required customer information" },
        { status: 400 }
      );
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
    }

    const lineItems = normaliseItems(items);
    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "Could not read the items in your cart" },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();
    const orderPlacedAt = formatPlacedAt();
    const address = normaliseAddress(customer);
    const shipping = normaliseShipping(shippingMethod);
    const pricing = computePricing({ lineItems, shipping });

    const payload = {
      orderId, orderPlacedAt, customer, address, lineItems, shipping, pricing,
    };

    const customerHtml = renderCustomerConfirmation(payload);
    const customerText = renderCustomerConfirmationText(payload);
    const adminHtml = renderAdminNotification(payload);
    const adminText = renderAdminNotificationText(payload);

    // ---- Send ----
    const mail = await getTransporter();
    if (!mail.ok) {
      console.error("[/api/shop-enquiry] mailer unavailable", {
        customer: customer?.email,
        orderId,
      });
      return NextResponse.json({ error: mail.error }, { status: 500 });
    }
    const { transporter, smtpUser, businessEmail } = mail;

    const itemCount = lineItems.reduce((n, li) => n + li.quantity, 0);

    // Internal notification. Order ID leads the subject so the shared inbox
    // sorts and searches the same way it does for custom orders.
    await transporter.sendMail({
      from: `"HS Race Gear Orders" <${smtpUser}>`,
      to: businessEmail,
      replyTo: customer.email,
      subject: `[${orderId}] New shop order — ${customer.name} — ${pricing.totalText}`,
      text: adminText,
      html: adminHtml,
    });

    await transporter.sendMail({
      from: `"HS Race Gear" <${smtpUser}>`,
      to: customer.email,
      replyTo: businessEmail,
      subject: `Order ${orderId} received — thank you! | HS Race Gear`,
      text: customerText,
      html: customerHtml,
    });

    console.log(
      `[/api/shop-enquiry] ${orderId} — ${itemCount} item(s) — ${customer.email} — ${money(pricing.total)}`
    );

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
    console.error("[/api/shop-enquiry] error:", error);
    return NextResponse.json(
      {
        error: `Something went wrong submitting your order. Please contact us at ${CONTACT.email} or ${CONTACT.phone}.`,
      },
      { status: 500 }
    );
  }
}

/* ────────────────────────────────────────────────────────────────
 * Data normalisation
 * ──────────────────────────────────────────────────────────────── */

/**
 * Flatten cart items into a predictable shape.
 *
 * The cart context stores products from several sources (Mongo products,
 * custom-fit additions, older localStorage entries) so name, price and image
 * each live under a few possible keys. This mirrors the fallback chain the
 * checkout sidebar already uses, so the email can't disagree with what the
 * customer saw on screen.
 */
function normaliseItems(items) {
  return items
    .map((it) => {
      // Accept every field name the cart context might use. Guard against
      // empty strings (which are falsy) so we always get a real name.
      const raw =
        it.title || it.name || it.productSnapshot?.name || it.productName || "";
      const name = raw.trim() || "Product";

      const rawPrice =
        it.finalPrice ?? it.price ?? it.productSnapshot?.price ?? 0;
      const unitPrice = Number.isFinite(Number(rawPrice)) ? Number(rawPrice) : 0;

      const quantity = Math.max(1, parseInt(it.quantity, 10) || 1);

      if (name === "Product") {
        console.warn("[shop-enquiry] item missing product name:", JSON.stringify(it));
      }

      const variantBits = [
        it.size ? `Size ${it.size}` : "",
        it.color || it.colour || "",
        it.isCustomFit ? "Custom Fit" : "",
      ].filter(Boolean);

      // Resolve product image — checkout sends it; fall back to snapshot
      const image = String(
        it.image || it.imgSrc || it.productSnapshot?.image || ""
      ).trim();

      return {
        name: String(name),
        sku: String(it.sku || it.slug || it.productId || it._id || "").trim(),
        variant: variantBits.join(" · "),
        image,
        quantity,
        unitPrice,
        lineTotal: Math.round(unitPrice * quantity * 100) / 100,
      };
    })
    .filter((li) => li.name);
}

/** Shipping choice → { label, cost }. Unknown choices fall back to free. */
function normaliseShipping(shippingMethod) {
  const cost = Number(shippingMethod?.cost);
  return {
    label: String(shippingMethod?.name || "Standard Shipping"),
    estimate: String(shippingMethod?.estimatedDays || ""),
    cost: Number.isFinite(cost) && cost > 0 ? cost : 0,
  };
}

/**
 * Total the order.
 *
 * No tax — same policy as the custom-order route. The figure shown is the
 * listed product prices plus whatever shipping the customer picked.
 */
function computePricing({ lineItems, shipping }) {
  const subtotal =
    Math.round(lineItems.reduce((sum, li) => sum + li.lineTotal, 0) * 100) / 100;
  const total = Math.round((subtotal + shipping.cost) * 100) / 100;

  return {
    subtotal,
    shipping: shipping.cost,
    total,
    currency: "USD",
    subtotalText: money(subtotal),
    totalText: `${money(total)} USD`,
  };
}

/* ────────────────────────────────────────────────────────────────
 * Shared email fragments
 * ──────────────────────────────────────────────────────────────── */

/** Itemised product rows with thumbnail images (Outlook-safe tables). */
function renderLineItemRows(lineItems) {
  return lineItems
    .map(
      (li) => {
        // Build the image cell — only when we have a URL.
        // Relative paths get the site origin prepended so email clients
        // can fetch them (email images must be absolute URLs).
        let imgUrl = li.image || "";
        if (imgUrl && imgUrl.startsWith("/")) {
          imgUrl = `${BRAND.site}${imgUrl}`;
        }
        const imgCell = imgUrl
          ? `<td width="64" valign="top" style="padding:12px 8px 12px 0; border-bottom:1px solid ${BRAND.rule};">
               <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(li.name)}" width="64" height="80" style="display:block; width:64px; height:80px; object-fit:cover; border-radius:4px; border:1px solid ${BRAND.rule};" />
             </td>`
          : "";

        return `
      <tr>
        ${imgCell}
        <td style="padding:12px 0; border-bottom:1px solid ${BRAND.rule}; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink};">
          <div style="font-weight:bold;">${escapeHtml(li.name)}</div>
          ${
            li.variant
              ? `<div style="font-size:12px; color:${BRAND.inkSoft}; margin-top:3px;">${escapeHtml(li.variant)}</div>`
              : ""
          }
          <div style="font-size:12px; color:${BRAND.inkSoft}; margin-top:3px;">
            Qty ${li.quantity} × ${escapeHtml(money(li.unitPrice))}
          </div>
        </td>
        <td align="right" valign="top" style="padding:12px 0; border-bottom:1px solid ${BRAND.rule}; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:${BRAND.ink}; white-space:nowrap;">
          ${escapeHtml(money(li.lineTotal))}
        </td>
      </tr>`;
      }
    )
    .join("");
}

/**
 * Totals ledger — a single all-inclusive Total line.
 *
 * Shipping is always free and folded into the price shown, so there's
 * nothing to itemise: no separate shipping cost, no tax, just what's owed.
 * A small note under the total confirms shipping is included.
 */
function renderTotalsLedger(pricing) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px;">
      <tr>
        <td style="padding:10px 0 0; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; color:${BRAND.ink};">Total</td>
        <td align="right" style="padding:10px 0 0; font-size:17px; font-weight:bold; color:${BRAND.redDeep}; white-space:nowrap;">
          ${escapeHtml(pricing.totalText)}
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:4px 0 0; font-size:11px; color:${BRAND.inkSoft};">Free shipping included — nothing added at checkout</td>
      </tr>
    </table>`;
}

/** Shipping address panel, or a flag when none was captured. */
function renderAddressPanel(address, { loud = false } = {}) {
  if (!address.present) {
    return loud
      ? `<div style="background:#fff2f2; border:1px solid ${BRAND.red}; border-radius:6px; padding:12px 14px; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.redDeep}; font-weight:bold;">
           ⚠ No shipping address captured — contact the customer before processing.
         </div>`
      : `<div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.inkSoft};">
           We'll confirm your delivery address when we contact you.
         </div>`;
  }

  return `
    <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; line-height:1.7;">
      ${address.lines.map((l) => escapeHtml(l)).join("<br>")}
    </div>
    ${
      address.notes
        ? `<div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:8px; line-height:1.6;">
             <strong style="color:${BRAND.ink};">Notes:</strong> ${escapeHtml(address.notes)}
           </div>`
        : ""
    }`;
}

/** Section heading used across both templates. */
function sectionLabel(text) {
  return `<div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft}; margin-bottom:10px;">${escapeHtml(text)}</div>`;
}

/** Dark footer shared by both templates. */
function renderFooter() {
  return `
    <tr>
      <td bgcolor="${BRAND.redDark}" style="background:${BRAND.redDark}; padding:30px 34px; text-align:center;">
        <div style="font-family:Georgia,'Times New Roman',serif; font-size:20px; letter-spacing:3px; color:#ffffff; text-transform:uppercase;">
          HS Race Gear
        </div>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#f0d9d5; line-height:1.8; margin-top:12px;">
          ${escapeHtml(CONTACT.address)}<br>
          <a href="tel:${CONTACT.phoneHref}" style="color:#ffffff; text-decoration:none;">${escapeHtml(CONTACT.phone)}</a>
          &nbsp;·&nbsp;
          <a href="mailto:${CONTACT.email}" style="color:#ffffff; text-decoration:none;">${escapeHtml(CONTACT.email)}</a>
        </div>
      </td>
    </tr>`;
}

/** Outer shell — wraps content rows in the blush page ground. */
function emailShell(innerRows) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HS Race Gear</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.blush};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.blush}" style="background:${BRAND.blush}; padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; background:${BRAND.card}; border-radius:10px; overflow:hidden;">
          ${innerRows}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ────────────────────────────────────────────────────────────────
 * Customer confirmation
 * ──────────────────────────────────────────────────────────────── */

function renderCustomerConfirmation({
  orderId, orderPlacedAt, customer, address, lineItems, shipping, pricing,
}) {
  const firstName = String(customer.name || "").trim().split(/\s+/)[0] || "there";

  return emailShell(`
    <tr>
      <td style="padding:34px 34px 0; text-align:center;">
        <div style="font-family:Georgia,'Times New Roman',serif; font-size:17px; letter-spacing:4px; color:${BRAND.redDeep}; text-transform:uppercase;">
          HS Race Gear
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 34px 0; text-align:center;">
        <div style="font-family:Georgia,'Times New Roman',serif; font-size:40px; line-height:1.15; color:${BRAND.redDeep}; letter-spacing:2px;">
          THANK YOU
        </div>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:${BRAND.ink}; line-height:1.7; margin-top:16px;">
          ${escapeHtml(firstName)}, we've got your order. Our team will contact you
          shortly to confirm the details and arrange payment.
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 34px 0; text-align:center;">
        <div style="display:inline-block; border:1px solid ${BRAND.rule}; border-radius:6px; padding:12px 22px;">
          <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:${BRAND.inkSoft};">Order Reference</div>
          <div style="font-family:Arial,Helvetica,sans-serif; font-size:19px; font-weight:bold; color:${BRAND.redDeep}; letter-spacing:1px; margin-top:4px;">${escapeHtml(orderId)}</div>
        </div>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:10px;">${escapeHtml(orderPlacedAt)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 34px 0;">
        <a href="${BRAND.site}/contact-us" style="display:block; background:${BRAND.red}; color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1.5px; text-decoration:none; text-align:center; padding:15px 20px; border-radius:6px;">
          Contact Our Team
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 34px 0;">
        ${sectionLabel("Your Order")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${renderLineItemRows(lineItems)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 34px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="42%">&nbsp;</td>
            <td>${renderTotalsLedger(pricing)}</td>
          </tr>
        </table>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft}; line-height:1.6; margin-top:14px;">
          This is your order confirmation, not a receipt — no payment has been taken.
          Our team will confirm the total with you and arrange payment before your order ships.
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 34px 0;">
        ${sectionLabel("Delivery Address")}
        ${renderAddressPanel(address)}
      </td>
    </tr>
    <tr>
      <td style="padding:26px 34px 34px;">
        ${sectionLabel("What Happens Next")}
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; line-height:1.9;">
          1. Our team reviews your order and checks stock.<br>
          2. We contact you to confirm sizing and arrange payment.<br>
          3. Once payment clears, your gear ships and you get tracking.
        </div>
      </td>
    </tr>
    ${renderFooter()}
  `);
}

function renderCustomerConfirmationText({
  orderId, orderPlacedAt, customer, address, lineItems, shipping, pricing,
}) {
  const firstName = String(customer.name || "").trim().split(/\s+/)[0] || "there";
  const L = [];

  L.push("HS RACE GEAR — ORDER CONFIRMATION");
  L.push("=".repeat(46));
  L.push("");
  L.push(`${firstName}, thank you — we've got your order.`);
  L.push("Our team will contact you shortly to confirm the details");
  L.push("and arrange payment.");
  L.push("");
  L.push(`Order reference: ${orderId}`);
  L.push(`Placed: ${orderPlacedAt}`);
  L.push("");
  L.push("-".repeat(46));
  L.push("YOUR ORDER");
  L.push("-".repeat(46));
  for (const li of lineItems) {
    L.push(`${li.quantity} × ${li.name}${li.variant ? ` (${li.variant})` : ""}`);
    L.push(`    ${money(li.unitPrice)} each — ${money(li.lineTotal)}`);
  }
  L.push("");
  L.push(`TOTAL: ${pricing.totalText}`);
  L.push("(free shipping included — nothing added at checkout)");
  L.push("");
  L.push("This is an order confirmation, not a receipt — no payment");
  L.push("has been taken. We'll arrange payment with you directly.");
  L.push("");

  if (address.present) {
    L.push("-".repeat(46));
    L.push("DELIVERY ADDRESS");
    L.push("-".repeat(46));
    address.lines.forEach((l) => L.push(l));
    if (address.notes) L.push(`Notes: ${address.notes}`);
    L.push("");
  }

  L.push("-".repeat(46));
  L.push("WHAT HAPPENS NEXT");
  L.push("-".repeat(46));
  L.push("1. Our team reviews your order and checks stock.");
  L.push("2. We contact you to confirm sizing and arrange payment.");
  L.push("3. Once payment clears, your gear ships and you get tracking.");
  L.push("");
  L.push("-".repeat(46));
  L.push("HS Race Gear");
  L.push(CONTACT.address);
  L.push(`${CONTACT.phone} · ${CONTACT.email}`);

  return L.join("\n");
}

/* ────────────────────────────────────────────────────────────────
 * Admin notification → info@hsracegear.com
 * ──────────────────────────────────────────────────────────────── */

function renderAdminNotification({
  orderId, orderPlacedAt, customer, address, lineItems, shipping, pricing,
}) {
  const itemCount = lineItems.reduce((n, li) => n + li.quantity, 0);

  return emailShell(`
    <tr>
      <td style="padding:34px 34px 0; text-align:center;">
        <div style="font-family:Georgia,'Times New Roman',serif; font-size:17px; letter-spacing:4px; color:${BRAND.redDeep}; text-transform:uppercase;">
          HS Race Gear
        </div>
        <div style="font-family:Georgia,'Times New Roman',serif; font-size:34px; line-height:1.15; color:${BRAND.redDeep}; letter-spacing:2px; margin-top:18px;">
          NEW SHOP ORDER
        </div>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.inkSoft}; margin-top:10px;">
          ${escapeHtml(orderId)} &nbsp;·&nbsp; ${escapeHtml(orderPlacedAt)}
        </div>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink}; margin-top:6px;">
          ${itemCount} item${itemCount === 1 ? "" : "s"} &nbsp;·&nbsp; <strong>${escapeHtml(pricing.totalText)}</strong>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 34px 0;">
        ${sectionLabel("Customer")}
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:${BRAND.ink}; line-height:1.8;">
          <strong>${escapeHtml(customer.name)}</strong><br>
          <a href="mailto:${escapeHtml(customer.email)}" style="color:${BRAND.red}; text-decoration:none;">${escapeHtml(customer.email)}</a><br>
          <a href="tel:${escapeHtml(String(customer.phone).replace(/[^0-9+]/g, ""))}" style="color:${BRAND.red}; text-decoration:none;">${escapeHtml(customer.phone)}</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 34px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="49%">
              <a href="mailto:${escapeHtml(customer.email)}?subject=Your%20HS%20Race%20Gear%20order%20${escapeHtml(orderId)}" style="display:block; background:${BRAND.red}; color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; text-decoration:none; text-align:center; padding:13px 10px; border-radius:6px;">
                Email Customer
              </a>
            </td>
            <td width="2%">&nbsp;</td>
            <td width="49%">
              <a href="tel:${escapeHtml(String(customer.phone).replace(/[^0-9+]/g, ""))}" style="display:block; border:1px solid ${BRAND.redDeep}; color:${BRAND.redDeep}; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; text-decoration:none; text-align:center; padding:12px 10px; border-radius:6px;">
                Call Customer
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 34px 0;">
        ${sectionLabel("Items Ordered")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${renderLineItemRows(lineItems)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 34px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="42%">&nbsp;</td>
            <td>${renderTotalsLedger(pricing)}</td>
          </tr>
        </table>
        <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft}; line-height:1.6; margin-top:14px;">
          No payment captured — arrange payment with the customer before shipping.
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 34px 34px;">
        ${sectionLabel("Ship To")}
        ${renderAddressPanel(address, { loud: true })}
      </td>
    </tr>
    ${renderFooter()}
  `);
}

function renderAdminNotificationText({
  orderId, orderPlacedAt, customer, address, lineItems, shipping, pricing,
}) {
  const itemCount = lineItems.reduce((n, li) => n + li.quantity, 0);
  const L = [];

  L.push("NEW SHOP ORDER — HS RACE GEAR");
  L.push("=".repeat(46));
  L.push(`Order:  ${orderId}`);
  L.push(`Placed: ${orderPlacedAt}`);
  L.push(`Items:  ${itemCount}`);
  L.push("");
  L.push("-".repeat(46));
  L.push("CUSTOMER");
  L.push("-".repeat(46));
  L.push(`Name:  ${customer.name}`);
  L.push(`Email: ${customer.email}`);
  L.push(`Phone: ${customer.phone}`);
  L.push("");
  L.push("-".repeat(46));
  L.push("ITEMS");
  L.push("-".repeat(46));
  for (const li of lineItems) {
    L.push(`${li.quantity} × ${li.name}${li.variant ? ` (${li.variant})` : ""}`);
    if (li.sku) L.push(`    SKU: ${li.sku}`);
    L.push(`    ${money(li.unitPrice)} each — ${money(li.lineTotal)}`);
  }
  L.push("");
  L.push(`TOTAL: ${pricing.totalText} (free shipping included)`);
  L.push("");
  L.push("No payment captured — arrange payment before shipping.");
  L.push("");
  L.push("-".repeat(46));
  L.push("SHIP TO");
  L.push("-".repeat(46));
  if (address.present) {
    address.lines.forEach((l) => L.push(l));
    if (address.notes) L.push(`Notes: ${address.notes}`);
  } else {
    L.push("!! NO ADDRESS CAPTURED — contact customer before processing.");
  }

  return L.join("\n");
}
