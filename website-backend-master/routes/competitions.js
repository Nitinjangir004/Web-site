const express = require('express');
const router = express.Router();
const Competition = require('../models/Competition');
const CompetitionRegistration = require('../models/CompetitionRegistration');

// GET /api/competitions - Get all competitions with optional filtering
router.get('/', async (req, res) => {
  try {
    const {
      featured,
      status,
      search,
      page = 1,
      limit = 10,
      sort = 'id'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { longDescription: { $regex: search, $options: 'i' } },
        { prize: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get competitions with pagination and sorting
    const competitions = await Competition.find(filter)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Competition.countDocuments(filter);

    res.json({
      success: true,
      data: competitions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalCompetitions: total,
        hasNextPage: skip + competitions.length < total,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching competitions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching competitions',
      error: error.message
    });
  }
});

// GET /api/competitions/featured - Get featured competitions
router.get('/featured', async (req, res) => {
  try {
    const competitions = await Competition.find({ featured: true }).sort({ id: 1 });
    res.json({
      success: true,
      data: competitions,
      count: competitions.length
    });
  } catch (error) {
    console.error('Error fetching featured competitions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured competitions',
      error: error.message
    });
  }
});

// GET /api/competitions/statuses - Get available statuses
router.get('/statuses', async (req, res) => {
  try {
    const statuses = await Competition.distinct('status');
    res.json({
      success: true,
      data: statuses.sort()
    });
  } catch (error) {
    console.error('Error fetching statuses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statuses',
      error: error.message
    });
  }
});

// GET /api/competitions/active - Get active competitions
router.get('/active', async (req, res) => {
  try {
    const competitions = await Competition.find({ status: 'active' }).sort({ id: 1 });
    res.json({
      success: true,
      data: competitions,
      count: competitions.length
    });
  } catch (error) {
    console.error('Error fetching active competitions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active competitions',
      error: error.message
    });
  }
});

// GET /api/competitions/upcoming - Get upcoming competitions
router.get('/upcoming', async (req, res) => {
  try {
    const competitions = await Competition.find({ status: 'upcoming' }).sort({ startDate: 1 });
    res.json({
      success: true,
      data: competitions,
      count: competitions.length
    });
  } catch (error) {
    console.error('Error fetching upcoming competitions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming competitions',
      error: error.message
    });
  }
});

// GET /api/competitions/by-status/:status - Get competitions by status
router.get('/by-status/:status', async (req, res) => {
  try {
    const status = req.params.status;
    const competitions = await Competition.find({ status }).sort({ id: 1 });
    
    res.json({
      success: true,
      data: competitions,
      count: competitions.length,
      status: status
    });
  } catch (error) {
    console.error('Error fetching competitions by status:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching competitions by status',
      error: error.message
    });
  }
});

// GET /api/competitions/:id - Get competition by ID
router.get('/:id', async (req, res) => {
  try {
    const competition = await Competition.findOne({ id: parseInt(req.params.id) });
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      });
    }
    res.json({
      success: true,
      data: competition
    });
  } catch (error) {
    console.error('Error fetching competition:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching competition',
      error: error.message
    });
  }
});

// GET /api/competitions/slug/:slug - Get competition by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const competition = await Competition.findOne({ slug: req.params.slug });
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      });
    }
    res.json({
      success: true,
      data: competition
    });
  } catch (error) {
    console.error('Error fetching competition by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching competition',
      error: error.message
    });
  }
});

// POST /api/competitions - Create new competition
router.post('/', async (req, res) => {
  try {
    const competition = new Competition(req.body);
    await competition.save();
    res.status(201).json({
      success: true,
      data: competition,
      message: 'Competition created successfully'
    });
  } catch (error) {
    console.error('Error creating competition:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating competition',
      error: error.message
    });
  }
});

// PUT /api/competitions/:id - Update competition
router.put('/:id', async (req, res) => {
  try {
    const competition = await Competition.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      });
    }
    
    res.json({
      success: true,
      data: competition,
      message: 'Competition updated successfully'
    });
  } catch (error) {
    console.error('Error updating competition:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating competition',
      error: error.message
    });
  }
});

// PATCH /api/competitions/:id - Partially update competition
router.patch('/:id', async (req, res) => {
  try {
    const competition = await Competition.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      });
    }
    
    res.json({
      success: true,
      data: competition,
      message: 'Competition updated successfully'
    });
  } catch (error) {
    console.error('Error updating competition:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating competition',
      error: error.message
    });
  }
});

// PATCH /api/competitions/:id/featured - Toggle featured status
router.patch('/:id/featured', async (req, res) => {
  try {
    const competition = await Competition.findOne({ id: parseInt(req.params.id) });
    
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      });
    }
    
    competition.featured = !competition.featured;
    await competition.save();
    
    res.json({
      success: true,
      data: competition,
      message: `Competition ${competition.featured ? 'featured' : 'unfeatured'} successfully`
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(400).json({
      success: false,
      message: 'Error toggling featured status',
      error: error.message
    });
  }
});

// PATCH /api/competitions/:id/participants - Update participant count
router.patch('/:id/participants', async (req, res) => {
  try {
    const { participants } = req.body;
    
    if (typeof participants !== 'number' || participants < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid participant count'
      });
    }
    
    const competition = await Competition.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { participants },
      { new: true, runValidators: true }
    );
    
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      });
    }
    
    res.json({
      success: true,
      data: competition,
      message: 'Participant count updated successfully'
    });
  } catch (error) {
    console.error('Error updating participant count:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating participant count',
      error: error.message
    });
  }
});

// DELETE /api/competitions/:id - Delete competition
router.delete('/:id', async (req, res) => {
  try {
    const competition = await Competition.findOneAndDelete({ id: parseInt(req.params.id) });
    
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Competition deleted successfully',
      data: competition
    });
  } catch (error) {
    console.error('Error deleting competition:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting competition',
      error: error.message
    });
  }
});

// POST /api/competitions/:id/register - Register for a competition
router.post('/:id/register', async (req, res) => {
  try {
    const competitionId = req.params.id;
    const { competitionTitle, registrationData, metadata } = req.body;

    // Validate required fields
    if (!competitionTitle || !registrationData) {
      return res.status(400).json({
        success: false,
        message: 'Competition title and registration data are required'
      });
    }

    // Validate required registration data fields
    const { teamName, teamLeaderName, email, mobile, collegeName, acceptTerms, teamMembers } = registrationData;
    
    if (!teamName || !teamLeaderName || !email || !mobile || !collegeName || acceptTerms !== true) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided and terms must be accepted'
      });
    }

    // Validate team members array (minimum 2 members including team leader)
    if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'At least 2 team members are required (including team leader)'
      });
    }

    // Validate maximum 6 team members
    if (teamMembers.length > 6) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 6 team members allowed'
      });
    }

    // Check if competition exists
    const competition = await Competition.findOne({ id: parseInt(competitionId) });
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      });
    }

    // Check if competition is active or upcoming
    if (competition.status !== 'active' && competition.status !== 'upcoming') {
      return res.status(400).json({
        success: false,
        message: 'Registration is only allowed for active or upcoming competitions'
      });
    }

    // Get client IP address
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
                     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // Create registration object
    const registrationObj = {
      competitionId,
      competitionTitle,
      registrationData: {
        teamName: teamName.trim(),
        teamLeaderName: teamLeaderName.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        teamMembers: teamMembers
      .filter(member => member && member.name?.trim()) // ensure member has name
      .map(member => ({
        name: member.name.trim(),
        email: member.email?.trim().toLowerCase() || null,
        mobile: member.mobile?.trim() || null
      })),
        collegeName: collegeName.trim(),
        acceptTerms
      },
      metadata: {
        registrationTimestamp: metadata?.registrationTimestamp ? new Date(metadata.registrationTimestamp) : new Date(),
        userAgent: metadata?.userAgent || req.get('User-Agent'),
        ipAddress: metadata?.ipAddress || ipAddress
      }
    };

    // Create new registration
    const registration = new CompetitionRegistration(registrationObj);
    await registration.save();

    // Increment participant count in competition
    await Competition.findOneAndUpdate(
      { id: parseInt(competitionId) },
      { $inc: { participants: 1 } }
    );

    res.status(201).json({
      success: true,
      data: {
        registrationId: registration._id,
        competitionId,
        competitionTitle,
        teamName: registration.registrationData.teamName,
        teamLeaderName: registration.registrationData.teamLeaderName,
        email: registration.registrationData.email,
        registrationTimestamp: registration.metadata.registrationTimestamp
      },
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Error creating competition registration:', error);
    
    // Handle duplicate registration errors
    if (error.code === 11000) {
      const duplicateField = error.message.includes('teamName') ? 'team name' : 'email';
      return res.status(409).json({
        success: false,
        message: `A registration with this ${duplicateField} already exists for this competition`
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating registration',
      error: error.message
    });
  }
});

// GET /api/competitions/:id/registrations - Get all registrations for a competition
router.get('/:id/registrations', async (req, res) => {
  try {
    const competitionId = req.params.id;
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get registrations with pagination
    const registrations = await CompetitionRegistration.find({ competitionId })
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v'); // Exclude version field

    // Get total count for pagination
    const total = await CompetitionRegistration.countDocuments({ competitionId });

    res.json({
      success: true,
      data: registrations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalRegistrations: total,
        hasNextPage: skip + registrations.length < total,
        hasPrevPage: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Error fetching competition registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
});

// GET /api/competitions/:id/registrations/:registrationId - Get specific registration
router.get('/:id/registrations/:registrationId', async (req, res) => {
  try {
    const { id: competitionId, registrationId } = req.params;

    const registration = await CompetitionRegistration.findOne({
      _id: registrationId,
      competitionId
    }).select('-__v');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      data: registration
    });

  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registration',
      error: error.message
    });
  }
});

module.exports = router; 