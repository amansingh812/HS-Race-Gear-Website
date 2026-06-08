import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost9Karting from "@/components/hsRaceGear/blog/BlogPost9Karting";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog/karting-suit-sizing-guide" },
  // Phase B Post 5 — karting customer segment, summer peak season.
  // /custom-karting-suit lander currently gets impressions but no clicks;
  // this post funnels informational karting search into the lander.
  title: "Custom Karting Suit Sizing — Junior, Senior, Shifter & CIK Level 2 Explained",
  description:
    "Karting suit guide — CIK Level 1 vs Level 2, junior and cadet fit, senior and shifter spec, WKA/SKUSA/Rotax Max requirements, and how to measure for a custom karting suit that lasts a full season.",
  keywords:
    "karting suit, custom karting suit, junior karting suit, cadet karting suit, senior karting suit, shifter kart suit, CIK Level 2, WKA karting suit, SKUSA karting suit, Rotax Max karting suit, IAME karting suit, karting suit sizing, kart racing suit, custom kart suit",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Custom Karting Suit Sizing — Junior, Senior, Shifter & CIK Level 2 Explained",
  "description":
    "Custom karting suit guide covering CIK Level 1 vs Level 2, junior and cadet fit, senior and shifter spec, sanctioning body requirements (WKA, SKUSA, Rotax Max, IAME), measurements, and replacement schedule.",
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
  "datePublished": "2026-06-02",
  "dateModified": "2026-06-02",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/karting-suit-sizing-guide"
  },
  "about": [
    { "@type": "Thing", "name": "Karting" },
    { "@type": "Thing", "name": "CIK Level 2" },
    { "@type": "Thing", "name": "Junior Karting" },
    { "@type": "Thing", "name": "Cadet Karting" },
    { "@type": "Thing", "name": "Shifter Karting" },
    { "@type": "Thing", "name": "WKA Manufacturers Cup" },
    { "@type": "Thing", "name": "SKUSA Pro Tour" },
    { "@type": "Thing", "name": "Rotax Max Challenge" },
    { "@type": "Thing", "name": "IAME X30" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Karting Suit Sizing Guide", "item": "https://www.hsracegear.com/blog/karting-suit-sizing-guide" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the difference between CIK Level 1 and CIK Level 2 karting suits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CIK Level 1 is entry-level — single-layer abrasion-resistant fabric with fire-retardant treatment, suitable for indoor karting and grassroots arrive-and-drive. CIK Level 2 is the competition standard — multi-layer with abrasion-resistant outer shell, fire-retardant inner liner, and reinforced impact zones. WKA, SKUSA, Rotax Max Challenge USA, IAME USA, and USPKS all require CIK Level 2 for sanctioned events."
      }
    },
    {
      "@type": "Question",
      "name": "What SFI rating do I need for karting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karting uses the CIK certification standard, not SFI. Most karting CIK Level 2 suits meet the SFI 3.2A/1 fire-retardant baseline as well. A higher SFI rating like 3.2A/5 is overkill for karting — too hot, too restrictive, and built for a fire risk karting doesn't have. CIK Level 2 is the right tool."
      }
    },
    {
      "@type": "Question",
      "name": "Should I buy a karting suit one size up for my child to grow into?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Order the size that fits today's shoulders and chest correctly. Length and cuffs can be adjusted with stretch panels and Velcro, but shoulders and chest do not stretch — a too-big suit binds wrong and creates safety problems. Most juniors get 1 to 1.5 seasons out of a properly-fit CIK Level 2 suit before a growth spurt requires replacement."
      }
    },
    {
      "@type": "Question",
      "name": "Do shifter kart drivers need a different suit than non-shifter karting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CIK Level 2 baseline is the same, but shifter kart drivers benefit from specific upgrades: reinforced abrasion panels at the right shoulder, a cooler moisture-wicking inner liner for the longer hotter sessions, stretch panels at the inner elbows for the constant paddle-shift motion, and reinforced collar that clears neck restraints. Some shifter series (SKUSA SuperNationals KZ class) require additional SFI 3.2A/1 abrasion certification."
      }
    },
    {
      "@type": "Question",
      "name": "How often should a junior karting suit be replaced?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Junior karting suits typically last 1 to 1.5 seasons before a growth spurt makes them unsafe. Plan for the replacement cycle — don't try to stretch one suit across two seasons. Replace immediately if: the CIK Level 2 label is faded or detached, abrasion patches show through to the inner liner, sublimation graphics show visible cracking (UV degradation), or the suit binds when the driver reaches for the wheel."
      }
    }
  ]
};

export default function BlogPost9Page() {
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
      <BlogPost9Karting />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
