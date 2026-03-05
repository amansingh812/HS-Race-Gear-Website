import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";
import "@/public/css/hs-doc-theme.css";

export const metadata = {
  alternates: { canonical: "/return-policy" },
  title: "Return & Refund Policy | HS Race Gear",
  description:
    "Read the HS Race Gear Return and Refund Policy. Learn about our return window, conditions for returns, refund processing times, and how to initiate a return.",
};

export default function ReturnPolicyPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">
            <span className="hs-doc-tag">Policy</span>
            <h1 className="hs-doc-title">Return &amp; Refund Policy</h1>
            <p className="hs-doc-updated">Last updated: March 2026</p>

            <div className="hs-doc-notice">
              <strong>Custom Orders:</strong> Because all HS Race Gear products are made-to-order and built to your exact specifications, <strong>custom orders are non-refundable</strong> once production has begun. Please review your order carefully before submitting.
            </div>

            <h2>1. Eligibility for Returns</h2>
            <p>Returns are accepted only for items that arrive damaged, defective, or materially different from what was ordered. To be eligible:</p>
            <ul>
              <li>You must contact us within <strong>7 days</strong> of receiving your order.</li>
              <li>Items must be unused, unworn, and in their original packaging.</li>
              <li>Proof of defect (photos or video) must be provided.</li>
            </ul>

            <h2>2. Non-Returnable Items</h2>
            <ul>
              <li>Custom-made racing suits, karting suits, and powerboat suits</li>
              <li>Custom gloves and shoes made to your specifications</li>
              <li>Items that have been worn, used, or altered</li>
              <li>Items purchased on final sale or at clearance prices</li>
            </ul>

            <h2>3. How to Initiate a Return</h2>
            <p>To initiate a return, please contact us:</p>
            <ul>
              <li><strong>Phone:</strong> <a href="tel:+16173196993">+1 (617) 319 6993</a></li>
              <li><strong>Email:</strong> <a href="mailto:hsracegear@gmail.com">hsracegear@gmail.com</a></li>
              <li><strong>Hours:</strong> Mon – Sat, 9am – 6pm EST</li>
            </ul>
            <p>Please include your order number, a description of the issue, and supporting photos. We will respond within 2 business days.</p>

            <h2>4. Refund Process</h2>
            <p>Once a return is approved:</p>
            <ul>
              <li>Refunds are issued to the original payment method within <strong>5–10 business days</strong>.</li>
              <li>Shipping costs are non-refundable unless the return is due to our error.</li>
              <li>Return shipping costs are the responsibility of the customer unless the item is defective.</li>
            </ul>

            <h2>5. Exchanges</h2>
            <p>If your item arrives with a manufacturing defect, we will gladly replace it at no additional cost. Please contact us within 7 days of receiving the item.</p>

            <h2>6. Contact Us</h2>
            <p>
              For any questions about returns or refunds, contact our team at{" "}
              <a href="mailto:hsracegear@gmail.com">hsracegear@gmail.com</a> or call{" "}
              <a href="tel:+16173196993">+1 (617) 319 6993</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer3 />
    </>
  );
}
