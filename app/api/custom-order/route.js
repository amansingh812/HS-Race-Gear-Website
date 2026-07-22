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

    // ---- Email to HS Race Gear (internal) ----
    const internalEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">New ${escapeHtml(productLabel)} Order</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">A new ${escapeHtml(productLabel.toLowerCase())} order has been submitted</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #f87171; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Customer Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(customer.name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${escapeHtml(customer.email)}" style="color: #f87171;">${escapeHtml(customer.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${escapeHtml(customer.phone)}" style="color: #f87171;">${escapeHtml(customer.phone)}</a></td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;">

        <h2 style="color: #f87171; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 140px;">Package</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(pkg.name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Price</td><td style="padding: 8px 0; font-weight: 600; color: #dc2626;">$${escapeHtml(String(pkg.price))} USD</td></tr>
          ${suitMockup ? `<tr><td style="padding: 8px 0; color: #888;">Suit Design</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(suitMockup.name)}</td></tr>` : ""}
          ${glovesMockup ? `<tr><td style="padding: 8px 0; color: #888;">Gloves Design</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(glovesMockup.name)}</td></tr>` : ""}
          ${shoesMockup ? `<tr><td style="padding: 8px 0; color: #888;">Shoes Design</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(shoesMockup.name)}</td></tr>` : ""}
          ${shoeSize ? `<tr><td style="padding: 8px 0; color: #888;">Shoe Size</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(shoeSize.label)}</td></tr>` : ""}
        </table>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;">

        <h2 style="color: #f87171; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Selected Colors</h2>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${colors?.primary ? `<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 28px; height: 28px; border-radius: 6px; background: ${escapeHtml(colors.primary.hex)}; border: 1px solid rgba(255,255,255,0.2);"></div><span>Primary: ${escapeHtml(colors.primary.name)}</span></div>` : ""}
          ${colors?.secondary ? `<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 28px; height: 28px; border-radius: 6px; background: ${escapeHtml(colors.secondary.hex)}; border: 1px solid rgba(255,255,255,0.2);"></div><span>Secondary: ${escapeHtml(colors.secondary.name)}</span></div>` : ""}
          ${colors?.accent ? `<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 28px; height: 28px; border-radius: 6px; background: ${escapeHtml(colors.accent.hex)}; border: 1px solid rgba(255,255,255,0.2);"></div><span>Accent: ${escapeHtml(colors.accent.name)}</span></div>` : ""}
        </div>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;">
        <p style="color: #666; font-size: 12px; margin: 0;">Reply to this email to respond directly to ${escapeHtml(customer.name)}.</p>
      </div>
    </div>`;

    // ---- Email to Customer ----
    const customerEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">Order Received!</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">HS Race Gear Custom Order Confirmation</p>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">Hi ${escapeHtml(customer.name)},</p>
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">
          Thank you for placing your custom order with HS Race Gear! We've received your selections and a
          <strong style="color: #fff;">dedicated designer will contact you within 24 hours</strong>
          with a mockup of your product.
        </p>
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">
          From there, our designer will work with you to finalize every detail before production begins.
        </p>

        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #f87171; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Your Order</h3>
          <p style="margin: 4px 0; color: #ccc;"><strong>${escapeHtml(pkg.name)}</strong></p>
          <p style="margin: 4px 0; color: #dc2626; font-size: 20px; font-weight: 800;">$${escapeHtml(String(pkg.price))} USD</p>
        </div>

        <p style="font-size: 14px; color: #888; line-height: 1.6;">
          If you have any questions in the meantime, feel free to reply to this email or contact us at
          <a href="mailto:info@hsracegear.com" style="color: #f87171;">info@hsracegear.com</a>.
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 24px;">
          — The HS Race Gear Team
        </p>
      </div>
    </div>`;

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
    await transporter.sendMail({
      from: `"HS Race Gear Orders" <${smtpUser}>`,
      to: businessEmail,
      replyTo: customer.email, // replies go straight to the customer
      subject: `New ${productLabel} Order - ${customer.name} - ${pkg.name}`,
      html: internalEmailHtml,
    });

    // Send confirmation to customer
    await transporter.sendMail({
      from: `"HS Race Gear" <${smtpUser}>`,
      to: customer.email,
      replyTo: businessEmail,
      subject: "Your Custom Order is Confirmed! | HS Race Gear",
      html: customerEmailHtml,
    });

    return NextResponse.json({ success: true, message: "Order submitted successfully" });
  } catch (error) {
    console.error("[/api/custom-order] Uncaught error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please contact us at info@hsracegear.com or +1 (617) 319 6993 to complete your order." },
      { status: 500 }
    );
  }
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
