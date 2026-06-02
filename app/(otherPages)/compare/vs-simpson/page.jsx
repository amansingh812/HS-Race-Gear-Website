import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsSimpsonContent from "@/components/hsRaceGear/compare/vsSimpson/VsSimpsonContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Metadata updated 2026-06-01 — exact-phrase audit. Simpson Racing is a
// huge brand name with sustained search volume. Title leads with the
// exact phrase "Simpson racing suits" + the price-anchored differentiator.
export const metadata = {
  alternates: { canonical: "/compare/vs-simpson" },
  title: "Simpson Racing Suits Alternative — Custom SFI Suits From $289 | HS Race Gear",
  description:
    "Searching for Simpson racing suits? HS Racegear builds custom SFI-certified race suits from $289 (vs $1,049+ for Simpson) with faster production, full design control, and premium Nomex® construction. NHRA, IHRA, sprint, drag, and oval compliant.",
  keywords:
    "simpson racing suit, simpson racing suits, simpson race suit, simpson fire suit, simpson racing alternative, HS Racegear vs Simpson, Simpson Racing alternative, custom SFI race suits, drag racing suit, affordable SFI fire suit, sprint car suit",
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
