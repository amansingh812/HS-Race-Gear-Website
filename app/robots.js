/**
 * Dynamic robots.txt with sitemap reference.
 * Replaces public/robots.txt (which still exists as fallback).
 * Added 2026-06-30.
 */
export default function robots() {
  const baseUrl = "https://www.hsracegear.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/checkout/",
          "/view-cart/",
          "/wish-list/",
          "/coming-soon/",
          "/before-you-leave/",
          "/blanket-template/",
          "/cart-drawer-v2/",
          "/cart-empty/",
          "/more-mockups/",
          "/account-addresses/",
          "/account-orders/",
          "/account-page/",
        ],
      },
      // Allow AI crawlers explicitly — appearance in ChatGPT, Claude,
      // Perplexity, etc. is the new SEO frontier and we welcome it.
      {
        userAgent: ["GPTBot", "ChatGPT-User", "anthropic-ai", "Claude-Web", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  };
}
