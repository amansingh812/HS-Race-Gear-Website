import Blogs2 from "@/components/blogs/Blogs2";
import Link from "next/link";
import Sidebar2 from "@/components/blogs/Sidebar2";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";

export const metadata = {
  title: "Blog List 02 || HS Race Gear",
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
      <section className="s-blog-list-v2 sec-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <Sidebar2 />
            </div>
            <div className="col-lg-8">
              <Blogs2 />
            </div>
          </div>
        </div>
      </section>
      <Footer3 />
    </>
  );
}
