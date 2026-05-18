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
  title: "5 Essential Tips for Getting the Perfect Custom Fit Racing Suit | HS Race Gear Blog",
  description:
    "Learn how to get the perfect custom racing suit fit with these 5 essential tips — from accurate body measurements and driving posture to mobility zones and SFI compliance.",
  keywords:
    "custom racing suit fit, racing suit measurements, SFI racing suit, custom fit racing suit tips, how to measure for racing suit",
};

// JSON-LD: Article + BreadcrumbList for rich SERP eligibility
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "5 Essential Tips for Getting the Perfect Custom Fit Racing Suit",
  "description":
    "Five essential tips to nail your custom racing suit measurements — accurate body measurements, driving posture, mobility zones, SFI compliance, and the fit-check process.",
  "image": "https://www.hsracegear.com/images/home/blog3.png",
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
      <Footer3 />
    </>
  );
}
