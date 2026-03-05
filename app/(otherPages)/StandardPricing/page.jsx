import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import StandardPricing from "@/components/hsRaceGear/pricing/StandardPricing";
import "@/public/css/standard-pricing.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/StandardPricing" },
  title: "Standard Pricing | HS Race Gear",
  description: "Explore our standard pricing for SFI-certified race suits, gloves, and shoes. Fully customizable race gear with unlimited colors and logos.",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <StandardPricing />
      <Footer3 />
    </>
  );
}
