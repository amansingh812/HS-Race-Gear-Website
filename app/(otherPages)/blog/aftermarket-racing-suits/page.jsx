import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost4Aftermarket from "@/components/hsRaceGear/blog/BlogPost4Aftermarket";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/blog/aftermarket-racing-suits" },
  // Targeting confirmed GSC query "aftermarket auto racing suits" — added
  // 2026 year and USA angle 2026-07-16 to align with US buyer traffic (72%
  // of total impressions).
  title: "Aftermarket Racing Suits (2026): When to Upgrade From Stock Gear | Made in USA",
  description:
    "2026 aftermarket racing suit buyer's guide. When to upgrade, what SFI rating you need, Nomex® vs generic FR, custom vs off-the-rack, 5 signs your current suit is done. Made in USA options.",
  keywords:
    "aftermarket racing suit, aftermarket auto racing suits, upgrade racing suit, custom racing suit, SFI racing suit, Nomex racing suit, racing suit buyer's guide, when to replace racing suit",
};

// JSON-LD: Article + BreadcrumbList
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Aftermarket Racing Suits: When to Upgrade From Stock Gear (And What to Look For)",
  "description":
    "Aftermarket racing suit buyer's guide — when to upgrade, what SFI rating you need, Nomex® vs generic FR, custom vs off-the-rack, and the five signs your current suit is done.",
  "image": "https://www.hsracegear.com/images/home/blog2.webp",
  "author": { "@type": "Organization", "name": "HS Race Gear" },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-05-16",
  "dateModified": "2026-05-16",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/aftermarket-racing-suits"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Aftermarket Racing Suits", "item": "https://www.hsracegear.com/blog/aftermarket-racing-suits" }
  ]
};

export default function BlogPost4Page() {
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
      <BlogPost4Aftermarket />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
