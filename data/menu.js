// Template demo menu data removed during SEO cleanup (2026-05-16).
// The original template shipped with arrays of demo links to /home-fashion,
// /home-electronic, /home-pickleball, /home-pod, /home-baby, /home-handcraft,
// etc. — all of which leaked into the rendered DOM via DemoModal.jsx and
// diluted the homepage's topical relevance for racing-gear queries.
//
// All consumers of these exports have been removed:
// - DemoModal.jsx (deleted)
// - ClientLayout.js (no longer renders DemoModal)
//
// If something else imports from this file in the future, we want a hard
// failure rather than a silent demo-data leak. Leaving exports defined as
// empty so existing imports degrade gracefully without rendering anything.

export const demoItems = [];
export const shopPages = [];
export const productMenuItems = [];
export const blogMenuItems = [];

// Real "other pages" footer/sidebar nav. Trimmed of template-only entries
// (newsletter-popup-02/03, cart-drawer-v2, cart-empty, before-you-leave,
// cookies, home-fashion-02, coming-soon, 404 link, account-page).
export const otherPages = [
  { href: "/about-us", text: "About" },
  { href: "/contact-us", text: "Contact" },
  { href: "/certifications", text: "Certifications" },
  { href: "/store-location", text: "Store location" },
  { href: "/faq", text: "FAQ" },
  { href: "/view-cart", text: "View cart" },
];
