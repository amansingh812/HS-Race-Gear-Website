import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost10TPP from "@/components/hsRaceGear/blog/BlogPost10TPP";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog/tpp-rating-explained" },
  // Backlog #1 — captures TPP knowledge gap. Competitors mention TPP
  // but no one owns it. Built for AI-engine citation.
  title: "TPP Rating Explained — What Thermal Protective Performance Actually Measures",
  description:
    "TPP (Thermal Protective Performance) explained — what the number actually measures, why two SFI 3.2A/5 suits can have different TPP scores, and how to read TPP when comparing racing suits.",
  keywords:
    "TPP rating, thermal protective performance, what is TPP, TPP racing suit, TPP value, TPP score, SFI TPP minimum, racing suit TPP, fire suit TPP, Nomex TPP, FIA HTI",
};

// Article schema with Person author + about entities for AI-engine citation
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "TPP Rating Explained — What Thermal Protective Performance Actually Measures (And Why It Matters More Than SFI)",
  "description":
    "TPP measures how long a racing suit fabric protects skin from second-degree burns. Two suits at the same SFI rating can have different TPP scores — here's why, and how to find the actual number.",
  "image": "https://www.hsracegear.com/images/home/blog_1.webp",
  "author": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "url": "https://www.hsracegear.com",
    "description": "Custom SFI-certified racing suit manufacturer based in Watertown, MA. 10+ years building custom suits for sprint car, drag, dirt late model, karting, road racing, and powerboat disciplines."
  },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-06-17",
  "dateModified": "2026-06-17",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/tpp-rating-explained"
  },
  "about": [
    { "@type": "Thing", "name": "Thermal Protective Performance" },
    { "@type": "Thing", "name": "TPP Rating" },
    { "@type": "Thing", "name": "SFI 3.2A/1" },
    { "@type": "Thing", "name": "SFI 3.2A/5" },
    { "@type": "Thing", "name": "SFI 3.2A/15" },
    { "@type": "Thing", "name": "FIA 8856-2018" },
    { "@type": "Thing", "name": "Nomex Fabric" },
    { "@type": "Thing", "name": "Fire Retardant Racing Suit" }
  ],
  "citation": [
    { "@type": "CreativeWork", "name": "SFI Foundation Spec 3.2A", "url": "https://www.sfifoundation.com/" },
    { "@type": "CreativeWork", "name": "FIA Sporting Regulations Article 14" },
    { "@type": "CreativeWork", "name": "NFPA 1971 Standard on Protective Ensembles" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "TPP Rating Explained", "item": "https://www.hsracegear.com/blog/tpp-rating-explained" }
  ]
};

// FAQPage schema — structured Q&A for AI engine extraction
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does TPP mean on a racing suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TPP stands for Thermal Protective Performance. It is a laboratory-measured score that indicates how long a fabric can protect human skin from a second-degree burn when exposed to a 2.0 cal/cm²/sec heat flux. The TPP value divided by 2 equals approximately the protection time in seconds. A TPP of 19 means roughly 9–10 seconds of protection. Higher TPP equals more time before serious injury."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum TPP for SFI 3.2A/5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI 3.2A/5 requires a minimum TPP of 19. However, this is a minimum, not an exact value. A suit can be SFI 3.2A/5 certified with a TPP of 19, 22, 25, or higher depending on materials and construction. Two SFI 3.2A/5 suits can therefore have meaningfully different real-world protection."
      }
    },
    {
      "@type": "Question",
      "name": "Why do two suits with the same SFI rating have different TPP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three factors drive TPP variation within an SFI tier: material choice (genuine Nomex® has higher inherent TPP than fire-retardant treated cotton or polyester), layer construction with deliberate air gaps that trap insulating air, and the presence of a breathable knit inner liner. A premium Nomex® two-layer suit can score TPP 26+ while a budget treated-fabric two-layer suit just clears 19."
      }
    },
    {
      "@type": "Question",
      "name": "How is TPP measured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TPP is measured in a laboratory using a propane burner at 2.0 cal/cm²/sec heat flux applied to a mounted fabric sample. A copper calorimeter behind the fabric records the time it takes for enough heat to pass through to cause a second-degree burn on human skin. That time in seconds multiplied by 2 equals the TPP value. The test was originally developed for firefighter turnout gear and adopted by the SFI Foundation for motorsport."
      }
    },
    {
      "@type": "Question",
      "name": "Does TPP degrade over time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Real-world TPP decreases due to UV exposure, repeated washing (which removes fire-retardant treatment from treated fabrics — genuine Nomex® is inherently fire-resistant and resists this), fuel and oil contamination (hydrocarbons can act as accelerants), repeated heat cycling, and abrasion. A 5-year-old suit with a valid SFI label may still pass tech inspection but have meaningfully reduced TPP from its original score."
      }
    },
    {
      "@type": "Question",
      "name": "How do I find the actual TPP score of a racing suit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most retailers list only the SFI rating, not the TPP. To find the actual TPP, check the manufacturer's spec sheet, the SFI Foundation certification report (available via the SFI website for some manufacturers), or contact the manufacturer directly. Premium brands publish TPP openly; budget brands often don't. If a manufacturer cannot produce the number when asked, the suit likely just clears the SFI minimum."
      }
    }
  ]
};

export default function BlogPost10Page() {
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
      <BlogPost10TPP />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
