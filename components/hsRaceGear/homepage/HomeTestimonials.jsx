import React from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "The quality of my custom SFI racing suit exceeded all expectations. Perfect fit, fast delivery, and the team's support was outstanding.",
    name: "Mike R.",
    role: "Professional Drag Racer",
    avatar: "/images/home/people1.webp",
  },
  {
    quote:
      "I've tried several racing gear brands, but nothing compares to the custom fit from HS Race Gear. The Nomex material feels premium and the suit fits like a glove.",
    name: "Sarah T.",
    role: "Club Racer & Track Day Enthusiast",
    avatar: "/images/home/people2.webp",
  },
  {
    quote:
      "Our entire karting team switched to HS Race Gear last season. The custom team branding, matching suits, and personalized embroidery are top notch.",
    name: "David K.",
    role: "Karting Team Manager",
    avatar: "/images/home/people3.webp",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="home-testimonials">
      <div className="container">
        <div className="home-testimonials__header">
          <h2 className="home-testimonials__title">What Racers Say</h2>
          <p className="home-testimonials__subtitle">
            Trusted by drivers across drag racing, karting, and professional motorsport
          </p>
        </div>

        <div className="row g-4">
          {testimonials.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-card__stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="icon-star" />
                  ))}
                </div>
                <p className="testimonial-card__quote">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {item.avatar ? (
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={80}
                        height={80}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="img-placeholder--light img-placeholder"
                        style={{ borderRadius: "50%", fontSize: "0.6rem" }}
                      >
                        80x80
                      </div>
                    )}
                  </div>
                  <div className="testimonial-card__info">
                    <h6>{item.name}</h6>
                    <small>{item.role}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
