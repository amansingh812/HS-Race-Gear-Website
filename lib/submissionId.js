/**
 * Idempotency keys for order submission.
 *
 * Added 2026-09-29 after two identical leads were created a minute apart in
 * production. The first request saved the order and sent the notification but
 * was killed before it could respond; the customer saw "there was a problem
 * submitting your order", pressed submit again, and a second order was born.
 *
 * The order pages generate one key per order ATTEMPT — not per request — and
 * send the same key on every retry. The API returns the original order when
 * it sees a key it has already stored, so pressing submit twice produces one
 * order instead of two.
 *
 * Generated lazily at submit time rather than at render time on purpose: a
 * value created during render would differ between the server and client
 * passes and trip a hydration mismatch.
 */

/**
 * Create a new idempotency key.
 *
 * crypto.randomUUID is only exposed in secure contexts, so it is missing on
 * plain-http origins some people use for local testing. The fallback is not
 * cryptographically strong and does not need to be — this value only has to
 * be unique among the handful of submissions one browser makes.
 */
export function makeSubmissionId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `sub-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}
