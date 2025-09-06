const mongoose = require('mongoose');

const CompetitionRegistrationSchema = new mongoose.Schema({
  competitionId: {
    type: String,
    required: true,
    trim: true
  },
  competitionTitle: {
    type: String,
    required: true,
    trim: true
  },
  registrationData: {
    teamName: {
      type: String,
      required: true,
      trim: true
    },
    teamLeaderName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    teamMembers: [{
      type: String,
      trim: true
    }],
    collegeName: {
      type: String,
      required: true,
      trim: true
    },
    acceptTerms: {
      type: Boolean,
      required: true,
      validate: {
        validator: function(v) {
          return v === true;
        },
        message: 'Terms and conditions must be accepted'
      }
    }
  },
  metadata: {
    registrationTimestamp: {
      type: Date,
      default: Date.now
    },
    userAgent: {
      type: String,
      trim: true
    },
    ipAddress: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
CompetitionRegistrationSchema.index({ competitionId: 1 });
CompetitionRegistrationSchema.index({ 'registrationData.email': 1 });
CompetitionRegistrationSchema.index({ 'registrationData.teamName': 1 });
CompetitionRegistrationSchema.index({ 'metadata.registrationTimestamp': 1 });

// Compound index to ensure unique team registration per competition
CompetitionRegistrationSchema.index({ 
  competitionId: 1, 
  'registrationData.teamName': 1 
}, { unique: true });

// Compound index to ensure unique email registration per competition
CompetitionRegistrationSchema.index({ 
  competitionId: 1, 
  'registrationData.email': 1 
}, { unique: true });

module.exports = mongoose.model('CompetitionRegistration', CompetitionRegistrationSchema); 