/**
 * Shared by the Next image loader (lib/cloudinaryLoader.js) and the upload
 * script (scripts/upload-images-to-cloudinary.mjs). Both MUST derive the same
 * Cloudinary public_id from a site path, so the logic lives in one place.
 *
 *   /images/home/hs_hero_2.png  ->  hsracegear/images/home/hs_hero_2_png
 *
 * Why the extension becomes a suffix instead of being dropped: the repo has
 * pairs like hs_hero_2.png + hs_hero_2.webp. Dropping the extension would make
 * them collide on one public_id. Turning "." into "_" keeps every file unique
 * and avoids Cloudinary treating a dotted public_id as a format request.
 */
export const CLOUDINARY_FOLDER = "hsracegear";

export function toPublicId(sitePath) {
  const clean = String(sitePath).split("?")[0].split("#")[0].replace(/^\/+/, "");
  const safe = clean
    .split("/")
    .map((seg) => seg.replace(/[^A-Za-z0-9_-]/g, "_"))
    .join("/");
  return `${CLOUDINARY_FOLDER}/${safe}`;
}

/** Only paths under /images/ were uploaded; everything else uses fetch mode. */
export function isUploadedPath(sitePath) {
  return /^\/images\//.test(sitePath) && !/\.(svg|mp4|glb|gltf|webm)(\?|$)/i.test(sitePath);
}
