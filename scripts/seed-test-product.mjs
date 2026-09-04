/**
 * Seed a $1 Test Product for Production Payment Testing
 *
 * Run with: node scripts/seed-test-product.mjs
 *
 * Creates a single $1.00 product (100 cents) so you can verify
 * the full Stripe + PayPal flow in production with minimal cost.
 * Refund after testing from the Stripe Dashboard.
 *
 * To remove after testing: node scripts/seed-test-product.mjs --remove
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const TEST_SLUG = "stripe-test-1-dollar-suit";

// Minimal schema matching Product model
const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    description: String,
    shortDescription: String,
    price: Number,
    compareAtPrice: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    certification: String,
    certificationLevel: String,
    material: String,
    construction: String,
    layers: Number,
    features: [String],
    images: [{ url: String, alt: String, isPrimary: Boolean, order: Number }],
    sizeOptions: [String],
    inventory: [
      { size: String, stock: Number, sku: String, isAvailable: Boolean },
    ],
    customizable: Boolean,
    customFitAvailable: Boolean,
    status: String,
    isVisible: Boolean,
    isFeatured: Boolean,
    isNewArrival: Boolean,
    weight: Number,
    weightUnit: String,
    viewCount: Number,
    salesCount: Number,
    rating: { average: Number, count: Number },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

const removeMode = process.argv.includes("--remove");

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB\n");

  if (removeMode) {
    const result = await Product.deleteOne({ slug: TEST_SLUG });
    if (result.deletedCount) {
      console.log("🗑️  Removed test product: " + TEST_SLUG);
    } else {
      console.log("ℹ️  Test product not found — nothing to remove.");
    }
  } else {
    const existing = await Product.findOne({ slug: TEST_SLUG });
    if (existing) {
      console.log("ℹ️  Test product already exists. Updating price to $1.00...");
      await Product.updateOne(
        { slug: TEST_SLUG },
        { price: 100, status: "active", isVisible: true }
      );
    } else {
      await Product.create({
        name: "[TEST] $1 Race Suit — Delete After Testing",
        slug: TEST_SLUG,
        description:
          "This is a $1.00 test product for verifying Stripe and PayPal checkout in production. Delete after testing.",
        shortDescription: "⚠️ TEST PRODUCT — $1.00 — delete after verifying payments",
        price: 100, // $1.00 in cents
        certification: "SFI 3.2A/1",
        material: "Test",
        features: ["Test product for payment verification"],
        sizeOptions: ["M"],
        inventory: [
          { size: "M", stock: 99, sku: "TEST-1-M", isAvailable: true },
        ],
        images: [
          {
            url: "/images/products/fashion/product-1.jpg",
            alt: "Test Product",
            isPrimary: true,
            order: 0,
          },
        ],
        status: "active",
        isVisible: true,
        isFeatured: false,
        isNewArrival: false,
        customizable: false,
        customFitAvailable: false,
        weight: 1,
        weightUnit: "lb",
      });
      console.log("✅ Created: [TEST] $1 Race Suit");
    }

    console.log("\n══════════════════════════════════════════");
    console.log("  Product: [TEST] $1 Race Suit");
    console.log("  Price:   $1.00 (100 cents)");
    console.log("  Slug:    " + TEST_SLUG);
    console.log("  Size:    M (99 in stock)");
    console.log("  URL:     /shop/" + TEST_SLUG);
    console.log("══════════════════════════════════════════");
    console.log("\nAfter testing, remove with:");
    console.log("  node scripts/seed-test-product.mjs --remove\n");
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
