import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomShoesPage from "@/components/hsRaceGear/customGear/CustomShoesPage";
import "@/public/css/custom-shoes.css";

import React from "react";

export const metadata = {
  alternates: { canonical: "/custom-shoes" },
  title: "Custom Racing Shoes | HS Race Gear - SFI 3.3A/5 Certified",
  description:
    "SFI 3.3A/5 certified Nomex® racing shoes with premium cowhide leather, high-grip outsoles, and custom colors. Engineered for pedal precision and fire protection.",
  keywords:
    "custom racing shoes, SFI certified racing shoes, Nomex racing shoes, fire retardant racing footwear, custom motorsport shoes, racing boots, pedal shoes",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Racing Shoes", "item": "https://www.hsracegear.com/custom-shoes" }
  ]
};

export default function page() {
  return (
    <>
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
