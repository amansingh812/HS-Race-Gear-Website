import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/common/Breadcumb";
import VsSimpsonContent from "@/components/hsRaceGear/compare/vsSimpson/VsSimpsonContent";
import "@/public/css/vs-pyrotect.css";
import React from "react";

export const metadata = {
  title: "HS Racegear vs Simpson Racing – Custom SFI Suits Comparison | HS Race Gear",
  description:
    "Compare HS Racegear vs Simpson Racing race suits. Custom SFI-certified suits starting at $289 vs $1,049. Faster production, unlimited revisions, premium Nomex® included.",
  keywords:
    "HS Racegear vs Simpson, Simpson Racing alternative, custom SFI race suits, drag racing suit, affordable SFI fire suit, sprint car suit",
};

export default function VsSimpsonPage() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Compare" pageTitle="HS Racegear vs Simpson Racing" />
      <VsSimpsonContent />
      <Footer3 />
    </>
  );
}
