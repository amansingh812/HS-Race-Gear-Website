import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/common/Breadcumb";
import CustomFitFormPage from "@/components/hsRaceGear/howToMeasure/CustomFitFormPage";

import React from "react";

export const metadata = {
  alternates: { canonical: "/custom-fit" },
  title: "Custom Gear Racing Suits | HS Race Gear - Tailored to Your Measurements",
  description: "Get a perfect fit with HS Race Gear custom-tailored racing suits. Designed to your exact body measurements for maximum comfort, safety, and performance on the track.",
  keywords: "custom Gear racing suits, tailored racing gear, custom measurements, racing suit sizing, personalized racing suits, made-to-measure racing gear",
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
