import Footer1 from "@/components/footers/Footer1";
import Header10 from "@/components/headers/Header10";
import Topbar2 from "@/components/headers/Topbar2";
import Banner from "@/components/homes/home-mega-electronic/Banner";
import Blogs from "@/components/homes/home-mega-electronic/Blogs";
import Collections from "@/components/homes/home-mega-electronic/Collections";
import Features from "@/components/homes/home-mega-electronic/Features";
import Products from "@/components/homes/home-mega-electronic/Products";
import Products2 from "@/components/homes/home-mega-electronic/Products2";
import Testimonials from "@/components/homes/home-mega-electronic/Testimonials";
import React from "react";

export const metadata = {
  title: "Home Mega Electronic || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar" />
      <Header10 />
      <Collections />
      <Products />
      <Banner />
      <Products2 />
      <Testimonials />
      <Blogs />
      <Features />
      <Footer1 />
    </>
  );
}
