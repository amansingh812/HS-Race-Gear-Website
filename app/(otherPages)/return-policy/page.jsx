import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import ReturnPolicy from "@/components/hsRaceGear/legal/ReturnPolicy";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/return-policy" },
  title: "Return & Refund Policy | HS Race Gear",
  description:
    "Read the HS Race Gear Return and Refund Policy. Learn about our 24-hour return window, how to request a refund, and how to contact us.",
};

export default function ReturnPolicyPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <ReturnPolicy />
      <Footer3 />
    </>
  );
}
