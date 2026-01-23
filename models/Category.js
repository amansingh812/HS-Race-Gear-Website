import mongoose from 'mongoose';

/**
 * Category Schema for HS Race Gear
 * 
 * Supports:
 * - Main categories: Racing Suits, Gloves, Accessories
 * - Subcategories: SFI-1, FIA Level 2, Kids, Karting
 * - Hierarchical structure (parent/child)
 * - SEO fields
 * - Filtering metadata
 */

const categorySchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters']
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
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  // Hierarchy
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  level: {
    type: Number,
    default: 0 // 0 = main category, 1 = subcategory, 2 = sub-subcategory
  },
  
  // Display
  image: {
    url: String,
    alt: String
  },
  icon: String,
  color: String,
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Ordering
  order: {
    type: Number,
    default: 0
  },
  
  // Filter metadata (for frontend filtering)
  filterOptions: {
    materials: [{
      type: String
    }],
    certifications: [{
      type: String
    }],
    sizeRange: {
      min: String,
      max: String
    }
  },
  
  // SEO
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  
  // Analytics
  productCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ isActive: 1, isVisible: 1 });
categorySchema.index({ order: 1 });
categorySchema.index({ level: 1 });

// Virtual for children categories
categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Virtual for products in this category
categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category'
});

// Pre-save hook to generate slug
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Set level based on parent
  if (!this.parent) {
    this.level = 0;
  }
  
  next();
});

// Pre-save hook to update level based on parent
categorySchema.pre('save', async function(next) {
  if (this.parent && this.isModified('parent')) {
    const parentCategory = await mongoose.model('Category').findById(this.parent);
    if (parentCategory) {
      this.level = parentCategory.level + 1;
    }
  }
  next();
});

// Static method to get category tree
categorySchema.statics.getCategoryTree = async function() {
  const categories = await this.find({ isActive: true, isVisible: true })
    .sort({ order: 1, name: 1 })
    .lean();
  
  // Build tree structure
  const categoryMap = {};
  const tree = [];
  
  // First pass: create map
  categories.forEach(cat => {
    categoryMap[cat._id.toString()] = { ...cat, children: [] };
  });
  
  // Second pass: build tree
  categories.forEach(cat => {
    if (cat.parent) {
      const parent = categoryMap[cat.parent.toString()];
      if (parent) {
        parent.children.push(categoryMap[cat._id.toString()]);
      }
    } else {
      tree.push(categoryMap[cat._id.toString()]);
    }
  });
  
  return tree;
};

// Static method to find main categories
categorySchema.statics.findMainCategories = function() {
  return this.find({ 
    parent: null, 
    isActive: true, 
    isVisible: true 
  }).sort({ order: 1 });
};

// Static method to find subcategories
categorySchema.statics.findSubcategories = function(parentId) {
  return this.find({ 
    parent: parentId, 
    isActive: true, 
    isVisible: true 
  }).sort({ order: 1 });
};

// Instance method to get all parent categories (breadcrumb)
categorySchema.methods.getBreadcrumb = async function() {
  const breadcrumb = [this];
  let current = this;
  
  while (current.parent) {
    const parent = await mongoose.model('Category').findById(current.parent);
    if (parent) {
      breadcrumb.unshift(parent);
      current = parent;
    } else {
      break;
    }
  }
  
  return breadcrumb;
};

// Instance method to update product count
categorySchema.methods.updateProductCount = async function() {
  const Product = mongoose.model('Product');
  const count = await Product.countDocuments({ 
    category: this._id, 
    status: 'active' 
  });
  this.productCount = count;
  await this.save();
  return count;
};

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
