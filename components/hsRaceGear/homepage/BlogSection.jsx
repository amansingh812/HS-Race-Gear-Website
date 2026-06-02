import React from "react";
import Link from "next/link";
import Image from "next/image";

// Homepage blog cards updated 2026-05-16 to feature the new aftermarket
// post (targets confirmed GSC demand) and to reflect the retitled SFI
// post that now targets "SFI ratings" / "SFI suit ratings" queries.
// Homepage blog cards updated 2026-05-17 — new SFI-by-class post promoted
// to the lead position; the older "choose-right" post drops off the
// homepage (still in /blog hub). Routes link equity into the freshest
// confirmed-demand content.
// Updated 2026-06-01 — Sprint car post promoted to lead (peak season +
// Knoxville Nationals prep window). Endurance + SFI-by-class round out
// the homepage feed. Older posts cycle to /blog hub.
const articles = [
  {
    tag: "Discipline Guide",
    date: "June 1, 2026",
    title: "Best Sprint Car Racing Suit — USAC, World of Outlaws & ASCS Rules",
    excerpt:
      "What makes a sprint car suit different — arm-restraint compatibility, methanol protection, dust seal at the collar. Plus Knoxville Nationals prep.",
    link: "/blog/best-sprint-car-racing-suit",
    image: "/images/home/blog_1.webp",
  },
  {
    tag: "Endurance Racing",
    date: "June 1, 2026",
    title: "Endurance Racing Suits — Le Mans Gear vs What You Actually Need",
    excerpt:
      "Le Mans is two weeks out. What pro endurance suits do differently, and what amateur 24-hour racers (Lemons, NASA, Thunderhill) actually need.",
    link: "/blog/endurance-racing-suit-guide",
    image: "/images/home/blog2.webp",
  },
  {
    tag: "Discipline Guide",
    date: "May 17, 2026",
    title: "SFI Rated Racing Suit by Class — Which Rating You Actually Need",
    excerpt:
      "Sprint car, dirt, drag, karting, road racing — the exact SFI 3.2A rating you need for the car you actually race. Practical, discipline-by-discipline.",
    link: "/blog/sfi-rated-racing-suit-by-class",
    image: "/images/home/blog3.png",
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
