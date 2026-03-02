import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Contact from "@/components/otherPages/Contact";
import React from "react";
import Link from "next/link";
import Breadcumb from "@/components/common/Breadcumb";
export const metadata = {
  title: "Contact Us || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb pageName="Contact Us" pageTitle="Contact Us" />
      <Contact />
      <Footer3 />
    </>
  );
}
