/**
 * Shipping cost calculator for HS Race Gear shop checkout.
 *
 * Base rates per category:
 *   - race-suits:  $45
 *   - crew-shirts:  $25
 *   - hoodies:      $25
 *
 * Quantity scaling: base + (qty - 1) × base × 0.65
 * Each additional item in a category adds 65% of its base rate.
 *
 * Mixed carts: each category is calculated independently, then summed.
 *
 * This file is imported by both the client-side checkout preview and
 * the server-side Stripe session builder. Keep it dependency-free.
 */

const SHIPPING_RATES = {
  "race-suits": 4500, // cents
  "crew-shirts": 2500,
  hoodies: 2500,
  test: 0, // TODO: remove after prod Stripe test
};

// Fallback for any category not in the map (shouldn't happen in practice)
const DEFAULT_RATE = 2500;

/**
 * Calculate shipping for a single category.
 * @param {number} baseCents – per-item base rate in cents
 * @param {number} qty       – number of items
 * @returns {number} shipping cost in cents (rounded)
 */
function categoryShipping(baseCents, qty) {
  if (qty <= 0) return 0;
  return Math.round(baseCents + (qty - 1) * baseCents * 0.65);
}

/**
 * Calculate total shipping for a cart.
 *
 * @param {Array<{categorySlug: string, quantity: number}>} items
 *   Each item needs a categorySlug and quantity.
 * @returns {{ totalCents: number, breakdown: Array<{category: string, qty: number, costCents: number}> }}
 */
export function calculateShipping(items) {
  // Group quantities by category
  const grouped = {};
  for (const item of items) {
    const slug = item.categorySlug || "unknown";
    grouped[slug] = (grouped[slug] || 0) + (item.quantity || 1);
  }

  const breakdown = [];
  let totalCents = 0;

  for (const [slug, qty] of Object.entries(grouped)) {
    const base = SHIPPING_RATES[slug] || DEFAULT_RATE;
    const costCents = categoryShipping(base, qty);
    breakdown.push({ category: slug, qty, costCents });
    totalCents += costCents;
  }

  return { totalCents, breakdown };
}

/**
 * Convenience: return total shipping in dollars.
 */
export function calculateShippingDollars(items) {
  const { totalCents, breakdown } = calculateShipping(items);
  return {
    total: totalCents / 100,
    breakdown: breakdown.map((b) => ({
      ...b,
      cost: b.costCents / 100,
    })),
  };
}
