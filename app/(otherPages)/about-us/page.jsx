import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import AboutHero from "@/components/hsRaceGear/aboutUs/AboutHero";
import AboutStats from "@/components/hsRaceGear/aboutUs/AboutStats";
import AboutMission from "@/components/hsRaceGear/aboutUs/AboutMission";
import AboutProcess from "@/components/hsRaceGear/aboutUs/AboutProcess";
import AboutRacingSeries from "@/components/hsRaceGear/aboutUs/AboutRacingSeries";
import AboutCTA from "@/components/hsRaceGear/aboutUs/AboutCTA";
import "@/public/css/about-us.css";
import React from "react";

export const metadata = {
  title: "About Us - HS Race Gear | Premium SFI Certified Racing Suits & Motorsports Apparel",
  description: "Discover HS Race Gear - Over 10 years providing premium SFI certified racing suits, custom racegear, and fire-resistant motorsports apparel. Safety first, quality always.",
  keywords: "SFI certified racing suits, custom racegear, fire-resistant racing gear, motorsports apparel, SFI 3.2A/1, racing safety equipment",
};

export default function AboutUsPage() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutProcess />
      <AboutRacingSeries />
      <AboutCTA />
      <Footer3 />
    </>
  );
}
