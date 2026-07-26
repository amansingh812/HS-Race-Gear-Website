import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsRushContent from "@/components/hsRaceGear/compare/vsRush/VsRushContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

// Metadata rewritten 2026-07-26 — CTR fix, not a ranking fix.
// 3-month GSC: "rush race gear" 71 impr @ pos 7.8, "rush race suits" 29 impr
// @ pos 4.7 — both PAGE ONE, both ZERO clicks across the full quarter.
// The ranking is already won; the snippet wasn't earning the click.
// Changes: lead with the comparison (what the searcher is actually doing),
// put concrete differentiators in the description instead of a feature list,
// and lead the description with a question that matches search intent.
export const metadata = {
  alternates: { canonical: "/compare/vs-rush" },
  title: "HS Race Gear vs Rush Race Gear (2026): Side-by-Side Comparison",
  description:
    "Which is better for your build? Compare price, SFI rating, fit process and delivery time. HS Race Gear: custom-measured SFI 3.2A/5, made in USA, 2–3 week turnaround, from $289. See the full breakdown before you order.",
  keywords:
    "rush race gear, rush race suits, rush racing suits, rush racegear, HS Racegear vs RUSH Racegear, RUSH Racegear alternative, custom SFI race suits, stock car racing suit, dirt track suit, sprint car suit",
  openGraph: {
    title: "HS Race Gear vs Rush Race Gear (2026): Side-by-Side Comparison",
    description:
      "Compare price, SFI rating, fit process and delivery time. Custom-measured SFI 3.2A/5 suits made in the USA, 2–3 week turnaround, from $289.",
    url: "https://www.hsracegear.com/compare/vs-rush",
    siteName: "HS Race Gear",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" },
    { "@type": "ListItem", "position": 3, "name": "HS Racegear vs RUSH Racegear", "item": "https://www.hsracegear.com/compare/vs-rush" }
  ]
};

export default function VsRushPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <VsRushContent />
      <Footer3 />
    </>
  );
}
