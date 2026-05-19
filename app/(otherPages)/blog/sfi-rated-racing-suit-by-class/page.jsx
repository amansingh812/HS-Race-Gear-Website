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
    "SFI rated racing suit, SFI rating by class, what SFI rating do I need, SFI 3.2A/1 vs 3.2A/5, SFI 3.2A/15, sprint car SFI rating, drag racing SFI rating, dirt late model SFI, karting SFI rating, road racing SFI, powerboat SFI",
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
      <Topbar1 />
      <Header3 />
      <BlogPost5SFIByClass />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
