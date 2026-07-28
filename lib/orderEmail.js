import nodemailer from "nodemailer";

/**
 * Shared order-email primitives.
 *
 * Two order paths exist on this site and both email the customer AND
 * info@hsracegear.com using the same editorial template:
 *
 *   1. /api/custom-order  — made-to-measure gear (measurement form → quote)
 *   2. /api/shop-enquiry  — off-the-rack cart checkout
 *
 * Neither captures payment. The team confirms the order and arranges payment
 * directly, so these are order confirmations, not receipts. Everything that
 * both routes need to agree on lives here so the two can't drift apart —
 * previously the palette and the order-ID format were defined twice.
 *
 * Email-client constraints that apply to anything rendered with these:
 *   - tables for all layout (no flex/grid — Outlook strips them)
 *   - inline styles only (no <style> blocks, no classes)
 *   - explicit widths, bgcolor attributes alongside CSS
 *   - web-safe fonts, serif stack for display type
 *   - no background-image dependency for anything load-bearing
 */

/**
 * HS Race Gear palette.
 *
 * Built around the brand red on a warm blush ground, adapted from the
 * editorial confirmation layout Aman supplied as a reference (which used a
 * deep green — replaced here with red throughout).
 */
export const BRAND = {
  red: "#dc2626",          // primary
  redDeep: "#8f1717",      // headings / outlined button
  redDark: "#7a1212",      // footer ground
  blush: "#f7ebe7",        // page ground
  card: "#fffaf8",         // inner panels
  ink: "#2b1a17",          // body copy
  inkSoft: "#6f5a52",      // muted copy
  rule: "#e2cdc6",         // hairlines
  site: "https://www.hsracegear.com",
};

export const CONTACT = {
  email: "info@hsracegear.com",
  phone: "+1 (617) 319-6993",
  phoneHref: "+16173196993",
  address: "59 Kondazian St, Watertown, MA 02472, USA",
};

/** Minimal HTML escape to prevent injection in rendered email. */
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Format a number as USD for display in emails. */
export function money(n) {
  const v = Number.isFinite(Number(n)) ? Number(n) : 0;
  return `$${v.toFixed(2)}`;
}

/**
 * Generate a human-readable order reference.
 * Format: HSRG-260726-K4P2
 *   - sortable by date
 *   - short enough to read out over the phone
 *   - random suffix avoids collisions within the same day
 */
export function generateOrderId() {
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

/** Timestamp shown in both emails, always in the shop's local timezone. */
export function formatPlacedAt(date = new Date()) {
  return (
    date.toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    }) + " ET"
  );
}

/**
 * Pull the shipping address out of a customer payload into a predictable
 * shape, and pre-render single-line and multi-line versions for emails.
 *
 * Accepts either the custom-order field names (addressLine1/postalCode) or
 * the cart checkout's (address/zipcode), since the two forms were built at
 * different times and use different keys.
 */
export function normaliseAddress(customer) {
  const get = (...keys) => {
    for (const k of keys) {
      const v = String(customer?.[k] || "").trim();
      if (v) return v;
    }
    return "";
  };

  const line1 = get("addressLine1", "address", "address1");
  const line2 = get("addressLine2", "apartment", "address2");
  const city = get("city");
  const state = get("state");
  const postalCode = get("postalCode", "zipcode", "zipCode");
  const country = get("country");
  const notes = get("notes", "orderNotes", "customerNotes");

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
 * Build and verify an SMTP transport from env.
 *
 * Returns { ok: false, error } rather than throwing, so routes can return a
 * clean 500 with a contact fallback. Orders are business-critical and must
 * never be silently dropped — an earlier version of the contact form failed
 * open and lost enquiries, which is what this guards against.
 */
export async function getTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const businessEmail = process.env.BUSINESS_EMAIL || CONTACT.email;

  const contactFallback = `Please contact us directly at ${CONTACT.email} or ${CONTACT.phone} to place your order.`;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("[orderEmail] SMTP env vars missing — CANNOT deliver order email.", {
      smtpHost: !!smtpHost,
      smtpUser: !!smtpUser,
      smtpPass: !!smtpPass,
    });
    return {
      ok: false,
      error: `Order system is not fully configured. ${contactFallback}`,
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  // Verify creds up front — no point building emails if auth will fail.
  try {
    await transporter.verify();
  } catch (verifyErr) {
    console.error("[orderEmail] SMTP verify failed:", verifyErr?.message || verifyErr);
    return {
      ok: false,
      error: `Order system authentication failed. ${contactFallback}`,
    };
  }

  return { ok: true, transporter, smtpUser, businessEmail };
}
