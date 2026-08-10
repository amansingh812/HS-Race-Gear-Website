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
  // DE-CANNIBALIZED 2026-08-11. Four pages were all titled "SFI ... Ratings
  // (2026)" — /certifications, this post, sfi-rated-racing-suit-by-class, and
  // sfi-vs-fia-rating. Result: "sfi ratings" (111 imp) and "sfi suit ratings"
  // (95 imp) both stuck at position ~30 with the signal split four ways.
  //
  // Ownership split is now:
  //   /certifications                 -> rating TIERS ("sfi ratings", "sfi suit ratings", "sfi rating chart")
  //   THIS POST                       -> DEFINITIONAL ("what is sfi", "sfi certified", "sfi approved")
  //   /blog/sfi-rated-racing-suit-by-class -> per-CLASS requirements
  //   /blog/sfi-vs-fia-rating         -> SFI vs FIA only
  //
  // This post now targets the definitional cluster, which is unclaimed:
  // "sfi certification racing" 16 imp @ pos 16, "what is sfi approved" 10 @ 13.7,
  // "sfi approved" 23 @ 12.4, "what is sfi" 5 @ 20, "sfi certified" 21 @ 55.7.
  // Deliberately does NOT use the word "ratings" in the title.
  title: "What Does SFI Certified Mean? Racing Suit Certification Guide",
  description:
    "SFI certification explained — what SFI stands for, what \"SFI approved\" actually means on a race suit tag, who the SFI Foundation is, how suits are tested and re-certified, and how to check a tag is genuine before tech inspection.",
  keywords:
    "what does SFI certified mean, what is SFI approved, SFI certified, SFI approved, SFI certification racing, what is SFI, what does SFI stand for, SFI Foundation, SFI certification guide, SFI tag, SFI recertification, racing suit certification",
};

// JSON-LD: Article + BreadcrumbList
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Does SFI Certified Mean? Racing Suit Certification Guide",
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
