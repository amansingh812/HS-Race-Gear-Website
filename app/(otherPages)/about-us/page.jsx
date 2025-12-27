import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import About from "@/components/otherPages/About";
import Features from "@/components/otherPages/Features";
import Features2 from "@/components/otherPages/Features2";
import Testimonials from "@/components/otherPages/Testimonials";
import React from "react";

export const metadata = {
  title: "About Us || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <About />
      <Features />
      <Features2 />
      <Testimonials />
      <Footer1 />
    </>
  );
}
