// Shared internal-linking component — surfaces blog posts as cards on
// other blog posts and on the /custom-race-suit lander.
// Added 2026-05-16 to build hub-and-spoke internal linking for SEO.
import React from "react";
import Link from "next/link";
import Image from "next/image";

const ALL_POSTS = [
  {
    slug: "sfi-rated-racing-suit-by-class",
    tag: "Discipline Guide",
    image: "/images/home/blog_1.webp",
    title: "SFI Rated Racing Suit by Class — Which Rating You Actually Need",
    excerpt:
      "Sprint car, drag, dirt late model, karting, road racing — the exact SFI rating for the car you actually race, in one practical guide.",
    readTime: "8 min read",
  },
  {
    slug: "aftermarket-racing-suits",
    tag: "Buyer's Guide",
    image: "/images/home/blog2.webp",
    title: "Aftermarket Racing Suits: When to Upgrade From Stock Gear",
    excerpt:
      "When is it time to move past your entry-level suit? SFI ratings, Nomex® vs generic FR, and custom vs off-the-rack.",
    readTime: "8 min read",
  },
  {
    slug: "understanding-sfi-certifications",
    tag: "Safety",
    image: "/images/home/blog_1.webp",
    title: "SFI Ratings Explained — Which Certification Does Your Race Suit Need?",
    excerpt:
      "SFI 3.2A/1, 3.2A/5, 3.2A/15 demystified. What SFI ratings actually mean and which suit rating you need.",
    readTime: "6 min read",
  },
  {
    slug: "choose-right-racing-suit",
    tag: "Discipline Guide",
    image: "/images/home/blog2.webp",
    title: "How to Choose the Right Racing Suit for Your Discipline",
    excerpt:
      "Drag, sprint car, dirt, road racing, karting — what changes per discipline and what to look for.",
    readTime: "7 min read",
  },
  {
    slug: "perfect-custom-fit-racing-suit",
    tag: "Custom Fit",
    image: "/images/home/blog3.png",
    title: "5 Essential Tips for Getting the Perfect Custom Fit Racing Suit",
    excerpt:
      "Precision matters. The five measurement and posture tips that get your custom suit right on the first try.",
    readTime: "5 min read",
  },
];

export default function RelatedBlogPosts({ excludeSlug, heading, subtitle, limit = 3 }) {
  const posts = ALL_POSTS.filter((p) => p.slug !== excludeSlug).slice(0, limit);
  const sectionHeading = heading || "Related Reading";
  const sectionSubtitle =
    subtitle || "Keep going — more racing-suit guides from the HS Race Gear blog.";

  if (!posts.length) return null;

  return (
    <section className="blog-listing-section" style={{ paddingTop: "0" }}>
      <div className="container">
        <div className="blog-listing-header">
          <div>
            <h2 className="hs-doc-heading" style={{ margin: 0 }}>{sectionHeading}</h2>
            <p style={{ margin: "8px 0 0", color: "#9ca3af", fontSize: "0.95rem" }}>
              {sectionSubtitle}
            </p>
          </div>
          <Link
            href="/blog"
            style={{
              color: "#e21b1b",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
            }}
          >
            All articles →
          </Link>
        </div>

        <div className="blog-listing-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card-thumb">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="blog-card-body">
                <span className="blog-card-tag">{post.tag}</span>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-date">{post.readTime}</span>
                  <span className="blog-card-read">Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
