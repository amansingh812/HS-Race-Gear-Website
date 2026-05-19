import React from "react";
import Link from "next/link";
import Image from "next/image";

const BLOG_POSTS = [
  {
    slug: "sfi-rated-racing-suit-by-class",
    tag: "Discipline Guide",
    icon: "🏁",
    image: "/images/home/blog_1.webp",
    title: "SFI Rated Racing Suit by Class — Which Rating You Actually Need",
    excerpt:
      "Sprint car, dirt late model, drag, karting, road racing, powerboat — the exact SFI 3.2A rating you need for the car you actually race. A practical, discipline-by-discipline guide.",
    date: "May 2026",
    readTime: "8 min read",
  },
  {
    slug: "aftermarket-racing-suits",
    tag: "Buyer's Guide",
    icon: "🔧",
    image: "/images/home/blog2.webp",
    title: "Aftermarket Racing Suits: When to Upgrade From Stock Gear",
    excerpt:
      "When is it time to move past your entry-level suit? Aftermarket auto racing suits explained — SFI ratings, Nomex® vs generic FR, custom vs off-the-rack, and the five signs your current suit is done.",
    date: "May 2026",
    readTime: "8 min read",
  },
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
    title: "SFI Ratings Explained — Which Certification Does Your Race Suit Need?",
    excerpt:
      "SFI 3.2A/1, 3.2A/5, 3.2A/15 demystified. What SFI ratings actually mean, what TPP measures, and which SFI suit rating you need for drag, sprint car, dirt, karting, and road racing.",
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
