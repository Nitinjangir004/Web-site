const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['sweet-tangy', 'tangy-spicy', 'sweet', 'spicy-sweet', 'variety-pack', 'combo']
  },
  flavor: {
    type: String,
    required: true
  },
  nostalgiaLevel: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  ingredients: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  dietaryInfo: {
    type: String,
    required: true
  },
  stockStatus: {
    type: String,
    required: true,
    enum: ['In Stock', 'Out of Stock', 'Limited Stock'],
    default: 'In Stock'
  },
  featured: {
    type: Boolean,
    default: false
  },
  isTrialPack: {
    type: Boolean,
    default: false
  },
  isCombo: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true
  },
  additionalImages: [{
    type: String
  }]
}, {
  timestamps: true
});

// Create indexes for better performance
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ stockStatus: 1 });

module.exports = mongoose.model('Product', ProductSchema); 