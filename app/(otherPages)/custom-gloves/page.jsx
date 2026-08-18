import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomGlovesPage from "@/components/hsRaceGear/customGear/CustomGlovesPage";
import "@/public/css/custom-gloves.css";

import React from "react";

// RETARGETED 2026-08-11 — coverage audit against the Keyword Planner export
// found this page invisible for its own category. ~2,300/mo of glove demand,
// near-zero coverage:
//   nomex racing gloves    500/mo  <- was weak
//   nomex driving gloves   500/mo  <- matched NO page
//   racequip gloves        500/mo  <- matched NO page
//   custom racing gloves   500/mo  <- covered
//   sfi 3.3 gloves          50/mo
//   sparco nomex gloves     50/mo, personalised racing gloves 50/mo
// The old title led with the brand and the cert; neither is what people
// search. "Nomex" is the word buyers actually use and it was absent entirely.
//
// ⚠️ CERT NUMBER CORRECTED: this page said "SFI 3.3A/5". SFI's accessories
// spec is 3.3 — "3.3A" is not an SFI designation (3.2A is the SUIT spec).
// CLAUDE.md documents the company's certs as 3.2A/1, 3.2A/5 and 3.3/5, and
// the rest of the site used 3.3/5 in 39 places vs 3.3A/5 in 18. Aligned to
// 3.3/5. VERIFY AGAINST THE ACTUAL CERTIFICATION PAPERWORK — a wrong cert
// number on a product page is a trust and compliance problem, not just SEO.
export const metadata = {
  alternates: { canonical: "/custom-gloves" },
  title: "Custom Nomex Racing Gloves — SFI 3.3/5 Certified",
  description:
    "Custom Nomex® racing gloves, SFI 3.3/5 certified — silicone grip palm, two-layer fire protection, external seams for feel, and your team colors and logos. Built to your hand measurements and made in the USA.",
  keywords:
    "nomex racing gloves, nomex driving gloves, custom racing gloves, racing gloves, sfi 3.3 gloves, sfi racing gloves, SFI certified racing gloves, fire retardant racing gloves, custom motorsport gloves, silicone grip racing gloves, personalised racing gloves, karting gloves, custom karting gloves",
  openGraph: {
    type: "website",
    title: "Custom Nomex Racing Gloves — SFI 3.3/5 Certified",
    description:
      "Silicone grip palm, two-layer Nomex® fire protection, external seams. Custom colors and logos, built to your measurements in the USA.",
    url: "https://www.hsracegear.com/custom-gloves",
    siteName: "HS Race Gear",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Racing Gloves", "item": "https://www.hsracegear.com/custom-gloves" }
  ]
};

// Product schema added 2026-08-11 — this page had none. GSC shows Product
// snippets already earning impressions elsewhere on the site (5 clicks /
// 137 impr), so the format works; gloves and shoes were simply missing it.
// Price left as a range because glove pricing varies by option set.
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Nomex Racing Gloves",
  "description":
    "SFI 3.3/5 certified custom Nomex® racing gloves with silicone grip palm, two-layer fire protection and external seams. Made to your hand measurements in the USA with custom colors and team logos.",
  "image": "https://www.hsracegear.com/images/og-image.jpg",
  "brand": { "@type": "Brand", "name": "HS Race Gear" },
  "category": "Racing Gloves",
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
      <CustomGlovesPage />
      <Footer3 />
    </>
  );
}
