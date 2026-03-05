import React from "react";
import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    tag: "Safety Guide",
    date: "February 5, 2026",
    title: "How to Choose the Right Racing Suit for Your Discipline",
    excerpt:
      "From drag racing to road course, each discipline has unique requirements. Learn what certifications and features matter most for your type of racing.",
    link: "/faqs",
    image: "/images/home/blog2.webp",
  },
  {
    tag: "Certification",
    date: "January 22, 2026",
    title: "Understanding SFI Certifications: A Complete Guide",
    excerpt:
      "Not sure which SFI certification you need? This guide breaks down the SFI standards, requirements, and which level applies to your racing series.",
    link: "/certifications",
    image: "/images/home/blog_1.webp",
  },
  {
    tag: "Custom Fit",
    date: "January 10, 2026",
    title: "5 Essential Tips for Getting the Perfect Custom Fit",
    excerpt:
      "A perfectly fitted racing suit is more than comfort — it's safety. Follow these measurement tips to ensure your custom suit fits flawlessly.",
    link: "/custom-fit",
    image: "/images/home/blog3.webp",
  },
];

export default function BlogSection() {
  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-section__header">
          <h2 className="blog-section__title">Racing Insights & Guides</h2>
          <p className="blog-section__subtitle">
            Expert tips, safety guides, and the latest in motorsport gear
          </p>
        </div>

        <div className="row g-4">
          {articles.map((article, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="blog-card">
                <div className="blog-card__image">
                  <span className="blog-card__tag">{article.tag}</span>
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={250}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  ) : (
                    <div className="img-placeholder--light img-placeholder">
                      400 x 250
                    </div>
                  )}
                </div>
                <div className="blog-card__body">
                  <p className="blog-card__date">{article.date}</p>
                  <h3 className="blog-card__title">{article.title}</h3>
                  <p className="blog-card__excerpt">{article.excerpt}</p>
                  <Link href={article.link} className="blog-card__link" aria-label={`Read more about ${article.title}`}>
                    Read More <i className="icon icon-arr-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
