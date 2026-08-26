import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CikFiaContent from "@/components/hsRaceGear/certifications/CikFiaContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Created 2026-08-11 — karting certification hub.
//
// Why this page exists: the site had 11 pages about SFI and zero about
// CIK-FIA. Karting does not run on SFI. Every bit of SFI authority built so
// far is invisible to a karting buyer, and three kart landers were asserting
// "CIK Level 2" with nothing behind it.
//
// Structural role: this is the karting twin of /certifications — top-of-funnel
// education that feeds link equity to /custom-karting-suit,
// /custom-junior-karting-suit and /custom-shifter-kart-suit.
//
// Target keywords (Keyword Planner, US, ~350/mo combined):
//   cik fia level 2 (50), cik level 2 (50), cik fia level 2 suit (50),
//   cik fia level 2 approved (50), cik fia level 2 fireproof (50),
//   cik level 2 kart suit (50), cik kart suit (50)
// Direct volume understates value — this page answers the question that gates
// the purchase decision for karting parents.
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/cik-fia-level-2" },
  title: "CIK-FIA Level 2 Explained: Karting Suit Certification Guide",
  description:
    "CIK-FIA Level 2 decoded — what the karting suit standard tests, how FIA 8877-2022 replaces it and what the 2029 deadline means for a suit you buy today, why an SFI car suit won't pass karting tech, and which US series (WKA, SKUSA, Rotax, IAME) require what.",
  keywords:
    "cik fia level 2, cik level 2, cik fia level 2 suit, cik fia level 2 approved, cik fia level 2 fireproof, cik level 2 kart suit, cik kart suit, fia 8877-2022, fia 8877 2022 karting, fia 8877 kart suit, cik level 2 vs fia 8877, karting suit certification, CIK homologation, kart suit homologation, CIK vs SFI, WKA suit requirements, SKUSA suit requirements",
  openGraph: {
    type: "article",
    title: "CIK-FIA Level 2 Explained: Karting Suit Certification Guide",
    description:
      "What CIK-FIA Level 2 actually tests, why an SFI car suit won't pass karting tech, and how to read a homologation tag before it expires.",
    url: "https://www.hsracegear.com/cik-fia-level-2",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "CIK-FIA Level 2", "item": "https://www.hsracegear.com/cik-fia-level-2" },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "CIK-FIA Level 2 Explained: Karting Suit Certification Guide",
  "description":
    "What CIK-FIA Level 2 tests, how it differs from Level 1 and from SFI, how to read a homologation tag, and which US karting series require it.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "author": { "@type": "Organization", "name": "HS Race Gear" },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": { "@type": "ImageObject", "url": "https://www.hsracegear.com/images/logo/logo.png" },
  },
  "datePublished": "2026-08-11",
  "dateModified": "2026-08-11",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.hsracegear.com/cik-fia-level-2" },
};

// FAQPage targets the question-form variants of the head keywords and is the
// most likely block to be cited by AI answer engines.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CIK-FIA Level 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CIK-FIA Level 2 is the homologation standard for karting suits published by the Commission Internationale de Karting, the karting arm of the FIA. A Level 2 suit has been tested by an FIA-accredited laboratory and issued a homologation number tied to that specific suit model. It is the baseline requirement at WKA, SKUSA, Rotax Max Challenge USA, IAME USA and most regional US karting series.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the difference between CIK-FIA Level 1 and Level 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The numbering runs opposite to what most people assume. Level 2 is the standard specification written into US series rulebooks and is what the vast majority of karting drivers need. Level 1 is a higher specification generally used for CIK international competition. A Level 1 suit satisfies a Level 2 requirement, but paying for Level 1 at club or regional level buys protection the rulebook does not ask for.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I wear an SFI racing suit for karting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally no. SFI 3.2A rates thermal protection against fire, because a race car carries fuel. CIK-FIA Level 2 rates abrasion resistance, because the realistic karting hazard is a driver sliding along the track surface. An SFI car racing suit will usually not pass karting tech inspection even though it may be more expensive, because it was engineered for a different hazard. The reverse is also true — a CIK Level 2 karting suit is not a substitute for an SFI suit in a car.",
      },
    },
    {
      "@type": "Question",
      "name": "Do CIK-FIA homologations expire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A CIK-FIA homologation is issued with a validity period printed on the suit tag. Once it lapses the suit is no longer compliant regardless of physical condition. This matters most when buying used — a suit that looks fine may already be outside its homologation window. Check the validity date before each season rather than on race morning.",
      },
    },
    {
      "@type": "Question",
      "name": "Is CIK-FIA Level 2 still valid, or has FIA 8877-2022 replaced it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both are true at the moment. FIA 8877-2022 has replaced the CIK-FIA Level system, and manufacturers could no longer produce new suits to the old Level standard after 31 December 2024. However, Level 2 suits manufactured before that cut-off remain accepted in line with the expiry printed on their label, up to 31 December 2029. From 1 January 2030 only FIA 8877-2022 is accepted at events run under FIA safety regulations. A Level 2 suit bought today is legal to race in but has a shorter useful life than its five-year label validity might suggest."
      }
    },
    {
      "@type": "Question",
      "name": "Does a karting suit have a TPP rating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. TPP (Thermal Protective Performance) is an SFI measurement of seconds of protection against direct flame. CIK-FIA Level 2 does not use TPP because it assesses abrasion resistance, tear strength, seam integrity and coverage rather than thermal performance. There is no single headline number for a karting suit the way there is for an SFI suit.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Topbar1 />
      <Header3 />
      <CikFiaContent />
      <Footer3 />
    </>
  );
}
