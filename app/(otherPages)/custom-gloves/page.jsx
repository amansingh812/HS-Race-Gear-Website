import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomGlovesPage from "@/components/hsRaceGear/customGear/CustomGlovesPage";
import "@/public/css/custom-gloves.css";

import React from "react";

export const metadata = {
  alternates: { canonical: "/custom-gloves" },
  title: "Custom Racing Gloves | HS Race Gear - SFI 3.3A/5 Certified",
  description:
    "SFI 3.3A/5 certified Nomex® racing gloves with silicone grip palm, two-layer fire protection, and custom team branding. Engineered for control and safety.",
  keywords:
    "custom racing gloves, SFI certified racing gloves, Nomex racing gloves, fire retardant racing gloves, custom motorsport gloves, silicone grip racing gloves",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Custom Racing Gloves", "item": "https://www.hsracegear.com/custom-gloves" }
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
      <CustomGlovesPage />
      <Footer3 />
    </>
  );
}
