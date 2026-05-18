import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsSimpsonContent from "@/components/hsRaceGear/compare/vsSimpson/VsSimpsonContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  title: "HS Racegear vs Simpson Racing – Custom SFI Suits Comparison | HS Race Gear",
  description:
    "Compare HS Racegear vs Simpson Racing race suits. Custom SFI-certified suits starting at $289 vs $1,049. Faster production, unlimited revisions, premium Nomex® included.",
  keywords:
    "HS Racegear vs Simpson, Simpson Racing alternative, custom SFI race suits, drag racing suit, affordable SFI fire suit, sprint car suit",
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
