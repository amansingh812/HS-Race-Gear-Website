import mongoose from 'mongoose';

/**
 * Cart Item Schema
 * Individual item in the cart with product reference and options
 */
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  
  // Product snapshot (for display even if product changes)
  productSnapshot: {
    name: String,
    slug: String,
    price: Number,
    image: String,
    certification: String
  },
  
  // Selected options
  size: {
    type: String,
    required: true
  },
  
  isCustomFit: {
    type: Boolean,
    default: false
  },
  
  // Custom Gear measurements (if applicable)
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    inseam: Number,
    armLength: Number,
    shoulderWidth: Number,
    height: Number,
    weight: Number
  },
  
  // Selected add-on options
  selectedOptions: [{
    slug: String,
    name: String,
    price: Number
  }],
  
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  
  // Calculated prices (in cents)
  basePrice: {
    type: Number,
    required: true
  },
  
  customFitPrice: {
    type: Number,
    default: 0
  },
  
  optionsPrice: {
    type: Number,
    default: 0
  },
  
  itemTotal: {
    type: Number,
    required: true
  },
  
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

/**
 * Cart Schema
 * Shopping cart for authenticated users
 */
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  
  items: [cartItemSchema],
  
  // Cart totals (in cents)
  subtotal: {
    type: Number,
    default: 0
  },
  
  // Applied discount/coupon
  discount: {
    code: String,
    type: {
      type: String,
      enum: ['percentage', 'fixed']
    },
    value: Number,
    amount: Number // Calculated discount amount
  },
  
  // Shipping estimate
  shippingEstimate: {
    type: Number,
    default: 0
  },
  
  // Tax estimate
  taxEstimate: {
    type: Number,
    default: 0
  },
  
  // Final total
  total: {
    type: Number,
    default: 0
  },
  
  // Cart metadata
  itemCount: {
    type: Number,
    default: 0
  },
  
  // Session ID for guest carts (future enhancement)
  sessionId: {
    type: String,
    sparse: true
  },
  
  // Last activity timestamp
  lastActivity: {
    type: Date,
    default: Date.now
  },
  
  // Notes
  notes: String
  
}, { timestamps: true });

/**
 * Calculate cart totals before saving
 */
cartSchema.pre('save', function(next) {
  // Calculate item count
  this.itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.itemTotal, 0);
  
  // Calculate discount if applied
  if (this.discount && this.discount.code) {
    if (this.discount.type === 'percentage') {
      this.discount.amount = Math.round(this.subtotal * (this.discount.value / 100));
    } else {
      this.discount.amount = this.discount.value;
    }
  } else {
    this.discount = undefined;
  }
  
  // Calculate total
  const discountAmount = this.discount?.amount || 0;
  this.total = this.subtotal - discountAmount + this.shippingEstimate + this.taxEstimate;
  
  // Update last activity
  this.lastActivity = new Date();
  
  next();
});

/**
 * Add item to cart
 * @param {Object} itemData - Item data including product, size, options
 */
cartSchema.methods.addItem = async function(itemData) {
  const {
    product,
    productSnapshot,
    size,
    isCustomFit,
    measurements,
    selectedOptions,
    quantity,
    basePrice,
    customFitPrice,
    optionsPrice
  } = itemData;
  
  // Calculate item total
  const itemTotal = (basePrice + customFitPrice + optionsPrice) * quantity;
  
  // Check if same item exists (same product, size, customFit, and options)
  const existingItemIndex = this.items.findIndex(item => 
    item.product.toString() === product.toString() &&
    item.size === size &&
    item.isCustomFit === isCustomFit &&
    JSON.stringify(item.selectedOptions.map(o => o.slug).sort()) === 
    JSON.stringify((selectedOptions || []).map(o => o.slug).sort())
  );
  
  if (existingItemIndex > -1 && !isCustomFit) {
    // Update existing item quantity (not for custom fit - each is unique)
    this.items[existingItemIndex].quantity += quantity;
    this.items[existingItemIndex].itemTotal = 
      (this.items[existingItemIndex].basePrice + 
       this.items[existingItemIndex].customFitPrice + 
       this.items[existingItemIndex].optionsPrice) * 
      this.items[existingItemIndex].quantity;
  } else {
    // Add new item
    this.items.push({
      product,
      productSnapshot,
      size,
      isCustomFit,
      measurements: isCustomFit ? measurements : undefined,
      selectedOptions: selectedOptions || [],
      quantity,
      basePrice,
      customFitPrice: isCustomFit ? customFitPrice : 0,
      optionsPrice,
      itemTotal
    });
  }
  
  return this.save();
};

/**
 * Update item quantity
 * @param {String} itemId - Cart item ID
 * @param {Number} quantity - New quantity
 */
cartSchema.methods.updateItemQuantity = async function(itemId, quantity) {
  const item = this.items.id(itemId);
  
  if (!item) {
    throw new Error('Item not found in cart');
  }
  
  if (quantity <= 0) {
    // Remove item
    this.items.pull(itemId);
  } else {
    item.quantity = quantity;
    item.itemTotal = (item.basePrice + item.customFitPrice + item.optionsPrice) * quantity;
  }
  
  return this.save();
};

/**
 * Remove item from cart
 * @param {String} itemId - Cart item ID
 */
cartSchema.methods.removeItem = async function(itemId) {
  this.items.pull(itemId);
  return this.save();
};

/**
 * Clear all items from cart
 */
cartSchema.methods.clearCart = async function() {
  this.items = [];
  this.discount = undefined;
  return this.save();
};

/**
 * Apply discount code
 * @param {String} code - Discount code
 * @param {String} type - 'percentage' or 'fixed'
 * @param {Number} value - Discount value
 */
cartSchema.methods.applyDiscount = async function(code, type, value) {
  this.discount = {
    code,
    type,
    value
  };
  return this.save();
};

/**
 * Remove discount
 */
cartSchema.methods.removeDiscount = async function() {
  this.discount = undefined;
  return this.save();
};

/**
 * Static method to get or create cart for user
 */
cartSchema.statics.getOrCreateCart = async function(userId) {
  let cart = await this.findOne({ user: userId })
    .populate('items.product', 'name slug price images inventory status');
  
  if (!cart) {
    cart = await this.create({ user: userId, items: [] });
  }
  
  return cart;
};

/**
 * Serialize cart for client
 */
cartSchema.methods.toClientJSON = function() {
  return {
    _id: this._id.toString(),
    items: this.items.map(item => ({
      _id: item._id.toString(),
      product: item.product?._id?.toString() || item.product?.toString(),
      productSnapshot: item.productSnapshot,
      size: item.size,
      isCustomFit: item.isCustomFit,
      measurements: item.measurements,
      selectedOptions: item.selectedOptions,
      quantity: item.quantity,
      basePrice: item.basePrice,
      customFitPrice: item.customFitPrice,
      optionsPrice: item.optionsPrice,
      itemTotal: item.itemTotal,
      addedAt: item.addedAt
    })),
    subtotal: this.subtotal,
    discount: this.discount,
    shippingEstimate: this.shippingEstimate,
    taxEstimate: this.taxEstimate,
    total: this.total,
    itemCount: this.itemCount,
    lastActivity: this.lastActivity
  };
};

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
