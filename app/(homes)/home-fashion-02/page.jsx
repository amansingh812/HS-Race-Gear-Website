import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar2 from "@/components/headers/Topbar2";

import Banner from "@/components/homes/home-fashion-02/Banner";
import Banner2 from "@/components/homes/home-fashion-02/Banner2";
import Blogs from "@/components/homes/home-fashion-02/Blogs";
import Brands from "@/components/common/Brands";
import Features from "@/components/homes/home-fashion-02/Features";
import Hero from "@/components/homes/home-fashion-02/Hero";
import Products from "@/components/homes/home-fashion-02/Products";
import Products2 from "@/components/homes/home-fashion-02/Products2";
import Testimonials from "@/components/homes/home-fashion-02/Testimonials";
import React from "react";
import ProductsModal from "@/components/modals/ProductsModal";

export const metadata = {
  title: "Home Fashion 02 || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 />
      <Header2 />
      <Hero />
      <Products />
      <Banner />
      <Products2 />
      <Banner2 />
      <Brands />
      <Testimonials />
      <Blogs />
      <Features />
      <Footer1 />
      <ProductsModal />
    </>
  );
}
