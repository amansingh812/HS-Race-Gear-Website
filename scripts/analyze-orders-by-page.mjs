/**
 * Revenue / lead analysis by product line — READ ONLY.
 *
 * Answers gap E2 in docs/seo/open-gaps.md: "every recommendation optimizes
 * for clicks with zero visibility into revenue."
 *
 * Run locally (the CI sandbox has no network route to Atlas):
 *   node scripts/analyze-orders-by-page.mjs
 *   node scripts/analyze-orders-by-page.mjs --months 6
 *   node scripts/analyze-orders-by-page.mjs --csv > docs/seo/orders-by-page.csv
 *
 * ── READ THIS BEFORE TRUSTING THE NUMBERS ────────────────────────────────
 * Two distinct things live in the Orders collection and they must not be
 * added together:
 *
 *   LEADS  — custom gear. No payment is taken at submit time. `total` is a
 *            QUOTED value, not money received. payment.status = "pending".
 *   SALES  — shop orders paid through Stripe. payment.status = "captured".
 *
 * Also note the attribution ceiling: orders record a `productType`, which
 * identifies the ORDER PAGE, not the marketing page that earned the visit.
 * All 13 discipline landers (/custom-drag-racing-suit, /custom-sprint-car-suit,
 * and the rest) funnel into /custom-race-suit/order and therefore collapse
 * into a single "custom-race-suit" bucket. This script cannot tell you which
 * lander earned the order because that data was never captured. See
 * scripts/README-attribution.md.
 * ─────────────────────────────────────────────────────────────────────────
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

// ---- args ----
const args = process.argv.slice(2);
const asCsv = args.includes("--csv");
const monthsArg = args.indexOf("--months");
const MONTHS = monthsArg > -1 ? parseInt(args[monthsArg + 1], 10) || 12 : 12;

const since = new Date();
since.setMonth(since.getMonth() - MONTHS);

// Order page each productType corresponds to, for readability in the report.
const PAGE_BY_TYPE = {
  "custom-race-suit": "/custom-race-suit/order",
  "karting-suit": "/custom-karting-suit/order",
  "powerboat-suit": "/custom-powerboat-suit/order",
  "custom-gloves": "/custom-gloves/order",
  "custom-shoes": "/custom-shoes/order",
};

const money = (cents) =>
  `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);

function productTypeOf(order) {
  // Preferred: the JSON blob the custom order pages stash in customerNotes.
  if (order.customerNotes) {
    try {
      const parsed = JSON.parse(order.customerNotes);
      if (parsed?.productType) return parsed.productType;
    } catch {
      /* shop orders put plain text here — fall through */
    }
  }
  // Fallback: the slug written into the item snapshot.
  const slug = order.items?.[0]?.productSnapshot?.slug;
  if (slug && PAGE_BY_TYPE[slug]) return slug;
  return null;
}

function packageIdOf(order) {
  if (!order.customerNotes) return null;
  try {
    return JSON.parse(order.customerNotes)?.packageId || null;
  } catch {
    return null;
  }
}

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error("✗ MONGODB_URI missing from .env.local");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const Order = (await import("../models/Order.js")).default;

  const orders = await Order.find({ placedAt: { $gte: since } })
    .select("orderNumber placedAt createdAt total status payment items customerNotes hasCustomFit customLogoUrl customLogoUrls attribution customer notificationStatus notificationError")
    .lean();

  // placedAt may be unset on older records — fall back to createdAt.
  const rows = orders.map((o) => ({
    ...o,
    _when: o.placedAt || o.createdAt,
    _type: productTypeOf(o),
    _pkg: packageIdOf(o),
    _isLead: o.payment?.status !== "captured",
  }));

  const leads = rows.filter((r) => r._isLead && r._type);
  const sales = rows.filter((r) => !r._isLead);
  const shopLeads = rows.filter((r) => r._isLead && !r._type);

  // ---------- CSV mode ----------
  if (asCsv) {
    console.log("orderNumber,date,kind,productType,orderPage,packageId,status,paymentStatus,valueUSD,logoCount");
    for (const r of rows) {
      const logos = r.customLogoUrls?.length || (r.customLogoUrl ? 1 : 0);
      console.log(
        [
          r.orderNumber,
          r._when ? new Date(r._when).toISOString().slice(0, 10) : "",
          r._isLead ? "lead" : "sale",
          r._type || "shop",
          PAGE_BY_TYPE[r._type] || "/shop",
          r._pkg || "",
          r.status,
          r.payment?.status || "",
          ((r.total || 0) / 100).toFixed(2),
          logos,
        ].join(",")
      );
    }
    await mongoose.disconnect();
    return;
  }

  // ---------- Report mode ----------
  const W = 78;
  const line = (c = "─") => console.log(c.repeat(W));

  console.log("");
  line("═");
  console.log(`  HS RACE GEAR — ORDERS BY PRODUCT LINE`);
  console.log(`  Window: last ${MONTHS} months (since ${since.toISOString().slice(0, 10)})`);
  line("═");

  if (!rows.length) {
    console.log("\n  No orders in this window. Try a wider --months value.\n");
    await mongoose.disconnect();
    return;
  }

  // ===== 1. Custom leads by order page =====
  console.log(`\n  CUSTOM LEADS — quoted value, NOT money received (${leads.length} total)\n`);
  console.log(
    "  " + pad("Order page", 34) + padL("Leads", 7) + padL("Quoted", 12) + padL("Avg", 10) + padL("Share", 8)
  );
  line();

  const byType = {};
  for (const l of leads) {
    byType[l._type] ||= { n: 0, value: 0 };
    byType[l._type].n++;
    byType[l._type].value += l.total || 0;
  }

  const totalLeadValue = Object.values(byType).reduce((a, b) => a + b.value, 0) || 1;
  const sorted = Object.entries(byType).sort((a, b) => b[1].n - a[1].n);

  for (const [type, s] of sorted) {
    console.log(
      "  " +
        pad(PAGE_BY_TYPE[type] || type, 34) +
        padL(s.n, 7) +
        padL(money(s.value), 12) +
        padL(money(s.value / s.n), 10) +
        padL(((s.value / totalLeadValue) * 100).toFixed(0) + "%", 8)
    );
  }
  line();
  console.log(
    "  " + pad("TOTAL", 34) + padL(leads.length, 7) + padL(money(totalLeadValue), 12)
  );

  // ===== 2. Lead → paid conversion =====
  console.log(`\n\n  LEAD → PAID CONVERSION\n`);
  const statusCounts = {};
  for (const r of rows.filter((x) => x._type)) {
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
  }
  const customTotal = rows.filter((x) => x._type).length;
  for (const [st, n] of Object.entries(statusCounts).sort((a, b) => b[1] - a[1])) {
    console.log(
      "  " + pad(st, 34) + padL(n, 7) + padL(((n / customTotal) * 100).toFixed(0) + "%", 12)
    );
  }
  const paid = rows.filter((x) => x._type && !x._isLead).length;
  console.log(
    `\n  ${paid} of ${customTotal} custom orders reached captured payment ` +
      `(${customTotal ? ((paid / customTotal) * 100).toFixed(1) : 0}%).`
  );
  console.log("  This is the number that should drive SEO priority, not lead count.");

  // ===== 3. Monthly trend =====
  console.log(`\n\n  MONTHLY — custom leads\n`);
  const byMonth = {};
  for (const l of leads) {
    if (!l._when) continue;
    const k = new Date(l._when).toISOString().slice(0, 7);
    byMonth[k] ||= { n: 0, value: 0 };
    byMonth[k].n++;
    byMonth[k].value += l.total || 0;
  }
  const maxN = Math.max(1, ...Object.values(byMonth).map((m) => m.n));
  for (const [m, s] of Object.entries(byMonth).sort()) {
    const bar = "█".repeat(Math.max(1, Math.round((s.n / maxN) * 28)));
    console.log("  " + pad(m, 10) + padL(s.n, 4) + "  " + pad(bar, 30) + padL(money(s.value), 10));
  }

  // ===== 4. Top packages =====
  console.log(`\n\n  TOP PACKAGES CHOSEN\n`);
  const byPkg = {};
  for (const l of leads) {
    if (!l._pkg) continue;
    byPkg[l._pkg] ||= { n: 0, value: 0 };
    byPkg[l._pkg].n++;
    byPkg[l._pkg].value += l.total || 0;
  }
  const topPkgs = Object.entries(byPkg).sort((a, b) => b[1].n - a[1].n).slice(0, 10);
  if (!topPkgs.length) console.log("  (no packageId recorded)");
  for (const [p, s] of topPkgs) {
    console.log("  " + pad(p, 40) + padL(s.n, 6) + padL(money(s.value), 12));
  }

  // ===== 4b. TRUE landing-page attribution =====
  // Only populated for orders placed after 2026-09-24. This is the section
  // that eventually replaces the product-line proxy above — it credits the
  // page that earned the visit rather than the form that was submitted.
  const attributed = rows.filter((r) => r.attribution?.landingPage);
  console.log(`\n\n  LANDING PAGE THAT EARNED THE ORDER\n`);
  if (!attributed.length) {
    console.log("  No attributed orders yet — capture went live 2026-09-24.");
    console.log("  Until orders accumulate, use the product-line table above as a proxy.");
  } else {
    const byLanding = {};
    for (const r of attributed) {
      const k = r.attribution.landingPage;
      byLanding[k] ||= { n: 0, value: 0 };
      byLanding[k].n++;
      byLanding[k].value += r.total || 0;
    }
    console.log("  " + pad("Landing page", 42) + padL("Orders", 8) + padL("Value", 12));
    line();
    for (const [p, s] of Object.entries(byLanding).sort((a, b) => b[1].n - a[1].n)) {
      console.log("  " + pad(p, 42) + padL(s.n, 8) + padL(money(s.value), 12));
    }

    const bySource = {};
    for (const r of attributed) {
      const a = r.attribution;
      let src = a.utm_source || "direct/unknown";
      if (!a.utm_source && a.referrer) {
        try {
          src = new URL(a.referrer).hostname.replace(/^www\./, "");
        } catch {
          /* keep default */
        }
      }
      bySource[src] = (bySource[src] || 0) + 1;
    }
    console.log(`\n  By source\n`);
    for (const [s, n] of Object.entries(bySource).sort((a, b) => b[1] - a[1])) {
      console.log("  " + pad(s, 42) + padL(n, 8));
    }
    console.log(
      `\n  ${attributed.length} of ${rows.length} orders carry attribution ` +
        `(${((attributed.length / rows.length) * 100).toFixed(0)}%).`
    );
  }

  // ===== 5. Shop sales =====
  if (sales.length) {
    console.log(`\n\n  SHOP SALES — actually captured (${sales.length})\n`);
    const shopTotal = sales.reduce((a, b) => a + (b.total || 0), 0);
    console.log("  " + pad("Captured revenue", 34) + padL(money(shopTotal), 12));
    console.log("  " + pad("Average order", 34) + padL(money(shopTotal / sales.length), 12));
  }
  if (shopLeads.length) {
    console.log(`\n  (${shopLeads.length} non-custom orders without captured payment — abandoned or pending.)`);
  }

  // ===== 5b. Leads nobody was emailed about =====
  // Email failure stopped failing the customer's request on 2026-09-28, so
  // these would otherwise be invisible — a real lead sitting in the database
  // that never reached anyone's inbox. Printed last and loudly on purpose.
  const undelivered = rows.filter((r) => r.notificationStatus === "failed");
  if (undelivered.length) {
    console.log("\n");
    line("═");
    console.log(`  ⚠  ${undelivered.length} LEAD(S) SAVED BUT NEVER EMAILED — CONTACT THESE BY HAND`);
    line("═");
    for (const r of undelivered) {
      const when = r._when ? new Date(r._when).toISOString().slice(0, 10) : "—";
      console.log(`  ${r.orderNumber}  ${when}  ${r.customer?.name || "—"}`);
      console.log(`      ${r.customer?.email || "—"}  ${r.customer?.phone || "—"}`);
      if (r.notificationError) console.log(`      reason: ${r.notificationError}`);
    }
  }

  // ===== 6. Caveats =====
  console.log("\n");
  line("═");
  console.log("  READ THE NUMBERS WITH THESE IN MIND");
  line("═");
  console.log("  1. Custom 'Quoted' is what the configurator priced, not money banked.");
  console.log("     Use the conversion section for anything revenue-related.");
  console.log("  2. /custom-race-suit/order absorbs ALL 13 discipline landers, so its");
  console.log("     bucket cannot be credited to any single SEO page.");
  console.log("  3. No referrer or UTM is stored, so organic vs paid vs direct is");
  console.log("     unknowable for past orders. Cross-reference GA4 for that.");
  console.log("");

  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error("✗ Failed:", e.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
