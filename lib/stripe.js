import Stripe from "stripe";

/**
 * Server-side Stripe instance.
 *
 * Used in API routes only — never import this from a client component.
 * The secret key comes from STRIPE_SECRET_KEY in .env.local / Vercel env.
 *
 * The client is created lazily, on the first real Stripe call, not when this
 * file is imported. `next build` imports every API route to collect page data;
 * creating the client at import time made the whole build fail with
 * "Neither apiKey nor config.authenticator provided" whenever
 * STRIPE_SECRET_KEY was missing from the build environment. Now a missing key
 * only affects the payment routes, at request time, with a clear message.
 */
let client = null;

function getStripe() {
  if (client) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it in Vercel → Settings → Environment Variables (Production and Preview) and redeploy."
    );
  }
  client = new Stripe(key, { apiVersion: "2026-01-28.clover" });
  return client;
}

// Same `stripe.checkout.sessions.create(...)` API as before for every caller.
const stripe = new Proxy(
  {},
  {
    get(_target, prop) {
      const value = getStripe()[prop];
      return typeof value === "function" ? value.bind(getStripe()) : value;
    },
  }
);

export default stripe;
