import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import AboutHero from "@/components/hsRaceGear/aboutUs/AboutHero";
import AboutStats from "@/components/hsRaceGear/aboutUs/AboutStats";
import AboutMission from "@/components/hsRaceGear/aboutUs/AboutMission";
import AboutProcess from "@/components/hsRaceGear/aboutUs/AboutProcess";
import AboutRacingSeries from "@/components/hsRaceGear/aboutUs/AboutRacingSeries";
import AboutCTA from "@/components/hsRaceGear/aboutUs/AboutCTA";
import "@/public/css/about-us.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "https://www.hsracegear.com/about-us" },
  title: "About HS Race Gear — Custom SFI Racing Suits Made in USA Since 2014",
  description: "HS Race Gear has built custom SFI-certified fire suits, gloves, and shoes for racers since 2014. Every suit built to your exact measurements.",
  keywords: "SFI certified racing suits, custom racegear, fire-resistant racing gear, motorsports apparel, SFI 3.2A/1, racing safety equipment",
};

export default function AboutUsPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
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
