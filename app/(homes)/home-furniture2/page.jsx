import Footer6 from "@/components/footers/Footer6";
import Header5 from "@/components/headers/Header5";
import Topbar2 from "@/components/headers/Topbar2";
import Banner from "@/components/homes/home-furniture2/Banner";
import Categories from "@/components/homes/home-furniture2/Categories";
import Collections from "@/components/homes/home-furniture2/Collections";
import Features from "@/components/homes/home-furniture2/Features";
import Hero from "@/components/homes/home-furniture2/Hero";
import InstagramPosts from "@/components/homes/home-furniture2/InstagramPosts";
import Lookbook from "@/components/homes/home-furniture2/Lookbook";
import Products1 from "@/components/homes/home-furniture2/Products1";
import Testimonials from "@/components/homes/home-furniture2/Testimonials";
import React from "react";
export const metadata = {
  title: "Home Furniture 02 || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-green topbar-bg" />
      <Header5 />
      <Hero />
      <Collections />
      <Products1 />
      <Banner />
      <Categories />
      <Lookbook />
      <Testimonials />
      <InstagramPosts />

      <Features />
      <Footer6 />
    </>
  );
}
