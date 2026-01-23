import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // General Settings
  storeName: {
    type: String,
    default: 'HS Race Gear'
  },
  storeEmail: {
    type: String,
    default: 'info@hsracegear.com'
  },
  storePhone: {
    type: String,
    default: ''
  },
  storeAddress: {
    type: String,
    default: ''
  },

  // Currency and Localization
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'CAD'],
    default: 'USD'
  },
  timezone: {
    type: String,
    default: 'America/New_York'
  },

  // Tax and Shipping
  taxRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  shippingCost: {
    type: Number,
    default: 1000, // in cents
    min: 0
  },
  freeShippingThreshold: {
    type: Number,
    default: 10000, // in cents
    min: 0
  },

  // Pagination
  ordersPerPage: {
    type: Number,
    default: 10,
    min: 1
  },
  productsPerPage: {
    type: Number,
    default: 12,
    min: 1
  },

  // Maintenance Mode
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maintenanceMessage: {
    type: String,
    default: 'We are currently under maintenance. Please check back soon!'
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
settingsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
