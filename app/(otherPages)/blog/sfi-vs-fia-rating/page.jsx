import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost11SfiVsFia from "@/components/hsRaceGear/blog/BlogPost11SfiVsFia";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

// Created 2026-07-26 from live GSC 3-month data. Three separate query
// variants were surfacing with impressions but NO dedicated page:
//   "sfi vs fia rating"    — 3 impr, pos 37.3
//   "sfi vs fia"           — 3 impr, pos 49.0
//   "fia 8856-2018 vs sfi" — 2 impr, pos 38.5
// Uncontested, directly in our topical wheelhouse, and a strong
// AI-engine citation target (clear comparative structure + explicit facts).
export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog/sfi-vs-fia-rating" },
  title: "SFI vs FIA Rating (2026): Which Racing Suit Certification Do You Need?",
  description:
    "SFI vs FIA 8856-2018 compared — how the two racing suit certifications differ, why an SFI tag won't always pass FIA tech (and vice versa), what SCCA accepts, and how to tell which one your series requires in 2026.",
  keywords:
    "sfi vs fia, sfi vs fia rating, fia 8856-2018 vs sfi, fia vs sfi racing suit, sfi or fia certification, fia 8856-2018, sfi 3.2a/5, racing suit certification, scca fire suit certification, which sfi rating do i need",
  openGraph: {
    title: "SFI vs FIA Rating (2026): Which Racing Suit Certification Do You Need?",
    description:
      "Two certification bodies, two test methods, almost no overlap in who accepts what. The practical difference between SFI 3.2A and FIA 8856-2018.",
    url: "https://www.hsracegear.com/blog/sfi-vs-fia-rating",
    siteName: "HS Race Gear",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SFI vs FIA Rating — Which Racing Suit Certification Do You Actually Need?",
  "description":
    "SFI 3.2A is tiered and used by US sanctioning bodies; FIA 8856-2018 is a single pass/fail standard used internationally. A suit certified to one is not automatically accepted by the other.",
  "image": "https://www.hsracegear.com/images/home/blog_1.webp",
  "author": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "url": "https://www.hsracegear.com",
    "description": "Custom SFI-certified racing suit manufacturer. 10+ years building custom suits for sprint car, drag, dirt late model, karting, road racing, and powerboat disciplines."
  },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-07-26",
  "dateModified": "2026-07-26",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/sfi-vs-fia-rating"
  },
  "about": [
    { "@type": "Thing", "name": "SFI Foundation" },
    { "@type": "Thing", "name": "FIA 8856-2018" },
    { "@type": "Thing", "name": "SFI 3.2A/1" },
    { "@type": "Thing", "name": "SFI 3.2A/5" },
    { "@type": "Thing", "name": "SFI 3.2A/15" },
    { "@type": "Thing", "name": "Thermal Protective Performance" },
    { "@type": "Thing", "name": "Racing Suit Certification" },
    { "@type": "Thing", "name": "SCCA" }
  ],
  "citation": [
    { "@type": "CreativeWork", "name": "SFI Foundation Spec 3.2A", "url": "https://www.sfifoundation.com/" },
    { "@type": "CreativeWork", "name": "FIA Technical List — Homologated Racewear", "url": "https://www.fia.com/" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "SFI vs FIA Rating", "item": "https://www.hsracegear.com/blog/sfi-vs-fia-rating" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between SFI and FIA racing suit ratings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A is a tiered US standard from the SFI Foundation, where the number after the slash corresponds to a Thermal Protective Performance rating — 3.2A/1 is single-layer with roughly 3 seconds of protection, 3.2A/5 is multi-layer with 7–10 seconds, and 3.2A/15 provides around 30 seconds. FIA 8856-2018 is a single pass/fail international standard tested at FIA-approved laboratories on the complete garment rather than the fabric alone. They measure different things under different test conditions and are not directly convertible."
      }
    },
    {
      "@type": "Question",
      "name": "Will an FIA-certified suit pass US tech inspection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not reliably. A tech inspector looking for an SFI 3.2A/5 tag will generally not accept an FIA 8856-2018 label as a substitute unless the series rulebook explicitly permits it. US sanctioning bodies including NHRA, IHRA, USAC, World of Outlaws, ASCS and POWRi write their rules around SFI specifications."
      }
    },
    {
      "@type": "Question",
      "name": "Does SCCA accept SFI or FIA certification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SCCA generally accepts either SFI 3.2A/5 or FIA 8856-2018 for most club racing classes, with the acceptable options specified by class in the GCR. NASA, vintage groups and regional road racing organizations vary — some mirror SCCA and accept both, others specify one. Always confirm against the current-season rulebook for your specific class."
      }
    },
    {
      "@type": "Question",
      "name": "Do racing suit certifications expire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SFI tags expire five years from the date of manufacture, printed on the tag. FIA 8856-2018 homologation labels run ten years from the homologation date. An expired tag fails tech inspection regardless of the suit's physical condition."
      }
    },
    {
      "@type": "Question",
      "name": "Is FIA certification better than SFI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FIA testing is more rigorous procedurally — independent laboratory testing of the complete garment rather than manufacturer self-certification of fabric. But an SFI 3.2A/15 suit provides considerably more thermal protection than the FIA 8856-2018 minimum. A stricter testing process and a higher protection level are different claims. The right choice depends on where you compete and what your class requires."
      }
    }
  ]
};

export default function SfiVsFiaRatingPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <BlogPost11SfiVsFia />
      <Footer3 />
    </>
  );
}
