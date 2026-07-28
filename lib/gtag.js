/**
 * Google Analytics 4 — event helpers for HS Race Gear
 * ---------------------------------------------------
 * All functions no-op safely when NEXT_PUBLIC_GA_ID is unset (local dev,
 * preview builds) or when gtag hasn't loaded yet, so nothing here can throw
 * and break a page render.
 *
 * IMPORTANT — pricing convention:
 * Product prices are stored in MongoDB as CENTS (32900 = $329.00).
 * GA4 expects DOLLARS. Every helper below normalises with toDollars().
 *
 * Conversion note:
 * HS Race Gear does not take payment on-site — both order flows
 * (/api/custom-order and /api/shop-enquiry) submit an enquiry and the team
 * contacts the customer. We therefore fire `purchase` at successful order
 * SUBMISSION and treat that as the conversion event in GA4. Revenue reported
 * is the quoted cart value, not collected revenue.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/** True when GA is configured and gtag has loaded in the browser. */
export const isGaEnabled = () =>
  typeof window !== "undefined" &&
  typeof window.gtag === "function" &&
  Boolean(GA_MEASUREMENT_ID);

/**
 * Prices are stored in cents. Anything that already looks like dollars
 * (e.g. a finalPrice computed client-side) is passed through unchanged by
 * callers that opt out via `alreadyDollars`.
 */
export const toDollars = (cents) => {
  const n = Number(cents) || 0;
  return Math.round(n) / 100;
};

/** Low-level event dispatcher — never throws. */
export function event(name, params = {}) {
  if (!isGaEnabled()) return;
  try {
    window.gtag("event", name, params);
  } catch (err) {
    // Analytics must never break the app
    console.warn("[gtag] event failed:", name, err?.message);
  }
}

/** Manual pageview — used by the route-change listener in Analytics.jsx */
export function pageview(url) {
  if (!isGaEnabled()) return;
  try {
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
  } catch (err) {
    console.warn("[gtag] pageview failed:", err?.message);
  }
}

/**
 * Normalise a product (from Mongo or from the cart context) into a GA4
 * ecommerce item. Handles both shapes:
 *   Mongo product: { _id, name, slug, price (cents), category: {name}, certification }
 *   Cart item:     { id, title, slug, price / finalPrice (dollars), size, quantity }
 */
export function toGaItem(product, opts = {}) {
  const {
    quantity = 1,
    priceInDollars = false, // set true when price is already dollars (cart items)
    index,
    listName,
  } = opts;

  const rawPrice =
    product?.finalPrice ?? product?.price ?? product?.productSnapshot?.price ?? 0;

  const price = priceInDollars ? Number(rawPrice) || 0 : toDollars(rawPrice);

  const item = {
    item_id: String(
      product?.slug || product?._id || product?.id || product?.sku || ""
    ),
    item_name: String(
      product?.name || product?.title || product?.productSnapshot?.name || "Product"
    ),
    price,
    quantity: Number(quantity) || 1,
  };

  const category =
    product?.category?.name || product?.categoryName || product?.category;
  if (category && typeof category === "string") item.item_category = category;

  if (product?.certification) item.item_variant = product.certification;
  if (product?.size) item.item_variant = product.size;

  item.item_brand = "HS Race Gear";

  if (typeof index === "number") item.index = index;
  if (listName) item.item_list_name = listName;

  return item;
}

/** Sum a list of GA items into a total value (dollars). */
const sumValue = (items) =>
  Number(
    items
      .reduce((acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0)
      .toFixed(2)
  );

// ─────────────────────────────────────────────────────────────
// Standard GA4 ecommerce events
// ─────────────────────────────────────────────────────────────

/** Fired on a product detail page. */
export function viewItem(product) {
  if (!product) return;
  const item = toGaItem(product);
  event("view_item", {
    currency: "USD",
    value: item.price,
    items: [item],
  });
}

/** Fired on a listing/collection page (e.g. /shop). */
export function viewItemList(products = [], listName = "Shop") {
  if (!products.length) return;
  event("view_item_list", {
    item_list_name: listName,
    items: products
      .slice(0, 20)
      .map((p, i) => toGaItem(p, { index: i, listName })),
  });
}

/** Fired when a product is added to the cart. */
export function addToCart(product, quantity = 1, opts = {}) {
  if (!product) return;
  const item = toGaItem(product, { quantity, ...opts });
  event("add_to_cart", {
    currency: "USD",
    value: Number((item.price * item.quantity).toFixed(2)),
    items: [item],
  });
}

/** Fired when a product is removed from the cart. */
export function removeFromCart(product, quantity = 1, opts = {}) {
  if (!product) return;
  const item = toGaItem(product, { quantity, ...opts });
  event("remove_from_cart", {
    currency: "USD",
    value: Number((item.price * item.quantity).toFixed(2)),
    items: [item],
  });
}

/** Fired when the cart page/drawer is viewed. */
export function viewCart(cartItems = []) {
  const items = cartItems.map((p) =>
    toGaItem(p, { quantity: p.quantity, priceInDollars: true })
  );
  event("view_cart", {
    currency: "USD",
    value: sumValue(items),
    items,
  });
}

/** Fired when the customer reaches the checkout page. */
export function beginCheckout(cartItems = []) {
  const items = cartItems.map((p) =>
    toGaItem(p, { quantity: p.quantity, priceInDollars: true })
  );
  event("begin_checkout", {
    currency: "USD",
    value: sumValue(items),
    items,
  });
}

/**
 * Fired on successful order submission — this is the CONVERSION event.
 * Mark `purchase` as a Key Event / Conversion in the GA4 UI.
 *
 * @param {object} order
 * @param {string} order.transactionId  Order reference (e.g. HSRG-260728-A1B2)
 * @param {Array}  order.items          Cart items (prices in dollars)
 * @param {number} order.value          Order total in dollars
 * @param {number} [order.shipping]     Shipping cost in dollars (0 = free)
 */
export function purchase({ transactionId, items = [], value, shipping = 0 }) {
  const gaItems = items.map((p) =>
    toGaItem(p, { quantity: p.quantity, priceInDollars: true })
  );
  event("purchase", {
    transaction_id: String(transactionId || ""),
    currency: "USD",
    value: Number((value ?? sumValue(gaItems)).toFixed(2)),
    shipping: Number(shipping) || 0,
    items: gaItems,
  });
}

/**
 * Custom-order enquiry submitted (the /custom-* measurement-form flow).
 * Not a standard GA4 event, but worth tracking as a separate lead type
 * since these have no fixed cart value.
 */
export function customOrderSubmit({ productType, packageName, referenceId } = {}) {
  event("generate_lead", {
    currency: "USD",
    value: 0,
    lead_type: "custom_order",
    product_type: productType || "",
    package_name: packageName || "",
    transaction_id: referenceId || "",
  });
}

/** Contact-form / enquiry submissions. */
export function contactSubmit(source = "contact_form") {
  event("generate_lead", { lead_type: "contact", lead_source: source });
}

/** Newsletter signup. */
export function newsletterSignup(source = "footer") {
  event("sign_up", { method: "newsletter", lead_source: source });
}

/** Search performed on-site. */
export function search(searchTerm) {
  if (!searchTerm) return;
  event("search", { search_term: String(searchTerm) });
}
