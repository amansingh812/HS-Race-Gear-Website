import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsRushContent from "@/components/hsRaceGear/compare/vsRush/VsRushContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Metadata updated 2026-06-01 to capture the GSC query "rush race suits"
// (5 imp/0 clicks in last 7 days) — page wasn't using the exact phrase
// the searchers type. Title now leads with that exact match.
export const metadata = {
  alternates: { canonical: "/compare/vs-rush" },
  title: "Rush Race Suits Alternative — Custom SFI Suits From $289 | HS Race Gear",
  description:
    "Searching for Rush race suits? Compare HS Racegear vs RUSH Racegear — custom SFI-certified race suits from $289, 2–3 week production, full design freedom, premium Nomex® for stock car, sprint car, dirt track, and drag racing.",
  keywords:
    "rush race suits, rush racing suits, rush racegear, HS Racegear vs RUSH Racegear, RUSH Racegear alternative, custom SFI race suits, stock car racing suit, dirt track suit, sprint car suit",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
    { "@type": "ListItem", "position": 3, "name": "HS Racegear vs RUSH Racegear", "item": "https://www.hsracegear.com/compare/vs-rush" }
  ]
};

export default function VsRushPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <VsRushContent />
      <Footer3 />
    </>
  );
}
