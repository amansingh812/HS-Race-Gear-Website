"use client";
import React, { useState } from "react";
import axios from "axios";

export default function NewsletterSignup() {
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        { email }
      );
      if ([200, 201].includes(response.status)) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section className="newsletter-signup">
      <div className="container">
        <div className="newsletter-signup__inner">
          <h2 className="newsletter-signup__title">
            Stay on Track
          </h2>
          <p className="newsletter-signup__subtitle">
            Get exclusive deals, product launches, and racing tips delivered to your inbox.
          </p>
          <form className="newsletter-signup__form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="newsletter-signup__input"
              placeholder="Enter your email address"
              required
              aria-label="Email address"
            />
            <button type="submit" className="newsletter-signup__button">
              Subscribe
            </button>
          </form>
          {status === "success" && (
            <p className="newsletter-signup__message newsletter-signup__message--success">
              You have successfully subscribed!
            </p>
          )}
          {status === "error" && (
            <p className="newsletter-signup__message newsletter-signup__message--error">
              Something went wrong. Please try again.
            </p>
          )}
          <p className="newsletter-signup__privacy">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
