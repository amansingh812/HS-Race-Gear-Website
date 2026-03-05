import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import SuitMaintenance from "@/components/hsRaceGear/suitCare/SuitMaintenance";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/suit-maintenance" },
  title: "How to Wash & Care for Your Racing Suit | HS Race Gear",
  description:
    "Learn how to properly wash, dry, and care for your HS Racegear custom SFI racing suit to maintain its fire protection, fit, and durability.",
};

export default function SuitMaintenancePage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <SuitMaintenance />
      <Footer3 />
    </>
  );
}
