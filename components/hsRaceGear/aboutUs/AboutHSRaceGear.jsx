"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/public/css/about-us.css";

export default function AboutHSRaceGear() {
  const coreValues = [
    {
      icon: "🛡️",
      title: "Safety First",
      subtitle: "Built to SFI Standards",
      description: "SFI certified racing suits adhering to rigorous specifications, ensuring fire-resistant protection and race-ready performance from single-layer SFI 3.2A/1 to multi-layer certified suits."
    },
    {
      icon: "🏁",
      title: "10+ Years Experience",
      subtitle: "In Racing Apparel",
      description: "Over a decade immersed in motorsports apparel, understanding the unique needs of racers from weekend warriors to professional drivers."
    },
    {
      icon: "⭐",
      title: "Customer Satisfaction",
      subtitle: "At the Core",
      description: "Your satisfaction isn't just a goal — it's our standard. We prioritize open communication, reliable support, and results that exceed expectations."
    },
    {
      icon: "💎",
      title: "Uncompromising Quality",
      subtitle: "That Lasts",
      description: "Every stitch, seam, and component is crafted with durability in mind. Our commitment to high-quality motorsport materials ensures gear that performs lap after lap."
    },
    {
      icon: "🎨",
      title: "Custom Options",
      subtitle: "For Every Racer",
      description: "Stand out on the grid with custom SFI racing suits, personalized embroidery, team branding, and unique combinations tailored to your identity."
    },
    {
      icon: "🚚",
      title: "On-Time Delivery",
      subtitle: "You Can Count On",
      description: "Racing schedules never wait — that's why we promise reliable delivery, ensuring your custom race suit orders arrive when you need them most."
    }
  ];

  return (
    <>
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://hsracegear.com/#organization",
            "name": "HS Race Gear",
            "alternateName": "HS Racegear",
            "description": "Leading provider of custom-fit, SFI-certified racing suits, gloves, shoes, and motorsport accessories with over a decade of experience",
            "url": "https://hsracegear.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://hsracegear.com/images/logo/logo.webp",
              "width": 148,
              "height": 44
            },
            "image": "https://hsracegear.com/images/logo/logo.webp",
            "foundingDate": "2014",
            "areaServed": "Worldwide",
            "slogan": "Driven by Safety. Fueled by Passion.",
            "telephone": "+1-617-319-6993",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "59 Kondazian St",
              "addressLocality": "Watertown",
              "addressRegion": "MA",
              "postalCode": "02472",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-617-319-6993",
              "contactType": "customer service",
              "availableLanguage": "English",
              "areaServed": "Worldwide"
            },
            "sameAs": [
              "https://www.facebook.com/hsracegear",
              "https://www.instagram.com/hsracegear",
              "https://www.tiktok.com/@hsracegear"
            ],
            "knowsAbout": [
              "Custom Racing Suits",
              "SFI Certified Fire Suits",
              "Nomex Racing Gear",
              "Karting Suits",
              "Racing Gloves",
              "Racing Shoes",
              "Motorsport Safety Equipment"
            ]
          })
        }}
      />

      {/* Hero Section */}
      <section className="flat-spacing-3 bg-gradient" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="text-white">
                <h1 className="display-3 fw-bold mb-4">
                  Driven by Safety.<br />
                  Fueled by Passion.
                </h1>
                <p className="fs-4 mb-3 text-light-emphasis">
                  Premium SFI Custom Racegear for Champions
                </p>
                <p className="lead text-white-50 mb-4">
                  Your trusted destination for SFI certified racing gear and high-performance 
                  motorsports apparel designed for racers of all levels.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link href="/shop" className="btn btn-primary btn-lg px-5">
                    Shop Racing Suits
                  </Link>
                  <Link href="/custom-fit" className="btn btn-outline-light btn-lg px-5">
                    Custom Fit Guide
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5 mt-5 mt-lg-0">
              <div className="position-relative">
                <Image
                  src="/images/racing/hero-suit.jpg"
                  alt="HS Race Gear SFI Certified Racing Suit"
                  width={600}
                  height={700}
                  className="rounded-4 shadow-lg"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-danger fs-6 px-3 py-2">
                    SFI Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flat-spacing-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <span className="badge bg-primary-subtle text-primary px-4 py-2 mb-3">
                  Our Mission & History
                </span>
                <h2 className="display-5 fw-bold mb-4">
                  Over a Decade of Excellence in Racing Safety
                </h2>
              </div>
              
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-5">
                  <p className="fs-5 text-secondary mb-4 text-center">
                    For over <strong>10 years</strong>, HS Race Gear has stood at the forefront of the motor racing 
                    apparel industry, delivering <strong>SFI-compliant fire-resistant racing suits</strong>, gloves, 
                    shoes, and custom gear that racers trust on and off the track.
                  </p>
                  <p className="text-muted text-center mb-0">
                    Our journey began with a simple philosophy: <strong className="text-dark">your safety and 
                    satisfaction always come first</strong>. Whether you're competing in drag racing, karting, 
                    club events, or professional motorsport series, our products are engineered for maximum 
                    fire protection, comfort, and performance — meeting strict SFI safety regulations and 
                    crafted to withstand the most demanding racing conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="flat-spacing-3 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">What Drives Us — Our Core Values</h2>
            <p className="text-muted fs-5">
              Built on a foundation of safety, quality, and customer satisfaction
            </p>
          </div>
          
          <div className="row g-4">
            {coreValues.map((value, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-lift" style={{ transition: "transform 0.3s" }}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start mb-3">
                      <span className="fs-1 me-3">{value.icon}</span>
                      <div>
                        <h4 className="card-title mb-1">{value.title}</h4>
                        <p className="text-primary fw-medium mb-0">{value.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Support Highlight */}
      <section className="flat-spacing-3">
        <div className="container">
          <div className="row align-items-center bg-primary rounded-4 p-5 text-white">
            <div className="col-lg-8">
              <h3 className="display-6 fw-bold mb-3">24/7 Personalized Support</h3>
              <p className="fs-5 mb-0">
                Have questions about SFI certifications, custom sizing, or branding your team's gear? 
                Our round-the-clock customer support team is here to help with advice, guidance, and 
                tailored solutions.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link href="/contact-us" className="btn btn-light btn-lg px-5">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="flat-spacing-3 bg-light">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="display-4 fw-bold text-primary mb-2">10+</h3>
                  <p className="text-muted mb-0">Years of Experience</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="display-4 fw-bold text-primary mb-2">100%</h3>
                  <p className="text-muted mb-0">SFI Certified</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="display-4 fw-bold text-primary mb-2">24/7</h3>
                  <p className="text-muted mb-0">Customer Support</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="display-4 fw-bold text-primary mb-2">∞</h3>
                  <p className="text-muted mb-0">Custom Options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Racing Categories Section */}
      <section className="flat-spacing-3">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">Built for All Racing Disciplines</h2>
            <p className="text-muted fs-5">
              From drag racing to professional motorsports — we've got you covered
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 text-center p-4 hover-shadow" style={{ transition: "box-shadow 0.3s" }}>
                <div className="fs-1 mb-3">🏎️</div>
                <h5 className="fw-bold mb-2">Drag Racing</h5>
                <p className="text-muted small mb-0">High-speed fire protection</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 text-center p-4 hover-shadow" style={{ transition: "box-shadow 0.3s" }}>
                <div className="fs-1 mb-3">🏁</div>
                <h5 className="fw-bold mb-2">Karting</h5>
                <p className="text-muted small mb-0">Lightweight & flexible</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 text-center p-4 hover-shadow" style={{ transition: "box-shadow 0.3s" }}>
                <div className="fs-1 mb-3">🏆</div>
                <h5 className="fw-bold mb-2">Club Events</h5>
                <p className="text-muted small mb-0">Certified & affordable</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 text-center p-4 hover-shadow" style={{ transition: "box-shadow 0.3s" }}>
                <div className="fs-1 mb-3">🎯</div>
                <h5 className="fw-bold mb-2">Professional Series</h5>
                <p className="text-muted small mb-0">Elite performance gear</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flat-spacing-3 bg-dark text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">
                Ready to Gear Up for the Track?
              </h2>
              <p className="fs-5 mb-4">
                Explore our extensive range of SFI certified racing suits, custom options, 
                and professional motorsports apparel.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link href="/shop" className="btn btn-primary btn-lg px-5">
                  Browse Racing Suits
                </Link>
                <Link href="/contact-us" className="btn btn-outline-light btn-lg px-5">
                  Get Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for hover effects */}
      <style jsx>{`
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </>
  );
}
