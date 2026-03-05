import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomKartingSuitPage from "@/components/hsRaceGear/customGear/CustomKartingSuitPage";
import "@/public/css/custom-karting-suit.css";

import React from "react";

export const metadata = {
  alternates: { canonical: "/custom-karting-suit" },
  title: "Custom Karting Suits | HS Race Gear - Sublimated Karting Suits",
  description:
    "Custom-made sublimated karting suits designed for comfort, performance, and personal style. Full-coverage sublimation printing with unlimited colors, tailored to your measurements.",
  keywords:
    "custom karting suits, sublimated karting suits, karting racing suits, custom kart suits, karting gear, karting race wear, Rotax Max suits, IAME X30 suits",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <CustomKartingSuitPage />
      <Footer3 />
    </>
  );
}
