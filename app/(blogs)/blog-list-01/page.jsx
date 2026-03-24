import Blogs1 from "@/components/blogs/Blogs1";
import BlogSidebar from "@/components/blogs/BlogSidebar";
import Collections from "@/components/blogs/Collections";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";
import Link from "next/link";
import Breadcumb from "@/components/common/Breadcumb";
export const metadata = {
  title: "Blog | HS Race Gear",
  description: "Racing guides, safety tips and gear advice from HS Race Gear.",
  robots: { index: false, follow: false }, // Redirect handles this — kept as backup noindex
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Breadcumb pageName="Blogs" pageTitle="Blogs" />

      <Collections />
      <div className="btn-sidebar-mb d-lg-none right">
        <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
          <i className="icon icon-sidebar" />
        </button>
      </div>
      <section className="s-blog-list-v1 sec-blog space-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Blogs1 />
            </div>
            <div className="col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
      <Footer3 />
    </>
  );
}
