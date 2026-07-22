import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost6Endurance from "@/components/hsRaceGear/blog/BlogPost6Endurance";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/blog/endurance-racing-suit-guide" },
  // Timely (Le Mans 2026 is June 13–14) capturing endurance-related search
  // spillover. Targets amateur endurance racers — Lemons, NASA, World
  // Racing League, 25 Hours of Thunderhill, Daytona supporting series.
  title: "Endurance Racing Suits (2026): Le Mans Gear vs What You Actually Need",
  description:
    "What makes Le Mans drivers' endurance racing suits different — FIA 8856-2018 vs SFI 3.2A/5, multi-driver fit, heat management at hour 14, and a custom-suit spec checklist for amateur endurance racers.",
  keywords:
    "endurance racing suit, Le Mans racing suit, FIA 8856-2018, SFI 3.2A/5, multi-driver racing suit, 24 hour racing suit, NASA endurance suit, 24 hours of Lemons suit, ChumpCar suit, 25 hours of Thunderhill, World Racing League suit, custom endurance racing suit",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Endurance Racing Suits Explained — What Makes Le Mans Drivers' Gear Different (And What You Actually Need)",
  "description":
    "Le Mans gear vs amateur endurance racing suits — FIA 8856-2018 vs SFI 3.2A/5, multi-driver fit, heat management at hour 14, pit-lane transitions, and a custom-suit spec checklist.",
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
  "datePublished": "2026-06-01",
  "dateModified": "2026-06-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/endurance-racing-suit-guide"
  },
  "about": [
    { "@type": "Thing", "name": "24 Hours of Le Mans" },
    { "@type": "Thing", "name": "FIA 8856-2018" },
    { "@type": "Thing", "name": "SFI 3.2A/5" },
    { "@type": "Thing", "name": "Endurance Racing" },
    { "@type": "Thing", "name": "NASA Endurance" },
    { "@type": "Thing", "name": "24 Hours of Lemons" },
    { "@type": "Thing", "name": "25 Hours of Thunderhill" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Endurance Racing Suits", "item": "https://www.hsracegear.com/blog/endurance-racing-suit-guide" }
  ]
};

// FAQPage schema added 2026-06-01 — back-porting the team's pattern.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the difference between FIA 8856-2018 and SFI 3.2A/5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FIA 8856-2018 is the international standard required by World Endurance Championship, IMSA professional classes, and SRO international series. SFI 3.2A/5 is the dominant US standard required by SCCA, NASA, and most US amateur endurance organizations. The two are roughly equivalent in real-world fire protection — they differ mainly in testing methodology and documentation. FIA-spec suits cost 3–4× more, mostly for the documentation overhead."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a Le Mans-spec FIA 8856-2018 suit for amateur endurance racing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Almost never. The only US amateur-tier series that requires FIA 8856-2018 is IMSA Michelin Pilot Challenge. SCCA, NASA, World Racing League, 24 Hours of Lemons, ChumpCar, and the 25 Hours of Thunderhill all accept SFI 3.2A/5 — and a custom SFI 3.2A/5 suit costs roughly $329 vs $2,500+ for an FIA 8856-2018."
      }
    },
    {
      "@type": "Question",
      "name": "Can multiple drivers share one endurance racing suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technically yes in non-FIA classes, but it's not recommended. A suit cut for a 6'2\" driver compresses badly on a 5'8\" teammate, wet suits between stints are unpleasant and increase skin-irritation injury risk, and pit-stop driver changes are faster when each driver suits up before their turn. Most endurance teams that look professional batch-order matching suits with individual driver names — usually at team pricing tiers (3+ suits)."
      }
    },
    {
      "@type": "Question",
      "name": "What SFI rating is required for 24 Hours of Lemons?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "24 Hours of Lemons requires SFI 3.2A/1 minimum, and SFI 3.2A/5 is strongly recommended for driver comfort over 24 hours. ChumpCar has similar requirements. These series run sub-$500 build classes with limited fire risk, so comfort and ventilation matter more than the highest possible rating."
      }
    },
    {
      "@type": "Question",
      "name": "How is an endurance racing suit different from a sprint suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The same SFI 3.2A/5 rating works for both, but endurance suits should prioritize moisture-wicking liners, stretch panels at the underarms and sides for convective cooling, quality YKK zippers tested to 500+ cycles, and pre-installed drink-tube grommets. A sprint suit technically passes tech for endurance — it just becomes miserable by hour 14, which makes the driver unsafe even if the suit's compliant."
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
      <BlogPost6Endurance />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
