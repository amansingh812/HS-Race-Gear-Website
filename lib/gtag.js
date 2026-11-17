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

/**
 * Google Ads (optional). Leave unset until the Ads account is live.
 *   NEXT_PUBLIC_GOOGLE_ADS_ID              e.g. AW-123456789
 *   NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL  conversion label for "Purchase"
 *   NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL      conversion label for "Custom quote submitted"
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const ADS_PURCHASE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL || "";
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || "";

/** True when GA (or Ads) is configured and gtag has loaded in the browser. */
export const isGaEnabled = () =>
  typeof window !== "undefined" &&
  typeof window.gtag === "function" &&
  Boolean(GA_MEASUREMENT_ID || GOOGLE_ADS_ID);

/** True when at least one tracking ID is configured for this build. */
const isConfigured = () =>
  typeof window !== "undefined" && Boolean(GA_MEASUREMENT_ID || GOOGLE_ADS_ID);

/**
 * Events fired before Google's script has loaded (e.g. a fast confirmation
 * page) wait here and are sent once window.gtag exists. Without this they
 * would be silently dropped.
 */
const pending = [];
let flushTimer = null;
function flushWhenReady() {
  if (flushTimer) return;
  let tries = 0;
  flushTimer = setInterval(() => {
    tries += 1;
    if (isGaEnabled()) {
      clearInterval(flushTimer);
      flushTimer = null;
      while (pending.length) {
        const [name, params, onSent] = pending.shift();
        send(name, params, onSent);
      }
    } else if (tries > 60) {
      // ~30s and the script never loaded (blocked by an ad blocker, offline).
      // Drop the queue without marking anything as sent, so a reload retries.
      clearInterval(flushTimer);
      flushTimer = null;
      pending.length = 0;
    }
  }, 500);
}

function send(name, params, onSent) {
  try {
    window.gtag("event", name, params);
    if (onSent) onSent();
  } catch (err) {
    console.warn("[gtag] event failed:", name, err?.message);
  }
}

/** Send a Google Ads conversion. No-op when Ads or the label isn't configured. */
function adsConversion(label, { value, ...rest } = {}, onSent) {
  if (!GOOGLE_ADS_ID || !label) return;
  // Only pass a value when we actually know one; a $0 value would
  // override the conversion action's default value in Google Ads.
  const params = { send_to: `${GOOGLE_ADS_ID}/${label}`, ...rest };
  if (Number(value) > 0) params.value = Number(value);
  event("conversion", params, onSent);
}

/**
 * Once-per-order guard. alreadySent() only reads; markSent() is called from
 * the send callback, i.e. only after the event has really gone to gtag.
 * A purchase that was never sent stays unmarked, so a reload retries it.
 */
function alreadySent(key) {
  try {
    return Boolean(window.localStorage.getItem(`hs_fired_${key}`));
  } catch {
    return false; // storage blocked: rely on the component's once-per-mount guard
  }
}
function markSent(key) {
  try {
    window.localStorage.setItem(`hs_fired_${key}`, "1");
  } catch {
    /* ignore */
  }
}

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
export function event(name, params = {}, onSent) {
  if (!isConfigured()) return; // no tracking IDs in this build: do nothing
  if (isGaEnabled()) return send(name, params, onSent);
  pending.push([name, params, onSent]); // script not loaded yet: queue it
  flushWhenReady();
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
  const params = { currency: "USD", value: sumValue(items), items };
  event("begin_checkout", params);
  event("checkout_started", params);
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
  const id = String(transactionId || "");
  const key = `purchase_${id}`;
  if (!id || !isConfigured() || alreadySent(key)) return; // one purchase per order, ever
  const gaItems = items.map((p) =>
    toGaItem(p, { quantity: p.quantity, priceInDollars: true })
  );
  const orderValue = Number((Number(value ?? sumValue(gaItems)) || 0).toFixed(2));
  event("purchase", {
    transaction_id: id,
    currency: "USD",
    value: orderValue,
    shipping: Number(shipping) || 0,
    items: gaItems,
  }, () => markSent(key));
  adsConversion(ADS_PURCHASE_LABEL, { value: orderValue, currency: "USD", transaction_id: id });
}

/**
 * Custom-order enquiry submitted (the /custom-* measurement-form flow).
 * Not a standard GA4 event, but worth tracking as a separate lead type
 * since these have no fixed cart value.
 */
export function customOrderSubmit({ productType, packageName, referenceId, value } = {}) {
  const id = String(referenceId || "");
  const key = `quote_${id}`;
  if (!isConfigured() || (id && alreadySent(key))) return;
  const params = {
    currency: "USD",
    value: Number(value) || 0, // quoted package price in dollars
    lead_type: "custom_order",
    product_type: productType || "",
    package_name: packageName || "",
    transaction_id: id,
  };
  event("generate_lead", params, id ? () => markSent(key) : undefined); // kept: existing GA4 lead event
  event("quote_submitted", params);
  adsConversion(ADS_LEAD_LABEL, { value: params.value, currency: "USD", transaction_id: id });
}

/** Alias with the new event name, for readability at call sites. */
export const quoteSubmitted = customOrderSubmit;

/** First interaction with a custom design/order form. Fired once per page load. */
export function designStarted({ productType = "" } = {}) {
  event("design_started", { product_type: productType });
}

/** Click on any WhatsApp link (floating button, footer, order pages). */
export function whatsappClicked({ location = "" } = {}) {
  event("whatsapp_clicked", { link_location: location, page_path: window.location.pathname });
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
