import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const orderData = await request.json();

    const { customer, package: pkg, suitMockup, glovesMockup, shoesMockup, shoeSize, colors, productType } = orderData;
    const productLabels = {
      "karting-suit": "Custom Karting Suit",
      "powerboat-suit": "Custom Power Boat Suit",
      "custom-shoes": "Custom Shoes",
    };
    const productLabel = productLabels[productType] || "Custom Race Suit";

    // Validate required fields
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json({ error: "Missing required customer information" }, { status: 400 });
    }

    if (!pkg) {
      return NextResponse.json({ error: "Missing package selection" }, { status: 400 });
    }

    // For shoes orders, validate shoe mockup; for others validate suit mockup
    if (productType === "custom-shoes" && !shoesMockup) {
      return NextResponse.json({ error: "Missing shoe design selection" }, { status: 400 });
    } else if (productType !== "custom-shoes" && !suitMockup) {
      return NextResponse.json({ error: "Missing suit design selection" }, { status: 400 });
    }

    // Build color summary
    const colorSummary = [
      colors?.primary ? `Primary: ${colors.primary.name} (${colors.primary.hex})` : null,
      colors?.secondary ? `Secondary: ${colors.secondary.name} (${colors.secondary.hex})` : null,
      colors?.accent ? `Accent: ${colors.accent.name} (${colors.accent.hex})` : null,
    ].filter(Boolean).join("\n    ");

    // ---- Email to HS Race Gear (internal) ----
    const internalEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">New ${productLabel} Order</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">A new ${productLabel.toLowerCase()} order has been submitted</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #f87171; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Customer Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${customer.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0; font-weight: 600;">${customer.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${customer.phone}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;">

        <h2 style="color: #f87171; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 140px;">Package</td><td style="padding: 8px 0; font-weight: 600;">${pkg.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Price</td><td style="padding: 8px 0; font-weight: 600; color: #dc2626;">$${pkg.price} USD</td></tr>
          ${suitMockup ? `<tr><td style="padding: 8px 0; color: #888;">Suit Design</td><td style="padding: 8px 0; font-weight: 600;">${suitMockup.name}</td></tr>` : ""}
          ${glovesMockup ? `<tr><td style="padding: 8px 0; color: #888;">Gloves Design</td><td style="padding: 8px 0; font-weight: 600;">${glovesMockup.name}</td></tr>` : ""}
          ${shoesMockup ? `<tr><td style="padding: 8px 0; color: #888;">Shoes Design</td><td style="padding: 8px 0; font-weight: 600;">${shoesMockup.name}</td></tr>` : ""}
          ${shoeSize ? `<tr><td style="padding: 8px 0; color: #888;">Shoe Size</td><td style="padding: 8px 0; font-weight: 600;">${shoeSize.label}</td></tr>` : ""}
        </table>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;">

        <h2 style="color: #f87171; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Selected Colors</h2>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${colors?.primary ? `<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 28px; height: 28px; border-radius: 6px; background: ${colors.primary.hex}; border: 1px solid rgba(255,255,255,0.2);"></div><span>Primary: ${colors.primary.name}</span></div>` : ""}
          ${colors?.secondary ? `<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 28px; height: 28px; border-radius: 6px; background: ${colors.secondary.hex}; border: 1px solid rgba(255,255,255,0.2);"></div><span>Secondary: ${colors.secondary.name}</span></div>` : ""}
          ${colors?.accent ? `<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 28px; height: 28px; border-radius: 6px; background: ${colors.accent.hex}; border: 1px solid rgba(255,255,255,0.2);"></div><span>Accent: ${colors.accent.name}</span></div>` : ""}
        </div>
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
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">Hi ${customer.name},</p>
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
          <p style="margin: 4px 0; color: #ccc;"><strong>${pkg.name}</strong></p>
          <p style="margin: 4px 0; color: #dc2626; font-size: 20px; font-weight: 800;">$${pkg.price} USD</p>
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
    // Configure transporter - uses env variables
    // Falls back gracefully if email env vars are not set
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const businessEmail = process.env.BUSINESS_EMAIL || "info@hsracegear.com";

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      // Send to business
      await transporter.sendMail({
        from: `"HS Race Gear Orders" <${smtpUser}>`,
        to: businessEmail,
        subject: `New ${productLabel} Order - ${customer.name} - ${pkg.name}`,
        html: internalEmailHtml,
      });

      // Send to customer
      await transporter.sendMail({
        from: `"HS Race Gear" <${smtpUser}>`,
        to: customer.email,
        subject: "Your Custom Order is Confirmed! | HS Race Gear",
        html: customerEmailHtml,
      });
    } else {
      // Log order if email is not configured
      console.log(`=== NEW ${productLabel.toUpperCase()} ORDER (Email not configured) ===`);
      console.log("Customer:", customer);
      console.log("Package:", pkg.name, "$" + pkg.price);
      if (suitMockup) console.log("Suit:", suitMockup.name);
      if (glovesMockup) console.log("Gloves:", glovesMockup.name);
      if (shoesMockup) console.log("Shoes:", shoesMockup.name);
      if (shoeSize) console.log("Shoe Size:", shoeSize.label);
      console.log("Colors:", colorSummary);
      console.log("================================================");
    }

    return NextResponse.json({ success: true, message: "Order submitted successfully" });
  } catch (error) {
    console.error("Custom order API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
