"use client";
// Shared landing-page component used by /custom-{discipline}-suit pages.
// Each route passes a `data` prop with discipline-specific copy. Created
// 2026-06-30 to capture discipline-specific buyer-intent queries.
import React from "react";
import Link from "next/link";

export default function DisciplineLandingPage({ data }) {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">{data.breadcrumb}</span>
          </p>
          <span className="contact-hero-tag">{data.disciplineTag}</span>
          <h1 className="contact-hero-title">
            {data.h1First}<br /><span>{data.h1Second}</span>
          </h1>
          <p className="contact-hero-subtitle">{data.subtitle}</p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={data.primaryCtaHref} className="tf-btn btn-fill animate-btn">
              {data.primaryCtaText}
            </Link>
            <Link href="/custom-measurement" className="tf-btn animate-btn" style={{ border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
              How to Measure
            </Link>
          </div>
        </div>
      </section>

      {/* BUILT FOR */}
      <section className="blog-post-section" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="blog-post-content">
            <div className="blog-body-block">
              <h2 className="blog-body-heading">Built for {data.disciplineFullName}</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">{data.builtForIntro}</p>
                <ul className="blog-body-list blog-body-list--check">
                  {data.builtForPoints.map((p, i) => (
                    <li key={i}><strong>{p.title}</strong> — {p.detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SANCTIONING */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">Sanctioning Body Compliance</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">{data.sanctioningIntro}</p>
                <ul className="blog-body-list">
                  {data.sanctioningBodies.map((b, i) => (
                    <li key={i}><strong style={{ color: "#e21b1b" }}>{b.name}:</strong> {b.requirement}</li>
                  ))}
                </ul>
              </div>
              <div className="blog-highlight-box">
                <p>{data.sanctioningCallout}</p>
              </div>
            </div>

            {/* PRICING / PROCESS */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">Pricing &amp; Custom Process</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Custom {data.suitNoun} pricing starts at <strong style={{ color: "#e21b1b" }}>$329</strong>. The process is the same for every order:
                </p>
                <ul className="blog-body-list">
                  <li>Submit measurements via <Link href="/custom-measurement" style={{ color: "#e21b1b", textDecoration: "underline" }}>the measurement form</Link></li>
                  <li>Designer produces a digital mockup within 24–72 hours</li>
                  <li>Unlimited revisions until you approve the design</li>
                  <li>Production: 4–6 weeks from approved mockup</li>
                  <li>QC check, ship to your door — free shipping on custom suits</li>
                </ul>
              </div>
            </div>

            {/* RELATED READING */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">Learn More</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">Before ordering, you may want to review:</p>
                <ul className="blog-body-list">
                  {data.relatedReading.map((r, i) => (
                    <li key={i}>
                      <Link href={r.href} style={{ color: "#e21b1b", textDecoration: "underline" }}>
                        {r.title}
                      </Link>
                      {r.note ? ` — ${r.note}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-inner">
            <span className="blog-cta-tag">Custom · {data.certBadge} · Made in USA</span>
            <h2 className="blog-cta-title">{data.ctaTitle}</h2>
            <p className="blog-cta-subtitle">{data.ctaSubtitle}</p>
            <div className="blog-cta-buttons">
              <Link href={data.primaryCtaHref} className="tf-btn btn-fill animate-btn">
                {data.primaryCtaText}
              </Link>
              <Link href="/contact-us" className="tf-btn animate-btn" style={{ border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                Ask About Team Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
