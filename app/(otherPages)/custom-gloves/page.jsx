import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
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

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <CustomGlovesPage />
      <Footer3 />
    </>
  );
}
