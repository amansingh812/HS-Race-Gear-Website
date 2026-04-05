import React from "react";
import Link from "next/link";
import Image from "next/image";

const BLOG_POSTS = [
  {
    slug: "perfect-custom-fit-racing-suit",
    tag: "Custom Fit",
    icon: "🏎️",
    image: "/images/home/blog3.png",
    title: "5 Essential Tips for Getting the Perfect Custom Fit Racing Suit",
    excerpt:
      "Precision matters. Even small measuring mistakes can affect performance, comfort, and compliance. Here are five essential tips to get your custom suit right every time.",
    date: "March 2026",
    readTime: "5 min read",
  },
  {
    slug: "choose-right-racing-suit",
    tag: "Buyer's Guide",
    icon: "🛡️",
    image: "/images/home/blog2.webp",
    title: "How to Choose the Right Racing Suit for Your Discipline",
    excerpt:
      "Not all racing suits are the same. The best option depends on your racing discipline, safety requirements, and performance needs. Here's your complete buyer's guide.",
    date: "March 2026",
    readTime: "7 min read",
  },
  {
    slug: "understanding-sfi-certifications",
    tag: "Safety",
    icon: "⚡",
    image: "/images/home/blog_1.webp",
    title: "Understanding SFI Certifications: A Complete Guide",
    excerpt:
      "In motorsports, safety is never optional — it's a requirement. Everything you need to know about SFI ratings, TPP scores, and choosing the right protection level.",
    date: "March 2026",
    readTime: "6 min read",
  },
];

export default function BlogListing() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Blog</span>
          </p>
          <span className="contact-hero-tag">Racing Knowledge Hub</span>
          <h1 className="contact-hero-title">
            HS Race Gear<br /><span>Blog</span>
          </h1>
          <p className="contact-hero-subtitle">
            Expert guides, safety insights, and racewear knowledge — built for drivers who take performance seriously.
          </p>
        </div>
      </section>

      {/* LISTING */}
      <section className="blog-listing-section">
        <div className="container">
          <div className="blog-listing-header">
            <h2 className="hs-doc-heading" style={{ margin: 0 }}>Latest Articles</h2>
            <span className="blog-listing-count">{BLOG_POSTS.length} Articles</span>
          </div>

          <div className="blog-listing-grid">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
              >
                <div className="blog-card-thumb">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={250}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  ) : (
                    post.icon
                  )}
                </div>
                <div className="blog-card-body">
                  <span className="blog-card-tag">{post.tag}</span>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-date">{post.date} · {post.readTime}</span>
                    <span className="blog-card-read">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
