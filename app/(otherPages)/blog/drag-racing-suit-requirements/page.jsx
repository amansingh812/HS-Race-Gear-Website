import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost7DragRacing from "@/components/hsRaceGear/blog/BlogPost7DragRacing";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog/drag-racing-suit-requirements" },
  title: "Drag Racing Suit Requirements — NHRA, IHRA & Street Strip Fire Suit Rules (2026)",
  description:
    "Which SFI rating do you need for drag racing? NHRA requires SFI 3.2A/1 for 10.00–11.99 ET and SFI 3.2A/5 for 9.99 and quicker. Full breakdown by class, ET, and sanctioning body.",
  keywords:
    "drag racing suit requirements, NHRA fire suit requirement, drag racing fire suit, SFI 3.2A/1 drag racing, SFI 3.2A/5 NHRA, NHRA suit requirements, IHRA fire suit, drag racing safety gear, what fire suit do I need for drag racing",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Drag Racing Suit Requirements — NHRA, IHRA & Street Strip Fire Suit Rules (2026)",
  "description":
    "Which SFI rating you need for drag racing: NHRA requires SFI 3.2A/1 for 10.00–11.99 ET and SFI 3.2A/5 for 9.99 and quicker. Full breakdown by class, ET, and sanctioning body.",
  "image": "https://www.hsracegear.com/images/blog/drag-racing-suit-requirements.webp",
  "author": { "@type": "Organization", "name": "HS Race Gear" },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-05-29",
  "dateModified": "2026-05-29",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/drag-racing-suit-requirements"
  },
  "about": [
    { "@type": "Thing", "name": "NHRA Fire Suit Requirements" },
    { "@type": "Thing", "name": "SFI 3.2A/1 Racing Suit" },
    { "@type": "Thing", "name": "SFI 3.2A/5 Racing Suit" },
    { "@type": "Thing", "name": "Drag Racing Safety Equipment" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Drag Racing Suit Requirements", "item": "https://www.hsracegear.com/blog/drag-racing-suit-requirements" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What SFI rating do I need for NHRA bracket racing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For NHRA bracket racing, you need a minimum SFI 3.2A/1 single-layer suit if your car runs 10.00–11.99. If you run 9.99 or quicker, an SFI 3.2A/5 multi-layer suit is mandatory. Always verify with your specific track as local requirements sometimes exceed the national NHRA baseline."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a fire suit for street/strip nights?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most independent tracks don't require a fire suit for cars running 13.99 or slower. Once you break into the 11s (or 12s with power adders), most tracks require at minimum an SFI 3.2A/1 suit. Call your track to confirm before race day."
      }
    },
    {
      "@type": "Question",
      "name": "How long is an SFI fire suit good for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI certifications on fire suits expire 5 years from the manufacture date printed on the sewn-in label. NHRA tech inspectors check the manufacture date, not the purchase date, so factor this in when budgeting for a new suit."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between SFI 3.2A/1 and SFI 3.2A/5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/1 is a single-layer suit with approximately 3 seconds of protection before a second-degree burn. SFI 3.2A/5 is a multi-layer suit providing approximately 7–10 seconds of protection. The 3.2A/5 is mandatory for NHRA competitors running 9.99 or quicker."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use the same fire suit for drag racing and circle track?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — an SFI 3.2A/5 suit is legal for both NHRA drag racing (9.99 and quicker) and most circle-track sanctioning bodies. The SFI 3.2A standard is the universal drag and circle-track fire suit specification."
      }
    }
  ]
};

export default function BlogPost7Page() {
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
      <BlogPost7DragRacing />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
