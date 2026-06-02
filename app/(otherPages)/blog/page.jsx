import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogListing from "@/components/hsRaceGear/blog/BlogListing";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog" },
  // "Blog" as the first word gets no clicks — lead with content value
  title: "Racing Gear Guides — SFI Ratings, Custom Suit Tips & Fit Advice | HS Race Gear",
  description:
    "Guides on SFI ratings explained, how to measure for a custom race suit, choosing the right suit for circle-track, drag, and karting. Written by racers, for racers.",
  keywords:
    "racing suit guide, SFI ratings, SFI suit ratings, SFI ratings by class, how to measure for a racing suit, custom race suit tips, sprint car racing suit, drag racing suit, dirt late model suit, karting suit, endurance racing suit, aftermarket racing suits, motorsports safety gear",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" }
  ]
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <BlogListing />
      <Footer3 />
    </>
  );
}
