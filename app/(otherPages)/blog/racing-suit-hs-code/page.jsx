import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost6HSCode from "@/components/hsRaceGear/blog/BlogPost6HSCode";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog/racing-suit-hs-code" },
  // Targets: "racing suit hs code" (pos 1.9, 14 imp, 0 clicks) — already nearly #1,
  // needs a dedicated page with the right title to earn the click.
  title: "What Is the HS Code for a Racing Suit? (Import & Customs Guide)",
  description:
    "The HS code for racing suits (fire-resistant Nomex suits) is 6210.40. Learn exactly how to classify race suits, gloves, and shoes for customs, plus import duty rates by country.",
  keywords:
    "racing suit hs code, race suit customs code, fire suit hs code, Nomex suit import code, racing suit tariff code, hs code 6210, customs code racing gear, import racing suit",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is the HS Code for a Racing Suit? (Import & Customs Guide)",
  "description":
    "The HS code for fire-resistant racing suits is 6210.40. Covers race suits, gloves, and shoes — with import duty notes for the US, UK, EU, Canada, and Australia.",
  "image": "https://www.hsracegear.com/images/blog/racing-suit-hs-code.webp",
  "author": { "@type": "Organization", "name": "HS Race Gear" },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-05-23",
  "dateModified": "2026-05-23",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/racing-suit-hs-code"
  },
  "about": [
    { "@type": "Thing", "name": "HS Code 6210" },
    { "@type": "Thing", "name": "Nomex Racing Suit" },
    { "@type": "Thing", "name": "Racing Gear Import" },
    { "@type": "Thing", "name": "Customs Tariff Classification" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Racing Suit HS Code", "item": "https://www.hsracegear.com/blog/racing-suit-hs-code" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the HS code for a racing suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The HS code for a fire-resistant racing suit (Nomex or similar) is 6210.40 — garments made of fire-resistant or flame-retardant materials of man-made fibres. Some countries use the more specific 6210.40.10 or 6210.40.9090 depending on their national tariff schedule."
      }
    },
    {
      "@type": "Question",
      "name": "What HS code covers Nomex fire suits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nomex fire suits are classified under HS heading 6210 — garments made of fire-resistant fabrics. The 6-digit subheading 6210.40 covers fire-resistant garments for men or boys of man-made fibres. The exact 8–10 digit code depends on your country's national tariff schedule."
      }
    },
    {
      "@type": "Question",
      "name": "What is the HS code for racing gloves?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fire-resistant racing gloves are typically classified under HS code 6216.00 (gloves, mittens and mitts). If they are textile-based with fire-resistant properties, they may fall under 6216.00.58 or similar subheadings depending on the importing country."
      }
    },
    {
      "@type": "Question",
      "name": "Do I pay import duty on a racing suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Import duty rates vary by country. In the United States, most racing suits imported under HTS 6210.40.9090 carry a duty rate of around 4.3–16%. In the EU, duty on fire-resistant garments under CN 6210.40 is typically 12%. In the UK and Canada, rates also vary. Always confirm with your country's customs authority or a licensed customs broker."
      }
    }
  ]
};

export default function BlogPost6Page() {
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
      <BlogPost6HSCode />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
