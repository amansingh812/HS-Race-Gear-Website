import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Faqs from "@/components/hsRaceGear/faqs/Faqs";
import "@/public/css/faqs.css";
import React from "react";
import Link from "next/link";
import Breadcumb from "@/components/common/Breadcumb";
export const metadata = {
  title: "Faq || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      {/* <Breadcumb pageName="FAQs" pageTitle="Frequently Asked Questions" /> */}
      <Faqs />
      <Footer3 />
    </>
  );
}
