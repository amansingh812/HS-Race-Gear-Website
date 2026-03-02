import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/common/Breadcumb";
import SuitMaintenance from "@/components/hsRaceGear/suitCare/SuitMaintenance";
import "@/public/css/vs-pyrotect.css";
import React from "react";

export const metadata = {
  title: "How to Wash & Care for Your Racing Suit | HS Race Gear",
  description:
    "Learn how to properly wash, dry, and care for your HS Racegear custom SFI racing suit to maintain its fire protection, fit, and durability.",
};

export default function SuitMaintenancePage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb pageName="About Suit" pageTitle="Suit Maintenance" />
      <SuitMaintenance />
      <Footer3 />
    </>
  );
}
