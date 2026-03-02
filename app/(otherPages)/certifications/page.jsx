import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Breadcumb from "@/components/common/Breadcumb";
import CertificationHero from "@/components/hsRaceGear/certifications/CertificationHero";
import WhatIsSFI from "@/components/hsRaceGear/certifications/WhatIsSFI";
import SFILevelsExplained from "@/components/hsRaceGear/certifications/SFILevelsExplained";
import WhySFICertification from "@/components/hsRaceGear/certifications/WhySFICertification";
import RacingSeriesRequirements from "@/components/hsRaceGear/certifications/RacingSeriesRequirements";
import CertificationVerification from "@/components/hsRaceGear/certifications/CertificationVerification";
import OurCertifiedSuits from "@/components/hsRaceGear/certifications/OurCertifiedSuits";
import ComplianceInfo from "@/components/hsRaceGear/certifications/ComplianceInfo";
import CertificationCTA from "@/components/hsRaceGear/certifications/CertificationCTA";
import React from "react";

export const metadata = {
  title: "SFI Approved Certification – SFI 3.2A/5 & SFI 3.2A/1 | HS Race Gear",
  description: "Every fire suit sold by HS Race Gear is engineered to meet SFI Foundation–approved standards. Learn about SFI 3.2A/5 and SFI 3.2A/1 certifications for motorsports safety.",
  keywords: "SFI certification, SFI 3.2A/5, SFI 3.2A/1, racing suit certification, fire suit safety, motorsports safety standards, Nomex racing suits",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
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
      <Footer3 />
    </>
  );
}
