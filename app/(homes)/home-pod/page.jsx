import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar4 from "@/components/headers/Topbar4";
import Banner from "@/components/homes/home-pod/Banner";
import Banner2 from "@/components/homes/home-pod/Banner2";
import Collections from "@/components/homes/home-pod/Collections";
import Collections2 from "@/components/homes/home-pod/Collections2";
import Features from "@/components/homes/home-pod/Features";
import Hero from "@/components/homes/home-pod/Hero";
import Marquee from "@/components/homes/home-pod/Marquee";
import Products from "@/components/homes/home-pod/Products";
import Products2 from "@/components/homes/home-pod/Products2";
import Shopgram from "@/components/homes/home-pod/Shopgram";
import Testimonials from "@/components/homes/home-pod/Testimonials";
import React from "react";

export const metadata = {
  title: "Home Pod || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar4 parentClass="tf-topbar bg-brown topbar-bg marquee-topbar" />
      <Header2 />
      <Marquee />
      <Hero />
      <Marquee directionClass="scrollRight" />
      <Collections />
      <Products />
      <Banner2 />
      <Collections2 />
      <Products2 />
      <Banner />
      <Testimonials />
      <Shopgram />
      <Features />
      <Footer1 />
    </>
  );
}
