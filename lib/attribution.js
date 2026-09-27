/**
 * Lightweight first-touch attribution for custom order leads.
 *
 * Added 2026-09-24 to close gap E2 in docs/seo/open-gaps.md. Until now an
 * order recorded which ORDER PAGE it came from (`productType`) but nothing
 * about which marketing page earned the visit — and because all 13 discipline
 * landers funnel into /custom-race-suit/order, every one of them collapsed
 * into a single indistinguishable bucket. That made it impossible to answer
 * "which SEO page actually makes money", which is the question gating every
 * content decision on the site.
 *
 * Deliberately small: no cookies, no third-party script, no personal data.
 * Just sessionStorage holding the landing page, referrer and any UTM tags for
 * the length of one visit. First touch wins, so a visitor who lands on
 * /custom-drag-racing-suit and then clicks through to the order form is still
 * credited to the drag page rather than to the last internal click.
 *
 * sessionStorage (not localStorage) is intentional — attribution should
 * describe THIS visit. A month-old landing page is not why they ordered today.
 */

const KEY = "hsrg_attribution";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

/** Safe read — private mode and storage-disabled browsers must not throw. */
function read() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Record the first page of this visit. Call once on mount from the order
 * pages (and anywhere else worth attributing). Safe to call repeatedly —
 * only the first call in a session is stored.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;

  try {
    if (read()) return; // first touch already recorded

    const params = new URLSearchParams(window.location.search);
    const utm = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 120);
    }

    // Referrer is only meaningful when it comes from off-site.
    let referrer = "";
    try {
      const r = document.referrer;
      if (r && new URL(r).hostname !== window.location.hostname) {
        referrer = r.slice(0, 300);
      }
    } catch {
      /* malformed referrer — leave blank */
    }

    const data = {
      landingPage: window.location.pathname.slice(0, 200),
      referrer,
      ...utm,
      landedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — attribution is best-effort, never block an order */
  }
}

/**
 * Read back what we captured, for inclusion in an order payload.
 * Always returns an object so callers can spread it without a guard.
 */
export function getAttribution() {
  if (typeof window === "undefined") return {};
  const stored = read() || {};
  return {
    ...stored,
    // The page they were actually on when they submitted. Combined with
    // landingPage this shows the entry → conversion path.
    orderPage: window.location.pathname.slice(0, 200),
  };
}
