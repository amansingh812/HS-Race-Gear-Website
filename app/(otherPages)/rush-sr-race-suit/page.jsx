import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import RushSrRaceSuitContent from "@/components/hsRaceGear/customGear/RushSrRaceSuitContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Created 2026-08-22 — Rush SR / GRIDLIFE RUSH Series lander.
//
// Covers the spec-series cluster from the client keyword list (7 terms, all
// previously uncovered). One page rather than three because the RUSH SR runs
// under GRIDLIFE, SCCA, NASA and ProAutoSports — it's one audience, and three
// near-identical pages would be the thin-content pattern CLAUDE.md warns off.
//
// ⚠️ DO NOT MERGE WITH /compare/vs-rush.
// "Rush SR"        = an open-cockpit spec sports racer from Rush Auto Works.
// "Rush Race Gear" = an unrelated competing suit brand.
// Same first word, completely different search intent. Someone searching
// "rush sr custom driver gear" wants gear for their car, not a competitor
// comparison. Keep the keyword sets separate on both pages.
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/rush-sr-race-suit" },
  title: "Rush SR Race Suits — Custom SFI Gear for GRIDLIFE RUSH",
  description:
    "Custom SFI-certified race suits and driver gear for the Rush SR and GRIDLIFE RUSH Series. Cut for an open-cockpit spec car and built to your measurements in the USA. GRIDLIFE, SCCA, NASA and ProAutoSports. From $329.",
  keywords:
    "rush sr race suit, custom sfi race suits for rush sr, made to measure fireproof suit rush sr, rush sr custom driver gear, buy custom racing suit rush spec series, rush spec series suit, custom fireproof race suits gridlife, gridlife race suit, gridlife rush series suit, custom bespoke race suits nasa st2, nasa st2 race suit, nasa racing suit, spec racer fire suit, open cockpit race suit, sports racer driver suit",
  openGraph: {
    type: "website",
    title: "Rush SR Race Suits — Custom SFI Gear for GRIDLIFE RUSH",
    description:
      "Custom SFI-certified driver gear for the Rush SR spec sports racer. Cut for an open cockpit, measured to you, made in the USA.",
    url: "https://www.hsracegear.com/rush-sr-race-suit",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Rush SR Race Suits", "item": "https://www.hsracegear.com/rush-sr-race-suit" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Rush SR Race Suit",
  "description":
    "Custom SFI-certified race suit for the Rush SR spec sports racer, cut for an open-cockpit seating position and built to individual measurements. Made in the USA.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Race Suit",
  "material": "Nomex",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "329",
    "highPrice": "599",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "HS Race Gear", "url": "https://www.hsracegear.com" },
  },
};

// FAQ is deliberately conservative on rules — it tells racers to check their
// rulebook rather than asserting a required SFI rating we couldn't verify.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What race suit do I need for the Rush SR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on which sanctioning body you run under. The Rush SR races in the GRIDLIFE RUSH Series and under SCCA, NASA and ProAutoSports, and each has its own driver attire requirements which are revised between seasons. NASA covers driver attire in CCR section 15.17. Check your current-season rulebook for the required rating rather than relying on a supplier's website. For wheel-to-wheel road racing, SFI 3.2A/5 multi-layer is the common choice.",
      },
    },
    {
      "@type": "Question",
      "name": "Does an open-cockpit car need a different race suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The certification requirement is the same, but the practical considerations differ. An open cockpit means direct sun on the shoulders and back with no roof, real airflow over the driver that a well-cut suit can use rather than trap, a low reclined seating position that affects shoulder and torso-length fit, and more exposure in an off — which makes shoulder and elbow panel construction more important than in a closed car.",
      },
    },
    {
      "@type": "Question",
      "name": "Is the Rush SR related to Rush Race Gear?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The Rush SR is a purpose-built open-cockpit spec sports racer manufactured by Rush Auto Works. Rush Race Gear is a separate and unrelated racing apparel brand. They share a word in the name but are different companies in different businesses.",
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
      <RushSrRaceSuitContent />
      <Footer3 />
    </>
  );
}
