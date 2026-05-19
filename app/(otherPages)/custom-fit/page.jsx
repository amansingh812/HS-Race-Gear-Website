import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/common/Breadcumb";
import CustomFitFormPage from "@/components/hsRaceGear/howToMeasure/CustomFitFormPage";

import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/custom-fit" },
  // Title intentionally NOT using "custom racing suit" to avoid cannibalizing
  // /custom-race-suit. This page is the measurement/order form — transactional intent.
  title: "Submit Your Measurements — Order a Custom Race Suit | HS Race Gear",
  description: "Ready to order? Submit your body measurements and we'll build your custom SFI-certified racing suit to an exact fit. Free shipping on all custom suits.",
  keywords: "custom race suit measurements, order custom racing suit, made to measure racing suit, racing suit sizing form, custom fit race suit order",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      {/* <Breadcumb pageName="Custom Gear" pageTitle="Custom Gear Racing Suits" /> */}
      <CustomFitFormPage />
      <Footer3 />
    </>
  );
}
