import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomShoesPage from "@/components/hsRaceGear/customGear/CustomShoesPage";
import "@/public/css/custom-shoes.css";

import React from "react";

// RETARGETED 2026-08-11 — coverage audit against the Keyword Planner export.
// ~2,600/mo of shoe demand, and the two biggest terms were matching only the
// HOMEPAGE rather than this page:
//   sfi racing shoes    500/mo  <- matched "/" not /custom-shoes
//   racing shoes sfi    500/mo  <- matched "/" not /custom-shoes
//   racequip shoes      500/mo  <- matched NO page
//   k1 racing shoes     500/mo  <- matched NO page
//   sfi shoes / sfi rated shoes / sfi driving shoes / sfi race boots  50 each
// The pattern is clear: buyers search "SFI" + "shoes" together. The old title
// put SFI after a pipe and a brand name, so the phrase never formed.
//
// ⚠️ CERT NUMBER CORRECTED — see the note on /custom-gloves. Was "SFI 3.3A/5",
// now 3.3/5 to match CLAUDE.md and the rest of the site. VERIFY AGAINST THE
// ACTUAL CERTIFICATION PAPERWORK.
export const metadata = {
  alternates: { canonical: "/custom-shoes" },
  title: "SFI Racing Shoes — Custom Nomex Race Boots, SFI 3.3/5",
  description:
    "Custom SFI racing shoes, SFI 3.3/5 certified — Nomex® upper, premium cowhide leather, thin high-grip outsole for pedal feel, and your team colors. Built to your foot measurements and made in the USA.",
  keywords:
    "sfi racing shoes, racing shoes sfi, sfi shoes, sfi rated shoes, sfi driving shoes, sfi race boots, sfi boots, custom racing shoes, nomex racing shoes, racing boots, custom motorsport shoes, fire retardant racing footwear, pedal shoes, karting shoes",
  openGraph: {
    type: "website",
    title: "SFI Racing Shoes — Custom Nomex Race Boots, SFI 3.3/5",
    description:
      "Nomex® upper, premium cowhide leather, thin high-grip outsole for pedal feel. Custom colors, built to your measurements in the USA.",
    url: "https://www.hsracegear.com/custom-shoes",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Racing Shoes", "item": "https://www.hsracegear.com/custom-shoes" }
  ]
};

// Product schema added 2026-08-11 — this page had none.
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom SFI Racing Shoes",
  "description":
    "SFI 3.3/5 certified custom racing shoes with Nomex® upper, premium cowhide leather and a thin high-grip outsole for pedal feel. Made to your foot measurements in the USA with custom colors.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Racing Shoes",
  "material": "Nomex",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "HS Race Gear", "url": "https://www.hsracegear.com" },
  },
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      <CustomShoesPage />
      <Footer3 />
    </>
  );
}
