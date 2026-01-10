import mongoose from 'mongoose';

/**
 * Product Schema for HS Race Gear
 * 
 * Designed for racing suits with:
 * - Multiple sizes with inventory tracking
 * - Custom fit options with measurement upload
 * - Add-on options (arm restraints, foot stirrups, name patches)
 * - Safety certifications (SFI, FIA)
 * - Multiple product images
 */

// Custom Option Schema (for add-ons like arm restraints, patches)
const customOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    default: 0
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, { _id: true });

// Size Inventory Schema
const sizeInventorySchema = new mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  sku: String,
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { _id: true });

// Product Image Schema
const productImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  alt: String,
  isPrimary: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: true });

// Main Product Schema
const productSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  compareAtPrice: {
    type: Number,
    min: 0
  },
  costPrice: {
    type: Number,
    min: 0
  },
  
  // Categories (reference to Category model)
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  
  // Racing Suit Specific Fields
  certification: {
    type: String,
    enum: {
      values: ['SFI 3.2A/1', 'SFI 3.2A/5', 'SFI 3.2A/15', 'FIA 8856-2000', 'FIA 8856-2018', null],
      message: '{VALUE} is not a valid certification'
    },
    default: null
  },
  certificationLevel: {
    type: String,
    enum: {
      values: ['SFI-1', 'SFI-5', 'SFI-15', 'FIA Level 1', 'FIA Level 2', null],
      message: '{VALUE} is not a valid certification level'
    },
    default: null
  },
  material: {
    type: String,
    default: null
  },
  construction: {
    type: String,
    default: null
  },
  layers: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  
  // Features & Specifications
  features: [{
    type: String
  }],
  specifications: {
    type: Map,
    of: String
  },
  
  // Images
  images: [productImageSchema],
  
  // Size & Inventory
  sizeOptions: [{
    type: String
  }],
  inventory: [sizeInventorySchema],
  
  // Custom Fit Options
  customizable: {
    type: Boolean,
    default: false
  },
  customFitAvailable: {
    type: Boolean,
    default: false
  },
  customFitPrice: {
    type: Number,
    default: 0
  },
  customFitLeadTime: {
    type: String,
    default: '5-7 business days'
  },
  
  // Add-on Options
  customOptions: [customOptionSchema],
  
  // Product Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft', 'archived'],
    default: 'draft'
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  
  // SEO
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  
  // Shipping
  weight: {
    type: Number,
    default: 0
  },
  weightUnit: {
    type: String,
    enum: ['kg', 'lb', 'oz'],
    default: 'lb'
  },
  
  // Analytics
  viewCount: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  },
  
  // Ratings
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  // Timestamps
  publishedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ status: 1, isVisible: 1 });
productSchema.index({ price: 1 });
productSchema.index({ certification: 1 });
productSchema.index({ material: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ isFeatured: 1, status: 1 });

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images?.find(img => img.isPrimary);
  return primary?.url || this.images?.[0]?.url || '/images/placeholder-product.jpg';
});

// Virtual for total stock
productSchema.virtual('totalStock').get(function() {
  if (!this.inventory || this.inventory.length === 0) return 0;
  return this.inventory.reduce((sum, item) => sum + (item.stock || 0), 0);
});

// Virtual for available sizes
productSchema.virtual('availableSizes').get(function() {
  if (!this.inventory) return [];
  return this.inventory
    .filter(item => item.stock > 0 && item.isAvailable)
    .map(item => item.size);
});

// Virtual for is in stock
productSchema.virtual('inStock').get(function() {
  return this.totalStock > 0 || this.customFitAvailable;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.compareAtPrice || this.compareAtPrice <= this.price) return 0;
  return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
});

// Pre-save hook to generate slug
productSchema.pre('save', async function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  if (typeof next === 'function') {
    next();
  }
});

// Static method to find active products
productSchema.statics.findActive = function() {
  return this.find({ status: 'active', isVisible: true });
};

// Static method to find by category
productSchema.statics.findByCategory = function(categoryId) {
  return this.find({ 
    category: categoryId, 
    status: 'active', 
    isVisible: true 
  });
};

// Instance method to check size availability
productSchema.methods.checkSizeAvailability = function(size) {
  const sizeItem = this.inventory?.find(item => item.size === size);
  if (!sizeItem) return { available: false, stock: 0 };
  return {
    available: sizeItem.stock > 0 && sizeItem.isAvailable,
    stock: sizeItem.stock
  };
};

// Instance method to calculate price with options
productSchema.methods.calculatePrice = function(options = {}) {
  let totalPrice = this.price;
  
  // Add custom fit price
  if (options.customFit && this.customFitAvailable) {
    totalPrice += this.customFitPrice || 0;
  }
  
  // Add custom options prices
  if (options.selectedOptions && this.customOptions) {
    options.selectedOptions.forEach(optionSlug => {
      const option = this.customOptions.find(opt => opt.slug === optionSlug);
      if (option) {
        totalPrice += option.price || 0;
      }
    });
  }
  
  return totalPrice;
};

// Instance method to update stock
productSchema.methods.updateStock = async function(size, quantity, operation = 'subtract') {
  const sizeItem = this.inventory.find(item => item.size === size);
  if (!sizeItem) throw new Error(`Size ${size} not found`);
  
  if (operation === 'subtract') {
    if (sizeItem.stock < quantity) throw new Error('Insufficient stock');
    sizeItem.stock -= quantity;
  } else if (operation === 'add') {
    sizeItem.stock += quantity;
  } else if (operation === 'set') {
    sizeItem.stock = quantity;
  }
  
  await this.save();
  return sizeItem;
};

export default mongoose.models.Product || mongoose.model('Product', productSchema);
