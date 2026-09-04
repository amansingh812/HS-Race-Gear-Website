import Stripe from "stripe";

/**
 * Server-side Stripe instance.
 *
 * Used in API routes only — never import this from a client component.
 * The secret key comes from STRIPE_SECRET_KEY in .env.local / Vercel env.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover",
});

export default stripe;
