import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import StandardPricing from "@/components/hsRaceGear/pricing/StandardPricing";
import "@/public/css/standard-pricing.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/StandardPricing" },
  // "Pricing" as a standalone word gets no clicks — lead with the price anchor
  title: "Racing Suit Pricing — Custom Suits from $299 | HS Race Gear",
  description:
    "Exact pricing for custom SFI racing suits, karting suits, gloves & shoes. SFI 3.2A/1 from $299, SFI 3.2A/5 from $499. Unlimited colors and logos. Free shipping.",
  keywords:
    "racing suit price, how much does a racing suit cost, custom race suit cost, SFI suit pricing, racing gear prices",
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
