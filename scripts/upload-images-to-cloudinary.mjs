/**
 * Copy public/images/** into Cloudinary so images are served from there.
 *
 * Safe to re-run: uploads use overwrite=false, so files already in Cloudinary
 * are skipped. Nothing in the repo is modified or deleted.
 *
 * Usage (needs CLOUDINARY_* in .env.local):
 *   node scripts/upload-images-to-cloudinary.mjs --dry-run     # list only
 *   node scripts/upload-images-to-cloudinary.mjs               # upload all
 *   node scripts/upload-images-to-cloudinary.mjs --concurrency 8
 *   node scripts/upload-images-to-cloudinary.mjs --only images/home
 *
 * public_id mapping lives in lib/cloudinaryPath.mjs and is shared with the
 * Next image loader, so what is uploaded here is exactly what the loader asks for.
 * SVG / video / 3D files are skipped (served from the site as before).
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { toPublicId } from "../lib/cloudinaryPath.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
dotenv.config({ path: path.join(ROOT, ".env.local") });

const { CLOUDINARY_CLOUD_NAME: CLOUD, CLOUDINARY_API_KEY: KEY, CLOUDINARY_API_SECRET: SECRET } = process.env;
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const arg = (n, d) => { const i = args.indexOf(`--${n}`); return i > -1 ? args[i + 1] : d; };
const CONCURRENCY = parseInt(arg("concurrency", "6"), 10);
const ONLY = arg("only", "");
const EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);
const MAX_BYTES = 10 * 1024 * 1024; // Cloudinary free-plan image limit

if (!DRY && !(CLOUD && KEY && SECRET)) {
  console.error("✗ CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET missing from .env.local");
  process.exit(1);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

async function upload(file) {
  const rel = "/" + path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");
  const public_id = toPublicId(rel);
  const timestamp = Math.floor(Date.now() / 1000);
  // Signature: alphabetical params, no file/api_key, + secret
  const toSign = `overwrite=false&public_id=${public_id}&timestamp=${timestamp}`;
  const signature = crypto.createHash("sha1").update(toSign + SECRET).digest("hex");

  const form = new FormData();
  form.append("file", new Blob([fs.readFileSync(file)]), path.basename(file));
  form.append("public_id", public_id);
  form.append("overwrite", "false");
  form.append("timestamp", String(timestamp));
  form.append("api_key", KEY);
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: form });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error?.message || `HTTP ${res.status}`);
  return { rel, public_id, existing: json.existing === true };
}

async function main() {
  const files = walk(path.join(ROOT, "public/images"))
    .filter((f) => EXTS.has(path.extname(f).toLowerCase()))
    .filter((f) => !ONLY || f.split(path.sep).join("/").includes(ONLY));
  const tooBig = files.filter((f) => fs.statSync(f).size > MAX_BYTES);
  const queue = files.filter((f) => !tooBig.includes(f));

  console.log(`\n${queue.length} image(s) to upload${tooBig.length ? `, ${tooBig.length} skipped (>10MB)` : ""}${DRY ? "  [dry run]" : ""}`);
  if (DRY) {
    queue.slice(0, 15).forEach((f) => console.log("  ", toPublicId("/" + path.relative(path.join(ROOT, "public"), f).split(path.sep).join("/"))));
    if (queue.length > 15) console.log(`   … and ${queue.length - 15} more`);
    return;
  }

  let done = 0, added = 0, skipped = 0;
  const failed = [];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const f = queue.shift();
      try {
        const r = await upload(f);
        r.existing ? skipped++ : added++;
      } catch (e) {
        failed.push(`${path.relative(ROOT, f)} — ${e.message}`);
      }
      if (++done % 25 === 0) console.log(`  ${done} processed…`);
    }
  });
  await Promise.all(workers);

  console.log(`\n✓ uploaded ${added}, already there ${skipped}, failed ${failed.length}`);
  failed.forEach((l) => console.log("  ✗ " + l));
  if (failed.length) process.exitCode = 1;
}

main();
