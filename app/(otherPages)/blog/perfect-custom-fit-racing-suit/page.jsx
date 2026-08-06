import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost1CustomFit from "@/components/hsRaceGear/blog/BlogPost1CustomFit";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/blog/perfect-custom-fit-racing-suit" },
  // Title updated 2026-07-16 — GSC "custom racing suit" 25 imp/28d 0 clicks.
  // Reordered to lead with the money phrase "Custom Racing Suit" at word
  // position 1 for CTR boost at same ranking.
  title: "Custom Racing Suit Fit — 5 Essential Measurement Tips (2026) | HS Race Gear",
  description:
    "Custom racing suit fit guide — 5 essential body measurement tips for a perfect SFI-certified custom fit. Accurate chest, waist, hip, sleeve, and driving-posture measurements.",
  keywords:
    "custom racing suit, custom racing suit fit, racing suit measurements, SFI racing suit, custom fit racing suit tips, how to measure for racing suit, made in USA racing suit",
};

// JSON-LD: Article + BreadcrumbList for rich SERP eligibility
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "5 Essential Tips for Getting the Perfect Custom Fit Racing Suit",
  "description":
    "Five essential tips to nail your custom racing suit measurements — accurate body measurements, driving posture, mobility zones, SFI compliance, and the fit-check process.",
  "image": "https://www.hsracegear.com/images/blog/perfect-custom-fit-racing-suit.webp",
  "author": { "@type": "Organization", "name": "HS Race Gear" },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-01-10",
  "dateModified": "2026-05-16",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/perfect-custom-fit-racing-suit"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Perfect Custom Fit Racing Suit", "item": "https://www.hsracegear.com/blog/perfect-custom-fit-racing-suit" }
  ]
};

export default function BlogPost1Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <BlogPost1CustomFit />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
