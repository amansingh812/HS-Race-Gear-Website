import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CustomOrderPage from "@/components/hsRaceGear/customGear/CustomOrderPage";
import "@/public/css/custom-order.css";

import React, { Suspense } from "react";

export const metadata = {
  title: "Start Custom Order | HS Race Gear - Custom Racing Suits",
  description: "Build your custom racing suit order. Choose your package, select your design, pick your colors, and get a professional mockup within 24 hours.",
  keywords: "custom race suit order, custom racing gear, SFI certified suits, custom gloves, custom racing shoes",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#070707" }} />}>
        <CustomOrderPage />
      </Suspense>
      <Footer3 />
    </>
  );
}
