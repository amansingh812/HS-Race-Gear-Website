/**
 * Seed Test Data for Payment Testing
 *
 * Run with: node scripts/seed-test-data.mjs
 *
 * Creates a minimal set of test products specifically for testing
 * the Stripe checkout flow. Does NOT clear existing data — safe
 * to run alongside the main seed script.
 *
 * Products created (all prices in CENTS as the DB expects):
 *   - HS Pro 1 Single Layer Race Suit — $329 (32900¢)
 *   - HS Super Double Layer Race Suit — $449 (44900¢)
 *   - HS Race Crew Hoodie — $89 (8900¢)
 *   - HS Team Crew Shirt — $49 (4900¢)
 *
 * Also creates a test user with cart items for quick checkout testing.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

// ── Minimal schemas ──────────────────────────────────────

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: String,
    price: { type: Number, required: true, min: 0 }, // CENTS
    compareAtPrice: { type: Number, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    certification: String,
    certificationLevel: String,
    material: String,
    construction: String,
    layers: { type: Number, default: 1 },
    features: [String],
    images: [
      {
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
      },
    ],
    sizeOptions: [String],
    inventory: [
      {
        size: String,
        stock: { type: Number, default: 10 },
        sku: String,
        isAvailable: { type: Boolean, default: true },
      },
    ],
    customizable: { type: Boolean, default: false },
    customFitAvailable: { type: Boolean, default: false },
    status: { type: String, default: "active" },
    isVisible: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    weight: { type: Number, default: 0 },
    weightUnit: { type: String, default: "lb" },
    viewCount: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const categorySchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    description: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    level: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    productCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "customer" },
    phone: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

// ── Test products ──────────────────────────────────────

const sizes = ["S", "M", "L", "XL", "2XL"];

function makeInventory(sizeList) {
  return sizeList.map((s) => ({
    size: s,
    stock: 10,
    sku: `TEST-${s}`,
    isAvailable: true,
  }));
}

const testProducts = [
  {
    name: "HS Pro 1 Single Layer Race Suit",
    slug: "hs-pro-1-single-layer-race-suit",
    description:
      "Entry-level SFI 3.2A/1 certified single layer Nomex race suit. Perfect for circle track, drag racing, and autocross.",
    shortDescription: "SFI-1 single layer Nomex suit — test product",
    price: 32900, // $329
    compareAtPrice: 59900,
    certification: "SFI 3.2A/1",
    certificationLevel: "SFI-1",
    material: "Nomex",
    construction: "One-piece",
    layers: 1,
    features: ["SFI 3.2A/1 certified", "Premium Nomex", "Boot-cut legs", "Action back pleats"],
    sizeOptions: sizes,
    inventory: makeInventory(sizes),
    isFeatured: true,
    isNewArrival: true,
    weight: 2.5,
    images: [
      { url: "/images/products/fashion/product-1.jpg", alt: "HS Pro 1 Front", isPrimary: true, order: 0 },
      { url: "/images/products/fashion/product-2.jpg", alt: "HS Pro 1 Back", isPrimary: false, order: 1 },
    ],
  },
  {
    name: "HS Super Double Layer Race Suit",
    slug: "hs-super-double-layer-race-suit",
    description:
      "Mid-range SFI 3.2A/5 certified double layer Nomex race suit for professional racers. Maximum fire protection.",
    shortDescription: "SFI-5 double layer Nomex suit — test product",
    price: 44900, // $449
    compareAtPrice: 79900,
    certification: "SFI 3.2A/5",
    certificationLevel: "SFI-5",
    material: "Nomex",
    construction: "One-piece double-layer",
    layers: 2,
    features: ["SFI 3.2A/5 certified", "Double layer Nomex", "Pre-curved arms", "Knit collar"],
    sizeOptions: sizes,
    inventory: makeInventory(sizes),
    isFeatured: true,
    weight: 3.5,
    images: [
      { url: "/images/products/fashion/product-3.jpg", alt: "HS Super Front", isPrimary: true, order: 0 },
      { url: "/images/products/fashion/product-4.jpg", alt: "HS Super Back", isPrimary: false, order: 1 },
    ],
  },
  {
    name: "HS Race Crew Hoodie",
    slug: "hs-race-crew-hoodie-test",
    description: "Sublimated crew hoodie with fleece lining. Custom team designs available.",
    shortDescription: "Sublimated crew hoodie — test product",
    price: 8900, // $89
    material: "Polyester",
    features: ["Fleece lined", "Full sublimation", "Kangaroo pocket"],
    sizeOptions: sizes,
    inventory: makeInventory(sizes),
    weight: 0.8,
    images: [
      { url: "/images/products/fashion/product-34.jpg", alt: "Crew Hoodie", isPrimary: true, order: 0 },
    ],
  },
  {
    name: "HS Team Crew Shirt",
    slug: "hs-team-crew-shirt-test",
    description: "Moisture-wicking team crew shirt for pit crew and race day events.",
    shortDescription: "Performance crew shirt — test product",
    price: 4900, // $49
    material: "Polyester",
    features: ["Moisture-wicking", "Quick-dry", "Machine washable"],
    sizeOptions: sizes,
    inventory: makeInventory(sizes),
    weight: 0.4,
    images: [
      { url: "/images/products/fashion/product-24.jpg", alt: "Crew Shirt", isPrimary: true, order: 0 },
    ],
  },
];

// ── Main ──────────────────────────────────────

async function seedTestData() {
  console.log("🧪 Seeding test data for payment testing...\n");

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Ensure categories exist
    const catSlugs = ["race-suits", "hoodies", "crew-shirts"];
    const catMap = {};
    for (const slug of catSlugs) {
      let cat = await Category.findOne({ slug });
      if (!cat) {
        cat = await Category.create({
          name: slug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          slug,
          description: `Test category: ${slug}`,
        });
        console.log(`   📁 Created category: ${slug}`);
      }
      catMap[slug] = cat._id;
    }

    // Upsert products (won't duplicate if run multiple times)
    for (const p of testProducts) {
      const catSlug = p.slug.includes("hoodie")
        ? "hoodies"
        : p.slug.includes("shirt")
        ? "crew-shirts"
        : "race-suits";

      const existing = await Product.findOne({ slug: p.slug });
      if (existing) {
        await Product.updateOne({ slug: p.slug }, { ...p, category: catMap[catSlug] });
        console.log(`   🔄 Updated: ${p.name} — $${(p.price / 100).toFixed(2)}`);
      } else {
        await Product.create({ ...p, category: catMap[catSlug] });
        console.log(`   ✅ Created: ${p.name} — $${(p.price / 100).toFixed(2)}`);
      }
    }

    // Create test user (for logged-in checkout testing)
    const testEmail = "test@hsracegear.com";
    const existingUser = await User.findOne({ email: testEmail });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("Test1234!", 12);
      await User.create({
        name: "Test Racer",
        email: testEmail,
        password: hashedPassword,
        role: "customer",
        phone: "617-555-0100",
      });
      console.log(`\n   👤 Created test user: ${testEmail} / Test1234!`);
    } else {
      console.log(`\n   👤 Test user already exists: ${testEmail}`);
    }

    // Create test admin user
    const adminEmail = "admin@hsracegear.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin1234!", 12);
      await User.create({
        name: "Test Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        phone: "617-555-0200",
      });
      console.log(`   👤 Created admin user: ${adminEmail} / Admin1234!`);
    } else {
      console.log(`   👤 Admin user already exists: ${adminEmail}`);
    }

    console.log("\n═══════════════════════════════════════");
    console.log("🎉 Test data seeded!");
    console.log("═══════════════════════════════════════");
    console.log("  Products: 4 (shop checkout testing)");
    console.log("  Test user: test@hsracegear.com / Test1234!");
    console.log("  Admin user: admin@hsracegear.com / Admin1234!");
    console.log("");
    console.log("  Custom order prices are server-side only");
    console.log("  (CUSTOM_PACKAGE_PRICES in create-checkout-session).");
    console.log("  No DB seeding needed for custom orders.");
    console.log("═══════════════════════════════════════\n");
    console.log("Next steps:");
    console.log("  1. Start Stripe CLI:  stripe listen --forward-to localhost:3000/api/stripe/webhook");
    console.log("  2. Start dev server:  npm run dev");
    console.log("  3. Use card 4242 4242 4242 4242 for test payments");
    console.log("  4. See docs/testing/payment-testing-guide.md for all test scenarios\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedTestData();
