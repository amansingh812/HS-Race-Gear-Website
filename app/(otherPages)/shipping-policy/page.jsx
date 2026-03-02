import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/common/Breadcumb";
import ShippingPolicy from "@/components/hsRaceGear/legal/ShippingPolicy";
import "@/public/css/vs-pyrotect.css";
import React from "react";

export const metadata = {
  title: "Shipping Policy | HS Race Gear",
  description:
    "Learn how HS Racegear packages and ships your custom SFI race suits, gloves, and shoes. Every order is carefully prepared and tracked.",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb pageName="Support" pageTitle="Shipping Policy" />
      <ShippingPolicy />
      <Footer3 />
    </>
  );
}
