/**
 * Seed Script for HS Race Gear
 *
 * Run with: node scripts/seed.mjs
 *
 * This script populates the database with:
 * - Categories (Race Suits, Crew Shirts, Hoodies + subcategories)
 * - Sample products for all 3 shop sections
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

// Define schemas inline to avoid import issues
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  level: { type: Number, default: 0 },
  image: { url: String, alt: String },
  isActive: { type: Boolean, default: true },
  isVisible: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  filterOptions: {
    materials: [String],
    certifications: [String],
    sizeRange: { min: String, max: String }
  },
  productCount: { type: Number, default: 0 }
}, { timestamps: true });

const customOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  isDefault: { type: Boolean, default: false }
}, { _id: true });

const sizeInventorySchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, default: 0, min: 0 },
  sku: String,
  isAvailable: { type: Boolean, default: true }
}, { _id: true });

const productImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: String,
  isPrimary: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: String,
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  costPrice: { type: Number, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  certification: { type: String, default: null },
  certificationLevel: { type: String, default: null },
  material: { type: String, default: null },
  construction: { type: String, default: null },
  layers: { type: Number, min: 1, max: 5, default: 1 },
  features: [String],
  specifications: { type: Map, of: String },
  images: [productImageSchema],
  sizeOptions: [String],
  inventory: [sizeInventorySchema],
  customizable: { type: Boolean, default: false },
  customFitAvailable: { type: Boolean, default: false },
  customFitPrice: { type: Number, default: 0 },
  customFitLeadTime: { type: String, default: '5-7 business days' },
  customOptions: [customOptionSchema],
  status: { type: String, default: 'active' },
  isVisible: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  metaTitle: String,
  metaDescription: String,
  weight: { type: Number, default: 0 },
  weightUnit: { type: String, default: 'lb' },
  viewCount: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 },
  rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } }
}, { timestamps: true });

// Create models
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// ═══════════════════════════════════════════════
// CATEGORIES - Matching shop page tab slugs
// ═══════════════════════════════════════════════

const mainCategories = [
  {
    name: 'Off The Rack Race Suits',
    slug: 'race-suits',
    description: 'Premium pre-made racing suits with FIA and SFI certifications',
    level: 0,
    order: 1,
    isFeatured: true,
    filterOptions: {
      materials: ['Nomex', 'FR Cotton', 'Nomex/Kevlar', 'Proban'],
      certifications: ['SFI 3.2A/1', 'SFI 3.2A/5', 'FIA 8856-2018'],
      sizeRange: { min: '7XS', max: '3XL' }
    }
  },
  {
    name: 'Crew Shirts',
    slug: 'crew-shirts',
    description: 'Professional team crew shirts for your pit crew and team',
    level: 0,
    order: 2,
    isFeatured: true,
    filterOptions: {
      materials: ['Polyester', 'Cotton Blend', 'Performance Dry-Fit'],
      sizeRange: { min: 'S', max: '3XL' }
    }
  },
  {
    name: 'Sublimated Crew Hoodies',
    slug: 'hoodies',
    description: 'Custom sublimated crew hoodies with full-color printing',
    level: 0,
    order: 3,
    isFeatured: true,
    filterOptions: {
      materials: ['Polyester', 'Cotton Blend', 'Fleece'],
      sizeRange: { min: 'S', max: '3XL' }
    }
  },
  {
    name: 'Gloves',
    slug: 'gloves',
    description: 'Racing gloves for maximum grip and protection',
    level: 0,
    order: 4,
    isFeatured: false
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Racing accessories and safety equipment',
    level: 0,
    order: 5,
    isFeatured: false
  },
  {
    name: 'Safety Equipment',
    slug: 'safety-equipment',
    description: 'HANS devices, helmets, and safety gear',
    level: 0,
    order: 6,
    isFeatured: false
  }
];

const subcategories = [
  // Race Suits subcategories
  { name: 'SFI-1 Suits', slug: 'sfi-1-suits', parentSlug: 'race-suits', description: 'Single layer SFI 3.2A/1 certified suits', order: 1 },
  { name: 'SFI-5 Suits', slug: 'sfi-5-suits', parentSlug: 'race-suits', description: 'Multi-layer SFI 3.2A/5 certified suits', order: 2 },
  { name: 'FIA Level 2', slug: 'fia-level-2', parentSlug: 'race-suits', description: 'FIA 8856-2018 certified suits', order: 3 },
  { name: 'Karting Suits', slug: 'karting-suits', parentSlug: 'race-suits', description: 'Suits designed for karting', order: 4 },
  { name: 'Kids Racing Suits', slug: 'kids-racing-suits', parentSlug: 'race-suits', description: 'Racing suits for young drivers', order: 5 },
  // Gloves subcategories
  { name: 'SFI Gloves', slug: 'sfi-gloves', parentSlug: 'gloves', description: 'SFI certified racing gloves', order: 1 },
  { name: 'FIA Gloves', slug: 'fia-gloves', parentSlug: 'gloves', description: 'FIA certified racing gloves', order: 2 },
  // Accessories subcategories
  { name: 'Shoes', slug: 'racing-shoes', parentSlug: 'accessories', description: 'Racing shoes and boots', order: 1 },
  { name: 'Underwear', slug: 'racing-underwear', parentSlug: 'accessories', description: 'Fire-resistant underwear', order: 2 },
  { name: 'Balaclavas', slug: 'balaclavas', parentSlug: 'accessories', description: 'Racing balaclavas and hoods', order: 3 }
];

// ═══════════════════════════════════════════════
// PRODUCTS - Race Suits
// ═══════════════════════════════════════════════

const standardSizes = ['7XS', '6XS', '5XS', '4XS', '3XS', '2XS', 'XS', 'S', 'M', 'M/L', 'L', 'L/XL', 'XL', '2XL', '3XL'];

const standardCustomOptions = [
  { name: 'Arm Restraints', slug: 'arm-restraints', description: 'Custom arm restraint loops', price: 2500, isDefault: false },
  { name: 'Foot Stirrups', slug: 'foot-stirrups', description: 'Integrated foot stirrups', price: 1500, isDefault: false },
  { name: 'Name Patch', slug: 'name-patch', description: 'Personalized name embroidery', price: 1000, isDefault: false },
  { name: 'Custom Logo', slug: 'custom-logo', description: 'Team or sponsor logo embroidery', price: 3500, isDefault: false },
  { name: 'Belt Loop Delete', slug: 'belt-loop-delete', description: 'Remove belt loops for harness clearance', price: 0, isDefault: false }
];

const raceSuitProducts = [
  {
    name: 'GT-1 Apex SFI 1 Nomex Racing Suit',
    slug: 'gt1-apex-sfi-1-nomex-racing-suit',
    description: 'The GT-1 Apex SFI 1 Nomex Racing Suit epitomizes the fusion of safety and style. Designed for serious racers, this one-piece suit features 360 Radial Arms and a back gusset for unrestricted movement. Made with premium Nomex fabric and certified to SFI 3.2A/1 standards.',
    shortDescription: 'Premium SFI-1 certified Nomex racing suit with 360 Radial Arms',
    price: 73100,
    compareAtPrice: 85000,
    certification: 'SFI 3.2A/1',
    certificationLevel: 'SFI-1',
    material: 'Nomex',
    construction: 'One-piece with 360 Radial Arms & back gusset',
    layers: 1,
    features: ['Extended sizes available (7XS to 3XL)', 'Custom arm restraints option', 'Foot stirrups available', 'Back gusset for comfort', '360 arm motion design', 'Premium Nomex fabric', 'Boot-cut legs', 'Action back pleats'],
    sizeOptions: standardSizes,
    customizable: true,
    customFitAvailable: true,
    customFitPrice: 15000,
    customFitLeadTime: '5-7 business days',
    isFeatured: true,
    isNewArrival: true,
    weight: 2.5,
    images: [
      { url: '/images/products/fashion/product-1.jpg', alt: 'GT-1 Apex Racing Suit Front', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-2.jpg', alt: 'GT-1 Apex Racing Suit Back', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'Pro Series SFI-5 Multi-Layer Racing Suit',
    slug: 'pro-series-sfi-5-multi-layer-racing-suit',
    description: 'The Pro Series SFI-5 Multi-Layer Racing Suit offers maximum fire protection for professional racers. With three layers of advanced fire-resistant materials including Nomex outer shell and Kevlar reinforcement, this suit exceeds SFI 3.2A/5 requirements.',
    shortDescription: 'Professional grade SFI-5 certified multi-layer racing suit',
    price: 125000,
    compareAtPrice: 150000,
    certification: 'SFI 3.2A/5',
    certificationLevel: 'SFI-5',
    material: 'Nomex/Kevlar',
    construction: 'One-piece triple-layer',
    layers: 3,
    features: ['Triple-layer construction', 'Nomex outer shell', 'Kevlar reinforced panels', 'Extended TPP rating', 'Professional grade', 'Pre-curved arms', 'Knit collar and cuffs'],
    sizeOptions: standardSizes,
    customizable: true,
    customFitAvailable: true,
    customFitPrice: 20000,
    customFitLeadTime: '7-10 business days',
    isFeatured: true,
    isNewArrival: false,
    weight: 4.0,
    images: [
      { url: '/images/products/fashion/product-3.jpg', alt: 'Pro Series Racing Suit Front', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-4.jpg', alt: 'Pro Series Racing Suit Back', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'Junior Kart Racing Suit',
    slug: 'junior-kart-racing-suit',
    description: 'Designed specifically for young karting enthusiasts, the Junior Kart Racing Suit provides safety and style in a lightweight package. Made with FR cotton for comfort during long racing sessions.',
    shortDescription: 'Lightweight and durable racing suit for young karting drivers',
    price: 29900,
    compareAtPrice: 35000,
    certification: null,
    certificationLevel: null,
    material: 'FR Cotton',
    construction: 'One-piece',
    layers: 1,
    features: ['Lightweight FR cotton', 'Reinforced knees and elbows', 'Bright visibility colors', 'Breathable mesh panels', 'Junior sizes 5XS to XS', 'Machine washable'],
    sizeOptions: ['5XS', '4XS', '3XS', '2XS', 'XS', 'S'],
    customizable: false,
    customFitAvailable: false,
    isFeatured: false,
    isNewArrival: true,
    weight: 1.5,
    images: [
      { url: '/images/products/fashion/product-5.jpg', alt: 'Junior Kart Racing Suit', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-6.jpg', alt: 'Junior Kart Racing Suit Back', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'FIA Homologated Championship Racing Suit',
    slug: 'fia-homologated-championship-racing-suit',
    description: 'Our flagship FIA Homologated Championship Racing Suit meets the strictest international standards. Certified to FIA 8856-2018, this suit is approved for Formula racing, GT championships, and all FIA-sanctioned events.',
    shortDescription: 'FIA 8856-2018 certified suit for professional championship racing',
    price: 195000,
    compareAtPrice: 225000,
    certification: 'FIA 8856-2018',
    certificationLevel: 'FIA Level 2',
    material: 'Nomex',
    construction: 'One-piece anatomical cut',
    layers: 2,
    features: ['FIA 8856-2018 homologated', 'Premium Italian fabric', 'Anatomical cut design', 'Floating arm construction', 'Stretch panels', 'Lightweight construction', 'FIA hologram included'],
    sizeOptions: standardSizes,
    customizable: true,
    customFitAvailable: true,
    customFitPrice: 25000,
    customFitLeadTime: '10-14 business days',
    isFeatured: true,
    isNewArrival: false,
    weight: 2.2,
    images: [
      { url: '/images/products/fashion/product-7.jpg', alt: 'FIA Championship Racing Suit', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-20.jpg', alt: 'FIA Championship Racing Suit Detail', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'Budget Racer SFI-1 Entry Level Suit',
    slug: 'budget-racer-sfi-1-entry-level-suit',
    description: 'The perfect entry point for new racers, the Budget Racer SFI-1 Suit delivers essential safety certification at an affordable price. SFI 3.2A/1 certified with quality Nomex construction.',
    shortDescription: 'Affordable SFI-1 certified suit for entry-level racers',
    price: 45000,
    compareAtPrice: 55000,
    certification: 'SFI 3.2A/1',
    certificationLevel: 'SFI-1',
    material: 'Nomex',
    construction: 'One-piece',
    layers: 1,
    features: ['SFI 3.2A/1 certified', 'Affordable pricing', 'Quality Nomex fabric', 'Standard sizes available', 'Great for beginners', 'Track day approved'],
    sizeOptions: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    customizable: false,
    customFitAvailable: false,
    isFeatured: false,
    isNewArrival: false,
    weight: 2.3,
    images: [
      { url: '/images/products/fashion/product-21.jpg', alt: 'Budget Racer Entry Level Suit', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-22.jpg', alt: 'Budget Racer Suit Back', isPrimary: false, order: 1 }
    ]
  }
];

// ═══════════════════════════════════════════════
// PRODUCTS - Crew Shirts
// ═══════════════════════════════════════════════

const crewShirtSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

const crewShirtProducts = [
  {
    name: 'HS Team Crew Shirt - Classic',
    slug: 'hs-team-crew-shirt-classic',
    description: 'The HS Team Crew Shirt in a classic design. Made with moisture-wicking polyester, perfect for pit crew and team members. Features reinforced stitching and a professional look for race day.',
    shortDescription: 'Classic team crew shirt with moisture-wicking fabric',
    price: 8900,
    compareAtPrice: null,
    certification: null,
    certificationLevel: null,
    material: 'Polyester',
    construction: null,
    features: ['Moisture-wicking fabric', 'Reinforced stitching', 'Professional fit', 'Team branding ready', 'Machine washable'],
    sizeOptions: crewShirtSizes,
    customizable: false,
    customFitAvailable: false,
    isFeatured: true,
    isNewArrival: true,
    weight: 0.4,
    images: [
      { url: '/images/products/fashion/product-24.jpg', alt: 'HS Team Crew Shirt Classic', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-25.jpg', alt: 'HS Team Crew Shirt Classic Back', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'HS Pit Crew Shirt - FR Rated',
    slug: 'hs-pit-crew-shirt-fr-rated',
    description: 'Fire-resistant pit crew shirt made with FR-treated cotton blend. Designed for pit crew members who need additional safety during fuel stops and maintenance. Comfortable enough for all-day wear.',
    shortDescription: 'Fire-resistant pit crew shirt for safety-conscious teams',
    price: 12900,
    compareAtPrice: 14900,
    certification: null,
    certificationLevel: null,
    material: 'Cotton Blend',
    construction: null,
    features: ['FR-treated fabric', 'Cotton blend comfort', 'Pit crew safety rated', 'All-day comfort', 'Reinforced seams'],
    sizeOptions: crewShirtSizes,
    customizable: false,
    customFitAvailable: false,
    isFeatured: true,
    isNewArrival: false,
    weight: 0.5,
    images: [
      { url: '/images/products/fashion/product-26.jpg', alt: 'HS Pit Crew Shirt FR', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-27.jpg', alt: 'HS Pit Crew Shirt FR Back', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'HS Crew Polo - Performance',
    slug: 'hs-crew-polo-performance',
    description: 'Performance crew polo shirt with dry-fit technology. Ideal for team events, paddock appearances, and sponsor presentations. Clean professional look with exceptional comfort.',
    shortDescription: 'Performance dry-fit crew polo for team events',
    price: 7900,
    compareAtPrice: null,
    certification: null,
    certificationLevel: null,
    material: 'Performance Dry-Fit',
    construction: null,
    features: ['Dry-fit technology', 'Professional polo style', 'Sponsor logo ready', 'Breathable mesh panels', 'UV protection'],
    sizeOptions: crewShirtSizes,
    customizable: false,
    customFitAvailable: false,
    isFeatured: false,
    isNewArrival: true,
    weight: 0.35,
    images: [
      { url: '/images/products/fashion/product-30.jpg', alt: 'HS Crew Polo Performance', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-31.jpg', alt: 'HS Crew Polo Performance Back', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'HS Sublimated Crew Shirt - Custom Print',
    slug: 'hs-sublimated-crew-shirt-custom',
    description: 'Full sublimation crew shirt with custom team design capability. Vibrant colors that won\'t fade. Perfect for teams wanting maximum visual impact on race day.',
    shortDescription: 'Full sublimation custom print crew shirt',
    price: 10900,
    compareAtPrice: null,
    certification: null,
    certificationLevel: null,
    material: 'Polyester',
    construction: null,
    features: ['Full sublimation printing', 'Fade-resistant colors', 'Custom team design', 'Lightweight breathable', 'Quick-dry fabric'],
    sizeOptions: crewShirtSizes,
    customizable: false,
    customFitAvailable: false,
    isFeatured: false,
    isNewArrival: false,
    weight: 0.4,
    images: [
      { url: '/images/products/fashion/product-32.jpg', alt: 'HS Sublimated Crew Shirt', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-33.jpg', alt: 'HS Sublimated Crew Shirt Back', isPrimary: false, order: 1 }
    ]
  }
];

// ═══════════════════════════════════════════════
// PRODUCTS - Sublimated Crew Hoodies
// ═══════════════════════════════════════════════

const hoodieSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

const hoodieProducts = [
  {
    name: 'HS Sublimated Team Hoodie',
    slug: 'hs-sublimated-team-hoodie',
    description: 'Premium sublimated team hoodie with full-color all-over printing. Heavy-weight fleece lined for warmth during early morning paddock walks and cool evening events. Custom team design ready.',
    shortDescription: 'Premium sublimated hoodie with fleece lining',
    price: 14900,
    compareAtPrice: null,
    certification: null,
    certificationLevel: null,
    material: 'Polyester',
    construction: null,
    features: ['Full sublimation all-over print', 'Fleece lined', 'Heavy-weight warmth', 'Kangaroo pocket', 'Drawstring hood', 'Ribbed cuffs and hem'],
    sizeOptions: hoodieSizes,
    customizable: false,
    customFitAvailable: false,
    isFeatured: true,
    isNewArrival: true,
    weight: 0.8,
    images: [
      { url: '/images/products/fashion/product-34.jpg', alt: 'HS Sublimated Team Hoodie', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-35.jpg', alt: 'HS Sublimated Team Hoodie Back', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'HS Racing Zip-Up Hoodie',
    slug: 'hs-racing-zip-up-hoodie',
    description: 'Full-zip sublimated racing hoodie for the paddock. Features a modern design with team branding areas and sponsor placement zones. Made with durable polyester-cotton blend.',
    shortDescription: 'Full-zip sublimated racing hoodie',
    price: 16900,
    compareAtPrice: 19900,
    certification: null,
    certificationLevel: null,
    material: 'Cotton Blend',
    construction: null,
    features: ['Full zip design', 'Sublimated printing', 'Sponsor placement zones', 'Side pockets', 'Durable construction', 'Machine washable'],
    sizeOptions: hoodieSizes,
    customizable: false,
    customFitAvailable: false,
    isFeatured: true,
    isNewArrival: false,
    weight: 0.9,
    images: [
      { url: '/images/products/fashion/product-36.jpg', alt: 'HS Racing Zip-Up Hoodie', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-37.jpg', alt: 'HS Racing Zip-Up Hoodie Back', isPrimary: false, order: 1 }
    ]
  },
  {
    name: 'HS Crew Pullover Hoodie - Heavyweight',
    slug: 'hs-crew-pullover-hoodie-heavyweight',
    description: 'Heavyweight pullover hoodie built for cold weather racing events. Double-layered fleece construction with sublimated team graphics. The go-to hoodie when temperatures drop at the track.',
    shortDescription: 'Heavyweight double-layer fleece pullover hoodie',
    price: 17900,
    compareAtPrice: null,
    certification: null,
    certificationLevel: null,
    material: 'Fleece',
    construction: null,
    features: ['Double-layered fleece', 'Heavyweight construction', 'Sublimated graphics', 'Oversized hood', 'Thumb holes', 'Relaxed fit'],
    sizeOptions: hoodieSizes,
    customizable: false,
    customFitAvailable: false,
    isFeatured: false,
    isNewArrival: true,
    weight: 1.1,
    images: [
      { url: '/images/products/fashion/product-40.jpg', alt: 'HS Crew Pullover Hoodie', isPrimary: true, order: 0 },
      { url: '/images/products/fashion/product-41.jpg', alt: 'HS Crew Pullover Hoodie Back', isPrimary: false, order: 1 }
    ]
  }
];

// ═══════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════

async function seed() {
  console.log('🌱 Starting seed process...\n');

  try {
    console.log('📦 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Cleared existing data\n');

    // Create main categories
    console.log('📁 Creating main categories...');
    const createdCategories = {};

    for (const cat of mainCategories) {
      const created = await Category.create(cat);
      createdCategories[cat.slug] = created;
      console.log(`   ✓ ${cat.name} (slug: ${cat.slug})`);
    }
    console.log('');

    // Create subcategories
    console.log('📂 Creating subcategories...');
    for (const subcat of subcategories) {
      const parent = createdCategories[subcat.parentSlug];
      if (parent) {
        const created = await Category.create({
          ...subcat,
          parent: parent._id,
          level: 1
        });
        createdCategories[subcat.slug] = created;
        console.log(`   ✓ ${subcat.name} (under ${parent.name})`);
      }
    }
    console.log('');

    // Helper to create products with inventory
    const createProducts = async (products, categorySlug, subcategoryMapper) => {
      const category = createdCategories[categorySlug];
      for (const product of products) {
        const subcategory = subcategoryMapper ? subcategoryMapper(product, createdCategories) : null;

        const inventory = product.sizeOptions.map(size => ({
          size,
          stock: Math.floor(Math.random() * 15) + 3,
          sku: `${product.slug.toUpperCase().slice(0, 15)}-${size}`,
          isAvailable: true
        }));

        await Product.create({
          ...product,
          category: category._id,
          subcategory: subcategory?._id || null,
          inventory,
          customOptions: product.customizable ? standardCustomOptions : []
        });

        console.log(`   ✓ ${product.name}`);
      }
    };

    // Create Race Suit products
    console.log('🏎️  Creating Race Suit products...');
    await createProducts(raceSuitProducts, 'race-suits', (product, cats) => {
      if (product.certificationLevel === 'SFI-1') return cats['sfi-1-suits'];
      if (product.certificationLevel === 'SFI-5') return cats['sfi-5-suits'];
      if (product.certificationLevel === 'FIA Level 2') return cats['fia-level-2'];
      if (product.slug.includes('kart')) return cats['karting-suits'];
      return null;
    });
    console.log('');

    // Create Crew Shirt products
    console.log('👕 Creating Crew Shirt products...');
    await createProducts(crewShirtProducts, 'crew-shirts');
    console.log('');

    // Create Hoodie products
    console.log('🧥 Creating Hoodie products...');
    await createProducts(hoodieProducts, 'hoodies');
    console.log('');

    // Update category product counts
    console.log('📊 Updating category product counts...');
    for (const slug of Object.keys(createdCategories)) {
      const cat = createdCategories[slug];
      const count = await Product.countDocuments({
        $or: [{ category: cat._id }, { subcategory: cat._id }]
      });
      await Category.findByIdAndUpdate(cat._id, { productCount: count });
    }
    console.log('✅ Product counts updated\n');

    // Summary
    const totalCategories = await Category.countDocuments();
    const totalProducts = await Product.countDocuments();
    const raceSuitCount = await Product.countDocuments({ category: createdCategories['race-suits']._id });
    const crewShirtCount = await Product.countDocuments({ category: createdCategories['crew-shirts']._id });
    const hoodieCount = await Product.countDocuments({ category: createdCategories['hoodies']._id });

    console.log('═══════════════════════════════════════');
    console.log('🎉 Seed completed successfully!');
    console.log('═══════════════════════════════════════');
    console.log(`   Categories created: ${totalCategories}`);
    console.log(`   Total products: ${totalProducts}`);
    console.log(`     - Race Suits: ${raceSuitCount}`);
    console.log(`     - Crew Shirts: ${crewShirtCount}`);
    console.log(`     - Hoodies: ${hoodieCount}`);
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run seed
seed();
