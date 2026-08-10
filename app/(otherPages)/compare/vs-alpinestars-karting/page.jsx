import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import KartCompareContent from "@/components/hsRaceGear/compare/KartCompareContent";
import { KART_COMPARE } from "@/components/hsRaceGear/compare/kartCompareData";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

// Created 2026-08-11 — kart competitor compare page.
// The /compare/vs-* format is the proven winner here ("rush race suits"
// ranks pos 4.8), and the karting brands were completely unbuilt despite
// ~2,850/mo of brand demand in the Keyword Planner export.
// Formula applied: head term first, price anchor in the title.
const data = KART_COMPARE["alpinestars"];

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/compare/vs-alpinestars-karting" },
  title: "Alpinestars Go Kart Suit Alternative — Custom From $329",
  description:
    "Comparing Alpinestars go kart suits? HS Race Gear builds CIK Level 2 karting suits to your exact measurements from $329 — your colors, your sponsors, made in the USA with a 2–3 week turnaround.",
  keywords: data.keywords,
  openGraph: {
    type: "website",
    title: "Alpinestars Go Kart Suit Alternative — Custom From $329",
    description:
      "Comparing Alpinestars go kart suits? HS Race Gear builds CIK Level 2 karting suits to your exact measurements from $329 — your colors, your sponsors, made in the USA with a 2–3 week turnaround.",
    url: "https://www.hsracegear.com/compare/vs-alpinestars-karting",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
    { "@type": "ListItem", "position": 3, "name": "HS Race Gear vs Alpinestars Karting", "item": "https://www.hsracegear.com/compare/vs-alpinestars-karting" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom CIK Level 2 Kart Racing Suit",
  "description":
    "Custom-measured CIK-FIA Level 2 karting suit made in the USA. Unlimited colors, sponsor logos, driver name and country flag included. WKA, SKUSA, Rotax Max and IAME compliant.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Kart Racing Suit",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "599",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "HS Race Gear", "url": "https://www.hsracegear.com" },
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Topbar1 />
      <Header3 />
      <KartCompareContent data={data} />
      <Footer3 />
    </>
  );
}
