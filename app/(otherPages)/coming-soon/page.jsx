import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";
import Link from "next/link";
import CountdownTimer from "@/components/common/Countdown";

export const metadata = {
  alternates: { canonical: "/coming-soon" },
  title: "Coming Soon | HS Race Gear",
  description:
    "Something exciting is on the way from HS Race Gear. Stay tuned for new custom racing gear, products, and more.",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <section className="s-coming-soon">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wg-coming-soon">
                <p className="title text-center">Coming Soon!</p>
                <p className="text-md sub text-main text-center">
                  We couldn't find the page you were looking for. We suggest
                  <br />
                  you return to homepage
                </p>
                <div className="wg-countdown">
                  <span className="js-countdown">
                    <CountdownTimer style={2} />
                  </span>
                </div>
                <div className="form-email-wrap">
                  <form
                    action="#"
                    className="form-newsletter"
                    method="post"
                    acceptCharset="utf-8"
                    data-mailchimp="true"
                  >
                    <div className="subscribe-content">
                      <fieldset className="email">
                        <input
                          type="email"
                          name="email-form"
                          className="subscribe-email"
                          placeholder="Your email address"
                          tabIndex={0}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                      <div className="button-submit">
                        <button className="tf-btn animate-btn" type="submit">
                          <span className="text-sm">Get Notify</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="bot">
                  <Link
                    href={`/`}
                    className="tf-btn btn-fill hover-primary animate-btn"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer3 />
    </>
  );
}
