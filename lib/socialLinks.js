/**
 * Single source of truth for HS Race Gear social profile URLs.
 *
 * These were previously hardcoded in each component that rendered them, which
 * is how they drifted: Footer3 had the real profiles while the /contact-us
 * page still pointed at instagram.com / facebook.com / tiktok.com — the
 * platform homepages, not HS Race Gear. Anyone clicking "Follow Us" on the
 * contact page landed on a generic feed.
 *
 * Import from here rather than pasting a URL into a component, so a handle
 * change only ever needs one edit.
 *
 * Verified against the live footer links on 2026-08-01.
 */

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/hsracegear/",
  facebook: "https://www.facebook.com/profile.php?id=61580765382460",
  tiktok: "https://www.tiktok.com/@hsracipk5hl",
};

/** Ordered list for rendering follow rows. */
export const SOCIAL_PROFILES = [
  { key: "instagram", label: "Instagram", url: SOCIAL_LINKS.instagram },
  { key: "facebook", label: "Facebook", url: SOCIAL_LINKS.facebook },
  { key: "tiktok", label: "TikTok", url: SOCIAL_LINKS.tiktok },
];

/**
 * sameAs array for Organization / LocalBusiness JSON-LD.
 * Google uses this to connect the site to its social profiles in the
 * Knowledge Graph — worth including on the homepage schema.
 */
export const SOCIAL_SAME_AS = SOCIAL_PROFILES.map((p) => p.url);
