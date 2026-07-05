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
  title: "Custom Karting Suit — Sublimated, Custom-Fit | HS Race Gear",
  description:
    "Design your own karting suit — pick every color, add your name and logos. Built to your exact measurements in the USA. Junior, senior & shifter karting fits. Free shipping.",
  keywords:
    "custom karting suit, karting suit, kart racing suit, custom kart suit, sublimated karting suit, karting racing suits, junior karting suit, shifter kart suit, Rotax Max suit, IAME X30 suit, karting gear",
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
                Junior Karting Suits (Cadet, Micro, Mini)
              </Link>
            </div>
            <div className="col-md-6 col-lg-4">
              <Link href="/custom-shifter-kart-suit" className="tf-btn animate-btn" style={{ width: "100%", display: "block", textAlign: "center", padding: "14px 12px", border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Shifter Kart Suits (KZ, IAME X30 Shifter)
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer3 />
    </>
  );
}
