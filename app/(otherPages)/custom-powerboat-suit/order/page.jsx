import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import PowerboatOrderPage from "@/components/hsRaceGear/customGear/PowerboatOrderPage";
import "@/public/css/custom-order.css";

import React from "react";

export const metadata = {
  title: "Start Custom Power Boat Suit Order | HS Race Gear - SFI Certified",
  description: "Build your custom power boat racing suit order. Choose your package, select your design, pick your colors, and get a professional mockup within 24 hours.",
  keywords: "custom power boat suit order, custom powerboat racing gear, SFI certified suits, custom gloves, custom racing shoes",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <PowerboatOrderPage />
      <Footer3 />
    </>
  );
}
