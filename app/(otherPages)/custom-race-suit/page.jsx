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
  title: "Custom Racing Suits — SFI Certified, Made in USA | HS Race Gear",
  description:
    "Custom racing suit built to your exact measurements. SFI 3.2A/1 & 3.2A/5 certified, premium Nomex fire-retardant fabric, unlimited color and logo options. Made in the USA. Free shipping on custom suits.",
  keywords:
    "custom racing suit, custom race suit, SFI certified racing suit, Nomex racing suit, made in USA racing suit, racewear USA, custom racing suits, racing gear, aftermarket auto racing suits",
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
