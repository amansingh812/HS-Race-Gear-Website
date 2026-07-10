/**
 * Add Sublimated Hoodies + Crew Shirts to the shop
 *
 * Adds 18 hoodies + 15 crew shirts to MongoDB without wiping existing
 * data. Safe to re-run — uses upsert by slug so existing products with
 * the same slug are updated, new ones are created.
 *
 * Usage:
 *   node scripts/add-hoodies-and-shirts.mjs
 *
 * Prerequisites:
 *   - MONGODB_URI set in .env.local
 *   - Images already converted and placed in
 *     /public/images/products/hoodies/hs-{name}-{f|b}.webp
 *     /public/images/products/crew-shirts/hs-{name}-{f|b}.webp
 *   - Categories 'hoodies' and 'crew-shirts' must exist
 *     (run scripts/seed.mjs first if they don't).
 *
 * Created: 2026-07-09
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────
// Schemas (minimal — only what we need to upsert products)
// ─────────────────────────────────────────────────────────────────
const categorySchema = new mongoose.Schema({}, { strict: false });
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema, 'categories');

const productImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: String,
  isPrimary: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { _id: true });

const sizeInventorySchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, default: 0, min: 0 },
  sku: String,
  isAvailable: { type: Boolean, default: true },
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: String,
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  material: String,
  construction: String,
  features: [String],
  images: [productImageSchema],
  sizeOptions: [String],
  inventory: [sizeInventorySchema],
  customizable: Boolean,
  customFitAvailable: Boolean,
  customFitPrice: Number,
  customFitLeadTime: String,
  status: { type: String, enum: ['active', 'inactive', 'draft', 'archived'], default: 'active' },
  isVisible: { type: Boolean, default: true },
  isFeatured: Boolean,
  isNewArrival: Boolean,
  weight: Number,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');

// ─────────────────────────────────────────────────────────────────
// HOODIES — 18 sublimated crew hoodie designs
// ─────────────────────────────────────────────────────────────────
const HOODIE_DESIGNS = [
  ['redtide',   'A bold red-tide sublimated pattern. Team-ready crew hoodie for cool paddock mornings and post-race grid celebrations.'],
  ['elite',     'The Elite crew hoodie — sharp, professional graphics with premium finishing. Full-color sublimation, front and back.'],
  ['redline',   'For the crew that lives at redline. Red-focused sublimated graphics with race-ready styling.'],
  ['velocity',  'Fast lines, high-energy pattern. The Velocity hoodie brings motion-blur aesthetics to your pit-crew look.'],
  ['monster',   'Bold, monster-scale graphics that pop from across the pit lane. Full sublimation on premium hoodie fabric.'],
  ['draft',     'Draft-style graphic — inspired by the tow of a big pack. Clean, high-contrast sublimation.'],
  ['winged',    'For sprint car teams. Winged sublimated pattern on premium fleece-back hoodie.'],
  ['endurance', 'Built for the long weekend. The Endurance hoodie is our warmest fabric — perfect for the 6am push to grid.'],
  ['royal',     'Royal blue and premium finishing. Understated, race-paddock-professional styling.'],
  ['outlaw',    'For the crews that don\'t follow the pack. Bold outlaw-themed sublimation, unapologetic look.'],
  ['attack',    'Aggressive graphic pattern. The Attack hoodie is for teams that come to win.'],
  ['super',     'The HS Super hoodie — one tier above the entry-level line. Premium finishing throughout.'],
  ['ace',       'A clean, no-nonsense design. The Ace hoodie is the crew wardrobe workhorse.'],
  ['patriot',   'US flag-inspired sublimated pattern. Made-in-USA hoodie with matching graphics.'],
  ['legacy',    'Classic aesthetic, modern construction. The Legacy hoodie is built to last multiple race seasons.'],
  ['dragster',  'Drag racing-inspired graphics. Bold parallel lines, race-tree styling. NHRA/IHRA pit-crew ready.'],
  ['rush',      'Rush-styled sublimation with dynamic movement lines. Built for pit-crew teams that hustle.'],
  ['highline',  'Highline-styled hoodie with elevated design language. Premium finishing.'],
];

// ─────────────────────────────────────────────────────────────────
// SHIRTS — 15 sublimated crew shirt designs
// ─────────────────────────────────────────────────────────────────
const SHIRT_DESIGNS = [
  ['redtide',   'Red-tide sublimated pattern crew shirt. Breathable performance polyester, team-ready fit.'],
  ['elite',     'The Elite crew shirt — sharp, professional graphics with premium finishing.'],
  ['velocity',  'Fast lines, high-energy pattern. Motion-blur graphic aesthetic on breathable poly.'],
  ['apex',      'For the driver who hits the apex every lap. Angular, racing-line-inspired graphics.'],
  ['downforce', 'Aerodynamics-inspired graphic pattern. Low, wide sublimation lines.'],
  ['highline',  'Elevated design language. Premium sublimation on breathable performance polyester.'],
  ['race',      'The Race crew shirt — clean, classic, unmistakable. Pit-crew ready styling.'],
  ['endurance', 'Built for long-format events. Breathable, moisture-wicking, sublimation graphics that stay vibrant.'],
  ['legacy',    'Classic aesthetic, modern construction. Timeless pit-crew shirt design.'],
  ['pitroad',   'Pit-road-inspired sublimated pattern. Reflective visual elements without the reflective cost.'],
  ['redline',   'Red-focused graphics with race-ready styling. Team-uniform ready.'],
  ['monster',   'Bold, oversized graphics. Full-shirt sublimation, front and back.'],
  ['super',     'The HS Super shirt — one tier above the entry-level line. Premium finishing.'],
  ['patriot',   'US flag-inspired pattern. Made-in-USA crew shirt with matching graphics.'],
  ['dragster',  'Drag racing-styled graphics. Race-tree and parallel-line motifs.'],
];

// Standard sizing for apparel
const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

// Pricing (in cents to match seed.mjs convention)
const HOODIE_PRICE = 6499;         // $64.99
const HOODIE_COMPARE_PRICE = 9999; // $99.99 → 35% off
const SHIRT_PRICE = 2999;          // $29.99
const SHIRT_COMPARE_PRICE = 4999;  // $49.99 → 40% off

const HOODIE_TAIL = `\n\nEvery HS sublimated crew hoodie is built with full-color, edge-to-edge sublimation printing that never cracks, fades, or peels. Premium poly-blend fleece-back fabric for warmth on cold paddock mornings. Standard sizes XS through 3XL. Order 6+ for team pricing — contact info@hsracegear.com. Made in USA.`;

const SHIRT_TAIL = `\n\nEvery HS sublimated crew shirt uses full-color, edge-to-edge sublimation printing on breathable performance polyester. Moisture-wicking, quick-dry construction that stays vibrant after 100+ washes. Standard sizes XS through 3XL. Order 6+ for team pricing — contact info@hsracegear.com. Made in USA.`;

function toName(slug) {
  return slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

function buildHoodie([slug, themedDescription]) {
  const displayName = toName(slug);
  const fullName = `HS ${displayName} Sublimated Crew Hoodie`;
  const productSlug = `hs-${slug}-crew-hoodie`;

  return {
    name: fullName,
    slug: productSlug,
    description: themedDescription + HOODIE_TAIL,
    shortDescription: `Sublimated crew hoodie — full-color print, poly-blend fleece-back. $64.99 (regularly $99.99).`,
    price: HOODIE_PRICE,
    compareAtPrice: HOODIE_COMPARE_PRICE,
    material: 'Poly-blend fleece-back',
    construction: 'Sublimated, edge-to-edge full-color print',
    features: [
      'Edge-to-edge sublimation (never cracks, fades, or peels)',
      'Premium poly-blend fleece-back fabric',
      'Front and back full-color graphics',
      'Team bulk pricing on 6+ orders',
      'Standard sizes XS through 3XL',
      'Made in USA',
    ],
    sizeOptions: APPAREL_SIZES,
    inventory: APPAREL_SIZES.map(size => ({ size, stock: 10, isAvailable: true })),
    images: [
      {
        url: `/images/products/hoodies/hs-${slug}-hoodie-front.webp`,
        alt: `HS ${displayName} sublimated crew racing hoodie front view — full-color pit crew hoodie, poly fleece, made in USA by HS Race Gear`,
        isPrimary: true,
        order: 0,
      },
      {
        url: `/images/products/hoodies/hs-${slug}-hoodie-back.webp`,
        alt: `HS ${displayName} sublimated crew racing hoodie back view — team apparel with full sublimation graphic, made in Watertown, MA`,
        isPrimary: false,
        order: 1,
      },
    ],
    customizable: true,
    customFitAvailable: false,
    customFitPrice: 0,
    customFitLeadTime: 'N/A',
    status: 'active',
    isVisible: true,
    isFeatured: false,
    isNewArrival: true,
    weight: 1.4,
  };
}

function buildShirt([slug, themedDescription]) {
  const displayName = toName(slug);
  const fullName = `HS ${displayName} Sublimated Crew Shirt`;
  const productSlug = `hs-${slug}-crew-shirt`;

  return {
    name: fullName,
    slug: productSlug,
    description: themedDescription + SHIRT_TAIL,
    shortDescription: `Sublimated crew shirt — full-color print, breathable performance poly. $29.99 (regularly $49.99).`,
    price: SHIRT_PRICE,
    compareAtPrice: SHIRT_COMPARE_PRICE,
    material: 'Performance polyester',
    construction: 'Sublimated, edge-to-edge full-color print',
    features: [
      'Edge-to-edge sublimation (100+ wash durability)',
      'Breathable, moisture-wicking polyester',
      'Front and back full-color graphics',
      'Team bulk pricing on 6+ orders',
      'Standard sizes XS through 3XL',
      'Made in USA',
    ],
    sizeOptions: APPAREL_SIZES,
    inventory: APPAREL_SIZES.map(size => ({ size, stock: 10, isAvailable: true })),
    images: [
      {
        url: `/images/products/crew-shirts/hs-${slug}-crew-shirt-front.webp`,
        alt: `HS ${displayName} sublimated racing crew shirt front view — full-color pit crew shirt, performance polyester, made in USA by HS Race Gear`,
        isPrimary: true,
        order: 0,
      },
      {
        url: `/images/products/crew-shirts/hs-${slug}-crew-shirt-back.webp`,
        alt: `HS ${displayName} sublimated racing crew shirt back view — team pit crew apparel with full sublimation graphic, made in Watertown, MA`,
        isPrimary: false,
        order: 1,
      },
    ],
    customizable: true,
    customFitAvailable: false,
    customFitPrice: 0,
    customFitLeadTime: 'N/A',
    status: 'active',
    isVisible: true,
    isFeatured: false,
    isNewArrival: true,
    weight: 0.5,
  };
}

// ─────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────
async function upsertProducts(designs, buildFn, categorySlug, kindLabel) {
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) {
    console.error(`❌ Category "${categorySlug}" not found. Run scripts/seed.mjs first.`);
    return { created: 0, updated: 0, error: true };
  }
  console.log(`✓ Found category: ${category.name} (${category._id})\n`);

  let created = 0;
  let updated = 0;

  for (const design of designs) {
    const productData = buildFn(design);
    productData.category = category._id;

    const existing = await Product.findOne({ slug: productData.slug });
    if (existing) {
      await Product.updateOne({ slug: productData.slug }, { $set: productData });
      updated++;
      console.log(`↻ Updated:  ${productData.name}`);
    } else {
      await Product.create(productData);
      created++;
      console.log(`✓ Created:  ${productData.name}`);
    }
  }

  console.log(`\n${kindLabel}: ${created} created, ${updated} updated (${designs.length} total)\n`);
  return { created, updated };
}

async function run() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✓ Connected\n');

  console.log('▶ HOODIES');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const hoodieResult = await upsertProducts(HOODIE_DESIGNS, buildHoodie, 'hoodies', 'Hoodies');

  console.log('▶ CREW SHIRTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const shirtResult = await upsertProducts(SHIRT_DESIGNS, buildShirt, 'crew-shirts', 'Shirts');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✓ All done.`);
  console.log(`  Hoodies: ${hoodieResult.created} created, ${hoodieResult.updated} updated`);
  console.log(`  Shirts:  ${shirtResult.created} created, ${shirtResult.updated} updated`);
  console.log(`  Total new products: ${HOODIE_DESIGNS.length + SHIRT_DESIGNS.length}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\nNext steps:`);
  console.log(`  1. Check /shop?category=hoodies`);
  console.log(`  2. Check /shop?category=crew-shirts`);
  console.log(`  3. Admin: /admin/products → search "Hoodie" or "Crew Shirt"`);

  await mongoose.disconnect();
}

run().catch(async err => {
  console.error('\n❌ Error:', err);
  await mongoose.disconnect();
  process.exit(1);
});
