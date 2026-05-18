import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsK1Content from "@/components/hsRaceGear/compare/vsK1/VsK1Content";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  title: "HS Racegear vs K1 RaceGear – Custom SFI Racing Suits Comparison | HS Race Gear",
  description:
    "Comparing HS Racegear vs K1 RaceGear? Custom SFI-certified suits from $289 with 2–3 week turnaround, unlimited design revisions, and free matching gloves & shoes. See the full comparison.",
  keywords:
    "HS Racegear vs K1 RaceGear, K1 RaceGear alternative, custom SFI race suits, racing suit comparison, Nomex racing suit",
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
