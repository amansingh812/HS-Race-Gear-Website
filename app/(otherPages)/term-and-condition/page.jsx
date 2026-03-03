import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import TermsAndConditions from "@/components/hsRaceGear/legal/TermsAndConditions";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
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
      <TermsAndConditions />
      <Footer3 />
    </>
  );
}
