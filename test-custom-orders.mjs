// End-to-end test of /api/custom-order for every product type.
// Submits real requests to your LOCAL dev server (must be running: npm run dev)
// using mock data + your real email, so you can confirm both emails land.
//
// Run with: node test-custom-orders.mjs
// (optionally: BASE_URL=https://www.hsracegear.com node test-custom-orders.mjs to test prod)

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const customer = {
  name: "Aman",
  email: "amanpd0@gmail.com",
  phone: "+1 (617) 555-0100",
};

const colors = {
  primary: { hex: "#dc2626", name: "Racing Red" },
  secondary: { hex: "#0a0a0a", name: "Jet Black" },
  accent: { hex: "#ffffff", name: "White" },
};

const orders = [
  {
    label: "Custom Race Suit",
    payload: {
      customer,
      package: { name: "Pro Package", price: 599 },
      suitMockup: { name: "Apex Circuit Design" },
      colors,
      productType: "race-suit",
    },
  },
  {
    label: "Custom Karting Suit",
    payload: {
      customer,
      package: { name: "Karting Starter Package", price: 349 },
      suitMockup: { name: "Junior Karting Stripe" },
      colors,
      productType: "karting-suit",
    },
  },
  {
    label: "Custom Powerboat Suit",
    payload: {
      customer,
      package: { name: "Powerboat Pro Package", price: 649 },
      suitMockup: { name: "Offshore Wave Design" },
      colors,
      productType: "powerboat-suit",
    },
  },
  {
    label: "Custom Gloves",
    payload: {
      customer,
      package: { name: "Racing Gloves Package", price: 89 },
      glovesMockup: { name: "Carbon Grip Gloves" },
      colors,
      productType: "custom-gloves",
    },
  },
  {
    label: "Custom Shoes",
    payload: {
      customer,
      package: { name: "Racing Shoes Package", price: 149 },
      shoesMockup: { name: "Apex Driving Shoe" },
      shoeSize: { label: "US 10 / EU 43" },
      colors,
      productType: "custom-shoes",
    },
  },
];

console.log(`Testing against: ${BASE_URL}/api/custom-order\n`);

for (const { label, payload } of orders) {
  try {
    const res = await fetch(`${BASE_URL}/api/custom-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      console.log(`✅ ${label}: ${res.status} — ${data.message || "OK"}`);
    } else {
      console.log(`❌ ${label}: ${res.status} — ${data.error || "Unknown error"}`);
    }
  } catch (err) {
    console.log(`❌ ${label}: request failed — ${err.message}`);
  }
}

console.log("\nDone. Check amanpd0@gmail.com (customer confirmations) and info@hsracegear.com (internal notifications) — expect 5 emails in each inbox.");
