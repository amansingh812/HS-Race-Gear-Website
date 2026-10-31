/**
 * Next.js custom image loader — serves every <Image> through Cloudinary
 * instead of Vercel's image optimizer.
 *
 * Why: on 2026-10 the Vercel Hobby plan hit its Image Optimization limit
 * (5.3K / 5K transformations) and optimized images started coming back empty
 * in production. Cloudinary does the resizing / AVIF / WebP conversion instead,
 * so Vercel performs zero transformations.
 *
 * Two delivery modes, chosen by NEXT_PUBLIC_CLOUDINARY_MODE:
 *
 *   "fetch"  (default) — Cloudinary pulls the original from this site on first
 *            request and caches the result. Needs no upload, so it works the
 *            moment the loader ships.
 *   "upload" — images were copied into Cloudinary by
 *            scripts/upload-images-to-cloudinary.mjs and are served straight
 *            from there. Faster, and Cloudinary never touches this origin.
 *
 * Anything that is not under /images/ (static imports in /_next/, or remote
 * URLs) always uses fetch mode. Images already hosted on res.cloudinary.com
 * just get the transformations injected.
 */
import { toPublicId, isUploadedPath } from "./cloudinaryPath.mjs";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const MODE = process.env.NEXT_PUBLIC_CLOUDINARY_MODE === "upload" ? "upload" : "fetch";
const ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.hsracegear.com").replace(/\/$/, "");

export default function cloudinaryLoader({ src, width }) {
  // Local dev, or Cloudinary not configured: serve the file as-is. The ?w
  // query is ignored by the static server; it only keeps Next's dev check
  // ("loader must use width") quiet.
  if (!CLOUD || process.env.NODE_ENV === "development") {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  }

  // f_auto = AVIF/WebP/JPEG per browser, q_auto = smart quality,
  // c_limit = never upscale past the original.
  const t = `f_auto,q_auto,c_limit,w_${width}`;
  const base = `https://res.cloudinary.com/${CLOUD}/image`;

  // Absolute URL
  if (/^https?:\/\//i.test(src)) {
    if (/^https?:\/\/res\.cloudinary\.com\//i.test(src) && src.includes("/upload/")) {
      return src.replace("/upload/", `/upload/${t}/`);
    }
    return `${base}/fetch/${t}/${encodeURI(src)}`;
  }

  // Site-relative path
  if (MODE === "upload" && isUploadedPath(src)) {
    return `${base}/upload/${t}/${toPublicId(src)}`;
  }
  return `${base}/fetch/${t}/${encodeURI(ORIGIN + src)}`;
}
