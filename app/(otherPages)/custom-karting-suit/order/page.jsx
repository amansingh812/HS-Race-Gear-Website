import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import KartingOrderPage from "@/components/hsRaceGear/customGear/KartingOrderPage";
import "@/public/css/custom-order.css";

import React from "react";

export const metadata = {
  title: "Start Custom Karting Order | HS Race Gear - Sublimated Karting Suits",
  description: "Build your custom karting suit order. Choose your package, select your design, pick your colors, and get a professional mockup within 24 hours.",
  keywords: "custom karting suit order, custom karting gear, sublimated karting suits, custom gloves, custom racing shoes",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <KartingOrderPage />
      <Footer3 />
    </>
  );
}
