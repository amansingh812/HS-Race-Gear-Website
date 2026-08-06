import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost3SFI from "@/components/hsRaceGear/blog/BlogPost3SFI";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/blog/understanding-sfi-certifications" },
  // Title updated 2026-07-16 based on live GSC — "sfi ratings" 37 imp / 28d,
  // "sfi suit ratings" 34 imp / 28d, both 0 clicks at position 15-17. Added
  // year for freshness signal + explicit tier numbers for click magnetism.
  title: "SFI Suit Ratings Explained (2026): 3.2A/1, 3.2A/5, 3.2A/15 — Which One You Need",
  description:
    "SFI suit ratings decoded — 3.2A/1 (3s protection), 3.2A/5 (10s), 3.2A/15 (drag racing top tier). Which SFI rating your class actually requires, tech inspection tips, and 2026 rulebook changes.",
  keywords:
    "SFI ratings, SFI suit ratings, SFI requirements, SFI requirements racing suit, SFI 3.2A/1, SFI 3.2A/5, SFI 3.2A/15, SFI 3.3/5, TPP thermal protective performance, SFI certification guide, racing suit ratings, fire suit ratings, fire suit requirements",
};

// JSON-LD: Article + BreadcrumbList
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SFI Ratings Explained — Which Certification Does Your Race Suit Need?",
  "description":
    "SFI 3.2A/1, 3.2A/5, 3.2A/15 demystified. What SFI ratings mean, what TPP measures, and which SFI suit rating you need for drag, sprint car, dirt, karting, and road racing.",
  "image": "https://www.hsracegear.com/images/blog/understanding-sfi-certifications.webp",
  "author": { "@type": "Organization", "name": "HS Race Gear" },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-01-22",
  "dateModified": "2026-05-16",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/understanding-sfi-certifications"
  },
  "about": [
    { "@type": "Thing", "name": "SFI 3.2A/1" },
    { "@type": "Thing", "name": "SFI 3.2A/5" },
    { "@type": "Thing", "name": "SFI 3.2A/15" },
    { "@type": "Thing", "name": "TPP — Thermal Protective Performance" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "SFI Ratings Explained", "item": "https://www.hsracegear.com/blog/understanding-sfi-certifications" }
  ]
};

export default function BlogPost3Page() {
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
      <BlogPost3SFI />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
