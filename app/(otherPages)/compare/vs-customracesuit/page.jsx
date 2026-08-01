import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsCustomRaceSuitContent from "@/components/hsRaceGear/compare/vsCustomRaceSuit/VsCustomRaceSuitContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Created 2026-08-01 from live GSC 28-day data.
//
// "customracesuit" is our single highest-impression query — 73 impressions
// at position 20.9 (page 2) with zero clicks and no page targeting it.
//
// The query is ambiguous in a useful way: it reads either as a brand search
// (customracesuit.com) or as "custom race suit" typed without spaces. This
// page is written to satisfy BOTH intents rather than guessing — it answers
// the buying question directly instead of asserting unverified claims about
// a competitor's pricing or lead times.
//
// It also targets the wider custom-* cluster that is currently stranded on
// pages 3–5: "custom racing suit" (pos 39.7), "custom race suits" (43.7),
// "custom racing suits" (42.6), "custom nomex suit" (20.8), "custom race
// gear" (28.0), "custom racewear" (43.5), "custom made racing suits" (46.5).
export const metadata = {
  alternates: { canonical: "/compare/vs-customracesuit" },
  // Title kept under ~60 chars and description under ~155 so neither is
  // truncated in the SERP — the whole point of this page is earning the click.
  title: "Custom Race Suits Compared — SFI-Certified, Made in USA",
  description:
    "Compare custom race suits on what matters: SFI rating, fit process, all-in price, lead time. Custom-measured SFI suits made in USA, 2–3 weeks, from $329.",
  keywords:
    "customracesuit, custom race suit, custom race suits, custom racing suit, custom racing suits, custom made racing suits, custom racewear, custom race gear, custom nomex racing suit, custom SFI race suit, custom race car suits",
  openGraph: {
    title: "Custom Race Suit Comparison — SFI-Certified, Made in USA From $329",
    description:
      "Compare custom race suits on SFI rating, fit process, all-in price and lead time. Built to your measurements in the USA, 2–3 weeks, from $329.",
    url: "https://www.hsracegear.com/compare/vs-customracesuit",
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
    { "@type": "ListItem", "position": 3, "name": "Custom Race Suit Comparison", "item": "https://www.hsracegear.com/compare/vs-customracesuit" }
  ]
};

// FAQPage schema — these five questions mirror real GSC queries
// ("what does the sfi 3.2a/5 rating mean on racing suits?", "race suit
// sizing", "how do i choose the right size racing fire suit...") and make
// the page eligible for FAQ rich results.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a custom race suit cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HS Race Gear custom SFI-certified race suits start at $329 with free shipping. That price includes custom measurement, unlimited colour and layout choices, sponsor logos, driver name embroidery, and unlimited design revisions before production begins. When comparing quotes elsewhere, check whether design fees, logo setup and expedited shipping are extra — those add-ons often move a headline price significantly."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a custom race suit take to make?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HS Race Gear runs a 2–3 week production timeline on custom suits. The sequence is: measurement form, digital mockup, your revisions, production, quality control, then ship. You approve the mockup before any fabric is cut, and revisions at that stage are unlimited and free."
      }
    },
    {
      "@type": "Question",
      "name": "What SFI rating do I need for my racing class?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/1 is single-layer with roughly 3 seconds of thermal protection, used in entry-level classes, karting and sportsman drag. SFI 3.2A/5 is multi-layer with roughly 7–10 seconds and is required by USAC, World of Outlaws, ASCS and most dirt late model and sprint car sanctioning bodies. Always confirm the current requirement with your specific series before ordering."
      }
    },
    {
      "@type": "Question",
      "name": "Is a custom-measured race suit better than off-the-rack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A custom suit is measured to fit you seated in the car rather than standing in a fitting room. That matters for safety and control: a suit that binds at the shoulders costs steering range, and excess fabric at the knees can catch on the cage during an egress test. Off-the-rack works well when the sizing happens to match your proportions and you need gear immediately."
      }
    },
    {
      "@type": "Question",
      "name": "Where are HS Race Gear suits made?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All HS Race Gear suits are manufactured in the United States at our Watertown, Massachusetts facility. Domestic production means no international customs delays, direct communication with the people building your suit, and US-based support if a tech inspector questions your certification."
      }
    }
  ]
};

export default function VsCustomRaceSuitPage() {
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
      <VsCustomRaceSuitContent />
      <Footer3 />
    </>
  );
}
