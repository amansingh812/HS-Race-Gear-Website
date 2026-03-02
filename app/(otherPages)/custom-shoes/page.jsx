import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
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
      <Topbar1 />
      <Header3 />
      <CustomShoesPage />
      <Footer3 />
    </>
  );
}
