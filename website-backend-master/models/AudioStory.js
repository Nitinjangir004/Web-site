const mongoose = require('mongoose');

const AudioStorySchema = new mongoose.Schema({
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
  subtitle: {
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
  duration: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d+:\d{2}$/.test(v); // Validates format like "12:45", "15:20", etc.
      },
      message: 'Duration must be in format like "12:45", "15:20", etc.'
    }
  },
  narrator: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d+\+$/.test(v); // Validates format like "8+", "6+", etc.
      },
      message: 'Age must be in format like "8+", "6+", etc.'
    }
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  audioUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create indexes for better performance
AudioStorySchema.index({ featured: 1 });
AudioStorySchema.index({ narrator: 1 });
AudioStorySchema.index({ age: 1 });
AudioStorySchema.index({ duration: 1 });

module.exports = mongoose.model('AudioStory', AudioStorySchema); 