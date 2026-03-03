export default function sitemap() {
  const baseUrl = "https://hsracegear.com";
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/custom-race-suit`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/custom-race-suit/order`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/custom-karting-suit`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/custom-karting-suit/order`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/custom-powerboat-suit`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/custom-powerboat-suit/order`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/custom-gloves`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/custom-shoes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/custom-fit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/custom-measurement`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/StandardPricing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/RacegearDeals`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/certifications`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/store-location`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/suit-maintenance`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/term-and-condition`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/shipping-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/return-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/payment-methods`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // Blog
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog/perfect-custom-fit-racing-suit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/choose-right-racing-suit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/understanding-sfi-certifications`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Compare
    { url: `${baseUrl}/compare/vs-k1`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-rush`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-velocity`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-pyrotect`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/vs-simpson`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  return staticPages;
}
