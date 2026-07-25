import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsHrxContent from "@/components/hsRaceGear/compare/vsHrx/VsHrxContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Created 2026-07-26 from live GSC 3-month data: six distinct HRX queries
// surfaced with impressions but zero targeting on our side —
// "hrx race suits" (2 imp, pos 51.5), "hrx racing suit" (1, pos 56),
// "hrx suit" (1, pos 56), "hrx suits" (1, pos 56).
// Google is already matching us loosely; this page gives it something real
// to rank. Same structure as the five existing /compare/vs-* pages.
export const metadata = {
  alternates: { canonical: "/compare/vs-hrx" },
  title: "HRX Race Suits Alternative — Custom SFI Suits Made in USA From $329 | HS Race Gear",
  description:
    "Comparing HRX racing suits? See HS Race Gear vs HRX — custom SFI 3.2A/1 and 3.2A/5 certified race suits made in the USA, measured to your body, 2–3 week production, unlimited design revisions. From $329 with free shipping.",
  keywords:
    "hrx race suits, hrx racing suit, hrx suits, hrx suit, HRX alternative, custom SFI race suit, made in USA racing suit, custom racing suit, SFI 3.2A/5 suit",
  openGraph: {
    title: "HRX Race Suits Alternative — Custom SFI Suits Made in USA | HS Race Gear",
    description:
      "Custom SFI-certified race suits made in the USA, measured to your body. 2–3 week production, unlimited design revisions, from $329 with free shipping.",
    url: "https://www.hsracegear.com/compare/vs-hrx",
    siteName: "HS Race Gear",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
    { "@type": "ListItem", "position": 3, "name": "HS Racegear vs HRX", "item": "https://www.hsracegear.com/compare/vs-hrx" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are HS Race Gear suits made in the USA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every HS Race Gear custom suit is manufactured in the United States at our Watertown, Massachusetts facility. That means shorter shipping times for US racers, no international customs delays, and direct communication with the team building your suit."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a custom SFI-certified race suit cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HS Race Gear custom SFI-certified race suits start at $329 with free shipping. That price includes custom measurement, your choice of colors and layout, sponsor logos, driver name, country flag, and unlimited design revisions before production begins."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a custom race suit take to produce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HS Race Gear runs a 2–3 week production timeline on custom suits. The process is: measurement form, digital mockup, your revisions, production, quality control, then ship. You approve the mockup before anything is cut."
      }
    },
    {
      "@type": "Question",
      "name": "What SFI rating do I need for my racing series?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/1 is single-layer with about 3 seconds of thermal protection, used in entry-level classes, karting, and sportsman drag. SFI 3.2A/5 is multi-layer with 7–10 seconds and is required by USAC, World of Outlaws, ASCS, and most dirt late model and sprint car sanctioning bodies. Always confirm against your current series rulebook."
      }
    }
  ]
};

export default function VsHrxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <VsHrxContent />
      <Footer3 />
    </>
  );
}
