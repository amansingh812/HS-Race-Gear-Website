import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Custom order API.
 * Sends TWO emails:
 *   1. Internal notification → BUSINESS_EMAIL (default: info@hsracegear.com)
 *   2. Order confirmation → the customer
 *
 * Required env vars — see .env.example for the full list with GoDaddy
 * Titan Email settings (smtp.titan.email).
 *
 * If SMTP vars are missing, this route now returns HTTP 500 so the
 * frontend shows the error banner (rather than pretending to succeed —
 * previously orders were silently lost).
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

    const { customer, package: pkg, suitMockup, glovesMockup, shoesMockup, shoeSize, colors, productType } = orderData;
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
    // Human-readable, sortable, and short enough to read over the phone.
    // Format: HSRG-YYMMDD-XXXX  (XXXX = random base36, uppercase)
    const orderId = generateOrderId();

    // ---- Pricing ----
    const pricing = computePricing({ pkg, quantity: orderData.quantity });

    // ---- Shipping address ----
    // Not hard-required: existing in-flight orders and older clients may not
    // send it. Missing address is flagged prominently in the internal email
    // instead of rejecting a paying customer's order.
    const address = normaliseAddress(customer);

    const orderPlacedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    }) + " ET";

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
    });

    // ---- Email to Customer ----
    const customerEmailHtml = renderCustomerConfirmation({
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
    });

    const customerEmailText = renderCustomerConfirmationText({
      orderId,
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
    });

    // ---- Send Emails ----
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const businessEmail = process.env.BUSINESS_EMAIL || "info@hsracegear.com";

    // Fail loud if SMTP is missing — orders are business-critical and must
    // never be silently lost.
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("[/api/custom-order] SMTP env vars missing — CANNOT deliver order email.", {
        smtpHost: !!smtpHost,
        smtpUser: !!smtpUser,
        smtpPass: !!smtpPass,
        customer: customer?.email,
        productLabel,
      });
      return NextResponse.json(
        { error: "Order system is not fully configured. Please contact us directly at info@hsracegear.com or +1 (617) 319 6993 to place your order." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    // Verify SMTP creds first — no point building emails if auth fails
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error("[/api/custom-order] SMTP verify failed:", verifyErr?.message || verifyErr);
      return NextResponse.json(
        { error: "Order system authentication failed. Please contact us directly at info@hsracegear.com or +1 (617) 319 6993." },
        { status: 500 }
      );
    }

    // Send internal notification to info@hsracegear.com (BUSINESS_EMAIL)
    // Order ID leads the subject so the inbox sorts and searches cleanly.
    await transporter.sendMail({
      from: `"HS Race Gear Orders" <${smtpUser}>`,
      to: businessEmail,
      replyTo: customer.email, // replies go straight to the customer
      subject: `[${orderId}] New ${productLabel} — ${customer.name} — ${pricing.totalText}`,
      text: internalEmailText,
      html: internalEmailHtml,
    });

    // Send confirmation to customer
    await transporter.sendMail({
      from: `"HS Race Gear" <${smtpUser}>`,
      to: customer.email,
      replyTo: businessEmail,
      subject: `Order ${orderId} confirmed — thank you! | HS Race Gear`,
      text: customerEmailText,
      html: customerEmailHtml,
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
 * Customer order confirmation email
 *
 * Layout follows the editorial confirmation style Aman supplied as a
 * reference (Flamingo Estate): centred wordmark, oversized serif "THANK
 * YOU", short note, two CTAs, itemised order summary with a totals ledger,
 * then a dark footer with contact details.
 *
 * The reference used a deep-green palette; this is rebuilt around the
 * HS Race Gear red (#dc2626 primary, #8f1717 deep) on a warm blush ground.
 *
 * Email-client constraints observed throughout:
 *   - tables for all layout (no flex/grid — Outlook strips them)
 *   - inline styles only (no <style> blocks, no classes)
 *   - explicit widths, bgcolor attributes alongside CSS
 *   - web-safe fonts with serif stack for display type
 *   - no background-image dependency for anything load-bearing
 * ──────────────────────────────────────────────────────────────── */

const BRAND = {
  red: "#dc2626",          // primary
  redDeep: "#8f1717",      // headings / outlined button
  redDark: "#7a1212",      // footer ground
  blush: "#f7ebe7",        // page ground
  card: "#fffaf8",         // inner panels
  ink: "#2b1a17",          // body copy
  inkSoft: "#6f5а52",      // muted copy (fixed below)
  rule: "#e2cdc6",         // hairlines
  site: "https://www.hsracegear.com",
};
// Guard against a typo'd hex slipping into output.
BRAND.inkSoft = "#6f5a52";

/**
 * Admin / internal order notification → info@hsracegear.com
 *
 * Same editorial shell as the customer confirmation so the two read as one
 * system, but the content is reordered for operations rather than
 * reassurance:
 *   - headline is "NEW ORDER", not "THANK YOU"
 *   - customer contact sits near the top with tap-to-call / tap-to-email
 *   - a missing shipping address is called out loudly instead of glossed over
 *   - the action row is "email / call the customer", not a shop link
 *
 * Shares BRAND, renderColorRows(), normaliseColors() and money() with the
 * customer template so the two can't drift apart.
 */
function renderAdminNotification({
  orderId, orderPlacedAt, customer, productLabel, pkg, pricing,
  address, colors, suitMockup, glovesMockup, shoesMockup, shoeSize,
}) {
  const design = suitMockup?.name || glovesMockup?.name || shoesMockup?.name || "";
  const colourList = normaliseColors(colors);

  const specRows = [
    ["Product", productLabel],
    ["Package", pkg.name],
    ["Quantity", String(pricing.quantity)],
    design ? ["Design", design] : null,
    shoeSize?.label ? ["Shoe size", shoeSize.label] : null,
  ].filter(Boolean);

  const swatchStrip = colourList.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>${colourList
        .map(
          (c) => `<td style="padding:0 8px 0 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td width="22" height="22" bgcolor="${escapeHtml(c.hex || "#cccccc")}" style="width:22px; height:22px; border-radius:4px; border:1px solid ${BRAND.rule};">&nbsp;</td>
            </tr></table>
          </td>`
        )
        .join("")}</tr></table>
       <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px; border-collapse:collapse;">
         ${colourList
           .map(
             (c) => `<tr>
           <td style="padding:2px 12px 2px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; white-space:nowrap;">${escapeHtml(c.label)}</td>
           <td style="padding:2px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(c.name)}${c.hex ? ` <span style="font-weight:normal; color:${BRAND.inkSoft};">${escapeHtml(c.hex)}</span>` : ""}</td>
         </tr>`
           )
           .join("")}
       </table>`
    : `<div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.redDeep}; font-weight:bold;">⚠ No colours were selected on the form — confirm with the customer.</div>`;

  const addressBlock = address.present
    ? `<div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.75; color:${BRAND.ink};">
         ${escapeHtml(customer.name)}<br>${address.lines.map((l) => escapeHtml(l)).join("<br>")}
       </div>`
    : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff2f2; border-left:3px solid ${BRAND.red}; border-radius:3px;">
         <tr><td style="padding:14px 16px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.6; color:${BRAND.redDeep}; font-weight:bold;">
           ⚠ No shipping address submitted — follow up before production.
         </td></tr>
       </table>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(orderId)} — New ${escapeHtml(productLabel)}</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.blush}; -webkit-text-size-adjust:100%;">

<div style="display:none; font-size:1px; color:${BRAND.blush}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
  ${escapeHtml(customer.name)} · ${escapeHtml(pkg.name)} · ${escapeHtml(pricing.totalText)}${address.present ? "" : " · NO ADDRESS"}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.blush}" style="background:${BRAND.blush};">
  <tr>
    <td align="center" style="padding:0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;">

        <!-- ── HEADER ── -->
        <tr>
          <td style="padding:34px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left" valign="middle" style="font-family:Georgia,'Times New Roman',serif; font-size:19px; font-weight:bold; color:${BRAND.redDeep}; letter-spacing:1px;">
                  HS<span style="color:${BRAND.red};">·</span>RACE GEAR
                </td>
                <td align="right" valign="middle" style="font-family:Arial,Helvetica,sans-serif; font-size:10px; color:${BRAND.inkSoft}; letter-spacing:2.5px; line-height:1.6; text-transform:uppercase;">
                  Internal<br>Notification
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── NEW ORDER ── -->
        <tr>
          <td align="center" style="padding:38px 34px 0;">
            <div style="font-family:Georgia,'Times New Roman',serif; font-size:58px; line-height:0.94; color:${BRAND.redDeep}; letter-spacing:-1px;">
              NEW<br>ORDER
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:14px 34px 0;">
            <div style="display:inline-block; font-family:Arial,Helvetica,sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#fff; background:${BRAND.red}; padding:7px 16px; border-radius:3px;">
              ${escapeHtml(orderId)}
            </div>
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:10px;">
              ${escapeHtml(orderPlacedAt)}
            </div>
            <div style="font-family:Georgia,'Times New Roman',serif; font-size:26px; color:${BRAND.redDeep}; margin-top:16px;">
              ${escapeHtml(pricing.totalText)}
            </div>
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:4px;">
              ${escapeHtml(productLabel)}
            </div>
          </td>
        </tr>

        <tr><td style="padding:30px 34px 0;"><div style="border-top:1px solid ${BRAND.rule}; height:1px; line-height:1px;">&nbsp;</div></td></tr>

        <!-- ── CUSTOMER ── -->
        <tr>
          <td style="padding:26px 34px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2.5px; text-transform:uppercase; color:${BRAND.ink};">
              Customer
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.card}" style="background:${BRAND.card}; border:1px solid ${BRAND.rule}; border-radius:4px;">
              <tr>
                <td style="padding:18px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px;">
                    <tr>
                      <td width="80" style="padding:4px 12px 4px 0; color:${BRAND.inkSoft};">Name</td>
                      <td style="padding:4px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(customer.name)}</td>
                    </tr>
                    <tr>
                      <td width="80" style="padding:4px 12px 4px 0; color:${BRAND.inkSoft};">Email</td>
                      <td style="padding:4px 0;"><a href="mailto:${escapeHtml(customer.email)}?subject=${encodeURIComponent(`Your HS Race Gear order ${orderId}`)}" style="color:${BRAND.redDeep}; font-weight:bold; text-decoration:none;">${escapeHtml(customer.email)}</a></td>
                    </tr>
                    <tr>
                      <td width="80" style="padding:4px 12px 4px 0; color:${BRAND.inkSoft};">Phone</td>
                      <td style="padding:4px 0;"><a href="tel:${escapeHtml(String(customer.phone).replace(/[^0-9+]/g, ""))}" style="color:${BRAND.redDeep}; font-weight:bold; text-decoration:none;">${escapeHtml(customer.phone)}</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── SHIP TO ── -->
        <tr>
          <td style="padding:26px 34px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2.5px; text-transform:uppercase; color:${BRAND.ink}; margin-bottom:12px;">
              Ship To
            </div>
            ${addressBlock}
            ${address.notes ? `
            <div style="margin-top:16px; padding:14px 16px; background:#fff6f4; border-left:3px solid ${BRAND.red}; border-radius:3px;">
              <div style="font-family:Arial,Helvetica,sans-serif; font-size:10px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.redDeep}; margin-bottom:6px;">Delivery Notes From Customer</div>
              <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.6; color:${BRAND.ink};">${escapeHtml(address.notes).replace(/\n/g, "<br>")}</div>
            </div>` : ""}
          </td>
        </tr>

        <tr><td style="padding:26px 34px 0;"><div style="border-top:1px solid ${BRAND.rule}; height:1px; line-height:1px;">&nbsp;</div></td></tr>

        <!-- ── ORDER SPEC ── -->
        <tr>
          <td style="padding:26px 34px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2.5px; text-transform:uppercase; color:${BRAND.ink};">
              Build Spec
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.card}" style="background:${BRAND.card}; border:1px solid ${BRAND.rule}; border-radius:4px;">
              <tr>
                <td style="padding:18px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px;">
                    ${specRows
                      .map(
                        ([k, v]) => `<tr>
                      <td width="90" style="padding:4px 12px 4px 0; color:${BRAND.inkSoft}; white-space:nowrap;">${escapeHtml(k)}</td>
                      <td style="padding:4px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(v)}</td>
                    </tr>`
                      )
                      .join("")}
                  </table>

                  <div style="border-top:1px solid ${BRAND.rule}; margin:16px 0 0; height:1px; line-height:1px;">&nbsp;</div>

                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.ink}; margin:14px 0 10px;">
                    Colours
                  </div>
                  ${swatchStrip}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── PRICING LEDGER ── -->
        <tr>
          <td style="padding:24px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="45%">&nbsp;</td>
                <td>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px;">
                    <tr>
                      <td style="padding:5px 0; color:${BRAND.ink};">Subtotal</td>
                      <td align="right" style="padding:5px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(pricing.subtotalText)}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0; color:${BRAND.inkSoft};">Shipping</td>
                      <td align="right" style="padding:5px 0; color:${pricing.shipping === 0 ? BRAND.red : BRAND.ink}; font-weight:bold;">${pricing.shipping === 0 ? "FREE" : escapeHtml(money(pricing.shipping))}</td>
                    </tr>
                    <tr><td colspan="2" style="padding:8px 0 0;"><div style="border-top:1px solid ${BRAND.rule}; height:1px; line-height:1px;">&nbsp;</div></td></tr>
                    <tr>
                      <td style="padding:10px 0 0; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; color:${BRAND.ink};">Total</td>
                      <td align="right" style="padding:10px 0 0; font-size:17px; font-weight:bold; color:${BRAND.redDeep}; white-space:nowrap;">${escapeHtml(pricing.totalText)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft}; line-height:1.6; margin-top:14px;">
              Quote only — no payment captured. Confirm final pricing with the customer before production.
            </div>
          </td>
        </tr>

        <!-- ── ACTIONS ── -->
        <tr>
          <td align="center" style="padding:30px 34px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="${BRAND.red}" style="background:${BRAND.red}; border-radius:2px;">
                  <a href="mailto:${escapeHtml(customer.email)}?subject=${encodeURIComponent(`Your HS Race Gear order ${orderId}`)}" style="display:inline-block; padding:13px 34px; font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:#ffffff; text-decoration:none;">
                    Email ${escapeHtml(String(customer.name).split(" ")[0])}
                  </a>
                </td>
                <td width="12">&nbsp;</td>
                <td align="center" style="border:1px solid ${BRAND.redDeep}; border-radius:2px;">
                  <a href="tel:${escapeHtml(String(customer.phone).replace(/[^0-9+]/g, ""))}" style="display:inline-block; padding:13px 34px; font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.redDeep}; text-decoration:none;">
                    Call
                  </a>
                </td>
              </tr>
            </table>
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft}; margin-top:14px; line-height:1.6;">
              Replying to this email goes straight to the customer.
            </div>
          </td>
        </tr>

        <!-- ── NEXT STEP REMINDER ── -->
        <tr>
          <td style="padding:28px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.card}" style="background:${BRAND.card}; border:1px solid ${BRAND.rule}; border-radius:4px;">
              <tr>
                <td style="padding:18px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.7; color:${BRAND.ink};">
                  The customer has been told a designer will send a mockup
                  <strong>within 24 hours</strong>, and that measurements will be
                  confirmed before production.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="padding:30px 0 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.redDark}" style="background:${BRAND.redDark};">
              <tr>
                <td align="center" style="padding:26px 34px;">
                  <div style="font-family:Georgia,'Times New Roman',serif; font-size:16px; font-weight:bold; color:#ffffff; letter-spacing:2px;">
                    HS RACE GEAR
                  </div>
                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:rgba(255,255,255,0.6); margin-top:8px;">
                    Automated order notification · ${escapeHtml(orderId)}
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

/** Plain-text admin notification. */
function renderAdminNotificationText({
  orderId, orderPlacedAt, customer, productLabel, pkg, pricing,
  address, colors, suitMockup, glovesMockup, shoesMockup, shoeSize,
}) {
  const design = suitMockup?.name || glovesMockup?.name || shoesMockup?.name || "";
  const colourList = normaliseColors(colors);
  const L = [];

  L.push("NEW ORDER — HS RACE GEAR");
  L.push("=".repeat(46), "");
  L.push(`Order:   ${orderId}`);
  L.push(`Placed:  ${orderPlacedAt}`);
  L.push(`Total:   ${pricing.totalText}`);
  L.push(`Product: ${productLabel}`, "");
  L.push("-".repeat(46));
  L.push("CUSTOMER");
  L.push("-".repeat(46));
  L.push(`Name:  ${customer.name}`);
  L.push(`Email: ${customer.email}`);
  L.push(`Phone: ${customer.phone}`, "");
  L.push("-".repeat(46));
  L.push("SHIP TO");
  L.push("-".repeat(46));
  if (address.present) {
    L.push(customer.name, ...address.lines);
  } else {
    L.push("*** NO SHIPPING ADDRESS SUBMITTED ***");
    L.push("Follow up with the customer before production.");
  }
  if (address.notes) L.push("", `Delivery notes: ${address.notes}`);
  L.push("");
  L.push("-".repeat(46));
  L.push("BUILD SPEC");
  L.push("-".repeat(46));
  L.push(`Package:  ${pkg.name}`);
  L.push(`Quantity: ${pricing.quantity}`);
  if (design) L.push(`Design:   ${design}`);
  if (shoeSize?.label) L.push(`Shoe size: ${shoeSize.label}`);
  L.push("");
  L.push("Colours:");
  if (colourList.length) {
    colourList.forEach((c) => L.push(`  ${c.label}: ${c.name}${c.hex ? ` (${c.hex})` : ""}`));
  } else {
    L.push("  *** NONE SELECTED — confirm with customer ***");
  }
  L.push("");
  L.push("-".repeat(46));
  L.push("PRICING");
  L.push("-".repeat(46));
  L.push(`Subtotal: ${pricing.subtotalText}`);
  L.push(`Shipping: ${pricing.shipping === 0 ? "FREE" : money(pricing.shipping)}`);
  L.push(`TOTAL:    ${pricing.totalText}`);
  L.push("");
  L.push("Quote only — no payment captured.");
  L.push("");
  L.push("Replying to this email goes straight to the customer.");
  L.push("=".repeat(46));

  return L.join("\n");
}

function renderCustomerConfirmation({
  orderId, orderPlacedAt, customer, productLabel, pkg, pricing,
  address, colors, suitMockup, glovesMockup, shoesMockup, shoeSize,
}) {
  const design =
    suitMockup?.name || glovesMockup?.name || shoesMockup?.name || "";

  // Spec rows shown under the line item.
  const specRows = [
    design ? ["Design", design] : null,
    shoeSize?.label ? ["Size", shoeSize.label] : null,
  ].filter(Boolean);

  const colourList = normaliseColors(colors);

  const swatchStrip = colourList.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; margin-top:6px;"><tr>${colourList
        .map(
          (c) => `<td style="padding:0 6px 0 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td width="20" height="20" bgcolor="${escapeHtml(c.hex || "#cccccc")}" style="width:20px; height:20px; border-radius:4px; border:1px solid ${BRAND.rule};">&nbsp;</td>
            </tr></table>
          </td>`
        )
        .join("")}</tr></table>
       <div style="font-size:12px; color:${BRAND.inkSoft}; margin-top:8px; line-height:1.6;">
         ${colourList.map((c) => escapeHtml(c.name)).join(" &nbsp;·&nbsp; ")}
       </div>`
    : `<div style="font-size:13px; color:${BRAND.inkSoft};">No colours selected — we'll confirm with you.</div>`;

  const addressBlock = address.present
    ? address.lines.map((l) => escapeHtml(l)).join("<br>")
    : `We don't have a delivery address yet — reply to this email with it and we'll add it to your order.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Order ${escapeHtml(orderId)} — HS Race Gear</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.blush}; -webkit-text-size-adjust:100%;">

<!-- Preheader: shows in inbox preview, hidden in the body -->
<div style="display:none; font-size:1px; color:${BRAND.blush}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
  Order ${escapeHtml(orderId)} confirmed — your designer will be in touch within 24 hours with a mockup.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.blush}" style="background:${BRAND.blush};">
  <tr>
    <td align="center" style="padding:0;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;">

        <!-- ── HEADER ── -->
        <tr>
          <td style="padding:34px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left" valign="middle" style="font-family:Georgia,'Times New Roman',serif; font-size:19px; font-weight:bold; color:${BRAND.redDeep}; letter-spacing:1px;">
                  HS<span style="color:${BRAND.red};">·</span>RACE GEAR
                </td>
                <td align="right" valign="middle" style="font-family:Arial,Helvetica,sans-serif; font-size:10px; color:${BRAND.inkSoft}; letter-spacing:2.5px; line-height:1.6; text-transform:uppercase;">
                  Order<br>Confirmation
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── THANK YOU ── -->
        <tr>
          <td align="center" style="padding:40px 34px 8px;">
            <div style="font-family:Georgia,'Times New Roman',serif; font-size:62px; line-height:0.94; color:${BRAND.redDeep}; letter-spacing:-1px;">
              THANK<br>YOU
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:14px 34px 0;">
            <div style="display:inline-block; font-family:Arial,Helvetica,sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#fff; background:${BRAND.red}; padding:7px 16px; border-radius:3px;">
              Order ${escapeHtml(orderId)}
            </div>
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-top:10px;">
              ${escapeHtml(orderPlacedAt)}
            </div>
          </td>
        </tr>

        <!-- ── NOTE ── -->
        <tr>
          <td style="padding:34px 34px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.75; color:${BRAND.ink};">
            <p style="margin:0 0 14px;">Hi ${escapeHtml(customer.name)},</p>
            <p style="margin:0 0 14px;">
              Thanks for your order. A dedicated designer will email you
              <strong>within 24 hours</strong> with a digital mockup of your ${escapeHtml(productLabel.toLowerCase())}.
            </p>
            <p style="margin:0 0 14px;">
              <strong>Revisions are unlimited and free</strong> — nothing gets cut until you approve the mockup.
              Production then takes 2–3 weeks.
            </p>
            <p style="margin:0;">
              <strong>Please keep order ${escapeHtml(orderId)} handy</strong> — quote it on any email or call about this order.
            </p>
          </td>
        </tr>

        <!-- ── CTA ── -->
        <tr>
          <td align="center" style="padding:30px 34px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="${BRAND.red}" style="background:${BRAND.red}; border-radius:2px;">
                  <a href="${BRAND.site}/contact-us" style="display:inline-block; padding:13px 40px; font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:#ffffff; text-decoration:none;">
                    Questions? Contact Us
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="padding:34px 34px 0;"><div style="border-top:1px solid ${BRAND.rule}; height:1px; line-height:1px;">&nbsp;</div></td></tr>

        <!-- ── ORDER SUMMARY ── -->
        <tr>
          <td style="padding:26px 34px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2.5px; text-transform:uppercase; color:${BRAND.ink};">
              Order Summary
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.card}" style="background:${BRAND.card}; border:1px solid ${BRAND.rule}; border-radius:4px;">
              <tr>
                <td style="padding:18px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="top" style="font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:bold; color:${BRAND.ink}; line-height:1.5;">
                        ${escapeHtml(pkg.name)}
                        <span style="color:${BRAND.inkSoft}; font-weight:normal;">&nbsp;×&nbsp;${escapeHtml(String(pricing.quantity))}</span>
                        <div style="font-size:12px; font-weight:normal; color:${BRAND.inkSoft}; margin-top:4px;">${escapeHtml(productLabel)}</div>
                      </td>
                      <td valign="top" align="right" style="font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:bold; color:${BRAND.ink}; white-space:nowrap;">
                        ${escapeHtml(pricing.subtotalText)}
                      </td>
                    </tr>
                    ${specRows.length ? `
                    <tr>
                      <td colspan="2" style="padding-top:14px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                          ${specRows
                            .map(
                              ([k, v]) => `<tr>
                            <td style="padding:2px 14px 2px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; white-space:nowrap;">${escapeHtml(k)}</td>
                            <td style="padding:2px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(v)}</td>
                          </tr>`
                            )
                            .join("")}
                        </table>
                      </td>
                    </tr>` : ""}
                    <tr>
                      <td colspan="2" style="padding-top:14px;">
                        <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:${BRAND.inkSoft}; margin-bottom:2px;">Your colours</div>
                        ${swatchStrip}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── TOTALS LEDGER ── -->
        <tr>
          <td style="padding:20px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="45%">&nbsp;</td>
                <td>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px;">
                    <tr>
                      <td style="padding:5px 0; color:${BRAND.ink};">Subtotal</td>
                      <td align="right" style="padding:5px 0; color:${BRAND.ink}; font-weight:bold;">${escapeHtml(pricing.subtotalText)}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0; color:${BRAND.inkSoft};">Shipping</td>
                      <td align="right" style="padding:5px 0; color:${pricing.shipping === 0 ? BRAND.red : BRAND.ink}; font-weight:bold;">
                        ${pricing.shipping === 0 ? "FREE" : escapeHtml(money(pricing.shipping))}
                      </td>
                    </tr>
                    <tr><td colspan="2" style="padding:8px 0 0;"><div style="border-top:1px solid ${BRAND.rule}; height:1px; line-height:1px;">&nbsp;</div></td></tr>
                    <tr>
                      <td style="padding:10px 0 0; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; color:${BRAND.ink};">Total</td>
                      <td align="right" style="padding:10px 0 0; font-size:17px; font-weight:bold; color:${BRAND.redDeep}; white-space:nowrap;">
                        ${escapeHtml(pricing.totalText)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:${BRAND.inkSoft}; line-height:1.6; margin-top:14px;">
              This is your order confirmation, not a receipt — no payment has been taken yet.
              Your designer will confirm final pricing with you before production begins.
            </div>
          </td>
        </tr>

        <tr><td style="padding:26px 34px 0;"><div style="border-top:1px solid ${BRAND.rule}; height:1px; line-height:1px;">&nbsp;</div></td></tr>

        <!-- ── DELIVERY ── -->
        <tr>
          <td style="padding:26px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="top" width="50%" style="padding-right:12px;">
                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.ink}; margin-bottom:10px;">Ship To</div>
                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.7; color:${BRAND.ink};">
                    ${escapeHtml(customer.name)}<br>${addressBlock}
                  </div>
                </td>
                <td valign="top" width="50%" style="padding-left:12px;">
                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.ink}; margin-bottom:10px;">Contact</div>
                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.7; color:${BRAND.ink};">
                    ${escapeHtml(customer.email)}<br>${escapeHtml(customer.phone)}
                  </div>
                </td>
              </tr>
            </table>
            ${address.notes ? `
            <div style="margin-top:18px; padding:14px 16px; background:#fff6f4; border-left:3px solid ${BRAND.red}; border-radius:3px;">
              <div style="font-family:Arial,Helvetica,sans-serif; font-size:10px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.redDeep}; margin-bottom:6px;">Your Delivery Notes</div>
              <div style="font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.6; color:${BRAND.ink};">${escapeHtml(address.notes).replace(/\n/g, "<br>")}</div>
            </div>` : ""}
          </td>
        </tr>

        <!-- ── WHAT HAPPENS NEXT ── -->
        <tr>
          <td style="padding:30px 34px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.card}" style="background:${BRAND.card}; border:1px solid ${BRAND.rule}; border-radius:4px;">
              <tr>
                <td style="padding:20px;">
                  <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${BRAND.ink}; margin-bottom:14px;">What Happens Next</div>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; font-size:13px; color:${BRAND.ink};">
                    <tr>
                      <td valign="top" width="26" style="padding:0 0 10px; color:${BRAND.red}; font-weight:bold;">1</td>
                      <td valign="top" style="padding:0 0 10px; line-height:1.6;"><strong>Mockup</strong> — your designer emails a digital proof within 24 hours.</td>
                    </tr>
                    <tr>
                      <td valign="top" width="26" style="padding:0 0 10px; color:${BRAND.red}; font-weight:bold;">2</td>
                      <td valign="top" style="padding:0 0 10px; line-height:1.6;"><strong>Revisions</strong> — unlimited and free. Nothing is cut until you approve.</td>
                    </tr>
                    <tr>
                      <td valign="top" width="26" style="padding:0 0 10px; color:${BRAND.red}; font-weight:bold;">3</td>
                      <td valign="top" style="padding:0 0 10px; line-height:1.6;"><strong>Measurements</strong> — we'll confirm your sizing before production.</td>
                    </tr>
                    <tr>
                      <td valign="top" width="26" style="padding:0 0 10px; color:${BRAND.red}; font-weight:bold;">4</td>
                      <td valign="top" style="padding:0 0 10px; line-height:1.6;"><strong>Production &amp; QC</strong> — 2–3 weeks.</td>
                    </tr>
                    <tr>
                      <td valign="top" width="26" style="padding:0; color:${BRAND.red}; font-weight:bold;">5</td>
                      <td valign="top" style="padding:0; line-height:1.6;"><strong>Ship</strong> — tracking sent to ${escapeHtml(customer.email)}.</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:26px 34px 34px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.7; color:${BRAND.inkSoft};">
            Spotted a mistake? Reply to this email before you approve your mockup and we'll fix it — no charge, no fuss.
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td bgcolor="${BRAND.redDark}" style="background:${BRAND.redDark}; padding:34px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="font-family:Georgia,'Times New Roman',serif; font-size:18px; font-weight:bold; color:#ffffff; letter-spacing:2px;">
                  HS RACE GEAR
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:6px; font-family:Arial,Helvetica,sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.65);">
                  Custom SFI-Certified Racewear
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:20px;">
                  <div style="border-top:1px solid rgba(255,255,255,0.18); height:1px; line-height:1px;">&nbsp;</div>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:18px; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:1.8; color:rgba(255,255,255,0.8);">
                  59 Kondazian St, Watertown, MA 02472<br>
                  <a href="tel:+16173196993" style="color:#ffffff; text-decoration:none;">+1 (617) 319 6993</a>
                  &nbsp;·&nbsp;
                  <a href="mailto:info@hsracegear.com" style="color:#ffffff; text-decoration:none;">info@hsracegear.com</a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:16px; font-family:Arial,Helvetica,sans-serif; font-size:11px; color:rgba(255,255,255,0.5);">
                  You received this email because you placed order ${escapeHtml(orderId)} at hsracegear.com
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

/**
 * Plain-text alternative. Worth sending: improves spam scores and covers
 * text-only clients and screen readers.
 */
function renderCustomerConfirmationText({
  orderId, customer, productLabel, pkg, pricing, address, colors,
  suitMockup, glovesMockup, shoesMockup, shoeSize,
}) {
  const design = suitMockup?.name || glovesMockup?.name || shoesMockup?.name || "";
  const colourList = normaliseColors(colors);
  const L = [];

  L.push("HS RACE GEAR — ORDER CONFIRMATION");
  L.push("=".repeat(46), "");
  L.push(`THANK YOU, ${customer.name.toUpperCase()}`, "");
  L.push(`Order reference: ${orderId}`);
  L.push("Please quote this on any email or call about your order.", "");
  L.push(`A designer will email you within 24 hours with a digital mockup of your ${productLabel.toLowerCase()}.`);
  L.push("Revisions are unlimited and free — nothing is cut until you approve.", "");
  L.push("-".repeat(46));
  L.push("ORDER SUMMARY");
  L.push("-".repeat(46));
  L.push(`${pkg.name} x ${pricing.quantity}`);
  L.push(`Product: ${productLabel}`);
  if (design) L.push(`Design: ${design}`);
  if (shoeSize?.label) L.push(`Size: ${shoeSize.label}`);
  L.push(
    `Colours: ${colourList.length ? colourList.map((c) => `${c.name}${c.hex ? ` (${c.hex})` : ""}`).join(", ") : "none selected"}`
  );
  L.push("");
  L.push(`Subtotal:  ${pricing.subtotalText}`);
  L.push(`Shipping:  ${pricing.shipping === 0 ? "FREE" : money(pricing.shipping)}`);
  L.push(`TOTAL:     ${pricing.totalText}`);
  L.push("");
  L.push("This is an order confirmation, not a receipt — no payment has been");
  L.push("taken. Final pricing is confirmed before production.", "");
  L.push("-".repeat(46));
  L.push("SHIP TO");
  L.push("-".repeat(46));
  L.push(customer.name);
  if (address.present) L.push(...address.lines);
  else L.push("(no address on file — reply with your delivery address)");
  if (address.notes) L.push("", `Delivery notes: ${address.notes}`);
  L.push("");
  L.push(`Contact: ${customer.email} / ${customer.phone}`, "");
  L.push("-".repeat(46));
  L.push("WHAT HAPPENS NEXT");
  L.push("-".repeat(46));
  L.push("1. Mockup — digital proof within 24 hours");
  L.push("2. Revisions — unlimited and free");
  L.push("3. Measurements — confirmed before production");
  L.push("4. Production & QC — 2-3 weeks");
  L.push(`5. Ship — tracking sent to ${customer.email}`);
  L.push("");
  L.push("Spotted a mistake? Reply to this email before approving your mockup.", "");
  L.push("=".repeat(46));
  L.push("HS Race Gear · 59 Kondazian St, Watertown, MA 02472");
  L.push("+1 (617) 319 6993 · info@hsracegear.com");
  L.push("https://www.hsracegear.com");

  return L.join("\n");
}

/**
 * Generate a human-readable order reference.
 * Format: HSRG-260726-K4P2
 *   - sortable by date
 *   - short enough to read out over the phone
 *   - random suffix avoids collisions within the same day
 */
function generateOrderId() {
  const d = new Date();
  const yy = String(d.getUTCFullYear()).slice(-2);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  // Avoid ambiguous characters (0/O, 1/I) so references survive being
  // handwritten or read aloud.
  const ALPHABET = "ACDEFGHJKLMNPQRTUVWXY2346789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `HSRG-${yy}${mm}${dd}-${suffix}`;
}

/** Format a number as USD for display in emails. */
function money(n) {
  const v = Number.isFinite(Number(n)) ? Number(n) : 0;
  return `$${v.toFixed(2)}`;
}

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
 * Pull the shipping address out of the customer payload into a predictable
 * shape, and pre-render single-line and multi-line versions for emails.
 */
function normaliseAddress(customer) {
  const get = (k) => String(customer?.[k] || "").trim();

  const line1 = get("addressLine1");
  const line2 = get("addressLine2");
  const city = get("city");
  const state = get("state");
  const postalCode = get("postalCode");
  const country = get("country");
  const notes = get("notes");

  const present = Boolean(line1 || city || postalCode);

  // "City, ST 02472" — omit separators for missing parts.
  const cityLine = [city, [state, postalCode].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");

  const lines = [line1, line2, cityLine, country].filter(Boolean);

  return {
    present,
    line1,
    line2,
    city,
    state,
    postalCode,
    country,
    notes,
    lines,
    oneLine: lines.join(", "),
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
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
