import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomKartingSuitPage from "@/components/hsRaceGear/customGear/CustomKartingSuitPage";
import "@/public/css/custom-karting-suit.css";

import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/custom-karting-suit" },
  title: "Custom Karting Suit — Sublimated, Custom-Fit | HS Race Gear",
  description:
    "Design your own karting suit — pick every color, add your name and logos. Built to your exact measurements in the USA. Junior, senior & shifter karting fits. Free shipping.",
  keywords:
    "custom karting suit, karting suit, kart racing suit, custom kart suit, sublimated karting suit, karting racing suits, junior karting suit, shifter kart suit, Rotax Max suit, IAME X30 suit, karting gear",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Karting Suit", "item": "https://www.hsracegear.com/custom-karting-suit" }
  ]
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <CustomKartingSuitPage />
      <Footer3 />
    </>
  );
}
