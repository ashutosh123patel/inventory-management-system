const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true
    },

    description: {
      type: String,
      trim: true,
      default: ''
    },

    sku: {
      type: String,
      unique: true
    },

    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },

    price: {
      type: Number,
      required: [true, 'Please provide price'],
      min: [0, 'Price cannot be negative'],
      set: v => Math.round(v * 100) / 100
    },

    category: {
      type: String,
      default: 'General'
    },

    supplier: {
      type: String,
      trim: true,
      default: ''
    },

    lowStockThreshold: {
      type: Number,
      default: 10
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);


//  SAFER SKU GENERATION (NO next() ERROR)
ProductSchema.pre('save', function () {
  if (!this.sku) {
    this.sku = 'SKU-' + Date.now();
  }
});


//  VIRTUAL
ProductSchema.virtual('isLowStock').get(function () {
  return this.quantity <= this.lowStockThreshold;
});


//ETTINGS
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });


//INDEXES
ProductSchema.index({ name: 1 });
ProductSchema.index({ category: 1 });


module.exports = mongoose.model('Product', ProductSchema);