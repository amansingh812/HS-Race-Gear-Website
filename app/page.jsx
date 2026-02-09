import Footer1 from "@/components/footers/Footer1";
import Topbar1 from "@/components/headers/Topbar1";
import PlantFeatures from "@/components/homes/home-plant/Features";
import Hero from "@/components/homes/home-1/Hero";
import HeroF from "@/components/homes/home-fashion-02/HeroF";
import Header3 from "@/components/headers/Header3";
import PlantCollections from "@/components/homes/home-plant/Collections";
import HeroElectronic from "@/components/homes/home-electric-accessories/HeroElectronic";
import HeroElectronic2 from "@/components/homes/home-electric-accessories/HeroElectronic2";

import {
  RacingCategories,
  SpecificationBanner,
  DetailedSpecs,
  WhyChooseUs,
  DriversSection,
  CustomizeSection,
} from "@/components/homes/home-racing";
import Footer2 from "@/components/footers/Footer2";
import Footer3 from "@/components/footers/Footer3";
import Footer4 from "@/components/footers/Footer4";
import Footer5 from "@/components/footers/Footer5";
import Footer6 from "@/components/footers/Footer6";

export const metadata = {
  title: "Home || H&S Racing Gear - Premium Custom Racing Suits & Motorsport Safety Equipment",
  description: "H&S Racing Gear - Custom-fit FIA approved racing suits, karting gear, and motorsport safety equipment. Made-to-order, trusted by racers worldwide.",
};

export default function Home() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Hero />
      <CustomizeSection />
      {/* <PlantBanner /> */}
      <PlantCollections />
      {/* <Collections /> */}
      {/* <Banner2 /> */}
      {/* <Collectionss /> */}
      {/* <PlantBanner2 /> */}
      <HeroElectronic />
      <HeroF />
      <DriversSection />
      {/* <SpecificationBanner /> */}
      <HeroElectronic2 />
      {/* <PlantCollections /> */}
      <PlantFeatures />
      <Footer3 />
    </>
  );
}
