import Header3 from "@/components/headers/Header3";
import Topbar3 from "@/components/headers/Topbar3";
import Banner from "@/components/homes/home-electronic/Banner";
import Categories from "@/components/homes/home-electronic/Categories";
import Hero from "@/components/homes/home-electronic/Hero";
import Marquee from "@/components/homes/home-electronic/Marquee";
import Products from "@/components/homes/home-electronic/Products";
import Products2 from "@/components/homes/home-electronic/Products2";
import Testimonials from "@/components/homes/home-electronic/Testimonials";
import Brands from "@/components/common/Brands";
import React from "react";
import Blogs from "@/components/homes/home-electronic/Blogs";
import Features from "@/components/homes/home-electronic/Features";
import Footer1 from "@/components/footers/Footer1";

export const metadata = {
  title: "Home Electronic || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar3 />
      <Header3 />
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <Banner />
      <Products2 />
      <Testimonials />
      <Brands parentClass="flat-spacing-2" />
      <Blogs />
      <Features />
      <Footer1 />
    </>
  );
}
