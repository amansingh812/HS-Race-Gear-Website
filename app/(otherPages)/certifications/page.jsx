import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import CertificationHero from "@/components/hsRaceGear/certifications/CertificationHero";
import CertificationsContent from "@/components/hsRaceGear/certifications/CertificationsContent";
import "@/public/css/contact-us.css";
import "@/public/css/hs-doc-theme.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/certifications" },
  title: "SFI Approved Certification – SFI 3.2A/5 & SFI 3.2A/1 | HS Race Gear",
  description: "Every fire suit sold by HS Race Gear is engineered to meet SFI Foundation–approved standards. Learn about SFI 3.2A/5 and SFI 3.2A/1 certifications for motorsports safety.",
  keywords: "SFI certification, SFI 3.2A/5, SFI 3.2A/1, racing suit certification, fire suit safety, motorsports safety standards, Nomex racing suits",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <CertificationHero />
      <CertificationsContent />
      <Footer3 />
    </>
  );
}
