import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import BlogPost14DirtTrack from "@/components/hsRaceGear/blog/BlogPost14DirtTrack";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/blog/dirt-track-racing-suit-requirements" },
  title: "Dirt Track Racing Suit Requirements — IMCA, WISSOTA, USAC & World of Outlaws Rules (2026)",
  description:
    "Which SFI rating do you need for dirt track racing? Street stock starts at SFI 3.2A/1; World of Outlaws and ASCS sprint cars require SFI 3.2A/5 plus SFI 3.3 gloves and shoes. Full breakdown by class and sanctioning body.",
  keywords:
    "dirt track racing suit requirements, dirt track fire suit, IMCA fire suit requirements, WISSOTA fire suit rules, USAC sprint car suit requirements, World of Outlaws fire suit, sprint car fire suit SFI 3.2A/5, dirt late model fire suit, street stock fire suit rating, what fire suit do I need for dirt track",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Dirt Track Racing Suit Requirements — IMCA, WISSOTA, USAC & World of Outlaws Rules (2026)",
  "description":
    "Which SFI rating you need for dirt oval racing: street stock and hobby classes start at SFI 3.2A/1, while World of Outlaws and ASCS sprint cars require SFI 3.2A/5 with SFI 3.3 gloves and shoes. Breakdown by class and sanctioning body.",
  "image": "https://www.hsracegear.com/images/blog/best-sprint-car-racing-suit.webp",
  "author": { "@type": "Organization", "name": "HS Race Gear" },
  "publisher": {
    "@type": "Organization",
    "name": "HS Race Gear",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hsracegear.com/images/logo/logo.png"
    }
  },
  "datePublished": "2026-09-27",
  "dateModified": "2026-09-27",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.hsracegear.com/blog/dirt-track-racing-suit-requirements"
  },
  "about": [
    { "@type": "Thing", "name": "Dirt Track Racing Fire Suit Requirements" },
    { "@type": "Thing", "name": "IMCA Safety Rules" },
    { "@type": "Thing", "name": "World of Outlaws Sprint Car Safety Equipment" },
    { "@type": "Thing", "name": "SFI 3.2A/5 Racing Suit" },
    { "@type": "Thing", "name": "Dirt Late Model Safety Equipment" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hsracegear.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Dirt Track Racing Suit Requirements", "item": "https://www.hsracegear.com/blog/dirt-track-racing-suit-requirements" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What SFI rating do I need for dirt track racing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your class. Entry-level dirt classes like street stock and hobby stock generally require SFI 3.2A/1 as a minimum. Dirt late models and premier modified classes commonly require SFI 3.2A/5. Sprint cars under World of Outlaws and ASCS require SFI 3.2A/5 with a valid label displayed on the outside of the suit, along with SFI 3.3 gloves and shoes. Always confirm against your track's current rulebook, because individual tracks often exceed their sanctioning body's baseline."
      }
    },
    {
      "@type": "Question",
      "name": "Does IMCA require a specific SFI rating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IMCA rules require an SFI-approved full fire suit across its divisions, along with fire-retardant gloves, shoes and a neck brace or head-and-neck restraint. The rulebook does not always name a specific tier the way sprint car series do, so the practical floor is set by your track. Many IMCA racers run SFI 3.2A/1; those in faster divisions or chasing touring events typically run SFI 3.2A/5."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use my drag racing suit for dirt track?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Usually yes. SFI 3.2A is the same standard across both disciplines, so an SFI 3.2A/5 suit that passes NHRA tech will satisfy most dirt oval requirements. Verify the certification date, the condition of the suit, and whether your dirt series requires the SFI label to be visible on the outside. The practical difference is durability rather than legality — a suit built for occasional drag use ages quickly on a weekly dirt schedule."
      }
    },
    {
      "@type": "Question",
      "name": "Why do sprint cars require a higher rating than street stocks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sprint cars burn methanol, which burns with a nearly invisible flame in daylight and can delay anyone noticing a fire. The fuel cell sits directly behind the driver, and sprint cars roll over more frequently than any other dirt class. The rule anticipates a fire that takes longer to spot and a driver who may take longer to escape, so it specifies a multi-layer suit providing roughly ten seconds of protection instead of the three seconds a single layer provides."
      }
    },
    {
      "@type": "Question",
      "name": "How long is a dirt track fire suit good for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SFI certification expires five years from the manufacture date printed on the sewn-in label, and inspectors check that date rather than your receipt. Dirt racing adds a second clock: heavy soiling, frequent washing and abrasion can degrade protection well before the certification runs out. A suit with tears, burn marks or oil saturation can be failed at tech even inside its five-year window."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need fire-resistant underwear for dirt racing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is rarely mandatory in dirt oval rulebooks, unlike road racing where SCCA permits an SFI 3.2A/1 suit only when worn with fire-resistant underwear. On dirt it is an upgrade rather than a requirement: FR underlayers add meaningful protection time under a single-layer suit, and most drivers running SFI 3.2A/1 in a faster class would be better served adding underlayers or moving up to SFI 3.2A/5."
      }
    }
  ]
};

export default function BlogPost14Page() {
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
      <BlogPost14DirtTrack />
      <Footer3 topBg="#0a0a0a" />
    </>
  );
}
