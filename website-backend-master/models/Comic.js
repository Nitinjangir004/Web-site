const mongoose = require('mongoose');

const ComicSchema = new mongoose.Schema({
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
  characters: {
    type: String,
    required: true
  },
  themes: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: true,
    enum: [
      'Emotional + Uplifting',
      'Humorous + Lighthearted', 
      'Magical + Reflective',
      'Heartwarming + Playful',
      'Exciting + Adventurous',
      'Funny + Insightful'
    ]
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
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['comic'],
    default: 'comic'
  },
  featured: {
    type: Boolean,
    default: false
  },
  comicOfMonth: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Pre-save middleware to ensure only one comic can be "Comic of the Month"
ComicSchema.pre('save', async function(next) {
  if (this.comicOfMonth && this.isModified('comicOfMonth')) {
    // If this comic is being set as comic of the month, unset all others
    await mongoose.model('Comic').updateMany(
      { _id: { $ne: this._id } },
      { comicOfMonth: false }
    );
  }
  next();
});

// Create indexes for better performance
ComicSchema.index({ featured: 1 });
ComicSchema.index({ comicOfMonth: 1 });
ComicSchema.index({ mood: 1 });
ComicSchema.index({ age: 1 });
ComicSchema.index({ type: 1 });
ComicSchema.index({ location: 1 });

module.exports = mongoose.model('Comic', ComicSchema); 