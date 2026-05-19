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
  // Title rewritten 2026-05-16 to capture "SFI ratings" (74 imp/3mo) and
  // "SFI suit ratings" (66 imp/3mo) — both 0-click queries we already
  // surface for but with the wrong-word title.
  title: "SFI Ratings Explained — Which Certification Does Your Race Suit Need?",
  description:
    "SFI ratings explained: SFI 3.2A/1, 3.2A/5, and 3.2A/15 demystified. What TPP scores mean, which SFI suit rating you need for drag, sprint car, dirt, karting, and road racing, and how to pass tech inspection every time.",
  keywords:
    "SFI ratings, SFI suit ratings, SFI 3.2A/1, SFI 3.2A/5, SFI 3.2A/15, SFI 3.3/5, TPP thermal protective performance, SFI certification guide, racing suit ratings, fire suit ratings",
};

// JSON-LD: Article + BreadcrumbList
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SFI Ratings Explained — Which Certification Does Your Race Suit Need?",
  "description":
    "SFI 3.2A/1, 3.2A/5, 3.2A/15 demystified. What SFI ratings mean, what TPP measures, and which SFI suit rating you need for drag, sprint car, dirt, karting, and road racing.",
  "image": "https://www.hsracegear.com/images/home/blog_1.webp",
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
