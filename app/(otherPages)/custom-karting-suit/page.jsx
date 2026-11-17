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
  title: "Custom Kart Racing Suits & Go Kart Suits | Made to Measure",
  description:
    "Design your custom go kart racing suit. Junior, senior, and shifter kart racing suits built to your exact measurements. Free shipping.",
  keywords:
    // Updated 2026-08-11 — "suit karting" is 5,000/mo in the Keyword Planner
    // export (same bucket as "kart racing suit") and was matching only the
    // homepage. Odd word order, but it's a real high-volume variant so it
    // goes in the keyword list rather than being forced into the title.
    "kart racing suit, suit karting, race suit karting, go kart racing suit, go kart suit, custom karting suit, custom karting suits, custom kart racing suits, karting suit, custom kart suit, custom go kart suit, sublimated karting suit, karting racing suits, youth karting suits, junior karting suit, shifter kart suit, Rotax Max suit, IAME X30 suit, karting gear",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Karting Suit", "item": "https://www.hsracegear.com/custom-karting-suit" }
  ]
};

// Added 2026-09-19 — this is the flagship karting page (nav, homepage hero,
// shop mega-menu, sitemap priority 0.9) but was the only kart lander with no
// Product schema, unlike its own children (/custom-shifter-kart-suit,
// /custom-junior-karting-suit). Matches their schema shape for consistency.
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Karting Suit",
  "description": "Custom karting suit with full-coverage sublimation printing, tailored to your exact measurements. Built for junior, senior, and shifter kart classes.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Karting Suit",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "699",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "HS Race Gear", "url": "https://www.hsracegear.com" },
  },
};

// FAQ schema — mirrors the 6 Q&As rendered visibly in CustomKartingSuitPage
// (added 2026-09-19). Kept in sync verbatim per the lesson from /certifications:
// FAQPage schema must match on-page, user-visible content.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What sizes are available for a custom karting suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every suit is made to your exact measurements rather than pulled from a size chart. We build for junior and youth drivers (ages 8-15), senior classes, and shifter kart classes."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a custom karting suit take to make?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You'll receive a digital mockup within 24-72 hours of submitting your measurements, with unlimited revisions before production starts. Production typically takes 4-5 weeks after you approve the final design."
      }
    },
    {
      "@type": "Question",
      "name": "Can I add sponsor logos and my driver name to a karting suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Full sublimation printing supports unlimited colors, sponsor-style logos, driver name, and race number infused directly into the fabric at no extra design cost."
      }
    },
    {
      "@type": "Question",
      "name": "Do you ship karting suits internationally?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, HS Race Gear ships custom karting suits worldwide."
      }
    }
  ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

          <div className="row g-3 justify-content-center" style={{ marginTop: 12 }}>
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
