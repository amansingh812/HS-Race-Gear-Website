import React from "react";
import Link from "next/link";
import Image from "next/image";

const BLOG_POSTS = [
  {
    slug: "tpp-rating-explained",
    tag: "Safety Standards",
    icon: "🔥",
    image: "/images/home/blog_1.webp",
    title: "TPP Rating Explained — What Thermal Protective Performance Actually Measures",
    excerpt:
      "The hidden number behind every SFI rating. TPP measures how long a fabric protects skin from second-degree burns — and two SFI 3.2A/5 suits can have wildly different TPP scores. Here's how to find the actual number.",
    date: "June 2026",
    readTime: "7 min read",
  },
  {
    slug: "karting-suit-sizing-guide",
    tag: "Karting Guide",
    icon: "🛞",
    image: "/images/home/blog_1.webp",
    title: "Custom Karting Suit Sizing — Junior, Senior, Shifter & CIK Level 2 Explained",
    excerpt:
      "Karting suits aren't smaller racing suits — they're built around abrasion, not fire. CIK Level 1 vs Level 2, junior and cadet fit, senior sponsor placement, when shifter drivers need the upgrade, and WKA/SKUSA/Rotax requirements.",
    date: "June 2026",
    readTime: "8 min read",
  },
  {
    slug: "best-sprint-car-racing-suit",
    tag: "Discipline Guide",
    icon: "🏁",
    image: "/images/home/blog_1.webp",
    title: "Best Sprint Car Racing Suit — USAC, World of Outlaws & ASCS SFI Rules",
    excerpt:
      "What makes a sprint car racing suit different — arm-restraint compatibility, dust seal at the collar, methanol-specific multi-layer Nomex®, and abrasion-resistant panels. Plus sanctioning body requirements and Knoxville Nationals prep.",
    date: "June 2026",
    readTime: "8 min read",
  },
  {
    slug: "endurance-racing-suit-guide",
    tag: "Endurance Racing",
    icon: "🏆",
    image: "/images/home/blog2.webp",
    title: "Endurance Racing Suits Explained — Le Mans Gear vs What You Actually Need",
    excerpt:
      "Le Mans is two weeks away. What makes pro endurance racing suits different — FIA 8856-2018, multi-driver fit, heat management at hour 14 — and what amateur endurance racers (Lemons, NASA, Thunderhill) actually need.",
    date: "June 2026",
    readTime: "9 min read",
  },
  {
    slug: "drag-racing-suit-requirements",
    tag: "Discipline Guide",
    icon: "🏁",
    image: "/images/home/blog2.webp",
    title: "Drag Racing Suit Requirements — NHRA, IHRA & Street Strip Fire Suit Rules",
    excerpt:
      "Which SFI rating do you need for drag racing? NHRA requires SFI 3.2A/1 for 10.00–11.99 ET and SFI 3.2A/5 for 9.99 and quicker. Full breakdown by class, elapsed time, and sanctioning body.",
    date: "May 2026",
    readTime: "8 min read",
  },
  {
    slug: "racing-suit-hs-code",
    tag: "Import Guide",
    icon: "🌍",
    image: "/images/home/SuitBanner.webp",
    title: "What Is the HS Code for a Racing Suit? (Import & Customs Guide)",
    excerpt:
      "Ordering a custom race suit from the USA? The correct HS code for fire-resistant Nomex racing suits is 6210.40. Import duty rates, glove & shoe codes, and what to put on the commercial invoice — all covered.",
    date: "May 2026",
    readTime: "5 min read",
  },
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
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
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
