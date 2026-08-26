import React from "react";
import Link from "next/link";

// Rush SR / GRIDLIFE RUSH Series suit lander — created 2026-08-22.
//
// Targets the spec-series cluster from the client keyword list (7 terms,
// all uncovered):
//   custom sfi race suits for rush sr        made to measure fireproof suit rush sr
//   rush sr custom driver gear               buy custom racing suit rush spec series
//   custom fireproof race suits gridlife     custom bespoke race suits nasa st2
//
// ⚠️ CRITICAL DISAMBIGUATION — do not merge this with /compare/vs-rush.
// "Rush SR" is a purpose-built open-cockpit spec sports racer from Rush Auto
// Works, raced in the GRIDLIFE RUSH Series and under SCCA, NASA and
// ProAutoSports. "Rush Race Gear" is an unrelated competing suit brand that
// /compare/vs-rush targets. A driver searching "rush sr custom driver gear"
// wants gear FOR THEIR CAR — serving them a page about why a competitor's
// suits are worse would be actively wrong.
//
// Verified 2026-08-22: Rush SR is ~1,350 lb, ~150 hp, open-cockpit, sequential
// paddle-shift, top speed ~152 mph. Sources in docs.
//
// NOTE ON RULES: no specific SFI requirement is asserted for any series here.
// NASA CCR 15.17 covers driver attire but the exact minimum rating could not
// be verified, and GRIDLIFE/SCCA class rules vary. The page directs racers to
// their current rulebook instead of stating a number we can't stand behind.
export default function RushSrRaceSuitContent() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Rush SR Race Suits</span>
          </p>
          <span className="contact-hero-tag">Spec Series · Open Cockpit</span>
          <h1 className="contact-hero-title">
            Rush SR<br /><span>Custom Race Suits</span>
          </h1>
          <p className="contact-hero-subtitle">
            Custom SFI-certified driver gear for the RUSH SR and the GRIDLIFE RUSH Series — built for an open-cockpit momentum car, measured to you rather than pulled from a size run. Made in the USA from $329.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content" style={{ maxWidth: '1000px' }}>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Gear for a Spec Car, Where Only the Driver Varies</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  The RUSH SR is a tightly regulated spec class — roughly 1,350 lb, around 150 hp, sequential paddle-shift, open cockpit. Every car is identical, which is the entire point: results come down to racecraft, not equipment.
                </p>
                <p className="hs-doc-card-text">
                  Which puts an odd emphasis on the few things you <em>can</em> still control. Your suit is one of them. In a field where the cars are the same, a suit that binds at the shoulder through a long stint is a genuine deficit — not a comfort complaint.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">What an Open Cockpit Changes</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Most suit advice is written for closed cars. A few things genuinely differ in an open-cockpit sports racer:
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Heat load from above, not just around.</strong> There&rsquo;s no roof. Direct sun on the shoulders and back through a summer session is a real factor in how a multi-layer suit feels by lap twenty.</li>
                  <li><strong style={{ color: '#fff' }}>Airflow you can actually use.</strong> Unlike a closed cockpit, an open car moves air over you — a suit cut with the right ease takes advantage of that instead of trapping heat.</li>
                  <li><strong style={{ color: '#fff' }}>Tight ingress and a reclined seating position.</strong> The suit has to move with a low, legs-forward posture rather than an upright one, which is a shoulder and torso-length question.</li>
                  <li><strong style={{ color: '#fff' }}>Abrasion exposure in an off.</strong> More of you is exposed than in a tin-top. Shoulder and elbow panel construction matters more than the spec sheet suggests.</li>
                </ul>
                <p className="hs-doc-card-text">
                  We build to your measurements and your seating position, so the suit is cut for how you actually sit in the car.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Where the RUSH SR Races</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  The RUSH SR is one of the faster-growing spec single-seaters in the US, running under several sanctioning bodies:
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>GRIDLIFE RUSH Series</strong> — the national championship for the car.</li>
                  <li><strong style={{ color: '#fff' }}>SCCA</strong> — regional and national events.</li>
                  <li><strong style={{ color: '#fff' }}>NASA</strong> — driver attire is covered by CCR section 15.17.</li>
                  <li><strong style={{ color: '#fff' }}>ProAutoSports</strong> — Southwest region events.</li>
                </ul>
                <p className="hs-doc-card-text">
                  If you run more than one of these in a season, build to the strictest requirement among them rather than the one you race most often — it&rsquo;s cheaper than owning two suits.
                </p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  <strong style={{ color: '#fff' }}>Check your own rulebook before ordering.</strong> Suit requirements differ between sanctioning bodies and are revised between seasons. We deliberately don&rsquo;t publish a required rating per series here, because the number that matters is the one in your current-season rulebook — not one on a supplier&rsquo;s website. Tell us the series at order time and we&rsquo;ll spec the suit to it.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Certification Options</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>SFI 3.2A/1</strong> — single layer, roughly 3 seconds of thermal protection.</li>
                  <li><strong style={{ color: '#fff' }}>SFI 3.2A/5</strong> — double layer, roughly 7&ndash;10 seconds. The common choice for wheel-to-wheel road racing.</li>
                  {/* CORRECTED 2026-08-25 — this originally listed FIA 8856-2018 as a
                      certification option we offer. We are SFI-certified only and
                      hold no FIA homologation, so that was an unsupportable claim. */}
                  <li><strong style={{ color: '#fff' }}>Note on FIA</strong> — we build to SFI only. If your class mandates FIA 8856-2018 rather than accepting SFI, you will need a suit from an FIA-listed manufacturer.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Not sure which applies?{" "}
                  <Link href="/certifications" style={{ color: '#e21b1b', textDecoration: 'underline' }}>The SFI ratings guide</Link>{" "}
                  explains the tiers, and{" "}
                  <Link href="/blog/sfi-vs-fia-rating" style={{ color: '#e21b1b', textDecoration: 'underline' }}>SFI vs FIA 8856-2018</Link>{" "}
                  covers why the two aren&rsquo;t interchangeable.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Team &amp; Arrive-and-Drive Programmes</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  A lot of RUSH SR seats are run through arrive-and-drive programmes and multi-car teams. We produce matching suits across a roster with consistent artwork, plus{" "}
                  <Link href="/shop" style={{ color: '#e21b1b', textDecoration: 'underline' }}>crew shirts and sublimated hoodies</Link>{" "}
                  in the same livery — so the paddock setup matches and sponsors get real estate on more than one driver.
                </p>
                <p className="hs-doc-card-text">
                  Talk to us about roster pricing before ordering individually.{" "}
                  <Link href="/contact-us" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Get in touch</Link>.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Order Your Rush SR Suit</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  From <strong style={{ color: '#e21b1b' }}>$329</strong>, custom-measured, made in Watertown, Massachusetts with a 2&ndash;3 week production time. Unlimited colours, sponsor logos, driver name and flag included, with a digital mockup before anything is cut.
                </p>
                <p className="hs-doc-card-text">
                  Matching{" "}
                  <Link href="/custom-gloves" style={{ color: '#e21b1b', textDecoration: 'underline' }}>gloves</Link>{" "}and{" "}
                  <Link href="/custom-shoes" style={{ color: '#e21b1b', textDecoration: 'underline' }}>shoes</Link>{" "}available, and{" "}
                  <Link href="/womens-racing-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>women&rsquo;s suits</Link>{" "}are cut from a female-specific pattern.
                </p>
              </div>
              <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                <Link href="/custom-race-suit/order" style={{
                  display: 'inline-block', background: '#e21b1b', color: '#fff',
                  padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                }}>
                  Design Your Rush SR Suit
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>
                  Custom-measured, SFI certified, made in the USA.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
