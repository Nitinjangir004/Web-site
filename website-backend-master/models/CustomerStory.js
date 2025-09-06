const mongoose = require('mongoose');

const CustomerStorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create indexes for better performance
CustomerStorySchema.index({ featured: 1 });
CustomerStorySchema.index({ author: 1 });
// Note: slug index is automatically created by unique: true constraint

module.exports = mongoose.model('CustomerStory', CustomerStorySchema); 