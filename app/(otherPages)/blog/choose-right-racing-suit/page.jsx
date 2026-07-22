import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost2ChooseSuit from "@/components/hsRaceGear/blog/BlogPost2ChooseSuit";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/blog/choose-right-racing-suit" },
  // Title updated 2026-07-16 — added "Custom Racing Suit" phrase (GSC 25
  // imp/28d, 0 clicks) + 2026 year signal for freshness.
  title: "How to Choose a Custom Racing Suit by Discipline (2026 Buyer's Guide)",
  description:
    "2026 buyer's guide to SFI-certified custom racing suits by discipline — drag, sprint car, dirt, road racing, karting, endurance. What rating, what construction, what fit for each.",
  keywords:
    "how to choose racing suit, custom racing suit, SFI racing suit guide, racing suit for drag racing, stock car racing suit, sprint car suit buyer guide, made in USA racing suit",
};

// JSON-LD: Article + BreadcrumbList
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Choose the Right Racing Suit for Your Discipline",
  "description":
    "Discipline-by-discipline buyer's guide to SFI certified racing suits — drag, sprint car, stock, road racing, endurance, and karting. What rating, what construction, what fit.",
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
  "datePublished": "2026-02-05",
  "dateModified": "2026-05-16",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/choose-right-racing-suit"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Choose the Right Racing Suit", "item": "https://www.hsracegear.com/blog/choose-right-racing-suit" }
  ]
};

export default function BlogPost2Page() {
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
      <BlogPost2ChooseSuit />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
