import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import StandardPricing from "@/components/otherPages/StandardPricing";
import React from "react";

export const metadata = {
  title: "Standard Pricing | HS Race Gear",
  description: "Explore our standard pricing for SFI-certified race suits, gloves, and shoes. Fully customizable race gear with unlimited colors and logos.",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <StandardPricing />
      <Footer1 />
    </>
  );
}
