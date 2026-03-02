import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/common/Breadcumb";
import TermsAndConditions from "@/components/hsRaceGear/legal/TermsAndConditions";
import "@/public/css/vs-pyrotect.css";
import React from "react";

export const metadata = {
  title: "Terms & Conditions | HS Race Gear",
  description:
    "Read the Terms and Conditions for HS RaceGear. Covers online store terms, billing, product policies, liability, and more.",
};

export default function TermsAndConditionPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb pageName="Legal" pageTitle="Terms & Conditions" />
      <TermsAndConditions />
      <Footer3 />
    </>
  );
}
