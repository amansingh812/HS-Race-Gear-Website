import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const businessEmail = process.env.BUSINESS_EMAIL || "hsracegear@gmail.com";

    const internalEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">New Contact Enquiry</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Someone submitted the contact form on hsracegear.com</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #f87171; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Sender Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 100px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${email}" style="color: #f87171;">${email}</a></td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;">
        <h2 style="color: #f87171; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Message</h2>
        <p style="color: #d1d5db; line-height: 1.7; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
      </div>
    </div>`;

    const customerEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">Message Received!</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">HS Race Gear — We'll be in touch soon</p>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">Hi ${name},</p>
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">
          Thank you for reaching out to HS Race Gear! We've received your message and will get back to you
          <strong style="color: #fff;">within 24 hours</strong>.
        </p>
        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #f87171; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Your Message</h3>
          <p style="color: #ccc; line-height: 1.7; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
        <p style="font-size: 14px; color: #888; line-height: 1.6;">
          Need an urgent response? Call us at <a href="tel:+16173196993" style="color: #f87171;">+1 (617) 319 6993</a> or email us directly at
          <a href="mailto:hsracegear@gmail.com" style="color: #f87171;">hsracegear@gmail.com</a>.
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 24px;">— The HS Race Gear Team</p>
      </div>
    </div>`;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"HS Race Gear Website" <${smtpUser}>`,
        to: businessEmail,
        replyTo: email,
        subject: `New Contact Enquiry from ${name}`,
        html: internalEmailHtml,
      });

      await transporter.sendMail({
        from: `"HS Race Gear" <${smtpUser}>`,
        to: email,
        subject: "We received your message | HS Race Gear",
        html: customerEmailHtml,
      });
    } else {
      console.log("=== NEW CONTACT ENQUIRY (Email not configured) ===");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);
      console.log("==================================================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
