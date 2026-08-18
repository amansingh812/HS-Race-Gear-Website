import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { measurementSteps } from "@/data/measurementSteps";

/**
 * How to Measure form API (/custom-fit).
 *
 * WHY THIS EXISTS
 * The form on /custom-fit never submitted anywhere. Its handleSubmit did:
 *
 *     console.log("Measurements:", measurements);
 *     console.log("Additional Info:", additionalInfo);
 *     setFormSubmitted(true);
 *
 * — it showed the customer a success screen and threw the data away. Every
 * measurement submission since the page launched was lost. This route is the
 * missing backend.
 *
 * Sends TWO emails, same pattern as /api/contact:
 *   1. Internal notification -> BUSINESS_EMAIL (default info@hsracegear.com),
 *      with the full measurement table, replyTo set to the customer.
 *   2. Confirmation to the customer, including their own measurements so they
 *      have a record of what they sent.
 *
 * Required env vars (.env.local + Vercel project settings):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   BUSINESS_EMAIL (optional — defaults to info@hsracegear.com)
 */

const LABELS = Object.fromEntries(
  measurementSteps.map((s) => [s.id, s.label.replace(/^Point [A-Z]\.\s*/, "")])
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { measurements = {}, totalHeight, weight, name, email, phone, notes, unit } = body;

    // ── Validation. Returns WHICH fields are missing so the UI can point at
    //    them, rather than the old generic "fill in everything" alert. ──────
    const missing = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!totalHeight) missing.push("totalHeight");
    if (!weight) missing.push("weight");
    for (const step of measurementSteps) {
      const v = measurements[step.id];
      if (v === undefined || v === null || String(v).trim() === "") missing.push(step.id);
    }

    if (missing.length) {
      return NextResponse.json(
        { error: "Some required fields are missing.", missing },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address", missing: ["email"] }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const businessEmail = process.env.BUSINESS_EMAIL || "info@hsracegear.com";

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("[/api/measurement-form] SMTP env vars missing — cannot send.", {
        smtpHost: !!smtpHost,
        smtpUser: !!smtpUser,
        smtpPass: !!smtpPass,
      });
      return NextResponse.json(
        { error: "Email service is not configured. Please email your measurements to info@hsracegear.com." },
        { status: 500 }
      );
    }

    const unitLabel = unit === "cm" ? "cm" : "in";

    const measurementRows = measurementSteps
      .map(
        (s) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #222;color:#888;width:44px;">${escapeHtml(s.id)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #222;color:#d1d5db;">${escapeHtml(LABELS[s.id] || s.id)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #222;font-weight:700;color:#fff;text-align:right;white-space:nowrap;">${escapeHtml(measurements[s.id])} ${unitLabel}</td>
        </tr>`
      )
      .join("");

    const measurementTable = `
      <table style="width:100%;border-collapse:collapse;background:rgba(255,255,255,0.04);border-radius:8px;overflow:hidden;">
        <thead>
          <tr>
            <th style="padding:10px 12px;text-align:left;color:#f87171;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Pt</th>
            <th style="padding:10px 12px;text-align:left;color:#f87171;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Measurement</th>
            <th style="padding:10px 12px;text-align:right;color:#f87171;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Value</th>
          </tr>
        </thead>
        <tbody>${measurementRows}</tbody>
      </table>`;

    const internalHtml = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#dc2626,#991b1b);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:24px;font-weight:800;text-transform:uppercase;">New Measurement Form</h1>
        <p style="margin:8px 0 0;opacity:0.9;font-size:14px;">Submitted via the How to Measure page</p>
      </div>
      <div style="padding:32px;">
        <h2 style="color:#f87171;font-size:13px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;">Customer</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;width:110px;">Name</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${escapeHtml(email)}" style="color:#f87171;">${escapeHtml(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;font-weight:600;"><a href="tel:${escapeHtml(phone)}" style="color:#f87171;">${escapeHtml(phone)}</a></td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#888;">Height</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(totalHeight)}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Weight</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(weight)}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Units</td><td style="padding:8px 0;font-weight:600;">${unitLabel === "cm" ? "Centimetres" : "Inches"}</td></tr>
        </table>

        <h2 style="color:#f87171;font-size:13px;text-transform:uppercase;letter-spacing:2px;margin:28px 0 12px;">Measurements</h2>
        ${measurementTable}

        ${
          notes
            ? `<h2 style="color:#f87171;font-size:13px;text-transform:uppercase;letter-spacing:2px;margin:28px 0 12px;">Additional Notes</h2>
               <p style="color:#d1d5db;line-height:1.7;background:rgba(255,255,255,0.05);border-radius:8px;padding:16px;margin:0;">${escapeHtml(notes).replace(/\n/g, "<br>")}</p>`
            : ""
        }

        <hr style="border:none;border-top:1px solid #222;margin:24px 0;">
        <p style="color:#666;font-size:12px;margin:0;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
      </div>
    </div>`;

    const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#dc2626,#991b1b);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:24px;font-weight:800;text-transform:uppercase;">Measurements Received</h1>
        <p style="margin:8px 0 0;opacity:0.9;font-size:14px;">HS Race Gear — we'll be in touch shortly</p>
      </div>
      <div style="padding:32px;">
        <p style="font-size:16px;line-height:1.7;color:#d1d5db;">Hi ${escapeHtml(name)},</p>
        <p style="font-size:16px;line-height:1.7;color:#d1d5db;">
          Thanks for sending your measurements. Our team will review them and get back to you
          <strong style="color:#fff;">within 24 hours</strong> to confirm your fit and next steps.
        </p>
        <p style="font-size:14px;color:#888;line-height:1.6;">Here's a copy of what you sent, for your records:</p>
        ${measurementTable}
        <p style="font-size:14px;color:#888;line-height:1.6;margin-top:24px;">
          Spotted a mistake? Just reply to this email with the corrected number — no need to fill the form in again.
        </p>
        <p style="font-size:14px;color:#888;line-height:1.6;">
          Questions? Call <a href="tel:+16173196993" style="color:#f87171;">+1 (617) 319 6993</a> or email
          <a href="mailto:info@hsracegear.com" style="color:#f87171;">info@hsracegear.com</a>.
        </p>
        <p style="font-size:14px;color:#888;margin-top:24px;">— The HS Race Gear Team</p>
      </div>
    </div>`;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error("[/api/measurement-form] SMTP verify failed:", verifyErr?.message || verifyErr);
      return NextResponse.json(
        { error: "Email service authentication failed. Please email your measurements to info@hsracegear.com." },
        { status: 500 }
      );
    }

    // Internal notification first — if this one fails the customer should see
    // an error, because losing the measurements is the whole problem we're
    // fixing here.
    await transporter.sendMail({
      from: `"HS Race Gear Website" <${smtpUser}>`,
      to: businessEmail,
      replyTo: email,
      subject: `New Measurement Form — ${name}`,
      html: internalHtml,
    });

    // Customer confirmation. Deliberately non-fatal: if the business copy has
    // already gone through, the submission succeeded from the customer's point
    // of view and we shouldn't show them an error.
    try {
      await transporter.sendMail({
        from: `"HS Race Gear" <${smtpUser}>`,
        to: email,
        replyTo: businessEmail,
        subject: "We received your measurements | HS Race Gear",
        html: customerHtml,
      });
    } catch (confirmErr) {
      console.error("[/api/measurement-form] Customer confirmation failed (submission still succeeded):", confirmErr?.message || confirmErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/measurement-form] Uncaught error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please email your measurements to info@hsracegear.com." },
      { status: 500 }
    );
  }
}

// Minimal HTML escape to avoid injection in the rendered email
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
