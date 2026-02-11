import React from "react";

export default function PaymentMethods() {
  return (
    <div className="vs-doc-wrapper">
      <div className="container">
        <article className="vs-doc">

          <h1 className="vs-doc-title">HS Racegear Payment Methods</h1>
          <p>
            At HS Racegear, we offer secure and convenient payment options to make checkout quick
            and worry-free. All transactions are processed using trusted payment platforms designed
            to protect your information.
          </p>

          <hr className="vs-doc-divider" />

          <h2>Credit &amp; Debit Cards (via Stripe)</h2>
          <p>
            HS Racegear accepts credit and debit card payments through Stripe, a globally
            recognized payment processor known for its security and reliability.
          </p>
          <p>We accept most major cards, including:</p>
          <ul>
            <li>Visa</li>
            <li>Mastercard</li>
            <li>American Express</li>
          </ul>
          <p>
            To pay by card, simply enter your details during checkout and follow the on-screen
            steps.
          </p>
          <p className="vs-doc-note">
            HS Racegear does not store or save your card information. All payments are processed
            securely through Stripe.
          </p>

          <hr className="vs-doc-divider" />

          <h2>Google Pay &amp; Apple Pay</h2>
          <p>
            For faster checkout, HS Racegear supports Google Pay and Apple Pay on compatible
            devices and browsers.
          </p>
          <p>
            These options allow you to complete your purchase quickly using the payment details
            already saved on your device—without manually entering card information.
          </p>
          <p>
            Both services use advanced encryption and authentication to keep your transaction
            secure.
          </p>

          <hr className="vs-doc-divider" />

          <h2>PayPal</h2>
          <p>PayPal is available as a trusted and flexible payment option. You can:</p>
          <ul>
            <li>Pay using your PayPal balance</li>
            <li>Use a linked credit or debit card</li>
            <li>Checkout securely without sharing financial details</li>
          </ul>
          <p>Select PayPal at checkout and follow the instructions provided.</p>
          <p className="vs-doc-note">
            Guest Checkout Available: A PayPal account is not required. You may choose to pay as
            a guest using a valid card.
          </p>

          <hr className="vs-doc-divider" />

          <h2>Important Payment Notice</h2>
          <p>
            Before completing your payment, please confirm that you have received your order
            confirmation email. This email verifies your order details and customization
            selections.
          </p>
          <p>
            Proceed with payment only after reviewing your confirmation for accuracy.
          </p>

        </article>
      </div>
    </div>
  );
}
