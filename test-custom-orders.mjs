/**
 * End-to-end test for /api/custom-order.
 *
 * Covers all five product types plus the edge cases that have actually
 * broken in production before:
 *   - race suit sends colours as an ARRAY, everything else sends OBJECTS
 *   - gloves send a non-numeric price ("Contact for pricing")
 *   - no sales tax is ever added — price shown is exactly package price × qty
 *   - missing address must not reject the order, only flag it
 *
 * Requires the dev server running in another terminal:  npm run dev
 *
 * Usage:
 *   node test-custom-orders.mjs                    → all cases, real emails
 *   node test-custom-orders.mjs --dry              → validate payloads, no requests
 *   node test-custom-orders.mjs --only=race,gloves → subset
 *   BASE_URL=https://www.hsracegear.com node test-custom-orders.mjs
 *
 * WARNING: without --dry this sends real email to the addresses below.
 */

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const DRY_RUN = process.argv.includes("--dry");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "")
  .replace("--only=", "")
  .split(",")
  .filter(Boolean);

const CUSTOMER_EMAIL = "amanpd0@gmail.com";

// ── Address fixtures ────────────────────────────────────────────────
const US_MA_ADDRESS = {
  addressLine1: "59 Kondazian St",
  addressLine2: "Unit 4",
  city: "Watertown",
  state: "MA",
  postalCode: "02472",
  country: "United States",
  notes: "Need before Knoxville Nationals — Aug 8. Gate code 4417.",
};

const US_TX_ADDRESS = {
  addressLine1: "1801 N Central Expy",
  addressLine2: "",
  city: "Dallas",
  state: "TX",
  postalCode: "75201",
  country: "United States",
  notes: "",
};

const UK_ADDRESS = {
  addressLine1: "12 Pit Lane",
  addressLine2: "",
  city: "Silverstone",
  state: "Northamptonshire",
  postalCode: "NN12 8TN",
  country: "United Kingdom",
  notes: "Ship to circuit — race weekend Sept 12.",
};

const customer = (extra = {}) => ({
  name: "Aman",
  email: CUSTOMER_EMAIL,
  phone: "+1 (617) 555-0100",
  ...US_MA_ADDRESS,
  ...extra,
});

// ── Colour fixtures ─────────────────────────────────────────────────
// The race suit page stores UNLIMITED colours in an ARRAY under `primary`.
// This is the shape that used to render as "Primary: undefined".
const RACE_SUIT_COLORS = {
  primary: [
    { hex: "#dc2626", name: "Racing Red" },
    { hex: "#0a0a0a", name: "Jet Black" },
    { hex: "#ffffff", name: "White" },
    { hex: "#facc15", name: "Signal Yellow" },
  ],
};

// Karting / powerboat / gloves / shoes use up to 3 single objects.
const TRIPLE_COLORS = {
  primary: { hex: "#dc2626", name: "Racing Red" },
  secondary: { hex: "#0a0a0a", name: "Jet Black" },
  accent: { hex: "#ffffff", name: "White" },
};

// ── Test cases ──────────────────────────────────────────────────────
const CASES = [
  {
    key: "race",
    label: "Custom Race Suit — array colours, qty 2",
    expect: { colours: 4, quoteOnly: false },
    payload: {
      productType: "race-suit",
      customer: customer(),
      package: { name: "Pro Package — SFI 3.2A/5", price: 599 },
      quantity: 2,
      suitMockup: { name: "Apex Circuit Design" },
      colors: RACE_SUIT_COLORS,
    },
  },
  {
    key: "karting",
    label: "Custom Karting Suit — object colours, TX",
    expect: { colours: 3, quoteOnly: false },
    payload: {
      productType: "karting-suit",
      customer: customer(US_TX_ADDRESS),
      package: { name: "Karting Starter Package", price: 349 },
      suitMockup: { name: "Junior Karting Stripe" },
      colors: TRIPLE_COLORS,
    },
  },
  {
    key: "powerboat",
    label: "Custom Powerboat Suit — international (UK)",
    expect: { colours: 3, quoteOnly: false },
    payload: {
      productType: "powerboat-suit",
      customer: customer(UK_ADDRESS),
      package: { name: "Powerboat Pro Package", price: 649 },
      suitMockup: { name: "Offshore Wave Design" },
      colors: TRIPLE_COLORS,
    },
  },
  {
    key: "gloves",
    label: "Custom Gloves — NON-NUMERIC price (quote only)",
    expect: { colours: 3, quoteOnly: true },
    payload: {
      productType: "custom-gloves",
      customer: customer(),
      package: { name: "Custom Gloves", price: "Contact for pricing" },
      glovesMockup: { name: "Carbon Grip Gloves" },
      colors: TRIPLE_COLORS,
    },
  },
  {
    key: "shoes",
    label: "Custom Shoes — with shoe size",
    expect: { colours: 3, quoteOnly: false },
    payload: {
      productType: "custom-shoes",
      customer: customer(),
      package: { name: "Racing Shoes Package", price: 149 },
      shoesMockup: { name: "Apex Driving Shoe" },
      shoeSize: { label: "US 10 / EU 43" },
      colors: TRIPLE_COLORS,
    },
  },
  {
    key: "noaddress",
    label: "EDGE: no address — must still succeed, flagged in admin email",
    expect: { colours: 1, quoteOnly: false },
    payload: {
      productType: "race-suit",
      customer: { name: "Aman", email: CUSTOMER_EMAIL, phone: "+1 (617) 555-0100" },
      package: { name: "HS Ace", price: 329 },
      suitMockup: { name: "Base Design" },
      colors: { primary: [{ hex: "#dc2626", name: "Racing Red" }] },
    },
  },
  {
    key: "nocolours",
    label: "EDGE: no colours — must say 'no colours selected', never 'undefined'",
    expect: { colours: 0, quoteOnly: false },
    payload: {
      productType: "race-suit",
      customer: customer(),
      package: { name: "HS Ace", price: 329 },
      suitMockup: { name: "Base Design" },
      colors: { primary: [] },
    },
  },
];

// ── Off-the-rack shop checkout (/api/shop-enquiry) ──────────────────
// Same email treatment as custom orders, but many line items and no
// payment capture. The cart checkout previously collected card details and
// discarded them, so these cases exist to prove the replacement flow
// actually delivers both emails.
const SHOP_CASES = [
  {
    key: "shop-multi",
    label: "SHOP: 2 line items, express shipping",
    endpoint: "/api/shop-enquiry",
    expect: { subtotal: 508, total: 518 },
    payload: {
      customer: {
        name: "Aman Patel",
        email: CUSTOMER_EMAIL,
        phone: "+1 (617) 555-0100",
        address: "42 Speedway Ave",
        apartment: "Unit 3",
        city: "Watertown",
        state: "MA",
        zipcode: "02472",
        country: "United States",
        orderNotes: "Need before race weekend.",
      },
      items: [
        { title: "HS Pro 1 Race Suit", price: 329, quantity: 1, size: "L", sku: "hs-pro-1" },
        { title: "Custom Gloves", price: 89.5, quantity: 2, isCustomFit: true },
      ],
      shippingMethod: { name: "Express Shipping", cost: 10, estimatedDays: "3-5 business days" },
    },
  },
  {
    key: "shop-free",
    label: "SHOP: single item, free shipping, no address",
    endpoint: "/api/shop-enquiry",
    expect: { subtotal: 329, total: 329 },
    payload: {
      customer: { name: "Jo Racer", email: CUSTOMER_EMAIL, phone: "+1 (617) 555-0101" },
      items: [{ title: "HS Ace Suit", price: 329, quantity: 1 }],
      shippingMethod: { name: "Free Shipping", cost: 0 },
    },
  },
];

const SHOP_REJECT_CASES = [
  {
    key: "shop-reject-empty",
    label: "SHOP REJECT: empty cart",
    endpoint: "/api/shop-enquiry",
    payload: { customer: { name: "A", email: CUSTOMER_EMAIL, phone: "1" }, items: [] },
  },
  {
    key: "shop-reject-nocustomer",
    label: "SHOP REJECT: missing customer email",
    endpoint: "/api/shop-enquiry",
    payload: { customer: { name: "A", phone: "1" }, items: [{ title: "X", price: 1, quantity: 1 }] },
  },
];

// ── Negative cases: these MUST be rejected with 400 ─────────────────
const REJECT_CASES = [
  {
    key: "reject-nocustomer",
    label: "REJECT: missing customer name",
    payload: {
      productType: "race-suit",
      customer: { email: CUSTOMER_EMAIL, phone: "+1" },
      package: { name: "HS Ace", price: 329 },
      suitMockup: { name: "Base" },
    },
  },
  {
    key: "reject-nopackage",
    label: "REJECT: missing package",
    payload: {
      productType: "race-suit",
      customer: customer(),
      suitMockup: { name: "Base" },
    },
  },
  {
    key: "reject-nodesign",
    label: "REJECT: missing suit design",
    payload: {
      productType: "race-suit",
      customer: customer(),
      package: { name: "HS Ace", price: 329 },
    },
  },
];

// ── Runner ──────────────────────────────────────────────────────────
const pick = (list) => (ONLY.length ? list.filter((c) => ONLY.includes(c.key)) : list);

function line(char = "─") {
  console.log(char.repeat(72));
}

async function post(payload, endpoint = "/api/custom-order") {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let body = {};
  try {
    body = await res.json();
  } catch {
    /* non-JSON response */
  }
  return { status: res.status, ok: res.ok, body };
}

async function main() {
  line("═");
  console.log("  /api/custom-order — end-to-end test");
  line("═");
  console.log(`  Target    : ${BASE_URL}/api/custom-order`);
  console.log(`  Customer  : ${CUSTOMER_EMAIL}`);
  console.log(`  Admin copy: info@hsracegear.com`);
  console.log(`  Mode      : ${DRY_RUN ? "DRY RUN (no requests sent)" : "LIVE — real emails will be sent"}`);
  if (ONLY.length) console.log(`  Filter    : ${ONLY.join(", ")}`);
  line("═");
  console.log("");

  const positives = pick(CASES);
  const negatives = pick(REJECT_CASES);
  const orderIds = [];
  let pass = 0;
  let fail = 0;

  console.log("SHOULD SUCCEED");
  line();
  for (const c of positives) {
    if (DRY_RUN) {
      const ok =
        c.payload.customer?.name && c.payload.customer?.email && c.payload.package;
      console.log(`${ok ? "○" : "✗"} ${c.label}`);
      console.log(`    payload keys: ${Object.keys(c.payload).join(", ")}`);
      ok ? pass++ : fail++;
      continue;
    }

    try {
      const { status, ok, body } = await post(c.payload);
      if (ok && body.orderId) {
        orderIds.push({ id: body.orderId, label: c.label });
        const p = body.pricing || {};
        console.log(`✅ ${c.label}`);
        console.log(
          `    ${body.orderId}   subtotal=${p.subtotal}  total=${p.total} ${p.currency || ""}`
        );

        // Assertions
        const problems = [];
        if ("taxes" in p) problems.push("response still includes a taxes field — should be removed");
        if (!c.expect.quoteOnly && p.subtotal !== p.total) problems.push("total should equal subtotal (no tax, free shipping)");
        if (c.expect.quoteOnly && p.total !== 0) problems.push("quote-only should total 0");
        if (problems.length) {
          fail++;
          problems.forEach((p2) => console.log(`    ⚠  ${p2}`));
        } else {
          pass++;
        }
      } else {
        fail++;
        console.log(`❌ ${c.label}`);
        console.log(`    HTTP ${status} — ${body.error || "no orderId returned"}`);
      }
    } catch (err) {
      fail++;
      console.log(`❌ ${c.label}`);
      console.log(`    request failed — ${err.message}`);
      if (err.message.includes("fetch failed")) {
        console.log(`    Is the dev server running?  npm run dev`);
      }
    }
  }

  // ── Shop checkout ────────────────────────────────────────────────
  console.log("");
  console.log("SHOP CHECKOUT — SHOULD SUCCEED");
  line();
  for (const c of pick(SHOP_CASES)) {
    if (DRY_RUN) {
      const ok = c.payload.customer?.email && c.payload.items?.length;
      console.log(`${ok ? "○" : "✗"} ${c.label}`);
      ok ? pass++ : fail++;
      continue;
    }
    try {
      const { status, ok, body } = await post(c.payload, c.endpoint);
      if (ok && body.orderId) {
        orderIds.push({ id: body.orderId, label: c.label });
        const p = body.pricing || {};
        console.log(`✅ ${c.label}`);
        console.log(`    ${body.orderId}   subtotal=${p.subtotal}  shipping=${p.shipping}  total=${p.total} ${p.currency || ""}`);

        const problems = [];
        if ("taxes" in p) problems.push("response includes a taxes field — no tax should exist");
        if (p.subtotal !== c.expect.subtotal) problems.push(`subtotal ${p.subtotal}, expected ${c.expect.subtotal}`);
        if (p.total !== c.expect.total) problems.push(`total ${p.total}, expected ${c.expect.total}`);
        if (p.subtotal + p.shipping !== p.total) problems.push("total != subtotal + shipping");
        if (problems.length) {
          fail++;
          problems.forEach((p2) => console.log(`    ⚠  ${p2}`));
        } else {
          pass++;
        }
      } else {
        fail++;
        console.log(`❌ ${c.label}`);
        console.log(`    HTTP ${status} — ${body.error || "no orderId returned"}`);
      }
    } catch (err) {
      fail++;
      console.log(`❌ ${c.label} — ${err.message}`);
    }
  }

  console.log("");
  console.log("SHOULD BE REJECTED (400)");
  line();
  for (const c of [...negatives, ...pick(SHOP_REJECT_CASES)]) {
    if (DRY_RUN) {
      console.log(`○ ${c.label}`);
      continue;
    }
    try {
      const { status, body } = await post(c.payload, c.endpoint);
      if (status === 400) {
        pass++;
        console.log(`✅ ${c.label}`);
        console.log(`    correctly rejected: "${body.error}"`);
      } else {
        fail++;
        console.log(`❌ ${c.label}`);
        console.log(`    expected 400, got ${status} — validation is not firing`);
      }
    } catch (err) {
      fail++;
      console.log(`❌ ${c.label} — ${err.message}`);
    }
  }

  console.log("");
  line("═");
  console.log(`  ${pass} passed, ${fail} failed`);
  line("═");

  if (DRY_RUN) {
    console.log("\nDry run only — nothing was sent. Drop --dry to run for real.");
    process.exit(fail ? 1 : 0);
  }

  if (orderIds.length) {
    console.log("\nORDER REFERENCES GENERATED");
    line();
    orderIds.forEach(({ id, label }) => console.log(`  ${id}  ${label}`));
  }

  console.log("\n" + "━".repeat(72));
  console.log("MANUAL CHECKS — open the emails and verify");
  console.log("━".repeat(72));
  console.log(`\nIn ${CUSTOMER_EMAIL} (customer confirmation, red theme):`);
  console.log("  □ Subject reads: Order HSRG-… confirmed — thank you!");
  console.log("  □ Big serif THANK YOU renders, red not green");
  console.log("  □ Order reference badge matches the subject line");
  console.log("  □ Race suit email shows FOUR colour swatches + names");
  console.log("  □ Gloves email shows 'Quote on request', NOT $0.00");
  console.log("  □ No order shows any sales tax; total always equals subtotal (free shipping)");
  console.log("  □ Ship To block shows the full address");
  console.log("  □ Delivery notes appear where provided");
  console.log("  □ Only ONE button — 'Questions? Contact Us'");
  console.log("  □ No 'Visit Our Store', no 'Made in USA' anywhere");
  console.log("  □ The word 'undefined' appears nowhere");
  console.log("\nIn info@hsracegear.com (admin notification):");
  console.log("  □ Subject: [HSRG-…] New <product> — Aman — <total>");
  console.log("  □ Ship To present; the no-address case shows the ⚠ warning");
  console.log("  □ Pricing ledger matches the customer's copy");
  console.log("\nShop checkout emails (both inboxes):");
  console.log("  □ Both line items listed with qty, unit price and line total");
  console.log("  □ Express order shows shipping $10.00; free order shows FREE");
  console.log("  □ Totals: $518.00 (express) and $329.00 (free)");
  console.log("  □ Customer copy says no payment has been taken");
  console.log("  □ Admin subject reads: [HSRG-…] New shop order — …");
  console.log("  □ No card fields anywhere on /checkout in the browser");
  console.log("  □ Reply-To goes to the customer, not to yourself");
  console.log("\nAlso worth checking:");
  console.log("  □ Neither email lands in spam (add SPF/DKIM if they do)");
  console.log("  □ Open one on a phone — layout should hold at narrow width");
  console.log("");

  process.exit(fail ? 1 : 0);
}

main();
