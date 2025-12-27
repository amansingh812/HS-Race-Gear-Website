import Footer1 from "@/components/footers/Footer1";
import Header9 from "@/components/headers/Header9";
import Topbar2 from "@/components/headers/Topbar2";
import Banner from "@/components/homes/home-electric-accessories/Banner";
import Brands from "@/components/homes/home-electric-accessories/Brands";
import Categories from "@/components/homes/home-electric-accessories/Categories";
import Collectiions from "@/components/homes/home-electric-accessories/Collectiions";
import Features from "@/components/homes/home-electric-accessories/Features";
import Hero from "@/components/homes/home-electric-accessories/Hero";
import Products from "@/components/homes/home-electric-accessories/Products";
import Products2 from "@/components/homes/home-electric-accessories/Products2";
import Products3 from "@/components/homes/home-electric-accessories/Products3";
import Products4 from "@/components/homes/home-electric-accessories/Products4";
import React from "react";

export const metadata = {
  title:
    "Home Electric Accessories || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar" />
      <Header9 />
      <Hero />
      <Products />
      <Collectiions />
      <Categories />
      <Products2 />
      <Brands />
      <Products3 />
      <Banner />
      <Products4 />
      <Features />
      <Footer1 />
    </>
  );
}
