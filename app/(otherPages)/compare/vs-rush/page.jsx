import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import VsRushContent from "@/components/hsRaceGear/compare/vsRush/VsRushContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
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
      <Topbar1 />
      <Header3 />
      <VsRushContent />
      <Footer3 />
    </>
  );
}
