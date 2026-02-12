import Topbar1 from "@/components/headers/Topbar1";
import Header3 from "@/components/headers/Header3";
import { RacingCategories, CustomizeSection, DriversSection } from "@/components/homes/home-racing";
import {
  HeroSection,
  AnnouncementStrip,
  HeroBannersTop,
  HeroBannersMiddle,
  PromoBanner,
  FeaturedProducts,
  ProductSpecsSection,
  HomeTestimonials,
  BlogSection,
  BrandStory,
  NewsletterSignup,
} from "@/components/hsRaceGear/homepage";
import Footer3 from "@/components/footers/Footer3";
import "@/public/css/homepage.css";

export const metadata = {
  title: "HS Race Gear — Custom SFI & FIA Certified Racing Suits, Gloves & Shoes",
  description:
    "HS Race Gear offers custom-fit, SFI & FIA certified racing suits, gloves, shoes, and motorsport safety equipment. Made-to-order with unlimited customization. Trusted by racers worldwide.",
  keywords:
    "custom racing suits, SFI certified racing gear, FIA racing suits, custom fit racing suit, racing gloves, racing shoes, Nomex racing suit, karting suits, motorsport safety equipment",
};

export default function Home() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <HeroSection />
      <AnnouncementStrip />
      <HeroBannersTop />
      <CustomizeSection />
      <PromoBanner />
      <FeaturedProducts />
      <ProductSpecsSection />
      <HeroBannersMiddle />
      <HomeTestimonials />
      <BlogSection />
      <BrandStory />
      <NewsletterSignup />
      <Footer3 />
    </>
  );
}
