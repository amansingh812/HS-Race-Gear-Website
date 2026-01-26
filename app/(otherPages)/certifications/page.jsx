import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/common/Breadcumb";
import CertificationHero from "@/components/otherPages/certifications/CertificationHero";
import WhatIsSFI from "@/components/otherPages/certifications/WhatIsSFI";
import SFILevelsExplained from "@/components/otherPages/certifications/SFILevelsExplained";
import WhySFICertification from "@/components/otherPages/certifications/WhySFICertification";
import RacingSeriesRequirements from "@/components/otherPages/certifications/RacingSeriesRequirements";
import CertificationVerification from "@/components/otherPages/certifications/CertificationVerification";
import OurCertifiedSuits from "@/components/otherPages/certifications/OurCertifiedSuits";
import ComplianceInfo from "@/components/otherPages/certifications/ComplianceInfo";
import CertificationCTA from "@/components/otherPages/certifications/CertificationCTA";
import React from "react";

export const metadata = {
  title: "SFI Approved Certification – SFI 3.2A/5 & SFI 3.2A/1 | HS Race Gear",
  description: "Every fire suit sold by HS Race Gear is engineered to meet SFI Foundation–approved standards. Learn about SFI 3.2A/5 and SFI 3.2A/1 certifications for motorsports safety.",
  keywords: "SFI certification, SFI 3.2A/5, SFI 3.2A/1, racing suit certification, fire suit safety, motorsports safety standards, Nomex racing suits",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Certifications" pageTitle="SFI Approved Certification" />
      <CertificationHero />
      <WhatIsSFI />
      <SFILevelsExplained />
      <WhySFICertification />
      <RacingSeriesRequirements />
      <CertificationVerification />
      <OurCertifiedSuits />
      <ComplianceInfo />
      <CertificationCTA />
      <Footer1 />
    </>
  );
}
