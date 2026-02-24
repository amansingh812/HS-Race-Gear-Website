import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import CustomOrderPage from "@/components/hsRaceGear/customGear/CustomOrderPage";
import "@/public/css/custom-order.css";

import React from "react";

export const metadata = {
  title: "Start Custom Order | HS Race Gear - Custom Racing Suits",
  description: "Build your custom racing suit order. Choose your package, select your design, pick your colors, and get a professional mockup within 24 hours.",
  keywords: "custom race suit order, custom racing gear, SFI certified suits, custom gloves, custom racing shoes",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <CustomOrderPage />
      <Footer3 />
    </>
  );
}
