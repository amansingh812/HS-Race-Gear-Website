import mongoose from 'mongoose';

/**
 * Shipping Address Schema
 */
const shippingAddressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: String,
  address1: { type: String, required: true },
  address2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: 'United States' },
  phone: { type: String, required: true },
  email: { type: String, required: true }
}, { _id: false });

/**
 * Order Item Schema - Snapshot of product at purchase time
 */
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  productSnapshot: {
    name: { type: String, required: true },
    slug: String,
    price: { type: Number, required: true },
    image: String,
    certification: String,
    material: String,
    sku: String
  },
  size: { type: String, required: true },
  isCustomFit: { type: Boolean, default: false },
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
  selectedOptions: [{
    slug: String,
    name: String,
    price: Number
  }],
  quantity: { type: Number, required: true, min: 1 },
  basePrice: { type: Number, required: true },
  customFitPrice: { type: Number, default: 0 },
  optionsPrice: { type: Number, default: 0 },
  itemTotal: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  trackingNumber: String,
  shippedAt: Date,
  deliveredAt: Date
}, { _id: true });

/**
 * Status History Schema
 */
const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  note: String,
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

/**
 * Order Schema
 */
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,  // Not required for guest checkout
    index: true
  },
  isGuest: {
    type: Boolean,
    default: false,
    index: true
  },
  guestEmail: {
    type: String,
    index: true
  },
  customer: {
    name: String,
    email: String,
    phone: String
  },
  items: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  billingAddress: shippingAddressSchema,
  sameAsBilling: { type: Boolean, default: true },
  
  // Totals in cents
  subtotal: { type: Number, required: true },
  discount: {
    code: String,
    type: { type: String, enum: ['percentage', 'fixed'] },
    value: Number,
    amount: Number
  },
  shippingCost: { type: Number, default: 0 },
  shippingMethod: {
    name: String,
    carrier: String,
    estimatedDays: String
  },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  
  // Payment
  payment: {
    method: {
      type: String,
      enum: ['card', 'paypal', 'bank_transfer', 'cod', 'other'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'authorized', 'captured', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    last4: String,
    brand: String,
    paidAt: Date
  },
  
  // Order status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'on_hold'],
    default: 'pending',
    index: true
  },
  statusHistory: [statusHistorySchema],
  
  // Tracking
  trackingNumber: String,
  carrier: String,
  shippedAt: Date,
  deliveredAt: Date,
  estimatedDelivery: { from: Date, to: Date },
  
  // Custom fit
  hasCustomFit: { type: Boolean, default: false },
  customFitLeadTime: String,
  
  // Notes
  customerNotes: String,
  internalNotes: String,
  isGift: Boolean,
  giftMessage: String,
  
  // Timestamps
  placedAt: { type: Date, default: Date.now },
  confirmedAt: Date,
  completedAt: Date,
  cancelledAt: Date
}, { timestamps: true });

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.orderNumber = `HS-${dateStr}-${random}`;
  }
  
  this.hasCustomFit = this.items.some(item => item.isCustomFit);
  
  if (this.isModified('status')) {
    this.statusHistory.push({ status: this.status, updatedAt: new Date() });
    
    switch (this.status) {
      case 'confirmed': this.confirmedAt = new Date(); break;
      case 'shipped': this.shippedAt = new Date(); break;
      case 'delivered': this.deliveredAt = new Date(); this.completedAt = new Date(); break;
      case 'cancelled': this.cancelledAt = new Date(); break;
    }
  }
  next();
});

// Virtual: Item count
orderSchema.virtual('itemCount').get(function() {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Static: Create from cart
orderSchema.statics.createFromCart = async function(cart, orderData) {
  const { shippingAddress, billingAddress, sameAsBilling, shippingMethod, payment, customerNotes, isGift, giftMessage, isGuest = false } = orderData;
  
  if (!cart.items || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }
  
  let user = null;
  let customerInfo = {};
  
  if (isGuest) {
    // Guest checkout - use shipping address info
    customerInfo = {
      name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
      email: shippingAddress.email,
      phone: shippingAddress.phone
    };
  } else {
    // Authenticated user checkout
    const User = mongoose.model('User');
    user = await User.findById(cart.user);
    if (!user) throw new Error('User not found');
    customerInfo = { name: user.name, email: user.email, phone: user.phone };
  }
  
  const orderItems = cart.items.map(item => ({
    product: item.product._id || item.product,
    productSnapshot: item.productSnapshot,
    size: item.size,
    isCustomFit: item.isCustomFit,
    measurements: item.measurements,
    selectedOptions: item.selectedOptions,
    quantity: item.quantity,
    basePrice: item.basePrice,
    customFitPrice: item.customFitPrice,
    optionsPrice: item.optionsPrice,
    itemTotal: item.itemTotal
  }));
  
  // Calculate totals
  const subtotal = cart.subtotal || orderItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const shippingCost = shippingMethod?.cost || 0;
  const taxRate = 0.0825; // 8.25% default tax rate
  const tax = cart.taxEstimate || Math.round(subtotal * taxRate);
  const total = subtotal + shippingCost + tax;
  
  const order = await this.create({
    user: isGuest ? null : cart.user,
    isGuest,
    guestEmail: isGuest ? shippingAddress.email : null,
    customer: customerInfo,
    items: orderItems,
    shippingAddress,
    billingAddress: sameAsBilling ? shippingAddress : billingAddress,
    sameAsBilling,
    subtotal,
    discount: cart.discount,
    shippingCost,
    shippingMethod: { name: shippingMethod?.name || 'Standard Shipping', carrier: shippingMethod?.carrier, estimatedDays: shippingMethod?.estimatedDays },
    tax,
    total,
    payment,
    status: payment?.status === 'captured' ? 'confirmed' : 'pending',
    customerNotes,
    isGift,
    giftMessage,
    customFitLeadTime: orderItems.some(item => item.isCustomFit) ? '3-4 weeks' : null
  });
  
  return order;
};

// Instance: Update status
orderSchema.methods.updateStatus = async function(newStatus, note, updatedBy) {
  this.status = newStatus;
  if (note || updatedBy) {
    const lastHistory = this.statusHistory[this.statusHistory.length - 1];
    if (lastHistory) {
      lastHistory.note = note;
      lastHistory.updatedBy = updatedBy;
    }
  }
  return this.save();
};

// Instance: Add tracking
orderSchema.methods.addTracking = async function(trackingNumber, carrier) {
  this.trackingNumber = trackingNumber;
  this.carrier = carrier;
  if (this.status === 'processing') this.status = 'shipped';
  return this.save();
};

// Instance: Cancel order
orderSchema.methods.cancelOrder = async function(reason, cancelledBy) {
  if (['delivered', 'refunded'].includes(this.status)) {
    throw new Error('Cannot cancel order in current status');
  }
  this.status = 'cancelled';
  return this.save();
};

// Instance: Serialize for client
orderSchema.methods.toClientJSON = function() {
  return {
    _id: this._id.toString(),
    orderNumber: this.orderNumber,
    customer: this.customer,
    isGuest: this.isGuest,
    items: this.items.map(item => ({
      _id: item._id.toString(),
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
      status: item.status
    })),
    shippingAddress: this.shippingAddress,
    billingAddress: this.billingAddress,
    sameAsBilling: this.sameAsBilling,
    // Legacy fields (keep for backward compatibility)
    subtotal: this.subtotal,
    discount: this.discount,
    shippingCost: this.shippingCost,
    shippingMethod: this.shippingMethod,
    tax: this.tax,
    total: this.total,
    // New totals object for frontend components
    totals: {
      subtotal: this.subtotal,
      shipping: this.shippingCost,
      tax: this.tax,
      discount: this.discount?.amount || 0,
      grandTotal: this.total
    },
    currency: this.currency,
    payment: this.payment,
    status: this.status,
    statusHistory: this.statusHistory,
    trackingNumber: this.trackingNumber,
    carrier: this.carrier,
    estimatedDelivery: this.estimatedDelivery,
    hasCustomFit: this.hasCustomFit,
    customFitLeadTime: this.customFitLeadTime,
    customerNotes: this.customerNotes,
    isGift: this.isGift,
    placedAt: this.placedAt,
    createdAt: this.createdAt,
    confirmedAt: this.confirmedAt,
    shippedAt: this.shippedAt,
    deliveredAt: this.deliveredAt,
    itemCount: this.itemCount
  };
};

// Static: Get orders for user
orderSchema.statics.getOrdersForUser = async function(userId, options = {}) {
  const { page = 1, limit = 10, status } = options;
  const query = { user: userId };
  if (status) query.status = status;
  
  const orders = await this.find(query).sort({ placedAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
  const total = await this.countDocuments(query);
  
  return {
    orders: orders.map(order => ({
      ...order,
      _id: order._id.toString(),
      user: order.user.toString(),
      items: order.items.map(item => ({ ...item, _id: item._id.toString(), product: item.product?.toString() }))
    })),
    pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalOrders: total, hasNext: page * limit < total, hasPrev: page > 1 }
  };
};

// Static: Get all orders (for admin)
orderSchema.statics.getAllOrders = async function(options = {}) {
  const { page = 1, limit = 10, status, search, sortBy = 'placedAt', sortOrder = 'desc' } = options;
  const query = {};
  
  // Filter by status
  if (status && status !== 'all') {
    query.status = status;
  }
  
  // Search by order number or customer name/email
  if (search) {
    query.$or = [
      { orderNumber: { $regex: search, $options: 'i' } },
      { 'shippingAddress.firstName': { $regex: search, $options: 'i' } },
      { 'shippingAddress.lastName': { $regex: search, $options: 'i' } },
      { 'shippingAddress.email': { $regex: search, $options: 'i' } }
    ];
  }
  
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
  
  const orders = await this.find(query)
    .populate('user', 'name email')
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  
  const total = await this.countDocuments(query);
  
  // Get status counts for filtering
  const statusCounts = await this.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  
  const statusCountMap = statusCounts.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});
  
  return {
    orders: orders.map(order => ({
      ...order,
      _id: order._id.toString(),
      user: order.user ? {
        _id: order.user._id.toString(),
        name: order.user.name,
        email: order.user.email
      } : null,
      items: order.items.map(item => ({ 
        ...item, 
        _id: item._id.toString(), 
        product: item.product?.toString() 
      }))
    })),
    pagination: { 
      currentPage: page, 
      totalPages: Math.ceil(total / limit), 
      totalOrders: total, 
      hasNext: page * limit < total, 
      hasPrev: page > 1 
    },
    statusCounts: statusCountMap
  };
};

orderSchema.index({ user: 1, placedAt: -1 });
orderSchema.index({ status: 1, placedAt: -1 });
orderSchema.index({ orderNumber: 1 });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);