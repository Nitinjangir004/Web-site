const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    trim: true
  },
  event: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

const judgingCriteriaSchema = new mongoose.Schema({
  criterion: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

const CompetitionSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
    trim: true
  },
  longDescription: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: String,
    required: true,
    trim: true
  },
  endDate: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'upcoming', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  participants: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  prize: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  rules: [{
    type: String,
    required: true,
    trim: true
  }],
  timeline: [timelineSchema],
  judgingCriteria: [judgingCriteriaSchema]
}, {
  timestamps: true
});

// Index for better performance
CompetitionSchema.index({ status: 1 });
CompetitionSchema.index({ featured: 1 });
CompetitionSchema.index({ startDate: 1 });
CompetitionSchema.index({ endDate: 1 });

module.exports = mongoose.model('Competition', CompetitionSchema); 