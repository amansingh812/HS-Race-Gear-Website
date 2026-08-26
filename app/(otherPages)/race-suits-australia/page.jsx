import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import AustraliaSpeedwayContent from "@/components/hsRaceGear/customGear/AustraliaSpeedwayContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Created 2026-08-25 — Australian market lander.
//
// ⚠️ SCOPE IS DELIBERATELY SPEEDWAY-ONLY. Motorsport Australia (circuit
// racing) requires FIA 8856-2000/8856-2018. HS Race Gear is SFI-only with no
// FIA homologation, so circuit racing cannot be served and this page says so
// explicitly rather than staying vague to catch the traffic.
//
// Australian SPEEDWAY accepts SFI — verified against the Victorian Speedway
// Council 2025 Sprintcar Specification Manual ("minimum standard of either
// SFI 3.2A/1 or FIA 8856-2000"), with matching wording in the VSC Formula 500,
// Super Rods, Limited Sportsman and Standard Saloons manuals.
//
// DATA CONTEXT: Australia is 60 impressions / 3 months against the US's 3,077
// (~2%), but at position 7.3 vs 21.1 — far better rankings on far less volume.
// New Zealand adds 21 impressions at 12.8 and is served by the same page.
// This is a small, low-competition pool, not a US replacement.
//
// SEASON: Australian speedway runs ~September to April, so this should be live
// before the season opens.
//
// NO HREFLANG. A single en-AU page alongside en-US content doesn't warrant
// hreflang annotations — those need parallel URL sets per locale. Adding them
// for one page would be noise. Revisit only if a full AU section is built.
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/race-suits-australia" },
  title: "Race Suits Australia — Custom SFI Speedway Suits Shipped",
  description:
    "Custom SFI-certified race suits shipped to Australia for speedway — sprintcars, late models, wingless, speedcars and sedans. SFI 3.2A/1 and 3.2A/5, built to your measurements in the USA. Note: SFI is accepted at Australian speedway, not Motorsport Australia circuit racing.",
  keywords:
    "race suits australia, racing suits australia, speedway suits australia, sprintcar suit australia, custom race suits australia, race suit australia, speedway race suit, australian speedway suit, sfi race suit australia, late model suit australia, wingless sprint suit, formula 500 suit, speedcar suit, custom racing suits australia, race gear australia, new zealand race suits",
  openGraph: {
    type: "website",
    title: "Race Suits Australia — Custom SFI Speedway Suits Shipped",
    description:
      "Custom SFI-certified speedway suits shipped to Australia. Sprintcars, late models, wingless, speedcars. Built to your measurements in the USA from USD $329.",
    url: "https://www.hsracegear.com/race-suits-australia",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Race Suits Australia", "item": "https://www.hsracegear.com/race-suits-australia" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom SFI Speedway Suit — Shipped to Australia",
  "description":
    "Custom SFI 3.2A/1 or 3.2A/5 certified speedway racing suit built to individual measurements in the USA and shipped to Australia. Suitable for Australian speedway, which accepts SFI. Not suitable for Motorsport Australia circuit racing, which requires FIA 8856 homologation.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Speedway Racing Suit",
  "material": "Nomex",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "599",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "HS Race Gear", "url": "https://www.hsracegear.com" },
    "eligibleRegion": [
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "New Zealand" },
    ],
  },
};

// The first FAQ is the one that matters most — it stops an unusable order
// before it happens, and it's the question an AI answer engine is most likely
// to be asked about a US suit maker by an Australian racer.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are SFI race suits legal in Australia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the discipline. Australian speedway accepts SFI — the Victorian Speedway Council sprintcar specification manual sets the driving suit minimum at either SFI 3.2A/1 or FIA 8856-2000, and comparable wording appears across its Formula 500, Super Rods, Limited Sportsman and Standard Saloons manuals. Motorsport Australia circuit racing is different: it requires FIA 8856-2000 or 8856-2018 homologated apparel, and an SFI-only suit will not pass scrutineering. Always confirm against your own club or state association's current-season specification manual.",
      },
    },
    {
      "@type": "Question",
      "name": "Can HS Race Gear supply FIA 8856-2018 suits for Motorsport Australia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. HS Race Gear builds to SFI standards only and holds no FIA 8856 homologation. If your class requires FIA 8856-2000 or 8856-2018, you need a suit from a manufacturer listed on the FIA technical list. We would rather say so than sell a suit that fails scrutineering.",
      },
    },
    {
      "@type": "Question",
      "name": "What SFI rating do I need for Australian speedway?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/1 single layer is the stated minimum in the Victorian Speedway Council manuals, giving roughly 3 seconds of thermal protection. Most serious sprintcar and late model drivers run SFI 3.2A/5 double layer, which gives roughly 7 to 10 seconds. If you run methanol — common in Australian speedway, and a fuel that burns with an almost invisible flame — the additional protection of a double-layer suit is worth the difference.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does shipping to Australia take and are there import charges?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Production is 2 to 3 weeks, plus international shipping time. Australian GST is charged on imported goods and customs duty may apply depending on value; both are payable on arrival and are not included in the suit price. Because Australian speedway runs roughly September to April, order in the off-season or early in it rather than mid-season.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Topbar1 />
      <Header3 />
      <AustraliaSpeedwayContent />
      <Footer3 />
    </>
  );
}
