import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomPowerboatSuitPage from "@/components/hsRaceGear/customGear/CustomPowerboatSuitPage";
import "@/public/css/custom-powerboat-suit.css";

import React from "react";

export const metadata = {
  title:
    "Custom Power Boat Racing Suits | HS Race Gear - SFI 3.2A/1 & 3.2A/5 Certified",
  description:
    "Custom Nomex® power boat racing suits with SFI 3.2A/1 and 3.2A/5 certification. Engineered for offshore racing with ergonomic stretch panels, fire protection, and full team customization.",
  keywords:
    "custom power boat racing suits, SFI certified boat racing suits, Nomex power boat suits, offshore racing suits, marine racing gear, powerboat racing suit, custom boat racing apparel",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <CustomPowerboatSuitPage />
      <Footer3 />
    </>
  );
}
