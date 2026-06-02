import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsK1Content from "@/components/hsRaceGear/compare/vsK1/VsK1Content";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

// Metadata updated 2026-06-01 — exact-phrase audit. Captures "k1 racing
// suits" (880 vol/mo per SEMrush, KD 19) and competitor brand search
// intent. Title leads with the exact-match phrase searchers type.
export const metadata = {
  alternates: { canonical: "/compare/vs-k1" },
  title: "K1 Racing Suits Alternative — Custom SFI Race Suits From $289 | HS Race Gear",
  description:
    "Searching for K1 racing suits? Compare HS Racegear vs K1 RaceGear — custom SFI-certified race suits from $289, 2–3 week production, deeper customization, premium Nomex® for drag, sprint, dirt, and circle track.",
  keywords:
    "k1 racing suits, k1 race suits, k1 racegear, k1 racegear suit, k1 racegear alternative, HS Racegear vs K1 RaceGear, K1 RaceGear alternative, custom SFI race suits, racing suit comparison, Nomex racing suit",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
    { "@type": "ListItem", "position": 3, "name": "HS Racegear vs K1 RaceGear", "item": "https://www.hsracegear.com/compare/vs-k1" }
  ]
};

export default function VsK1Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <VsK1Content />
      <Footer3 />
    </>
  );
}
