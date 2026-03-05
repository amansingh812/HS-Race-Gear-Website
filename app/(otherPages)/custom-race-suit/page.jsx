import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomRaceSuitPage from "@/components/hsRaceGear/customGear/CustomRaceSuitPage";
import "@/public/css/custom-race-suit.css";

import React from "react";

export const metadata = {
  alternates: { canonical: "/custom-race-suit" },
  title: "Custom Race Suits | HS Race Gear - SFI Certified Racing Suits",
  description: "Premium custom auto racing suits built for drivers who demand performance. SFI 3.2A/1 & 5 certified, crafted from high-quality meta-aramid fire-retardant fabric.",
  keywords: "custom race suits, SFI certified racing suits, Nomex racing suits, fire retardant racing gear, custom racing suits, professional racing suits",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <CustomRaceSuitPage />
      <Footer3 />
    </>
  );
}
