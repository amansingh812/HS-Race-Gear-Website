/**
 * Find duplicate custom-order leads — READ ONLY by default.
 *
 * Why these exist: until 2026-09-29 the order API saved the order first and
 * then sent the notification, and any problem after the save returned a 500.
 * A request that did all its work but was killed before responding showed the
 * customer "there was a problem submitting your order" for an order that had
 * in fact been created. People pressed submit again. Both orders saved, both
 * notification emails went out — which is exactly how HSRG-260928-JVMV and
 * HSRG-260928-KHL6 (Jerod Candelaria, 3:41am and 3:42am) came to exist.
 *
 * New submissions carry an idempotency key and can no longer duplicate this
 * way. This script is for cleaning up what the old behaviour already created.
 *
 * Usage (run locally — the CI sandbox has no route to Atlas):
 *   node scripts/find-duplicate-leads.mjs
 *   node scripts/find-duplicate-leads.mjs --window 30     # minutes, default 15
 *   node scripts/find-duplicate-leads.mjs --months 6
 *   node scripts/find-duplicate-leads.mjs --cancel        # WRITES: see below
 *
 * --cancel does NOT delete anything. It keeps the earliest order in each
 * group and sets the later ones to status "cancelled" with a note explaining
 * why, so the history stays auditable and your order counts stop being
 * inflated. Nothing is written without that flag.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i > -1 ? parseInt(args[i + 1], 10) || fallback : fallback;
};
const WINDOW_MIN = flag("window", 15);
const MONTHS = flag("months", 12);
const DO_CANCEL = args.includes("--cancel");

const since = new Date();
since.setMonth(since.getMonth() - MONTHS);

const money = (cents) => `$${((cents || 0) / 100).toFixed(2)}`;
const pad = (s, n) => String(s).padEnd(n);

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error("✗ MONGODB_URI missing from .env.local");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const Order = (await import("../models/Order.js")).default;

  const orders = await Order.find({ placedAt: { $gte: since } })
    .select("orderNumber placedAt createdAt total status customer guestEmail items customerNotes")
    .sort({ placedAt: 1, createdAt: 1 })
    .lean();

  // Group by customer email + order total. Same person, same money, minutes
  // apart is a retry — a genuine second order of the identical package within
  // a quarter of an hour is vanishingly rare, and quantity would be used.
  const groups = new Map();
  for (const o of orders) {
    const email = (o.customer?.email || o.guestEmail || "").toLowerCase().trim();
    if (!email) continue;
    const key = `${email}|${o.total}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...o, _when: o.placedAt || o.createdAt });
  }

  // Within each group, split into clusters that fall inside the time window.
  const clusters = [];
  for (const [key, list] of groups) {
    list.sort((a, b) => new Date(a._when) - new Date(b._when));
    let current = [list[0]];
    for (let i = 1; i < list.length; i++) {
      const gapMin = (new Date(list[i]._when) - new Date(current[current.length - 1]._when)) / 60000;
      if (gapMin <= WINDOW_MIN) {
        current.push(list[i]);
      } else {
        if (current.length > 1) clusters.push({ key, orders: current });
        current = [list[i]];
      }
    }
    if (current.length > 1) clusters.push({ key, orders: current });
  }

  console.log("");
  console.log("═".repeat(76));
  console.log(`  DUPLICATE LEAD CHECK — last ${MONTHS} months, ${WINDOW_MIN}-minute window`);
  console.log("═".repeat(76));

  if (!clusters.length) {
    console.log(`\n  No duplicates found across ${orders.length} orders.\n`);
    await mongoose.disconnect();
    return;
  }

  let extra = 0;
  let inflated = 0;

  for (const { orders: grp } of clusters) {
    const [keep, ...dupes] = grp;
    extra += dupes.length;
    inflated += dupes.reduce((a, b) => a + (b.total || 0), 0);

    console.log(`\n  ${keep.customer?.name || "—"}  <${keep.customer?.email || keep.guestEmail}>`);
    console.log(`  ${pad("KEEP   " + keep.orderNumber, 34)} ${new Date(keep._when).toISOString().replace("T", " ").slice(0, 19)}  ${money(keep.total)}  [${keep.status}]`);
    for (const d of dupes) {
      const gapMin = ((new Date(d._when) - new Date(keep._when)) / 60000).toFixed(1);
      console.log(`  ${pad("DUPE   " + d.orderNumber, 34)} ${new Date(d._when).toISOString().replace("T", " ").slice(0, 19)}  ${money(d.total)}  [${d.status}]  +${gapMin} min`);
    }
  }

  console.log("\n" + "─".repeat(76));
  console.log(`  ${clusters.length} duplicate group(s) · ${extra} extra order(s) · ${money(inflated)} of inflated pipeline`);
  console.log("─".repeat(76));

  if (!DO_CANCEL) {
    console.log("\n  Read-only. Re-run with --cancel to mark the later orders cancelled");
    console.log("  (the earliest in each group is always kept, nothing is deleted).\n");
    await mongoose.disconnect();
    return;
  }

  // ---- Write path ----
  console.log("\n  Cancelling duplicates…\n");
  let done = 0;
  for (const { orders: grp } of clusters) {
    const [keep, ...dupes] = grp;
    for (const d of dupes) {
      if (d.status === "cancelled") continue;
      await Order.updateOne(
        { _id: d._id },
        {
          $set: { status: "cancelled" },
          $push: {
            statusHistory: {
              status: "cancelled",
              note: `Duplicate submission — superseded by ${keep.orderNumber}. Created by the pre-2026-09-29 retry bug.`,
            },
          },
        }
      );
      console.log(`  cancelled ${d.orderNumber} (kept ${keep.orderNumber})`);
      done++;
    }
  }
  console.log(`\n  ${done} order(s) cancelled. Nothing was deleted.\n`);

  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error("✗ Failed:", e.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
