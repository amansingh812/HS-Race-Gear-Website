import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Privacy Policy</span>
          </p>
          <span className="contact-hero-tag">Legal</span>
          <h1 className="contact-hero-title">
            Privacy<br /><span>Policy</span>
          </h1>
          <p className="contact-hero-subtitle">
            Learn how HS RaceGear collects, uses, and protects your personal information when you shop on our store.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">1. Information We Collect</h2>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Personal Information You Provide</h3>
                <p className="hs-doc-card-text">When you place an order, create an account, or contact us, we may collect:</p>
                <ul className="hs-doc-list">
                  <li>Name</li>
                  <li>Billing and shipping address</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Account login credentials</li>
                  <li>Order and purchase history</li>
                  <li>Payment details (never collected on this website — arranged directly with our team after you order)</li>
                </ul>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">HS Racegear does NOT collect or store your credit card information on this website. Payment is arranged directly with our team after your order is confirmed.</p>
              </div>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Automatically Collected Information</h3>
                <p className="hs-doc-card-text">When you browse our website, we may automatically collect:</p>
                <ul className="hs-doc-list">
                  <li>IP address</li>
                  <li>Browser type and device information</li>
                  <li>Pages visited and time spent on the site</li>
                  <li>Referring URLs</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
                <p className="hs-doc-card-text">This data helps us improve site performance, security, and user experience.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">2. How We Use Your Information</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">We use your information to:</p>
                <ul className="hs-doc-list">
                  <li>Process and fulfill orders</li>
                  <li>Communicate order updates and customer support responses</li>
                  <li>Prevent fraud and unauthorized transactions</li>
                  <li>Improve our website, products, and services</li>
                  <li>Send marketing emails or promotions (you may opt out at any time)</li>
                  <li>Maintain internal records and legal compliance</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">3. Cookies &amp; Tracking Technologies</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">HS Racegear uses cookies to:</p>
                <ul className="hs-doc-list">
                  <li>Keep items in your shopping cart</li>
                  <li>Remember login sessions</li>
                  <li>Analyze website traffic and performance</li>
                  <li>Improve personalized user experience</li>
                </ul>
                <p className="hs-doc-card-text">
                  You may disable cookies through your browser settings. However, some features of the site may not function properly without them.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">4. Sharing Your Information</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">We do not sell, rent, or trade your personal information. We may share your information only with:</p>
                <ul className="hs-doc-list">
                  <li>Payment processors (for secure transactions)</li>
                  <li>Shipping and fulfillment partners</li>
                  <li>Website hosting and analytics providers</li>
                  <li>Legal or regulatory authorities when required by law</li>
                </ul>
                <p className="hs-doc-card-text">All third parties are required to protect your information and use it only for authorized purposes.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">5. Marketing Communications</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">If you opt in, we may send you emails or messages about new products, special offers, and promotions. You can unsubscribe at any time using the link provided in our emails. We never share your email address with third parties for marketing.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">6. Data Security</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">We implement industry-standard security measures. While no online system is 100% secure, we take reasonable steps to protect your information both online and offline.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">7. Your Rights &amp; Choices</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">You have the right to:</p>
                <ul className="hs-doc-list">
                  <li>Access the personal data we hold about you</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
                <p className="hs-doc-card-text">To exercise these rights, contact us using the information below.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">8–10. Additional Policies</h2>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Third-Party Links</h3>
                <p className="hs-doc-card-text">Our website may contain links to third-party websites. HS Racegear is not responsible for the privacy practices or content of those sites.</p>
              </div>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Legal Disclosure</h3>
                <p className="hs-doc-card-text">We may disclose personal information if required to do so by law, court order, or legal process, or to protect our rights, customers, or the integrity of our business.</p>
              </div>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Changes to This Policy</h3>
                <p className="hs-doc-card-text">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">11. Contact Us</h2>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  If you have any questions or concerns regarding this Privacy Policy, please contact us:<br /><br />
                  HS RaceGear<br />
                  📧 Email: <a href="mailto:info@hsracegear.com" style={{ color: '#e21b1b' }}>info@hsracegear.com</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
