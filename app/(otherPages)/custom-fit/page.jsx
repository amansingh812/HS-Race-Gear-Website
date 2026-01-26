import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/common/Breadcumb";
import CustomFitFormPage from "@/components/otherPages/CustomFitFormPage";

import React from "react";

export const metadata = {
  title: "Custom Fit Racing Suits | HS Race Gear - Tailored to Your Measurements",
  description: "Get a perfect fit with HS Race Gear custom-tailored racing suits. Designed to your exact body measurements for maximum comfort, safety, and performance on the track.",
  keywords: "custom fit racing suits, tailored racing gear, custom measurements, racing suit sizing, personalized racing suits, made-to-measure racing gear",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Custom Fit" pageTitle="Custom Fit Racing Suits" />
      <CustomFitFormPage />
      <Footer1 />
    </>
  );
}
