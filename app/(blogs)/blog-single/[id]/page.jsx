import BlogSingle from "@/components/blogs/BlogSingle";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import { allBlogs } from "@/data/blogs";
import React from "react";

export const metadata = {
  title: "Blog | HS Race Gear",
  description: "Racing guides, safety tips and gear advice from HS Race Gear.",
  robots: { index: false, follow: false }, // Redirect handles this — kept as backup noindex
};
export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;

  const blog = allBlogs.filter((p) => p.id == id)[0] || allBlogs[0];
  return (
    <>
      <Topbar1 />
      <Header3 />
      <BlogSingle blog={blog} />
      <RelatedBlogs />
      <Footer3 />
    </>
  );
}
