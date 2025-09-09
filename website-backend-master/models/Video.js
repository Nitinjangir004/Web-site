const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
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
        return /^\d+:\d{2}$/.test(v); // Validates format like "8:30", "15:45", etc.
      },
      message: 'Duration must be in format like "8:30", "15:45", etc.'
    }
  },
  presenter: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(\d+\+|All ages)$/.test(v); // Validates format like "8+", "10+", or "All ages"
      },
      message: 'Age must be in format like "8+", "10+", or "All ages"'
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
  videoUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create indexes for better performance
VideoSchema.index({ featured: 1 });
VideoSchema.index({ presenter: 1 });
VideoSchema.index({ age: 1 });
VideoSchema.index({ duration: 1 });

module.exports = mongoose.model('Video', VideoSchema); 