import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import PrivacyPolicy from "@/components/hsRaceGear/legal/PrivacyPolicy";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  title: "Privacy Policy | HS Race Gear",
  description:
    "Read the HS RaceGear Privacy Policy. Learn how we collect, use, and protect your personal information when you shop on hsracegear.com.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <PrivacyPolicy />
      <Footer3 />
    </>
  );
}
