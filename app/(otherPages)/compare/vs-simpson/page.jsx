import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsSimpsonContent from "@/components/hsRaceGear/compare/vsSimpson/VsSimpsonContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Metadata updated 2026-08-11 — Keyword Planner check: "simpson racing suit"
// and "simpson fire suit" are both 500/mo; "simpson custom fire suit" is only
// 50/mo. Leading with the head term and keeping the $289-vs-$1,049 price gap
// in the title — the price contrast is what earns the click off a brand query.
export const metadata = {
  alternates: { canonical: "/compare/vs-simpson" },
  title: "Simpson Racing Suits Alternative — Custom SFI Suits From $289",
  description:
    "Comparing Simpson racing suits? HS Race Gear builds custom SFI-certified fire suits from $289 (vs $1,049+ for Simpson) — faster production, full design control, premium Nomex® construction. NHRA, IHRA, sprint, drag, and oval compliant.",
  keywords:
    "simpson custom fire suit, simpson custom race suit, simpson racing suit, simpson racing suits, simpson race suit, simpson fire suit, simpson racing alternative, HS Racegear vs Simpson, Simpson Racing alternative, custom SFI race suits, drag racing suit, affordable SFI fire suit, sprint car suit",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
    { "@type": "ListItem", "position": 3, "name": "HS Racegear vs Simpson Racing", "item": "https://www.hsracegear.com/compare/vs-simpson" }
  ]
};

export default function VsSimpsonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <VsSimpsonContent />
      <Footer3 />
    </>
  );
}
