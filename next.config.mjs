/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // ─────────────────────────────────────────────────────────────────
      // Template blog pages → real /blog
      // The template route folders themselves were deleted in the
      // 2026-05-16 SEO cleanup. These redirects survive so any external
      // backlink or stale GSC URL still lands on a valid page (301).
      // ─────────────────────────────────────────────────────────────────
      { source: "/blog-list-01", destination: "/blog", permanent: true },
      { source: "/blog-list-02", destination: "/blog", permanent: true },
      { source: "/blog-grid-01", destination: "/blog", permanent: true },
      { source: "/blog-grid-02", destination: "/blog", permanent: true },
      { source: "/blog-single/:id*", destination: "/blog", permanent: true },

      // ─────────────────────────────────────────────────────────────────
      // Template shop layouts → real /shop
      // ─────────────────────────────────────────────────────────────────
      { source: "/shop-default", destination: "/shop", permanent: true },
      { source: "/shop-collection-list", destination: "/shop", permanent: true },
      { source: "/shop-filter-hidden", destination: "/shop", permanent: true },
      { source: "/shop-filter-sidebar", destination: "/shop", permanent: true },
      { source: "/shop-fullwidth", destination: "/shop", permanent: true },
      { source: "/shop-grid-3-columns", destination: "/shop", permanent: true },
      { source: "/shop-horizontal-filter", destination: "/shop", permanent: true },
      { source: "/shop-infinity-scroll", destination: "/shop", permanent: true },
      { source: "/shop-left-sidebar", destination: "/shop", permanent: true },
      { source: "/shop-load-more-button", destination: "/shop", permanent: true },
      { source: "/shop-right-sidebar", destination: "/shop", permanent: true },
      { source: "/shop-sub-collection", destination: "/shop", permanent: true },
      { source: "/shop-sub-collection-02", destination: "/shop", permanent: true },
      { source: "/product-style-01", destination: "/shop", permanent: true },
      { source: "/product-style-02", destination: "/shop", permanent: true },
      { source: "/product-style-03", destination: "/shop", permanent: true },

      // ─────────────────────────────────────────────────────────────────
      // Template product-detail variants → real /shop
      // The (product-details) route group was deleted in cleanup.
      // The catch-all :id* pattern handles the trailing /1 segment
      // every template variant used.
      // ─────────────────────────────────────────────────────────────────
      { source: "/product-detail/:id*", destination: "/shop", permanent: true },
      { source: "/product-3d/:id*", destination: "/shop", permanent: true },
      { source: "/product-affiliate/:id*", destination: "/shop", permanent: true },
      { source: "/product-bottom-thumbnail/:id*", destination: "/shop", permanent: true },
      { source: "/product-buyx-gety/:id*", destination: "/shop", permanent: true },
      { source: "/product-countdown-timer/:id*", destination: "/shop", permanent: true },
      { source: "/product-description-accordions/:id*", destination: "/shop", permanent: true },
      { source: "/product-description-side-accordions/:id*", destination: "/shop", permanent: true },
      { source: "/product-description-tab/:id*", destination: "/shop", permanent: true },
      { source: "/product-description-vertical/:id*", destination: "/shop", permanent: true },
      { source: "/product-drawer-sidebar/:id*", destination: "/shop", permanent: true },
      { source: "/product-external-zoom/:id*", destination: "/shop", permanent: true },
      { source: "/product-grid/:id*", destination: "/shop", permanent: true },
      { source: "/product-grid-02/:id*", destination: "/shop", permanent: true },
      { source: "/product-group/:id*", destination: "/shop", permanent: true },
      { source: "/product-inner-circle-zoom/:id*", destination: "/shop", permanent: true },
      { source: "/product-inner-zoom/:id*", destination: "/shop", permanent: true },
      { source: "/product-no-zoom/:id*", destination: "/shop", permanent: true },
      { source: "/product-open-lightbox/:id*", destination: "/shop", permanent: true },
      { source: "/product-out-of-stock/:id*", destination: "/shop", permanent: true },
      { source: "/product-pickup-available/:id*", destination: "/shop", permanent: true },
      { source: "/product-right-thumbnail/:id*", destination: "/shop", permanent: true },
      { source: "/product-stacked/:id*", destination: "/shop", permanent: true },
      { source: "/product-swatch-dropdown/:id*", destination: "/shop", permanent: true },
      { source: "/product-swatch-dropdown-color/:id*", destination: "/shop", permanent: true },
      { source: "/product-swatch-image/:id*", destination: "/shop", permanent: true },
      { source: "/product-swatch-image-square/:id*", destination: "/shop", permanent: true },
      { source: "/product-together/:id*", destination: "/shop", permanent: true },
      { source: "/product-video/:id*", destination: "/shop", permanent: true },
      { source: "/product-volume-discount/:id*", destination: "/shop", permanent: true },
      { source: "/product-volume-discount-thumbnail/:id*", destination: "/shop", permanent: true },

      // ─────────────────────────────────────────────────────────────────
      // Template demo home variants → real homepage
      // These pages never existed as real routes — they were only
      // demo links in the template's mega-menu. Robots disallows them,
      // but a 301 is stronger than disallow if anyone links to them.
      // ─────────────────────────────────────────────────────────────────
      { source: "/home-fashion-02", destination: "/", permanent: true },
      { source: "/home-electronic", destination: "/", permanent: true },
      { source: "/home-furniture", destination: "/", permanent: true },
      { source: "/home-furniture2", destination: "/", permanent: true },
      { source: "/home-fashion-women", destination: "/", permanent: true },
      { source: "/home-skincare", destination: "/", permanent: true },
      { source: "/home-skincare2", destination: "/", permanent: true },
      { source: "/home-bicycle", destination: "/", permanent: true },
      { source: "/home-phonecase", destination: "/", permanent: true },
      { source: "/home-pet-accessories", destination: "/", permanent: true },
      { source: "/home-sportwear", destination: "/", permanent: true },
      { source: "/home-jewelry", destination: "/", permanent: true },
      { source: "/home-jewelry2", destination: "/", permanent: true },
      { source: "/home-electric-accessories", destination: "/", permanent: true },
      { source: "/home-mega-electronic", destination: "/", permanent: true },
      { source: "/home-vegetable", destination: "/", permanent: true },
      { source: "/home-pod", destination: "/", permanent: true },
      { source: "/home-baby", destination: "/", permanent: true },
      { source: "/home-plant", destination: "/", permanent: true },
      { source: "/home-pickleball", destination: "/", permanent: true },
      { source: "/home-handcraft", destination: "/", permanent: true },

      // Minor: /faqs (old nav-schema slug) → real /faq
      { source: "/faqs", destination: "/faq", permanent: true },

      // ─────────────────────────────────────────────────────────────────
      // Slug corrections, 2026-08-06 (client request)
      //
      // /blanket-template → /blank-template
      //   The page is the BLANK design template, not a "blanket". It was
      //   robots-disallowed so unlikely to be indexed, but the footer has
      //   linked to it since launch and external/bookmarked links would 404
      //   without this.
      //
      // /compare/vs-velocity → /compare/vs-velocita
      //   The competitor is Velocita-USA. This URL WAS in the sitemap and
      //   therefore indexed, so the 301 is load-bearing: it preserves any
      //   accumulated ranking and stops the old URL 404ing. Do not remove.
      // ─────────────────────────────────────────────────────────────────
      { source: "/blanket-template", destination: "/blank-template", permanent: true },
      { source: "/compare/vs-velocity", destination: "/compare/vs-velocita", permanent: true },
    ];
  },
  images: {
    // Allow Next.js to optimize images from any HTTPS source
    // (product images stored in MongoDB can come from any CDN)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
    // Serve WebP/AVIF for smaller file sizes and faster load times
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
