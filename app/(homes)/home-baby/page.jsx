import Footer1 from "@/components/footers/Footer1";
import Header13 from "@/components/headers/Header13";
import Topbar4 from "@/components/headers/Topbar4";
import Banner from "@/components/homes/home-baby/Banner";
import BannerCountdown from "@/components/homes/home-baby/BannerCountdown";
import Blogs from "@/components/homes/home-baby/Blogs";
import Categories from "@/components/homes/home-baby/Categories";
import Contact from "@/components/homes/home-baby/Contact";
import Features from "@/components/homes/home-baby/Features";
import Features2 from "@/components/homes/home-baby/Features2";
import Hero from "@/components/homes/home-baby/Hero";
import Products from "@/components/homes/home-baby/Products";
import Products2 from "@/components/homes/home-baby/Products2";
import Products3 from "@/components/homes/home-baby/Products3";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Home Baby || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar4 parentClass="tf-topbar bg-light-pink topbar-bg marquee-topbar" />
      <Header13 />
      <Hero />
      {/* <Features /> */}
      <Categories />
      <Products />
      <Banner />
      <Products2 />
      <BannerCountdown />
      <Products3 />
      <Blogs />
      <Contact />
      <Features2 />
      <div className="cloud-footer">
        <Image
          alt=""
          src="/images/section/cloud2.svg"
          width={1920}
          height={317}
        />
      </div>

      <Footer1 cloud />
    </>
  );
}
