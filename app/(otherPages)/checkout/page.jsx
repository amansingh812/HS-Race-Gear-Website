import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Checkout from "@/components/otherPages/Checkout";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Checkout || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <>
        {/* Breadcrumb */}
        <div className="tf-breadcrumb">
          <div className="container">
            <ul className="breadcrumb-list">
              <li className="item-breadcrumb">
                <Link href={`/`} className="text">
                  Home
                </Link>
              </li>
              <li className="item-breadcrumb dot">
                <span />
              </li>
              <li className="item-breadcrumb">
                <span className="text">Checkout</span>
              </li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Title Page */}
        <section className="page-title">
          <div className="container">
            <div className="box-title text-center justify-items-center">
              <h4 className="title">Checkout</h4>
            </div>
          </div>
        </section>
        {/* /Title Page */}
      </>
      <Checkout />
      <Footer1 />
    </>
  );
}
