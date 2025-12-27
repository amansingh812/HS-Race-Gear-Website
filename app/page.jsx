import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Banner from "@/components/homes/home-1/Banner";
import Brands from "@/components/common/Brands2";
import Categories from "@/components/homes/home-1/Categories";
import Collections from "@/components/homes/home-1/Collections";
import Features from "@/components/homes/home-1/Features";
import PlantFeatures from "@/components/homes/home-plant/Features";
import PlantBanner from "@/components/homes/home-plant/Banner";
import Hero from "@/components/homes/home-1/Hero";
import Products from "@/components/homes/home-1/Products";
import Products2 from "@/components/homes/home-1/Products2";
import Shopgram from "@/components/homes/home-1/Shopgram";
import Testimonials from "@/components/homes/home-1/Testimonials";
import Newsletter from "@/components/modals/Newsletter";
import Topbar2 from "@/components/headers/Topbar2";
import Topbar3 from "@/components/headers/Topbar3";
import Header2 from "@/components/headers/Header2";
import Header3 from "@/components/headers/Header3";
import PlantHero from "@/components/homes/home-plant/Hero";
import PlantBanner2 from "@/components/homes/home-plant/Banner2";
import PlantCollections from "@/components/homes/home-plant/Collections";
import PlantProducts from "@/components/homes/home-plant/Products";
import PlantBlogs from "@/components/homes/home-plant/Blogs";
import PlantTestimonials from "@/components/homes/home-plant/Testimonials";
import PlantShopgram from "@/components/homes/home-plant/Shopgram";



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
      <PlantTestimonials />
      <Shopgram />
      <Features />
      <Footer1 />
    </>
  );
}
