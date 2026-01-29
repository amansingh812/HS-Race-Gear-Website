import Footer1 from "@/components/footers/Footer1";
import Topbar1 from "@/components/headers/Topbar1";
import Topbar2 from "@/components/headers/Topbar2";
import Topbar3 from "@/components/headers/Topbar3";
import Topbar4 from "@/components/headers/Topbar4";
import Features from "@/components/homes/home-1/Features";
import PlantFeatures from "@/components/homes/home-plant/Features";
import PlantBanner from "@/components/homes/home-plant/Banner";
import Hero from "@/components/homes/home-1/Hero";
import HeroF from "@/components/homes/home-fashion-02/HeroF";
import Shopgram from "@/components/homes/home-1/Shopgram";
import Header3 from "@/components/headers/Header3";
import PlantHero from "@/components/homes/home-plant/Hero";
import PlantBanner2 from "@/components/homes/home-plant/Banner2";
import PlantCollections from "@/components/homes/home-plant/Collections";
import PlantProducts from "@/components/homes/home-plant/Products";
import PlantTestimonials from "@/components/homes/home-plant/Testimonials";
import VideoBanner from "@/components/homes/home-bicycle/VideoBanner";
import Banner2 from "@/components/homes/home-fashion-02/Banner2";
import Collectionss from "@/components/homes/home-furniture/Collectionss";
import Collections from "@/components/homes/home-pet-accessories/Collections";


import {
  RacingCategories,
  SpecificationBanner,
  DetailedSpecs,
  WhyChooseUs,
} from "@/components/homes/home-racing";

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
      {/* <PlantBanner /> */}
      <PlantCollections />
      <RacingCategories />
      {/* <Collections /> */}


      <Banner2 />

      {/* <Collectionss /> */}

      {/* <PlantBanner2 /> */}

      <HeroF />



      {/* <SpecificationBanner /> */}


      <DetailedSpecs />

      {/* <PlantCollections /> */}
      <PlantFeatures />
      <Footer1 />
    </>
  );
}
