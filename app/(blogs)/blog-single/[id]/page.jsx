import BlogSingle from "@/components/blogs/BlogSingle";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import { allBlogs } from "@/data/blogs";
import React from "react";

export const metadata = {
  title: "Blog Single || Vineta - Multipurpose React Nextjs eCommerce",
  description: "Vineta - Multipurpose React Nextjs eCommerce",
};
export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;

  const blog = allBlogs.filter((p) => p.id == id)[0] || allBlogs[0];
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <BlogSingle blog={blog} />
      <RelatedBlogs />
      <Footer1 />
    </>
  );
}
