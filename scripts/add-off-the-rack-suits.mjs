/**
 * Add Off-The-Rack Race Suits
 *
 * Adds 33 new HS off-the-rack racing suits to MongoDB without wiping
 * existing data. Safe to re-run — uses upsert by slug so existing
 * products with the same slug are updated, new ones are created.
 *
 * Usage:
 *   node scripts/add-off-the-rack-suits.mjs
 *
 * Prerequisites:
 *   - MONGODB_URI set in .env.local
 *   - Images already converted and placed in
 *     /public/images/products/off-the-rack/hs-{slug}.webp
 *   - Category 'race-suits' (Off The Rack Race Suits) must exist
 *     (run scripts/seed.mjs first if it doesn't).
 *
 * Created: 2026-06-30
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
  certification: String,
  certificationLevel: String,
  material: String,
  construction: String,
  layers: Number,
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
// 33 NEW OFF-THE-RACK SUITS
// All share the same brand position: SFI 3.2A/1, Nomex single-layer,
// $329 (compare at $599 — 45% off), Made in USA, Watertown MA.
// Descriptions vary by name theme.
// ─────────────────────────────────────────────────────────────────
const SLUGS_AND_THEMES = [
  ['ace',       'classic',  'A clean, no-nonsense workhorse SFI-certified suit. The "Ace" is the all-rounder — every-discipline, every-track, every-weekend.'],
  ['alpha',     'premium',  'The Alpha sets the standard at the top of our off-the-rack line. Multi-discipline ready with a sharp, race-paddock-ready look.'],
  ['apex',      'speed',    'Built for drivers who want to hit the apex every lap. Designed with a sport-cut silhouette for road-course and circle-track use.'],
  ['asphalt',   'oval',     'Engineered for asphalt circle-track racing — modified, stock car, and late model classes. Reinforced shoulder and knee panels.'],
  ['blast',     'drag',     'Built for drag racing\'s short, intense bursts. SFI 3.2A/1 baseline for 10.00+ ET classes; lightweight construction for quick burnouts.'],
  ['carbon',    'tech',     'A premium-look, race-ready suit. Carbon-aesthetic graphic accents over Nomex® meta-aramid fire-resistant base.'],
  ['diamond',   'premium',  'The Diamond brings premium racepaddock styling to an accessible price point. SFI 3.2A/1 protection with refined finishing.'],
  ['dirt',      'oval',     'Built for dirt-track racing — sprint car, modified, hobby stock. Dust-seal high collar and reinforced abrasion panels at shoulders and seat.'],
  ['elite',     'premium',  'Our Elite line takes the off-the-rack standard one step further. Pre-curved arms, action-back pleats, professional finishing throughout.'],
  ['fusion',    'tech',     'A fusion of safety and style — Nomex® fire-resistant baseline with graphic-forward design. Built for racers who want to stand out.'],
  ['ignite',    'drag',     'Built for the burnout box. SFI 3.2A/1 entry-level fire protection in a lightweight, breathable cut for sportsman and bracket drag classes.'],
  ['matrix',    'tech',     'A modern, sharp-lined suit. The Matrix series delivers full SFI certification with a contemporary panel design.'],
  ['midget',    'oval',     'Cut specifically for midget car cockpits — tight, restrictive seating positions where range-of-motion at the wheel matters most.'],
  ['nitro',     'drag',     'For drag racers running nitro-class methanol classes. SFI 3.2A/1 entry-level baseline; pair with our Pro 1 or higher for NHRA classes faster than 9.99 ET.'],
  ['omega',     'premium',  'The Omega rounds out our premium off-the-rack tier. Refined silhouette, professional-grade construction, ready for the podium.'],
  ['one',       'classic',  'The HS One — our entry-level off-the-rack racing suit. SFI 3.2A/1 certified Nomex® fire protection at the most accessible price point in the line.'],
  ['phantom',   'aggressive','Stealthy, blacked-out aesthetic. The Phantom delivers full SFI certification in an aggressive, race-ready look.'],
  ['podium',    'premium',  'Built for racers chasing the podium. Sharp lines, refined finishing, full SFI 3.2A/1 fire protection.'],
  ['pro-1',     'classic',  'The HS Pro 1 is the original off-the-rack workhorse. Trusted by amateur-to-pro racers across circle-track, drag, and karting.'],
  ['rebel',     'aggressive','For racers who want their gear to stand out. Bold graphic-forward design over SFI 3.2A/1 Nomex® baseline.'],
  ['rogue',     'aggressive','The Rogue is for drivers who race their own way. Aggressive cut, bold color blocking, full SFI certification.'],
  ['rush',      'classic',  'The HS Rush — purpose-built for fast-turnaround order needs. Standard sizes ship from inventory; SFI 3.2A/1 Nomex® baseline.'],
  ['sprint',    'oval',     'Designed for sprint car cockpits — winged or non-wing, dirt or asphalt. Built-in arm-restraint compatibility at the shoulders.'],
  ['stealth',   'aggressive','Subtle, blacked-out aesthetic. Stealth-cut design over full SFI 3.2A/1 Nomex® fire-resistant construction.'],
  ['strike',    'speed',    'Built for speed. Aerodynamic cut over SFI 3.2A/1 Nomex® baseline — ideal for road-course and circle-track racers who need clean lines at the wheel.'],
  ['super',     'classic',  'The HS Super — one tier above the entry-level Pro 1. Refined construction, premium finishing, full SFI 3.2A/1 fire protection.'],
  ['titan',     'premium',  'Built like the name — Titan-tier construction with refined finishing. SFI 3.2A/1 certified for serious circle-track and road-course racers.'],
  ['track',     'oval',     'A track-day workhorse. Comfortable enough for full-day instructional sessions, certified to SFI 3.2A/1 for HPDE and amateur road racing.'],
  ['turbo',     'speed',    'Built for high-RPM racing. Turbocharged styling over the same SFI 3.2A/1 Nomex® baseline as our entire off-the-rack line.'],
  ['vector',    'tech',     'Sharp angles, technical design. The Vector delivers full SFI certification in a contemporary aesthetic.'],
  ['velocity',  'speed',    'For racers who chase speed. Lightweight cut over SFI 3.2A/1 Nomex® fire-resistant construction.'],
  ['volt',      'tech',     'High-energy aesthetic — bold accents over SFI 3.2A/1 Nomex® baseline. Built for racers who want their suit to match their personality.'],
  ['vortex',    'aggressive','Aggressive aesthetic with race-ready construction. Full SFI 3.2A/1 fire protection in a bold, modern silhouette.'],
];

// Shared description fragment used in every product
const COMMON_DESCRIPTION_TAIL = `\n\nEvery HS off-the-rack racing suit is built in Watertown, Massachusetts from genuine Nomex® meta-aramid fire-resistant fabric. Certified to SFI 3.2A/1 with the official SFI Foundation label sewn into the collar. Standard sizes XS through 3XL available; for sizes outside the standard range or for custom-fit construction, see our custom race suit options. Comparable SFI-certified racing suits from K1, Simpson, and Pyrotect typically retail $800–1,500. Our off-the-rack pricing reflects direct-from-manufacturer construction without retail markup.`;

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

function toName(slug) {
  // 'pro-1' → 'Pro 1', 'ace' → 'Ace'
  return slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

function buildProduct(slug, theme, themedDescription) {
  const displayName = toName(slug); // e.g. 'Apex', 'Pro 1'
  const fullName = `HS ${displayName} SFI Race Suit`;
  const productSlug = `hs-${slug}-sfi-race-suit`;
  const imagePath = `/images/products/off-the-rack/hs-${slug}.webp`;

  return {
    name: fullName,
    slug: productSlug,
    description: themedDescription + COMMON_DESCRIPTION_TAIL,
    shortDescription: `Off-the-rack SFI 3.2A/1 Nomex® racing suit. Made in USA. $329 (regularly $599 — 45% off).`,
    // Prices in CENTS to match the seed.mjs convention
    price: 32900,
    compareAtPrice: 59900,
    certification: 'SFI 3.2A/1',
    certificationLevel: 'SFI-1',
    material: 'Nomex',
    construction: 'One-piece single-layer',
    layers: 1,
    features: [
      'SFI 3.2A/1 certified',
      'Genuine Nomex® meta-aramid fabric',
      'Single-layer fire-resistant construction',
      'Made in Watertown, MA',
      'Sewn-in SFI Foundation certification label',
      'Standard sizes XS through 3XL',
      'Reinforced shoulder and knee panels',
      'Boot-cut leg openings',
    ],
    sizeOptions: STANDARD_SIZES,
    inventory: STANDARD_SIZES.map(size => ({ size, stock: 5, isAvailable: true })),
    images: [
      { url: imagePath, alt: `${fullName} — front view`, isPrimary: true, order: 0 },
    ],
    customizable: false,
    customFitAvailable: false,
    customFitPrice: 0,
    customFitLeadTime: '5-7 business days',
    status: 'active',
    isVisible: true,
    isFeatured: theme === 'premium', // Premium-themed suits get featured flag
    isNewArrival: true,
    weight: 2.3,
  };
}

// ─────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────
async function run() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✓ Connected\n');

  // Find race-suits category
  const raceSuitsCategory = await Category.findOne({ slug: 'race-suits' });
  if (!raceSuitsCategory) {
    console.error('❌ Category "race-suits" not found. Run scripts/seed.mjs first to create base categories.');
    await mongoose.disconnect();
    process.exit(1);
  }
  console.log(`✓ Found category: ${raceSuitsCategory.name} (${raceSuitsCategory._id})\n`);

  // Optional: find SFI-1 subcategory and use it as subcategory
  const sfi1Subcategory = await Category.findOne({ slug: 'sfi-1-suits' });
  if (sfi1Subcategory) {
    console.log(`✓ Found subcategory: ${sfi1Subcategory.name}\n`);
  }

  let created = 0;
  let updated = 0;

  for (const [slug, theme, themedDescription] of SLUGS_AND_THEMES) {
    const productData = buildProduct(slug, theme, themedDescription);
    productData.category = raceSuitsCategory._id;
    if (sfi1Subcategory) productData.subcategory = sfi1Subcategory._id;

    // Upsert by slug
    const existing = await Product.findOne({ slug: productData.slug });
    if (existing) {
      // Preserve existing _id, updatedAt, etc. but update fields
      await Product.updateOne({ slug: productData.slug }, { $set: productData });
      updated++;
      console.log(`↻ Updated:  ${productData.name}`);
    } else {
      await Product.create(productData);
      created++;
      console.log(`✓ Created:  ${productData.name}`);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✓ Done. Created: ${created} | Updated: ${updated} | Total: ${SLUGS_AND_THEMES.length}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\nNext steps:`);
  console.log(`  1. Check the live shop: /shop?category=race-suits`);
  console.log(`  2. Verify product pages: /shop/hs-{slug}-sfi-race-suit`);
  console.log(`  3. Admin: /admin/products → search "HS " to see all 33`);

  await mongoose.disconnect();
}

run().catch(async err => {
  console.error('\n❌ Error:', err);
  await mongoose.disconnect();
  process.exit(1);
});
