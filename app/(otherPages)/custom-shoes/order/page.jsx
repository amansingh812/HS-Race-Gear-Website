import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import ShoesOrderPage from "@/components/hsRaceGear/customGear/ShoesOrderPage";
import "@/public/css/custom-order.css";

import React from "react";

export const metadata = {
  title: "Start Custom Shoes Order | HS Race Gear - SFI Certified Racing Shoes",
  description: "Build your custom racing shoes order. Select your design, choose your size and colors, and get a professional mockup within 24 hours.",
  keywords: "custom racing shoes order, SFI certified shoes, custom motorsport shoes, racing footwear",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <ShoesOrderPage />
      <Footer3 />
    </>
  );
}
