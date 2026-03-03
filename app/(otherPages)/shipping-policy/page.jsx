import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import ShippingPolicy from "@/components/hsRaceGear/legal/ShippingPolicy";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
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
      <ShippingPolicy />
      <Footer3 />
    </>
  );
}
