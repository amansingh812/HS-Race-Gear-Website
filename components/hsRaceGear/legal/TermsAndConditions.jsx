import React from "react";
import Link from "next/link";

export default function TermsAndConditions() {
  const sections = [
    { title: "OVERVIEW", content: `This website is operated by HS RaceGear. Throughout the site, the terms "we", "us", and "our" refer to HS RaceGear. HS RaceGear offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here. By visiting our site and/or purchasing from us, you engage in our "Service" and agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you may not access the website or use any services.` },
    { title: "SECTION 1 – ONLINE STORE TERMS", content: `By agreeing to these Terms, you represent that you are at least the age of majority in your state or country of residence. You may not use our products for any illegal or unauthorized purpose, nor may you violate any laws in your jurisdiction. Any violation of these Terms may result in immediate termination of services.` },
    { title: "SECTION 2 – GENERAL CONDITIONS", content: `We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission from HS RaceGear.` },
    { title: "SECTION 3 – ACCURACY OF INFORMATION", content: `We are not responsible if information on this site is inaccurate, incomplete, or not current. All content is provided for general informational purposes only. We reserve the right to modify site content at any time without obligation to update previously published information.` },
    { title: "SECTION 4 – MODIFICATIONS TO SERVICE AND PRICES", content: `Product prices are subject to change without notice. We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. Promotions, discounts, or coupon codes are valid only during the stated promotional period and may be modified or terminated at our discretion.` },
    { title: "SECTION 5 – PRODUCTS & MOTORSPORTS WARNING", content: `Certain products may be available exclusively online and may have limited quantities. Returns or exchanges are governed strictly by our Return Policy. We make every effort to display product images and colors accurately; however, we cannot guarantee exact display accuracy on all devices.` },
    { title: "SECTION 6 – BILLING & ACCOUNT INFORMATION", content: `We reserve the right to refuse or cancel any order. Restrictions may apply to orders placed under the same account, credit card, or billing/shipping address. You agree to provide current, complete, and accurate purchase and account information and to promptly update such information as needed.` },
    { title: "SECTION 7 – OPTIONAL THIRD-PARTY TOOLS", content: `We may provide access to third-party tools "as is" and "as available" without warranties or endorsements. Use of such tools is entirely at your own risk.` },
    { title: "SECTION 8 – THIRD-PARTY LINKS", content: `Our Service may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of third-party sites. Any transactions with third parties are solely between you and the third party.` },
    { title: "SECTION 9 – USER COMMENTS & SUBMISSIONS", content: `Any comments, suggestions, ideas, or submissions you provide may be used by HS RaceGear without restriction or compensation. You agree that your submissions will not violate any third-party rights or applicable laws.` },
    { title: "SECTION 10 – PERSONAL INFORMATION", content: `Your submission of personal information is governed by our Privacy Policy.` },
    { title: "SECTION 11 – ERRORS & OMISSIONS", content: `We reserve the right to correct errors, inaccuracies, or omissions related to product descriptions, pricing, promotions, shipping, or availability at any time without notice.` },
    { title: "SECTION 12 – PROHIBITED USES", content: `You are prohibited from using the site or its content for unlawful purposes, intellectual property infringement, harassment, fraud, malware distribution, data scraping, or interference with site security.` },
    { title: "SECTION 13 – DISCLAIMER OF WARRANTIES & LIMITATION OF LIABILITY", content: `The Service and all products are provided "as is" and "as available" without warranties of any kind. HS RaceGear shall not be liable for any direct, indirect, incidental, punitive, or consequential damages arising from your use of the Service or products, to the fullest extent permitted by law.` },
    { title: "SECTION 14 – INDEMNIFICATION", content: `You agree to indemnify and hold harmless HS RaceGear, its affiliates, officers, employees, and partners from any claims arising from your breach of these Terms or misuse of the Service.` },
    { title: "SECTION 15 – SEVERABILITY", content: `If any provision of these Terms is found unenforceable, the remaining provisions shall remain valid and enforceable.` },
    { title: "SECTION 16 – TERMINATION", content: `These Terms remain effective unless terminated by you or HS RaceGear. We may terminate access to the Service at any time for violations of these Terms.` },
    { title: "SECTION 17 – ENTIRE AGREEMENT", content: `These Terms, along with any policies posted on this site, constitute the entire agreement between you and HS RaceGear.` },
    { title: "SECTION 18 – GOVERNING LAW", content: `These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction where HS RaceGear operates.` },
    { title: "SECTION 19 – CHANGES TO TERMS", content: `We reserve the right to update or modify these Terms at any time. Continued use of the website constitutes acceptance of any changes.` },
  ];

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Terms &amp; Conditions</span>
          </p>
          <span className="contact-hero-tag">Legal</span>
          <h1 className="contact-hero-title">
            Terms &amp;<br /><span>Conditions</span>
          </h1>
          <p className="contact-hero-subtitle">
            Read the Terms and Conditions for HS RaceGear. Covers online store terms, billing, product policies, liability, and more.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">
            {sections.map((section, i) => (
              <div className="hs-doc-block" key={i}>
                <h2 className="hs-doc-heading">{section.title}</h2>
                <div className="hs-doc-card">
                  <p className="hs-doc-card-text">{section.content}</p>
                </div>
              </div>
            ))}

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">SECTION 20 – CONTACT INFORMATION</h2>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Questions regarding these Terms of Service should be sent to:<br /><br />
                  HS RaceGear<br />
                  📧 Email: <a href="mailto:admin@hsracegear.com" style={{ color: '#e21b1b' }}>admin@hsracegear.com</a><br />
                  🌐 Website: <a href="https://www.hsracegear.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e21b1b' }}>hsracegear.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
