import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost5SFIByClass from "@/components/hsRaceGear/blog/BlogPost5SFIByClass";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/blog/sfi-rated-racing-suit-by-class" },
  // Targeting confirmed GSC queries: "sfi rated racing suit" (14 imp/0 clicks),
  // "sfi ratings" (75 imp/0 clicks), "sfi suit ratings" (67 imp/0 clicks).
  // Different angle than /blog/understanding-sfi-certifications — practical
  // rating-by-discipline rather than background explainer.
  title: "SFI Rated Racing Suit by Class — Which SFI Rating You Actually Need",
  description:
    "SFI rating by discipline — sprint car, dirt late model, drag racing, karting, road racing, powerboat. The exact SFI 3.2A rating you need for the car you actually race, in one practical guide.",
  keywords:
    "SFI rated racing suit, SFI rating by class, SFI requirements, SFI requirements racing suit, what SFI rating do I need, SFI 3.2A/1 vs 3.2A/5, SFI 3.2A/15, sprint car SFI rating, drag racing SFI rating, dirt late model SFI, karting SFI rating, road racing SFI, powerboat SFI",
};

// JSON-LD: Article + BreadcrumbList
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SFI Racing Suit Ratings by Class — Which Rating You Actually Need",
  "description":
    "Discipline-by-discipline guide to picking the right SFI 3.2A rating: sprint car, dirt late model, drag racing, karting, road racing, powerboat, and how class ETs drive the rating you need.",
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
  "datePublished": "2026-05-17",
  "dateModified": "2026-05-17",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/sfi-rated-racing-suit-by-class"
  },
  "about": [
    { "@type": "Thing", "name": "SFI 3.2A/1" },
    { "@type": "Thing", "name": "SFI 3.2A/5" },
    { "@type": "Thing", "name": "SFI 3.2A/10" },
    { "@type": "Thing", "name": "SFI 3.2A/15" },
    { "@type": "Thing", "name": "SFI 3.2A/20" },
    { "@type": "Thing", "name": "Sprint Car Racing" },
    { "@type": "Thing", "name": "Drag Racing" },
    { "@type": "Thing", "name": "Dirt Late Model Racing" },
    { "@type": "Thing", "name": "Karting" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "SFI Rated Racing Suit by Class", "item": "https://www.hsracegear.com/blog/sfi-rated-racing-suit-by-class" }
  ]
};

// FAQPage schema added 2026-06-01 — back-porting the team's pattern from
// BlogPost7DragRacing for rich-result eligibility on People-Also-Ask SERP.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What SFI rating do I need for sprint car racing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/5 is the practical floor for sprint car racing — both asphalt and dirt. It's a multi-layer Nomex® suit and is required by most weekly sprint divisions including USAC, World of Outlaws, and ASCS. Upper-tier touring sprint series sometimes require SFI 3.2A/10."
      }
    },
    {
      "@type": "Question",
      "name": "What SFI rating do I need for NHRA drag racing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your elapsed time: SFI 3.2A/1 or 3.2A/5 for cars running 10.00 ET or slower, SFI 3.2A/15 for 9.99 to 7.50 ET, and SFI 3.2A/20 for Top Fuel, Funny Car, and other nitro classes. NHRA tech officials check your timing slip — buy for the car you intend to build, not the one in the trailer today."
      }
    },
    {
      "@type": "Question",
      "name": "Is SFI 3.2A/1 enough for karting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — SFI 3.2A/1 in a CIK-rated karting suit is almost always enough. Karting bodies like WKA, SKUSA, and Rotax Max Challenge USA specify CIK Level 2 suits, which test for abrasion (the primary karting injury risk) while providing the fire-retardant baseline equivalent to SFI 3.2A/1."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between SFI 3.2A/1 and SFI 3.2A/5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/1 is a single-layer suit with entry-level fire protection (about 3 seconds before second-degree burn). SFI 3.2A/5 is a multi-layer Nomex® construction with significantly higher TPP score (7–10 seconds of protection). 3.2A/5 is the practical standard for competitive sprint car, dirt late model, road racing, and circle track."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a higher SFI rating than my class requires?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Most sanctioning bodies set a minimum SFI rating per class but no upper cap. Going up a tier makes sense if you expect to move up a class within 12 months, your car runs hot (methanol, alcohol, header proximity), or your series has mid-season rule changes. The cost is reduced breathability and added weight."
      }
    }
  ]
};

export default function BlogPost5Page() {
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
      <BlogPost5SFIByClass />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
