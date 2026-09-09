import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPostYouthRaceSuit from "@/components/hsRaceGear/blog/BlogPostYouthRaceSuit";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog/custom-youth-nomex-race-suit" },
  title: "Custom Youth Nomex Race Suit — SFI Fire Suits for Junior Drivers (2026)",
  description:
    "Custom youth Nomex race suit guide for junior drivers ages 5–17. SFI 3.2A/1 and 3.2A/5 certified fire suits for Junior Dragster, Quarter Midget, Bandolero, and Legend Car racing. Why custom fit matters for growing drivers.",
  keywords:
    "custom youth nomex race suit, youth racing suit, junior racing fire suit, youth fire suit, junior dragster suit, quarter midget racing suit, bandolero racing suit, legend car racing suit, youth SFI race suit, kids racing suit, youth nomex suit, custom youth fire suit, junior driver racing suit, youth SFI 3.2A/1 suit, youth racing suit custom fit",
  openGraph: {
    type: "article",
    title: "Custom Youth Nomex Race Suit — SFI Fire Suits for Junior Drivers",
    description:
      "Custom youth Nomex race suit guide. SFI 3.2A/1 and 3.2A/5 certified for Junior Dragster, Quarter Midget, Bandolero, and Legend Car. Why custom fit matters for growing drivers.",
    url: "https://www.hsracegear.com/blog/custom-youth-nomex-race-suit",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Custom Youth Nomex Race Suit — SFI Fire Suits for Junior Drivers",
  "description":
    "Custom youth Nomex race suit guide for junior drivers ages 5–17. SFI certification requirements by class, why custom fit matters for growing drivers, and how to measure a young racer.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "author": { "@type": "Organization", "name": "HS Race Gear" },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-09-09",
  "dateModified": "2026-09-09",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/custom-youth-nomex-race-suit"
  },
  "about": [
    { "@type": "Thing", "name": "Youth Racing" },
    { "@type": "Thing", "name": "Junior Dragster" },
    { "@type": "Thing", "name": "Quarter Midget Racing" },
    { "@type": "Thing", "name": "SFI 3.2A/1" },
    { "@type": "Thing", "name": "Nomex Fire Suit" },
    { "@type": "Thing", "name": "Custom Racing Suit" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Custom Youth Nomex Race Suit", "item": "https://www.hsracegear.com/blog/custom-youth-nomex-race-suit" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What SFI rating does a youth racing suit need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most youth classes — Junior Dragster, Quarter Midget, Bandolero, and Legend Car — require SFI 3.2A/1 minimum. Some faster classes like Junior Dragster running sub-8.90 ET or youth sprint car programs require SFI 3.2A/5. Check your specific sanctioning body's rulebook for the exact requirement."
      }
    },
    {
      "@type": "Question",
      "name": "What age can a child start racing in a fire suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quarter Midget racing accepts drivers as young as 5 years old. Junior Dragster allows testing at 5 and competition from age 6. Bandolero racing typically starts at age 8. All of these classes require an SFI-certified fire suit from the first session on track."
      }
    },
    {
      "@type": "Question",
      "name": "Why choose a custom youth racing suit over off-the-rack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Youth drivers grow fast, and off-the-rack suits are sized for adult proportions scaled down. A custom youth Nomex race suit is built to the child's actual measurements — shorter torso, narrower shoulders, proportional limbs — so the suit fits correctly from day one and the fire-resistant layers sit where they were designed to sit. A suit that bunches or gaps is both uncomfortable and less protective."
      }
    },
    {
      "@type": "Question",
      "name": "How long will a youth racing suit last before my child outgrows it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most youth drivers get 1–2 seasons from a custom suit before a growth spurt makes it too tight. The SFI tag is valid for 5 years, so the certification will outlast the fit. Some parents order with slight extra length in the sleeves and legs to extend the usable life, though the torso length is harder to fudge — that's the measurement that determines whether the suit pulls at the shoulders."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get sponsor logos on a youth racing suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A custom youth Nomex race suit includes unlimited logo placement, driver name, car number, and flag — the same customization options as any adult suit. Many junior racing families use the suit as a way to build a young driver's brand and attract early sponsorship."
      }
    }
  ]
};

export default function BlogPostYouthPage() {
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
      <BlogPostYouthRaceSuit />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
