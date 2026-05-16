import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const businessEmail = process.env.BUSINESS_EMAIL || "hsracegear@gmail.com";

    const confirmHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">You're On The List!</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">HS Race Gear Newsletter</p>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">
          Thanks for subscribing to the HS Race Gear newsletter! You'll be the first to hear about exclusive deals, new product launches, and racing tips.
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 24px;">
          Questions? Call us at <a href="tel:+16173196993" style="color: #f87171;">+1 (617) 319 6993</a> or visit <a href="https://www.hsracegear.com" style="color: #f87171;">hsracegear.com</a>.
        </p>
        <p style="font-size: 14px; color: #555; margin-top: 24px;">— The HS Race Gear Team</p>
      </div>
    </div>`;

    const notifyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700;">New Newsletter Subscriber</h1>
      </div>
      <div style="padding: 24px;">
        <p style="color: #d1d5db;"><strong>Email:</strong> ${email}</p>
        <p style="color: #888; font-size: 13px;">Subscribed via hsracegear.com newsletter form</p>
      </div>
    </div>`;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      // Confirm to subscriber
      await transporter.sendMail({
        from: `"HS Race Gear" <${smtpUser}>`,
        to: email,
        subject: "You're subscribed to HS Race Gear updates!",
        html: confirmHtml,
      });

      // Notify business
      await transporter.sendMail({
        from: `"HS Race Gear Website" <${smtpUser}>`,
        to: businessEmail,
        subject: `New Newsletter Subscriber: ${email}`,
        html: notifyHtml,
      });
    } else {
      console.log("=== NEW NEWSLETTER SUBSCRIBER (Email not configured) ===");
      console.log("Email:", email);
      console.log("=======================================================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
