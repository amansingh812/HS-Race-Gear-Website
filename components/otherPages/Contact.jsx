"use client";
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="s-contact flat-spacing-13">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="wg-map">
              <iframe
                src="https://maps.google.com/maps?q=59+Kondazian+St,+Watertown+MA+02472&output=embed"
                className="map"
                style={{ border: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="content-left">
              <div className="title fw-medium display-md-2">Contact Us</div>
              <p className="sub-title text-main">
                Have a question? Please contact us using the customer support
                <br />
                channels below.
              </p>
              <ul className="contact-list">
                <li>
                  <p>
                    Address:{" "}
                    <a
                      className="link"
                      href="https://maps.google.com/?q=59+Kondazian+St,+Watertown+MA+02472"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      59 Kondazian St, Watertown MA, 02472
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    Phone number:{" "}
                    <a className="link" href="tel:+16173196993">
                      +1 (617) 319 6993
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    Open:{" "}
                    <span className="text-main">Mon – Sat, 9am – 6pm EST</span>
                  </p>
                </li>
              </ul>
              <ul className="tf-social-icon style-large">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="social-item social-facebook"
                  >
                    <i className="icon icon-fb" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="social-item social-instagram"
                  >
                    <i className="icon icon-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" className="social-item social-x">
                    <i className="icon icon-x" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.snapchat.com/"
                    className="social-item social-snapchat"
                  >
                    <i className="icon icon-snapchat" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="content-right">
              <div className="title fw-medium display-md-2">Get In Touch</div>
              <p className="sub-title text-main">
                Please submit&nbsp;all general enquiries&nbsp;in the contact
                form below and we look forward to hearing from you soon.
              </p>
              <div className="form-contact-wrap">
                <form onSubmit={handleSubmit} className="form-default">
                  <div className="wrap">
                    <div className="cols">
                      <fieldset>
                        <label htmlFor="name">Your name*</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <label htmlFor="email">Your email*</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="cols">
                      <fieldset className="textarea">
                        <label htmlFor="message">Message*</label>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>

                    {status === "success" && (
                      <p style={{ color: "#22c55e", marginBottom: "12px", fontSize: "14px" }}>
                        Message sent! We'll get back to you within 24 hours.
                      </p>
                    )}
                    {status === "error" && (
                      <p style={{ color: "#ef4444", marginBottom: "12px", fontSize: "14px" }}>
                        Something went wrong. Please try again or email us directly at hsracegear@gmail.com.
                      </p>
                    )}

                    <div className="button-submit">
                      <button
                        className="tf-btn animate-btn"
                        type="submit"
                        disabled={status === "sending"}
                      >
                        {status === "sending" ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
