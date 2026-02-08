import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import CustomRaceSuitPage from "@/components/hsRaceGear/customGear/CustomRaceSuitPage";
import "@/public/css/custom-race-suit.css";

import React from "react";

export const metadata = {
  title: "Custom Race Suits | HS Race Gear - SFI Certified Racing Suits",
  description: "Premium custom auto racing suits built for drivers who demand performance. SFI 3.2A/1 & 5 certified, crafted from high-quality meta-aramid fire-retardant fabric.",
  keywords: "custom race suits, SFI certified racing suits, Nomex racing suits, fire retardant racing gear, custom racing suits, professional racing suits",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <CustomRaceSuitPage />
      <Footer1 />
    </>
  );
}
