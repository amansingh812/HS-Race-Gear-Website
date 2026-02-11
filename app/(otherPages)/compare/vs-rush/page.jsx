import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/common/Breadcumb";
import VsRushContent from "@/components/hsRaceGear/compare/vsRush/VsRushContent";
import "@/public/css/vs-pyrotect.css";
import React from "react";

export const metadata = {
  title: "HS Racegear vs RUSH Racegear – Custom SFI Suits Comparison | HS Race Gear",
  description:
    "Comparing HS Racegear vs RUSH Racegear? Custom SFI-certified suits from $289. Faster production, full design freedom, premium Nomex® materials for stock cars, sprint cars, and drag racing.",
  keywords:
    "HS Racegear vs RUSH Racegear, RUSH Racegear alternative, custom SFI race suits, stock car racing suit, dirt track suit, sprint car suit",
};

export default function VsRushPage() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Compare" pageTitle="HS Racegear vs RUSH Racegear" />
      <VsRushContent />
      <Footer3 />
    </>
  );
}
