import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsPyrotectContent from "@/components/hsRaceGear/compare/vsPyrotect/VsPyrotectContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  title: "HS Racegear vs Pyrotect – Custom SFI Suits Comparison | HS Race Gear",
  description:
    "Compare HS Racegear vs Pyrotect race suits. Custom SFI-certified suits starting at $289 vs ~$995. Faster production, more design freedom, premium Nomex® materials included.",
  keywords:
    "HS Racegear vs Pyrotect, Pyrotect alternative, custom SFI race suits, NHRA drag racing suit, affordable SFI fire suit",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
    { "@type": "ListItem", "position": 3, "name": "HS Racegear vs Pyrotect", "item": "https://www.hsracegear.com/compare/vs-pyrotect" }
  ]
};

export default function VsPyrotectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <VsPyrotectContent />
      <Footer3 />
    </>
  );
}
