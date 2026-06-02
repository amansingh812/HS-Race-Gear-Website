import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsPyrotectContent from "@/components/hsRaceGear/compare/vsPyrotect/VsPyrotectContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Metadata updated 2026-06-01 — exact-phrase audit. Captures "pyrotect
// racing suit" + variants. Pyrotect is dominant in NHRA drag and short
// track — pricing anchor in title is the key differentiator.
export const metadata = {
  alternates: { canonical: "/compare/vs-pyrotect" },
  title: "Pyrotect Racing Suits Alternative — Custom SFI Suits From $289 | HS Race Gear",
  description:
    "Searching for Pyrotect racing suits? HS Racegear builds custom SFI-certified race suits from $289 (vs ~$995 for Pyrotect) with NHRA, IHRA, IMCA, and USAC compliance. Faster production, full design control, premium Nomex®.",
  keywords:
    "pyrotect racing suit, pyrotect racing suits, pyrotect race suit, pyrotect fire suit, pyrotect alternative, HS Racegear vs Pyrotect, custom SFI race suits, NHRA drag racing suit, affordable SFI fire suit",
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
