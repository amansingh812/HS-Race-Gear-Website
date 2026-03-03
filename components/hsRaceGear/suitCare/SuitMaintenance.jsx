import React from "react";
import Link from "next/link";

export default function SuitMaintenance() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Suit Maintenance</span>
          </p>
          <span className="contact-hero-tag">Care Guide</span>
          <h1 className="contact-hero-title">
            How to Wash &amp;<br /><span>Care for Your Suit</span>
          </h1>
          <p className="contact-hero-subtitle">
            Learn how to properly wash, dry, and care for your HS Racegear custom SFI racing suit to maintain its fire protection, fit, and durability.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Before Washing</h2>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Check All Pockets</h3>
                <p className="hs-doc-card-text">
                  Make sure every pocket is completely empty before placing the suit in the machine.
                </p>
              </div>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Secure All Closures</h3>
                <p className="hs-doc-card-text">
                  Zip up all zippers and fasten Velcro panels to prevent snagging or unnecessary wear during the wash cycle.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Washing the Suit</h2>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Wash Alone Only</h3>
                <p className="hs-doc-card-text">
                  Place the racing suit by itself in the washing machine. Do not wash it with other garments, as friction and hardware from other clothing can damage the fabric, stitching, or embroidery.
                </p>
              </div>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Use a Gentle Detergent</h3>
                <p className="hs-doc-card-text">
                  Choose a mild, non-aggressive detergent suitable for technical or performance garments. Avoid harsh chemicals or additives that could degrade the suit&apos;s materials.
                </p>
              </div>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Water Temperature</h3>
                <p className="hs-doc-card-text">
                  Always wash using cold water to maintain fabric strength, color accuracy, and fit.
                </p>
              </div>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Wash Cycle</h3>
                <p className="hs-doc-card-text">
                  Select a delicate or gentle cycle to reduce mechanical stress on the suit.
                </p>
              </div>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Machine Load Setting</h3>
                <p className="hs-doc-card-text">
                  Even when washing only the suit, select a large load or high water level setting to allow proper movement and rinsing.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Drying Instructions</h2>

              <div className="hs-doc-card hs-doc-card-warning">
                <h3 className="hs-doc-card-title">Do Not Tumble Dry</h3>
                <p className="hs-doc-card-text">
                  Never place the suit in a dryer. Heat can permanently damage the fabric and protective layers.
                </p>
              </div>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Air Dry Only</h3>
                <p className="hs-doc-card-text">
                  Hang the suit to dry in a well-ventilated area, away from direct heat or sunlight.
                </p>
              </div>

              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Managing Drips</h3>
                <p className="hs-doc-card-text">
                  For heavier suits, place a container or towel underneath while drying to catch excess water.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Extra Care for Heavy or Thick Suits</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  If your suit is especially thick or insulated, always wash it on its own to prevent overloading the machine and to ensure a thorough, even clean.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
