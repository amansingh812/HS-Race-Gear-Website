#!/usr/bin/env node
/**
 * fix-product-specs.mjs — fill in missing Racing Specifications on products.
 *
 * WHY THIS EXISTS
 * The product detail page renders the "Racing Specifications" block only when
 * at least one of certification / certificationLevel / construction is set:
 *
 *   {(product.certification || product.certificationLevel || product.construction) && ( ... )}
 *
 * That code is fine — the block is missing on some products purely because
 * those fields were left blank when the product was created. The admin form
 * (components/admin/ProductForm.jsx) can set them; this script just does it in
 * bulk so you don't have to click through every product.
 *
 * SAFETY
 *  - Dry run by default. Nothing is written unless you pass --apply.
 *  - Only fills fields that are currently empty. Existing values are never
 *    overwritten, so re-running it is harmless.
 *  - Values are validated against the enums in models/Product.js before any
 *    write, so a typo fails loudly instead of silently writing bad data.
 *
 * USAGE
 *   node scripts/fix-product-specs.mjs            # report what's missing
 *   node scripts/fix-product-specs.mjs --apply    # write the fixes
 *
 * Run from the project root, with .env.local present.
 */

import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const APPLY = process.argv.includes("--apply");

// ── Valid values, mirrored from models/Product.js ────────────────────────────
const VALID_CERT = [
  "SFI 3.2A/1",
  "SFI 3.2A/5",
  "SFI 3.2A/15",
  "FIA 8856-2000",
  "FIA 8856-2018",
];
const VALID_LEVEL = ["SFI-1", "SFI-5", "SFI-15", "FIA Level 1", "FIA Level 2"];

// ── EDIT THIS MAP ────────────────────────────────────────────────────────────
// Only `hs-volt-sfi-race-suit` is confirmed from the client's note (SFI 3.2A/5,
// one-piece double-layer). Add the other slugs once you've confirmed what each
// suit actually is — do NOT guess, a wrong SFI rating on a product page is a
// safety-claim problem, not just an SEO one.
const SPECS = {
  "hs-volt-sfi-race-suit": {
    certification: "SFI 3.2A/5",
    certificationLevel: "SFI-5",
    construction: "One-piece double-layer",
  },

  // Uncomment and correct once verified against the actual product:
  // "hs-vortex-sfi-race-suit": {
  //   certification: "SFI 3.2A/1",
  //   certificationLevel: "SFI-1",
  //   construction: "One-piece single-layer",
  // },
  // "hs-velocity-sfi-race-suit": { ... },
  // "hs-vector-sfi-race-suit":   { ... },
};

// ── Load MONGODB_URI from .env.local ─────────────────────────────────────────
function readUri() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    throw new Error(".env.local not found — run this from the project root.");
  }
  const m = fs.readFileSync(envPath, "utf8").match(/MONGODB_URI\s*=\s*"?([^"\n]+)"?/);
  if (!m) throw new Error("MONGODB_URI not found in .env.local");
  return m[1].trim();
}

function validate() {
  const errors = [];
  for (const [slug, s] of Object.entries(SPECS)) {
    if (s.certification && !VALID_CERT.includes(s.certification)) {
      errors.push(`${slug}: certification "${s.certification}" is not one of ${VALID_CERT.join(", ")}`);
    }
    if (s.certificationLevel && !VALID_LEVEL.includes(s.certificationLevel)) {
      errors.push(`${slug}: certificationLevel "${s.certificationLevel}" is not one of ${VALID_LEVEL.join(", ")}`);
    }
  }
  if (errors.length) {
    console.error("\nInvalid values — nothing was written:\n");
    errors.forEach((e) => console.error("  " + e));
    process.exit(1);
  }
}

async function main() {
  validate();

  await mongoose.connect(readUri(), { serverSelectionTimeoutMS: 10000 });
  const Product = mongoose.connection.collection("products");

  // 1. Report every product missing specs, whether or not it's in SPECS.
  const missing = await Product.find(
    {
      $and: [
        { $or: [{ certification: null }, { certification: "" }, { certification: { $exists: false } }] },
        { $or: [{ certificationLevel: null }, { certificationLevel: "" }, { certificationLevel: { $exists: false } }] },
        { $or: [{ construction: null }, { construction: "" }, { construction: { $exists: false } }] },
      ],
    },
    { projection: { slug: 1, name: 1, status: 1 } }
  ).toArray();

  console.log(`\nProducts with NO racing specifications at all: ${missing.length}`);
  missing.forEach((p) => {
    const known = SPECS[p.slug] ? "  <- will be fixed" : "  <- not in SPECS map, add it";
    console.log(`  ${p.slug}  (${p.status})${known}`);
  });

  // 2. Apply the mapped fixes.
  console.log(`\n${APPLY ? "APPLYING" : "DRY RUN"} — ${Object.keys(SPECS).length} slug(s) mapped\n`);

  let changed = 0;
  for (const [slug, spec] of Object.entries(SPECS)) {
    const doc = await Product.findOne({ slug });
    if (!doc) {
      console.log(`  SKIP  ${slug} — no product with that slug`);
      continue;
    }

    // Only fill blanks. Never overwrite a value someone deliberately set.
    const update = {};
    for (const [field, value] of Object.entries(spec)) {
      const current = doc[field];
      if (current === null || current === undefined || current === "") {
        update[field] = value;
      }
    }

    if (!Object.keys(update).length) {
      console.log(`  OK    ${slug} — already has specs, nothing to do`);
      continue;
    }

    console.log(`  FIX   ${slug}`);
    Object.entries(update).forEach(([k, v]) => console.log(`          ${k}: ${v}`));

    if (APPLY) {
      await Product.updateOne({ slug }, { $set: { ...update, updatedAt: new Date() } });
    }
    changed++;
  }

  console.log(
    `\n${changed} product(s) ${APPLY ? "updated." : "would be updated. Re-run with --apply to write."}\n`
  );

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("\nFailed:", err.message);
  process.exit(1);
});
