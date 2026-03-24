import Blogs3 from "@/components/blogs/Blogs3";

import Sidebar2 from "@/components/blogs/Sidebar2";
import Breadcumb from "@/components/common/Breadcumb";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Blog Grid 01 || HS Race Gear",
  description: "HS Race Gear",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb pageName="Blogs" pageTitle="Blogs" />

      <div className="btn-sidebar-mb d-lg-none right">
        <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
          <i className="icon icon-sidebar" />
        </button>
      </div>
      <section className="s-blog-grid sec-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Blogs3 />
            </div>
            <div className="col-lg-4">
              <Sidebar2 prentClass="sidebar-blog d-lg-grid d-none sidebar-content-wrap" />
            </div>
          </div>
        </div>
      </section>
      <Footer3 />
    </>
  );
}
