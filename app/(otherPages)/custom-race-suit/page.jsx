import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomRaceSuitPage from "@/components/hsRaceGear/customGear/CustomRaceSuitPage";
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
  title: "Custom Made Race Suits — SFI Certified, Made in USA",
  description:
    "Custom made race suits built to your exact measurements — single layer, double layer or 3-layer, one-piece or two-piece. SFI 3.2A/1 and 3.2A/5 certified, premium Nomex fire-retardant fabric, unlimited color and logo options. Made in the USA with free shipping.",
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
    "custom made race suits, custom race suit, custom racing suit, custom racing suits, custom race suits, custom made racing fire suits, custom made fire suits, custom racing fire suits, custom fire suit, custom sfi race suit, custom fire suit for racing, sfi rated custom fireproof race suits, custom multi layer fireproof race suit, " +
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
    title: "Custom Made Race Suits — SFI Certified, Made in USA",
    description:
      "Built to your exact measurements. SFI 3.2A/1 & 3.2A/5 certified, premium Nomex, unlimited colors and logos. Made in the USA with free shipping.",
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

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <CustomRaceSuitPage />
      {/* Discipline landing pages — added 2026-06-30 for internal linking to
          the 4 auto-racing programmatic pages. Passes link equity from
          /custom-race-suit → discipline pages so they don't sit orphaned. */}
      <section className="blog-post-section" style={{ padding: "40px 0" }}>
        <div className="container">
          <h2 className="blog-body-heading" style={{ textAlign: "center", marginBottom: 24 }}>
            Custom Racing Suits by Discipline
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
          </div>
        </div>
      </section>
      <RelatedBlogPosts
        heading="From the HS Race Gear Blog"
        subtitle="Sizing, SFI ratings, discipline guides, and what to look for in an aftermarket suit."
        limit={4}
      />
      <Footer3 />
    </>
  );
}
