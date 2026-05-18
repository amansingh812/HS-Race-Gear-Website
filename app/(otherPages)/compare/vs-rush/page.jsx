import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsRushContent from "@/components/hsRaceGear/compare/vsRush/VsRushContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  title: "HS Racegear vs RUSH Racegear – Custom SFI Suits Comparison | HS Race Gear",
  description:
    "Comparing HS Racegear vs RUSH Racegear? Custom SFI-certified suits from $289. Faster production, full design freedom, premium Nomex® materials for stock cars, sprint cars, and drag racing.",
  keywords:
    "HS Racegear vs RUSH Racegear, RUSH Racegear alternative, custom SFI race suits, stock car racing suit, dirt track suit, sprint car suit",
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
