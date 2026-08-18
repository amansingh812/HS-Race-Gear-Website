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
    "Custom made race suits built to your exact measurements. SFI 3.2A/1 & 3.2A/5 certified, premium Nomex fire-retardant fabric, unlimited color and logo options. Made in the USA. Free shipping on custom racing suits.",
  keywords:
    "custom made race suits, custom race suit, custom racing suit, custom racing suits, custom race suits, custom made racing fire suits, custom made fire suits, custom racing fire suits, custom fire suit, custom sfi race suit, SFI certified racing suit, Nomex racing suit, made in USA racing suit, racewear USA, custom auto racing suits, aftermarket auto racing suits",
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
