import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomKartingSuitPage from "@/components/hsRaceGear/customGear/CustomKartingSuitPage";
import Link from "next/link";
import "@/public/css/custom-karting-suit.css";
import "@/public/css/compare.css"; // for blog-body-heading utility class

import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/custom-karting-suit" },
  title: "Custom Kart Racing Suits & Go Kart Suits (CIK Level 2)",
  description:
    "Design your custom go kart racing suit. Junior, senior, and shifter kart racing suits built to your exact measurements (CIK Level 2 specs). Free shipping.",
  keywords:
    // Updated 2026-08-11 — "suit karting" is 5,000/mo in the Keyword Planner
    // export (same bucket as "kart racing suit") and was matching only the
    // homepage. Odd word order, but it's a real high-volume variant so it
    // goes in the keyword list rather than being forced into the title.
    "kart racing suit, suit karting, race suit karting, go kart racing suit, go kart suit, custom karting suit, custom karting suits, custom kart racing suits, karting suit, custom kart suit, custom go kart suit, sublimated karting suit, karting racing suits, youth karting suits, junior karting suit, shifter kart suit, Rotax Max suit, IAME X30 suit, CIK Level 2, karting gear",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Karting Suit", "item": "https://www.hsracegear.com/custom-karting-suit" }
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
      <CustomKartingSuitPage />
      {/* Discipline landing pages — added 2026-06-30 for internal linking to
          the 2 karting-specific programmatic pages. */}
      <section className="blog-post-section" style={{ padding: "40px 0" }}>
        <div className="container">
          <h2 className="blog-body-heading" style={{ textAlign: "center", marginBottom: 24 }}>
            Custom Karting Suits by Class
          </h2>
          <div className="row g-3 justify-content-center">
            <div className="col-md-6 col-lg-4">
              <Link href="/custom-junior-karting-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Youth &amp; Kids Karting Suits (Ages 8&ndash;15)
              </Link>
            </div>
            <div className="col-md-6 col-lg-4">
              <Link href="/custom-shifter-kart-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Shifter Kart Suits (KZ, IAME X30 Shifter)
              </Link>
            </div>
          </div>

          {/* Hub links added 2026-08-11 — /cik-fia-level-2 backs up the
              "CIK Level 2" claim in this page's title, and the apparel page
              catches full-kit intent. Both are new as of the karting build. */}
          <div className="row g-3 justify-content-center" style={{ marginTop: 12 }}>
            <div className="col-md-6 col-lg-4">
              <Link href="/cik-fia-level-2" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                What Is CIK-FIA Level 2?
              </Link>
            </div>
            <div className="col-md-6 col-lg-4">
              <Link href="/go-kart-racing-apparel" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Full Karting Kit &amp; Apparel
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer3 />
    </>
  );
}
