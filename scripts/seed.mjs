/**
 * Seed Script for HS Race Gear
 * 
 * Run with: node scripts/seed.mjs
 * 
 * This script populates the database with:
 * - Categories (Racing Suits, Gloves, Accessories)
 * - Subcategories (SFI-1, FIA Level 2, Kids, Karting)
 * - Sample racing suit products
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
  certification: { type: String, default: 'None' },
  certificationLevel: { type: String, default: 'None' },
  material: { type: String, default: 'Nomex' },
  construction: { type: String, default: 'One-piece' },
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

// Seed Data
const categories = [
  // Main Categories
  {
    name: 'Racing Suits',
    slug: 'racing-suits',
    description: 'Professional racing suits with SFI and FIA certifications',
    level: 0,
    order: 1,
    isFeatured: true,
    filterOptions: {
      materials: ['Nomex', 'FR Cotton', 'CarbonX'],
      certifications: ['SFI 3.2A/1', 'SFI 3.2A/5', 'FIA 8856-2018'],
      sizeRange: { min: '7XS', max: '3XL' }
    }
  },
  {
    name: 'Gloves',
    slug: 'gloves',
    description: 'Racing gloves for maximum grip and protection',
    level: 0,
    order: 2,
    isFeatured: true
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Racing accessories and safety equipment',
    level: 0,
    order: 3,
    isFeatured: false
  },
  {
    name: 'Safety Equipment',
    slug: 'safety-equipment',
    description: 'HANS devices, helmets, and safety gear',
    level: 0,
    order: 4,
    isFeatured: false
  }
];

const subcategories = [
  // Racing Suits subcategories
  { name: 'SFI-1 Suits', slug: 'sfi-1-suits', parentSlug: 'racing-suits', description: 'Single layer SFI 3.2A/1 certified suits', order: 1 },
  { name: 'SFI-5 Suits', slug: 'sfi-5-suits', parentSlug: 'racing-suits', description: 'Multi-layer SFI 3.2A/5 certified suits', order: 2 },
  { name: 'FIA Level 2', slug: 'fia-level-2', parentSlug: 'racing-suits', description: 'FIA 8856-2018 certified suits', order: 3 },
  { name: 'Karting Suits', slug: 'karting-suits', parentSlug: 'racing-suits', description: 'Suits designed for karting', order: 4 },
  { name: 'Kids Racing Suits', slug: 'kids-racing-suits', parentSlug: 'racing-suits', description: 'Racing suits for young drivers', order: 5 },
  // Gloves subcategories
  { name: 'SFI Gloves', slug: 'sfi-gloves', parentSlug: 'gloves', description: 'SFI certified racing gloves', order: 1 },
  { name: 'FIA Gloves', slug: 'fia-gloves', parentSlug: 'gloves', description: 'FIA certified racing gloves', order: 2 },
  // Accessories subcategories
  { name: 'Shoes', slug: 'racing-shoes', parentSlug: 'accessories', description: 'Racing shoes and boots', order: 1 },
  { name: 'Underwear', slug: 'racing-underwear', parentSlug: 'accessories', description: 'Fire-resistant underwear', order: 2 },
  { name: 'Balaclavas', slug: 'balaclavas', parentSlug: 'accessories', description: 'Racing balaclavas and hoods', order: 3 }
];

// Standard size options
const standardSizes = ['7XS', '6XS', '5XS', '4XS', '3XS', '2XS', 'XS', 'S', 'M', 'M/L', 'L', 'L/XL', 'XL', '2XL', '3XL'];

// Custom options available for all suits
const standardCustomOptions = [
  { name: 'Arm Restraints', slug: 'arm-restraints', description: 'Custom arm restraint loops', price: 2500, isDefault: false },
  { name: 'Foot Stirrups', slug: 'foot-stirrups', description: 'Integrated foot stirrups', price: 1500, isDefault: false },
  { name: 'Name Patch', slug: 'name-patch', description: 'Personalized name embroidery', price: 1000, isDefault: false },
  { name: 'Custom Logo', slug: 'custom-logo', description: 'Team or sponsor logo embroidery', price: 3500, isDefault: false },
  { name: 'Belt Loop Delete', slug: 'belt-loop-delete', description: 'Remove belt loops for harness clearance', price: 0, isDefault: false }
];

// Sample Products (Racing Suits)
const products = [
  {
    name: 'GT-1 Apex SFI 1 Nomex Racing Suit',
    slug: 'gt1-apex-sfi-1-nomex-racing-suit',
    description: 'The GT-1 Apex SFI 1 Nomex Racing Suit epitomizes the fusion of safety and style. Designed for serious racers, this one-piece suit features 360 Radial Arms and a back gusset for unrestricted movement. Made with premium Nomex fabric and certified to SFI 3.2A/1 standards, it provides excellent fire protection without compromising on comfort.',
    shortDescription: 'Premium SFI-1 certified Nomex racing suit with 360 Radial Arms',
    price: 73100,
    compareAtPrice: 85000,
    certification: 'SFI 3.2A/1',
    certificationLevel: 'SFI-1',
    material: 'Nomex',
    construction: 'One-piece with 360 Radial Arms & back gusset',
    layers: 1,
    features: [
      'Extended sizes available (7XS to 3XL)',
      'Custom arm restraints option',
      'Foot stirrups available',
      'Back gusset for comfort',
      '360 arm motion design',
      'Premium Nomex fabric',
      'Boot-cut legs',
      'Action back pleats'
    ],
    sizeOptions: standardSizes,
    customizable: true,
    customFitAvailable: true,
    customFitPrice: 15000,
    customFitLeadTime: '5-7 business days',
    isFeatured: true,
    isNewArrival: true,
    weight: 2.5,
    images: [
      { url: '/images/products/gt1-apex-front.jpg', alt: 'GT-1 Apex Racing Suit Front', isPrimary: true, order: 0 },
      { url: '/images/products/gt1-apex-back.jpg', alt: 'GT-1 Apex Racing Suit Back', isPrimary: false, order: 1 },
      { url: '/images/products/gt1-apex-detail.jpg', alt: 'GT-1 Apex Racing Suit Detail', isPrimary: false, order: 2 }
    ]
  },
  {
    name: 'Pro Series SFI-5 Multi-Layer Racing Suit',
    slug: 'pro-series-sfi-5-multi-layer-racing-suit',
    description: 'The Pro Series SFI-5 Multi-Layer Racing Suit offers maximum fire protection for professional racers. With three layers of advanced fire-resistant materials including Nomex outer shell and Kevlar reinforcement, this suit exceeds SFI 3.2A/5 requirements. Ideal for drag racing and other high-heat motorsports.',
    shortDescription: 'Professional grade SFI-5 certified multi-layer racing suit',
    price: 125000,
    compareAtPrice: 150000,
    certification: 'SFI 3.2A/5',
    certificationLevel: 'SFI-5',
    material: 'Nomex/Kevlar',
    construction: 'One-piece triple-layer',
    layers: 3,
    features: [
      'Triple-layer construction',
      'Nomex outer shell',
      'Kevlar reinforced panels',
      'Extended TPP rating',
      'Professional grade',
      'NHRA certified',
      'Pre-curved arms',
      'Knit collar and cuffs'
    ],
    sizeOptions: standardSizes,
    customizable: true,
    customFitAvailable: true,
    customFitPrice: 20000,
    customFitLeadTime: '7-10 business days',
    isFeatured: true,
    isNewArrival: false,
    weight: 4.0,
    images: [
      { url: '/images/products/pro-series-front.jpg', alt: 'Pro Series Racing Suit Front', isPrimary: true, order: 0 }
    ]
  },
  {
    name: 'Junior Kart Racing Suit',
    slug: 'junior-kart-racing-suit',
    description: 'Designed specifically for young karting enthusiasts, the Junior Kart Racing Suit provides safety and style in a lightweight package. Made with FR cotton for comfort during long racing sessions, this suit features bright colors for visibility and reinforced knees and elbows for durability.',
    shortDescription: 'Lightweight and durable racing suit for young karting drivers',
    price: 29900,
    compareAtPrice: 35000,
    certification: 'None',
    certificationLevel: 'None',
    material: 'FR Cotton',
    construction: 'One-piece',
    layers: 1,
    features: [
      'Lightweight FR cotton',
      'Reinforced knees and elbows',
      'Bright visibility colors',
      'Breathable mesh panels',
      'Junior sizes 5XS to XS',
      'Machine washable',
      'Quick-dry lining'
    ],
    sizeOptions: ['5XS', '4XS', '3XS', '2XS', 'XS', 'S'],
    customizable: false,
    customFitAvailable: false,
    isFeatured: false,
    isNewArrival: true,
    weight: 1.5,
    images: [
      { url: '/images/products/junior-kart-front.jpg', alt: 'Junior Kart Racing Suit', isPrimary: true, order: 0 }
    ]
  },
  {
    name: 'FIA Homologated Championship Racing Suit',
    slug: 'fia-homologated-championship-racing-suit',
    description: 'Our flagship FIA Homologated Championship Racing Suit meets the strictest international standards. Certified to FIA 8856-2018, this suit is approved for Formula racing, GT championships, and all FIA-sanctioned events. Features premium Italian fabric, anatomical cut, and floating arm design for maximum mobility.',
    shortDescription: 'FIA 8856-2018 certified suit for professional championship racing',
    price: 195000,
    compareAtPrice: 225000,
    certification: 'FIA 8856-2018',
    certificationLevel: 'FIA Level 2',
    material: 'Premium Italian Nomex',
    construction: 'One-piece anatomical cut',
    layers: 2,
    features: [
      'FIA 8856-2018 homologated',
      'Premium Italian fabric',
      'Anatomical cut design',
      'Floating arm construction',
      'Stretch panels',
      'Lightweight construction',
      'Epaulettes included',
      'FIA hologram included'
    ],
    sizeOptions: standardSizes,
    customizable: true,
    customFitAvailable: true,
    customFitPrice: 25000,
    customFitLeadTime: '10-14 business days',
    isFeatured: true,
    isNewArrival: false,
    weight: 2.2,
    images: [
      { url: '/images/products/fia-championship-front.jpg', alt: 'FIA Championship Racing Suit', isPrimary: true, order: 0 }
    ]
  },
  {
    name: 'Budget Racer SFI-1 Entry Level Suit',
    slug: 'budget-racer-sfi-1-entry-level-suit',
    description: 'The perfect entry point for new racers, the Budget Racer SFI-1 Suit delivers essential safety certification at an affordable price. SFI 3.2A/1 certified with quality Nomex construction, this suit provides excellent value for club racing, autocross, and track days.',
    shortDescription: 'Affordable SFI-1 certified suit for entry-level racers',
    price: 45000,
    compareAtPrice: 55000,
    certification: 'SFI 3.2A/1',
    certificationLevel: 'SFI-1',
    material: 'Nomex',
    construction: 'One-piece',
    layers: 1,
    features: [
      'SFI 3.2A/1 certified',
      'Affordable pricing',
      'Quality Nomex fabric',
      'Standard sizes available',
      'Great for beginners',
      'Track day approved',
      'Autocross legal'
    ],
    sizeOptions: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    customizable: false,
    customFitAvailable: false,
    isFeatured: false,
    isNewArrival: false,
    weight: 2.3,
    images: [
      { url: '/images/products/budget-racer-front.jpg', alt: 'Budget Racer Entry Level Suit', isPrimary: true, order: 0 }
    ]
  }
];

async function seed() {
  console.log('🌱 Starting seed process...\n');
  
  try {
    // Connect to MongoDB
    console.log('📦 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Clear existing data (optional - comment out to append)
    console.log('🗑️  Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Cleared existing data\n');
    
    // Create main categories
    console.log('📁 Creating main categories...');
    const createdCategories = {};
    
    for (const cat of categories) {
      const created = await Category.create(cat);
      createdCategories[cat.slug] = created;
      console.log(`   ✓ ${cat.name}`);
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
    
    // Create products
    console.log('🏎️  Creating products...');
    const racingSuitsCategory = createdCategories['racing-suits'];
    const sfi1Category = createdCategories['sfi-1-suits'];
    const sfi5Category = createdCategories['sfi-5-suits'];
    const fiaCategory = createdCategories['fia-level-2'];
    const kartingCategory = createdCategories['karting-suits'];
    
    for (const product of products) {
      // Assign category based on certification
      let category = racingSuitsCategory._id;
      let subcategory = null;
      
      if (product.certificationLevel === 'SFI-1') {
        subcategory = sfi1Category?._id;
      } else if (product.certificationLevel === 'SFI-5') {
        subcategory = sfi5Category?._id;
      } else if (product.certificationLevel === 'FIA Level 2') {
        subcategory = fiaCategory?._id;
      } else if (product.slug.includes('kart')) {
        subcategory = kartingCategory?._id;
      }
      
      // Create inventory for each size
      const inventory = product.sizeOptions.map(size => ({
        size,
        stock: Math.floor(Math.random() * 10) + 1, // Random stock 1-10
        isAvailable: true
      }));
      
      await Product.create({
        ...product,
        category,
        subcategory,
        inventory,
        customOptions: product.customizable ? standardCustomOptions : []
      });
      
      console.log(`   ✓ ${product.name}`);
    }
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
    
    console.log('═══════════════════════════════════════');
    console.log('🎉 Seed completed successfully!');
    console.log('═══════════════════════════════════════');
    console.log(`   Categories created: ${totalCategories}`);
    console.log(`   Products created: ${totalProducts}`);
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
