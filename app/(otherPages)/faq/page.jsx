import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Faqs from "@/components/hsRaceGear/faqs/Faqs";
import "@/public/css/faqs.css";
import React from "react";

export const metadata = {
  title: "FAQs | HS Race Gear — Custom Racing Suits & Gear",
  description:
    "Answers to your most common questions about custom racing suits, sizing, SFI certifications, lead times, shipping, and returns. Get the info you need before ordering.",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Faqs />
      <Footer3 />
    </>
  );
}
