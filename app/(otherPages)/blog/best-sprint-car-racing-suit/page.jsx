import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost8SprintCar from "@/components/hsRaceGear/blog/BlogPost8SprintCar";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog/best-sprint-car-racing-suit" },
  // Phase B Post 3. Peak sprint car season + Knoxville Nationals 10 weeks
  // out = high commercial intent window. Targets "sprint car racing suit"
  // + arm-restraint, USAC, World of Outlaws, ASCS, methanol angles.
  title: "Best Sprint Car Racing Suit — USAC, World of Outlaws & ASCS SFI Rules",
  description:
    "Best sprint car racing suit by sanctioning body — USAC, World of Outlaws, ASCS. SFI rating, arm-restraint compatibility, dirt vs asphalt fit, methanol-specific protection, and Knoxville Nationals prep.",
  keywords:
    "best sprint car racing suit, sprint car racing suit, sprint car suit, dirt sprint car suit, USAC racing suit, World of Outlaws racing suit, ASCS racing suit, sprint car fire suit, methanol fire suit, arm restraint racing suit, custom sprint car suit, Knoxville Nationals",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best Sprint Car Racing Suit — SFI Rating, Fit, Arm Restraints & What Actually Matters On Dirt",
  "description":
    "Sprint car racing suit guide — what makes a sprint suit different from a generic SFI 3.2A/5, sanctioning-body requirements (USAC, World of Outlaws, ASCS), arm-restraint compatibility, dirt vs asphalt spec, methanol-specific protection.",
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
  "datePublished": "2026-06-01",
  "dateModified": "2026-06-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/best-sprint-car-racing-suit"
  },
  "about": [
    { "@type": "Thing", "name": "Sprint Car Racing" },
    { "@type": "Thing", "name": "SFI 3.2A/5" },
    { "@type": "Thing", "name": "USAC Sprint Car" },
    { "@type": "Thing", "name": "World of Outlaws" },
    { "@type": "Thing", "name": "ASCS Sprint Cars" },
    { "@type": "Thing", "name": "Arm Restraints" },
    { "@type": "Thing", "name": "Methanol Fuel" },
    { "@type": "Thing", "name": "Knoxville Nationals" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Best Sprint Car Racing Suit", "item": "https://www.hsracegear.com/blog/best-sprint-car-racing-suit" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What SFI rating do I need for sprint car racing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/5 is the practical floor for sprint car racing. World of Outlaws, USAC, ASCS, and POWRi all require SFI 3.2A/5 minimum across their major sprint car divisions. Some weekly hobby-class sprints accept SFI 3.2A/1, but if you're running methanol or competing in a winged sprint of any kind, 3.2A/5 multi-layer is what you want."
      }
    },
    {
      "@type": "Question",
      "name": "What makes a sprint car racing suit different from a generic SFI suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Four things: arm-restraint compatibility (shoulder panels cut so the restraint anchor doesn't bunch), dust seal at the collar and cuffs (essential for dirt), methanol-specific multi-layer construction (SFI 3.2A/5 minimum because methanol burns invisible), and abrasion-resistant shoulder and knee panels (for the inevitable flip and slide)."
      }
    },
    {
      "@type": "Question",
      "name": "Does USAC require SFI 3.2A/5 for sprint cars?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. USAC requires SFI 3.2A/5 minimum across Silver Crown, Sprint Car, and Midget divisions, plus SFI 3.3 arm restraints. World of Outlaws and ASCS have similar SFI 3.2A/5 requirements for their sprint car classes."
      }
    },
    {
      "@type": "Question",
      "name": "How long are sprint car racing suit lead times for Knoxville Nationals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Custom sprint car racing suit lead times are typically 4–6 weeks from approved mockup. Knoxville Nationals runs August 13–16, 2026 — for a new custom suit on your back at Knoxville, start the design conversation in early-to-mid June to allow time for the mockup, revisions, production, and shipping."
      }
    },
    {
      "@type": "Question",
      "name": "Should I replace my sprint car suit if it's been exposed to methanol?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If your suit has been soaked in methanol from a fuel leak, get it inspected or replace it. Methanol can degrade the Nomex® bonding agents and reduce the suit's TPP (Thermal Protective Performance) score below the SFI 3.2A/5 baseline — meaning the suit might still pass a visual tech inspection but won't perform to its rated protection level in a fire."
      }
    }
  ]
};

export default function BlogPost8Page() {
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
      <BlogPost8SprintCar />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
