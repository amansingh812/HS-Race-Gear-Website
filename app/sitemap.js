import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

/**
 * Dynamic sitemap for HS Race Gear.
 *
 * Next.js 15 sitemap.js supports the `images` property on each URL entry —
 * emitting <image:image> tags per the Google image sitemap protocol. Added
 * 2026-07-09 so product images (hoodies, shirts, off-the-rack suits) appear
 * in Google Images.
 */

export default async function sitemap() {
  const baseUrl = "https://www.hsracegear.com";
  const now = new Date().toISOString();

  // Static pages used to report lastModified = "now", i.e. a different date on
  // every request. Google learns to ignore lastmod from sites whose dates are
  // always "today", which weakens crawl prioritisation for exactly the pages we
  // most want re-crawled. Keep this fixed and BUMP IT when static page content
  // genuinely changes (products already report their real updatedAt).
  const STATIC_LASTMOD = "2026-10-31T00:00:00.000Z";

  // Static Pages
  const staticPages = [
    { url: baseUrl,                                   lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/about-us`,                     lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact-us`,                   lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/custom-race-suit`,             lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/custom-karting-suit`,          lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/custom-powerboat-suit`,        lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/custom-gloves`,                lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/custom-shoes`,                 lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.8 },
    // Discipline landing pages — added 2026-06-30 for buyer-intent search capture
    { url: `${baseUrl}/custom-drag-racing-suit`,      lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/custom-sprint-car-suit`,       lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/custom-dirt-late-model-suit`,  lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/custom-road-racing-suit`,      lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/custom-junior-karting-suit`,   lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/custom-shifter-kart-suit`,     lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.85 },
    // Karting vertical — added 2026-08-11. CIK-FIA hub + full-kit collection.
    { url: `${baseUrl}/cik-fia-level-2`,              lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/go-kart-racing-apparel`,       lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.85 },
    // Added 2026-08-22 from the client keyword list — women's (10 uncovered
    // terms) and the Rush SR spec-series cluster (7 uncovered terms).
    { url: `${baseUrl}/womens-racing-suit`,           lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${baseUrl}/rush-sr-race-suit`,            lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.8 },
    // Australian market — added 2026-08-25. Speedway only; Motorsport
    // Australia circuit racing requires FIA homologation we don't hold.
    { url: `${baseUrl}/race-suits-australia`,         lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/custom-fit`,                   lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/custom-measurement`,           lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/certifications`,               lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`,                          lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/store-location`,               lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/suit-maintenance`,             lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/StandardPricing`,              lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/pricing`,                      lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/RacegearDeals`,                lastModified: STATIC_LASTMOD, changeFrequency: "daily",   priority: 0.8 },
    { url: `${baseUrl}/shop`,                         lastModified: STATIC_LASTMOD, changeFrequency: "daily",   priority: 0.9 },
    { url: `${baseUrl}/blog`,                         lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/blog/perfect-custom-fit-racing-suit`,   lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/choose-right-racing-suit`,         lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/understanding-sfi-certifications`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/aftermarket-racing-suits`,         lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/sfi-rated-racing-suit-by-class`,   lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/endurance-racing-suit-guide`,      lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/best-sprint-car-racing-suit`,      lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/karting-suit-sizing-guide`,        lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/tpp-rating-explained`,             lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/sfi-vs-fia-rating`,                lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/drag-racing-suit-requirements`,    lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    // Dirt oval pillar — added 2026-09-27. Priority 0.9: the drag equivalent is
    // the site's highest-impression page and was already surfacing for dirt
    // queries it doesn't serve, so this one targets a confirmed live demand.
    { url: `${baseUrl}/blog/dirt-track-racing-suit-requirements`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog/racing-suit-hs-code`,              lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/custom-youth-nomex-race-suit`,     lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/compare`,             lastModified: STATIC_LASTMOD, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/compare/vs-k1`,       lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-rush`,     lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-velocita`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-pyrotect`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-simpson`,  lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-sparco-karting`,      lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-alpinestars-karting`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-omp-karting`,         lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-hrx`,      lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    // Highest-impression query in GSC (73 impr @ pos 20.9) — priority 0.8
    { url: `${baseUrl}/compare/vs-customracesuit`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`,      lastModified: STATIC_LASTMOD, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/term-and-condition`,  lastModified: STATIC_LASTMOD, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/shipping-policy`,     lastModified: STATIC_LASTMOD, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/return-policy`,       lastModified: STATIC_LASTMOD, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/payment-methods`,     lastModified: STATIC_LASTMOD, changeFrequency: "yearly",  priority: 0.3 },
  ];

  // Dynamic Product Pages from MongoDB — includes image entries so
  // product photos appear in Google Images (image sitemap protocol).
  let productPages = [];
  try {
    await connectDB();
    const products = await Product.find(
      { status: "active", slug: { $not: /(^|-)test(-|$)/i } },
      { slug: 1, updatedAt: 1, images: 1 }
    ).lean();

    productPages = products.map((p) => {
      // Include all product images (front + back for hoodies/shirts, single for suits).
      // Some products store absolute URLs (Cloudinary-hosted legacy items) while
      // others store site-relative paths (/images/products/...). Prepending
      // baseUrl unconditionally produced malformed URLs like
      // "https://www.hsracegear.comhttps://res.cloudinary.com/..." which Google
      // silently drops. Only prefix when the stored value is relative.
      const imageUrls = (p.images || [])
        .map((img) => {
          if (!img?.url) return null;
          const u = String(img.url).trim();
          if (!u) return null;
          if (/^https?:\/\//i.test(u)) return u;          // already absolute
          if (u.startsWith("//")) return `https:${u}`;    // protocol-relative
          return `${baseUrl}${u.startsWith("/") ? "" : "/"}${u}`;
        })
        .filter(Boolean);

      const entry = {
        url: `${baseUrl}/shop/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt).toISOString() : now,
        changeFrequency: "weekly",
        priority: 0.8,
      };
      if (imageUrls.length > 0) {
        entry.images = imageUrls;
      }
      return entry;
    });
  } catch (error) {
    console.error("Sitemap: failed to fetch products from MongoDB", error);
  }

  return [...staticPages, ...productPages];
}
