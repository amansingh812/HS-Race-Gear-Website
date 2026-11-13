import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomRaceSuitPage from "@/components/hsRaceGear/customGear/CustomRaceSuitPage";
import CustomRaceSuitSeoContent, { RACE_SUIT_FAQS, RACE_SUIT_PACKAGES } from "@/components/hsRaceGear/customGear/CustomRaceSuitSeoContent";
import RelatedBlogPosts from "@/components/hsRaceGear/blog/RelatedBlogPosts";
import Link from "next/link";
import "@/public/css/custom-race-suit.css";
import "@/public/css/contact-us.css"; // for blog card styling reuse
import "@/public/css/compare.css";

import React from "react";

export const metadata = {
  alternates: { canonical: "/custom-race-suit" },
  // Title rewritten 2026-05-16 to capture singular "racing suit" (higher
  // search volume than plural "race suits"), the "Made in USA" angle
  // (28-imp query "racewear usa"), and SFI cert trust signal.
  //
  // UPDATED 2026-08-11 — the coverage audit found "custom made race suits"
  // (5,000/mo, joint-highest term in the whole Keyword Planner export) was
  // matching only the HOMEPAGE. The money page didn't contain the phrase.
  // "Custom Made" now leads the title, which also still reads naturally for
  // "custom made racing fire suits" (500/mo) and "custom made fire suits".
  //
  // Also note GSC: this page has 819 impressions at position 28.3 for
  // "custom racing suit" (90 imp) and "custom race suits" (35 imp). Position
  // 28 is an authority problem that metadata alone will NOT fix — see
  // docs/seo/open-gaps.md C1 for the internal-linking work still needed.
  // UPDATED 2026-11-13 — page at position ~24. Every result above it puts a
  // price in the title/snippet (K1 "from $599", Pyrotect "$395.95", Zamp
  // "$659.95"). Lead with the top GSC query ("custom racing suit", 99 imp)
  // and our price, which undercuts K1's $1,599.95 SFI-5 suit. Description
  // trimmed to ~155 chars so it isn't truncated.
  title: "Custom Racing Suits From $549 — SFI 3.2A/5 Nomex, Made in USA",
  description:
    "Custom made race suits cut to your measurements. SFI 3.2A/1 from $549, SFI 3.2A/5 double layer $649. Unlimited logos & colors, free mockup, free shipping.",
  // Keyword clusters assigned 2026-08-22 from the client keyword list.
  // Coverage audit found 46 of 71 terms had no page at all. Four clusters
  // belong here because they describe this product, not a separate one:
  //   LAYER      single/double/2-layer/3-layer/1-layer fire suit
  //   CONSTRUCTION  1-piece, 2-piece
  //   MADE TO MEASURE  bespoke, tailored, personalised
  //   USA MANUFACTURER  "custom sfi race suit manufacturers usa" etc.
  // Note these are keyword-list terms with no volume data attached — treat
  // as intent signals, not as validated demand.
  keywords:
    "custom sfi 3.2a/5 fire suit, custom sfi 5 race suit, custom nomex race suit with logos, custom made race suits, custom race suit, custom racing suit, custom racing suits, custom race suits, custom made racing fire suits, custom made fire suits, custom racing fire suits, custom fire suit, custom sfi race suit, custom fire suit for racing, sfi rated custom fireproof race suits, custom multi layer fireproof race suit, " +
    // Layer variants — every one of these was uncovered
    "single layer race suit, double layer race suit, double layer fire suit, 1 layer custom fire suit, custom 2 layer race suit, 3-layer racing fire suit, 3 layer racing fire suit, " +
    // One-piece / two-piece construction
    "racing fire suits 1 piece, racing fire suits 2 piece, 2 piece drag racing suits, 3.2a/5 fire suit 2 piece, one piece race suit, two piece race suit, " +
    // Made-to-measure / bespoke phrasing
    "made to measure fire resistant racing suits, custom tailored sfi 3.2a/5 racing suit, bespoke SFI rated race gear, personalized sfi certified track day suit, custom bespoke motorsports suit, " +
    // USA manufacturer intent
    "custom sfi race suit manufacturers usa, custom made to measure fire suits united states, usa based custom fire suit builders, buy custom bespoke motorsports suit usa, premium custom auto racing suits sfi rated, " +
    // Youth CAR racing (distinct from the junior KARTING lander)
    "youth custom racing fire suits, youth racing suit packages, youth racing suit size chart, youth race suit, junior race suit, " +
    "SFI certified racing suit, sfi 3.2a/5 racing suit, Nomex racing suit, fire-resistant race suit, made in USA racing suit, racewear USA, custom auto racing suits, aftermarket auto racing suits, oval track stock car suits",
  openGraph: {
    type: "website",
    title: "Custom Racing Suits From $549 — SFI 3.2A/5 Nomex, Made in USA",
    description:
      "Custom made SFI race suits cut to your measurements. Single layer $549, double layer SFI 3.2A/5 $649. Unlimited logos and colors, free mockup, free shipping.",
    url: "https://www.hsracegear.com/custom-race-suit",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Racing Suit", "item": "https://www.hsracegear.com/custom-race-suit" }
  ]
};

// FAQPage mirrors the visible FAQ in CustomRaceSuitSeoContent (same source
// array), so the schema can never drift from what users see.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: RACE_SUIT_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Product with AggregateOffer from the real package prices. No
// aggregateRating — add it only when real reviews exist.
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Custom SFI Certified Racing Suit",
  description:
    "Custom made Nomex racing suit built to the driver's measurements. SFI 3.2A/1 single layer or SFI 3.2A/5 double and triple layer, one-piece or two-piece, with unlimited embroidery and colors.",
  brand: { "@type": "Brand", name: "HS Race Gear" },
  image: [
    "https://www.hsracegear.com/images/home/suit-infographic.webp",
    "https://www.hsracegear.com/images/shop/suit_tailor_v2.png",
  ],
  url: "https://www.hsracegear.com/custom-race-suit",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: Math.min(...RACE_SUIT_PACKAGES.map((p) => p.price)),
    highPrice: Math.max(...RACE_SUIT_PACKAGES.map((p) => p.price)),
    offerCount: RACE_SUIT_PACKAGES.length,
    availability: "https://schema.org/InStock",
    url: "https://www.hsracegear.com/custom-race-suit/order",
  },
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <CustomRaceSuitPage />
      <CustomRaceSuitSeoContent />
      {/* Discipline landing pages — added 2026-06-30 for internal linking to
          the 4 auto-racing programmatic pages. Passes link equity from
          /custom-race-suit → discipline pages so they don't sit orphaned. */}
      <section className="blog-post-section" style={{ padding: "40px 0" }}>
        <div className="container">
          <h2 className="blog-body-heading" style={{ textAlign: "center", marginBottom: 24 }}>
            Custom Race Suits by Discipline
          </h2>
          <div className="row g-3">
            <div className="col-md-6 col-lg-3">
              <Link href="/custom-drag-racing-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Drag Racing Suits
              </Link>
            </div>
            <div className="col-md-6 col-lg-3">
              <Link href="/custom-sprint-car-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Sprint Car Suits
              </Link>
            </div>
            <div className="col-md-6 col-lg-3">
              <Link href="/custom-dirt-late-model-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Dirt Late Model Suits
              </Link>
            </div>
            <div className="col-md-6 col-lg-3">
              <Link href="/custom-road-racing-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Road Racing Suits
              </Link>
            </div>
          </div>

          {/* Added 2026-08-22 — the two new landers from the keyword-list
              pass. Women's had 10 uncovered terms, Rush SR had 7. */}
          <div className="row g-3 justify-content-center" style={{ marginTop: 12 }}>
            <div className="col-md-6 col-lg-3">
              <Link href="/womens-racing-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Women&rsquo;s Racing Suits
              </Link>
            </div>
            <div className="col-md-6 col-lg-3">
              <Link href="/rush-sr-race-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Rush SR &amp; GRIDLIFE
              </Link>
            </div>
            <div className="col-md-6 col-lg-3">
              <Link href="/blog/custom-youth-nomex-race-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Youth Racing Suits Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RelatedBlogPosts
        heading="From the HS Race Gear Blog"
        subtitle="Rules and ratings for the suit you're ordering."
        limit={3}
        variant="compact"
        slugs={["sfi-rated-racing-suit-by-class", "drag-racing-suit-requirements", "dirt-track-racing-suit-requirements"]}
      />
      <Footer3 />
    </>
  );
}
