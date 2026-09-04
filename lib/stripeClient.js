import { loadStripe } from "@stripe/stripe-js";

/**
 * Client-side Stripe loader (singleton).
 *
 * Safe to call from any client component. The publishable key is exposed
 * via NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY — this is intentional and safe;
 * publishable keys are designed to be public.
 */
let stripePromise;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  }
  return stripePromise;
};
