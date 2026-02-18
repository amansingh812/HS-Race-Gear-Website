import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import CustomShoesPage from "@/components/hsRaceGear/customGear/CustomShoesPage";
import "@/public/css/custom-shoes.css";

import React from "react";

export const metadata = {
  title: "Custom Racing Shoes | HS Race Gear - SFI 3.3A/5 Certified",
  description:
    "SFI 3.3A/5 certified Nomex® racing shoes with premium cowhide leather, high-grip outsoles, and custom colors. Engineered for pedal precision and fire protection.",
  keywords:
    "custom racing shoes, SFI certified racing shoes, Nomex racing shoes, fire retardant racing footwear, custom motorsport shoes, racing boots, pedal shoes",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <CustomShoesPage />
      <Footer3 />
    </>
  );
}
