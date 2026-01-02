import Footer1 from "@/components/footers/Footer1";
import Topbar1 from "@/components/headers/Topbar1";
import Features from "@/components/homes/home-1/Features";
import PlantFeatures from "@/components/homes/home-plant/Features";
import PlantBanner from "@/components/homes/home-plant/Banner";
import Hero from "@/components/homes/home-1/Hero";
import Shopgram from "@/components/homes/home-1/Shopgram";
import Header3 from "@/components/headers/Header3";
import PlantHero from "@/components/homes/home-plant/Hero";
import PlantBanner2 from "@/components/homes/home-plant/Banner2";
import PlantCollections from "@/components/homes/home-plant/Collections";
import PlantProducts from "@/components/homes/home-plant/Products";
import PlantTestimonials from "@/components/homes/home-plant/Testimonials";
import VideoBanner from "@/components/homes/home-bicycle/VideoBanner";



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
      <PlantFeatures />
      <PlantBanner />
      <PlantHero />
      <PlantBanner2 />
      <PlantCollections />
      <PlantProducts />
      <VideoBanner />
      <PlantTestimonials />
      <Shopgram />
      <Features />
      <Footer1 />
    </>
  );
}
