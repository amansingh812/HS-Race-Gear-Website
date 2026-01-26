import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Topbar2 from "@/components/headers/Topbar2";
import About from "@/components/otherPages/About";
import Features from "@/components/otherPages/Features";
import Features2 from "@/components/otherPages/Features2";
import Testimonials from "@/components/otherPages/Testimonials";
import React from "react";

export const metadata = {
  title: "About Us - HS Race Gear | Premium SFI Certified Racing Suits & Motorsports Apparel",
  description: "Discover HS Race Gear - Over 10 years providing premium SFI certified racing suits, custom racegear, and fire-resistant motorsports apparel. Safety first, quality always.",
  keywords: "SFI certified racing suits, custom racegear, fire-resistant racing gear, motorsports apparel, SFI 3.2A/1, racing safety equipment",
  openGraph: {
    title: "About HS Race Gear - Premium SFI Certified Racing Equipment",
    description: "Trusted by racers worldwide for over a decade. Premium SFI certified racing suits and custom motorsports apparel.",
    type: "website",
  },
};
export default function page() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <About />
      <Features />
      <div className="container">
        <div className="line" />
      </div>
      <Features2 />
      <Testimonials />
      <Footer1 />
    </>
  );
}
