"use client";
import React, { useState } from "react";
import Link from "next/link";

const INFO_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Visit Us",
    value: (
      <a href="https://maps.google.com/?q=59+Kondazian+St,+Watertown+MA+02472" target="_blank" rel="noopener noreferrer">
        59 Kondazian St<br />Watertown MA, 02472
      </a>
    ),
    note: "By appointment preferred",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 8 8l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.5z"/>
      </svg>
    ),
    label: "Call Us",
    value: <a href="tel:+16173196993">+1 (617) 319 6993</a>,
    note: "Mon – Sat, 9am – 6pm EST",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email Us",
    value: <a href="mailto:hsracegear@gmail.com">hsracegear@gmail.com</a>,
    note: "We reply within 24 hours",
  },
];

const SUBJECTS = ["Custom Order", "Pricing", "Sizing & Fit", "General Enquiry", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectSubject = (s) => {
    setForm((prev) => ({ ...prev, subject: prev.subject === s ? "" : s }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `${form.subject ? `Subject: ${form.subject}\nPhone: ${form.phone || "N/A"}\n\n` : ""}${form.message}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Contact Us</span>
          </p>
          <span className="contact-hero-tag">Get In Touch</span>
          <h1 className="contact-hero-title">
            We&apos;re Here to<br /><span>Help You Race</span>
          </h1>
          <p className="contact-hero-subtitle">
            Have a question about your custom suit, sizing, or an order? Our team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* INFO CARDS + FORM */}
      <section className="contact-info-section">
        <div className="container">

          {/* Info cards */}
          <div className="contact-info-grid">
            {INFO_CARDS.map((card, i) => (
              <div className="contact-info-card" key={i}>
                <div className="contact-info-icon">{card.icon}</div>
                <div>
                  <p className="contact-info-label">{card.label}</p>
                  <p className="contact-info-value">{card.value}</p>
                  <p className="contact-info-note">{card.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="contact-main-grid contact-main-section">

            {/* Form card */}
            <div className="contact-form-card">
              <span className="contact-form-tag">Send a Message</span>
              <h2 className="contact-form-title">Let&apos;s Talk</h2>
              <p className="contact-form-desc">
                Fill in the form and a member of our team will get back to you within 24 hours.
              </p>

              <p className="contact-info-label" style={{ marginBottom: "10px" }}>What&apos;s this about?</p>
              <div className="contact-subject-tags">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`contact-subject-tag${form.subject === s ? " active" : ""}`}
                    onClick={() => selectSubject(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="contact-field-row">
                  <div className="contact-field">
                    <label htmlFor="ct-name">Full Name *</label>
                    <input
                      id="ct-name"
                      type="text"
                      name="name"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="ct-email">Email Address *</label>
                    <input
                      id="ct-email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="ct-phone">Phone (optional)</label>
                  <input
                    id="ct-phone"
                    type="tel"
                    name="phone"
                    placeholder="+1 (617) 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="ct-message">Message *</label>
                  <textarea
                    id="ct-message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {status === "success" && (
                  <div className="contact-status success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Message sent! We&apos;ll get back to you within 24 hours.
                  </div>
                )}
                {status === "error" && (
                  <div className="contact-status error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Something went wrong. Email us directly at hsracegear@gmail.com.
                  </div>
                )}

                <button type="submit" className="contact-submit-btn" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map + Social */}
            <div className="contact-map-card">
              <div className="contact-map-wrap">
                <iframe
                  src="https://maps.google.com/maps?q=59+Kondazian+St,+Watertown+MA+02472&output=embed"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HS Race Gear Location"
                />
              </div>

              <div className="contact-social-card">
                <p className="contact-social-label">Follow Us</p>
                <div className="contact-social-row">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    Instagram
                  </a>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    Facebook
                  </a>
                  <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                    </svg>
                    TikTok
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
