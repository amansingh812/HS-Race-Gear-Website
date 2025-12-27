import Blogs1 from "@/components/blogs/Blogs1";
import BlogSidebar from "@/components/blogs/BlogSidebar";
import Collections from "@/components/blogs/Collections";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import React from "react";
import Link from "next/link";
import Breadcumb from "@/components/common/Breadcumb";
export const metadata = {
  title: "Blog List 01 || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
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
      <Footer1 />
    </>
  );
}
