const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const AudioStory = require('../models/AudioStory');

// Helper function to check if file exists
const fileExists = (filePath) => {
    try {
        return fs.existsSync(filePath);
    } catch (error) {
        return false;
    }
};

// Route to serve audio story MP3 files
router.get('/audio/:storyFolder/:audioName', (req, res) => {
    try {
        const { storyFolder, audioName } = req.params;
        
        // Validate that it's an MP3 file
        if (!audioName.toLowerCase().endsWith('.mp3')) {
            return res.status(400).json({
                success: false,
                message: 'Invalid MP3 file'
            });
        }
        
        const audioPath = path.join(__dirname, '../assets/audio/', storyFolder, audioName);
        
        if (!fileExists(audioPath)) {
            return res.status(404).json({
                success: false,
                message: 'Audio file not found'
            });
        }

        // Set appropriate headers for MP3
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        res.setHeader('Accept-Ranges', 'bytes'); // Enable range requests for audio streaming
        res.setHeader('Content-Disposition', `inline; filename="${audioName}"`);
        res.sendFile(audioPath);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

// GET /api/audiostories - Get all audio stories with optional filtering
router.get('/', async (req, res) => {
  try {
    const {
      featured,
      narrator,
      age,
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
    
    if (narrator) {
      filter.narrator = { $regex: narrator, $options: 'i' };
    }
    
    if (age) {
      filter.age = age;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { narrator: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get audio stories with pagination and sorting
    const audioStories = await AudioStory.find(filter)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await AudioStory.countDocuments(filter);

    res.json({
      success: true,
      data: audioStories,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalAudioStories: total,
        hasNextPage: skip + audioStories.length < total,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching audio stories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching audio stories',
      error: error.message
    });
  }
});

// GET /api/audiostories/featured - Get featured audio stories
router.get('/featured', async (req, res) => {
  try {
    const audioStories = await AudioStory.find({ featured: true }).sort({ id: 1 });
    res.json({
      success: true,
      data: audioStories,
      count: audioStories.length
    });
  } catch (error) {
    console.error('Error fetching featured audio stories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured audio stories',
      error: error.message
    });
  }
});

// GET /api/audiostories/narrators - Get available narrators
router.get('/narrators', async (req, res) => {
  try {
    const narrators = await AudioStory.distinct('narrator');
    res.json({
      success: true,
      data: narrators.sort()
    });
  } catch (error) {
    console.error('Error fetching narrators:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching narrators',
      error: error.message
    });
  }
});

// GET /api/audiostories/ages - Get available age ranges
router.get('/ages', async (req, res) => {
  try {
    const ages = await AudioStory.distinct('age');
    res.json({
      success: true,
      data: ages.sort()
    });
  } catch (error) {
    console.error('Error fetching ages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ages',
      error: error.message
    });
  }
});

// GET /api/audiostories/by-narrator/:narrator - Get audio stories by narrator
router.get('/by-narrator/:narrator', async (req, res) => {
  try {
    const narrator = decodeURIComponent(req.params.narrator);
    const audioStories = await AudioStory.find({ 
      narrator: { $regex: narrator, $options: 'i' } 
    }).sort({ id: 1 });
    
    res.json({
      success: true,
      data: audioStories,
      count: audioStories.length,
      narrator: narrator
    });
  } catch (error) {
    console.error('Error fetching audio stories by narrator:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching audio stories by narrator',
      error: error.message
    });
  }
});

// GET /api/audiostories/:id - Get audio story by ID
router.get('/:id', async (req, res) => {
  try {
    const audioStory = await AudioStory.findOne({ id: parseInt(req.params.id) });
    if (!audioStory) {
      return res.status(404).json({
        success: false,
        message: 'Audio story not found'
      });
    }
    res.json({
      success: true,
      data: audioStory
    });
  } catch (error) {
    console.error('Error fetching audio story:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching audio story',
      error: error.message
    });
  }
});

// GET /api/audiostories/slug/:slug - Get audio story by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const audioStory = await AudioStory.findOne({ slug: req.params.slug });
    if (!audioStory) {
      return res.status(404).json({
        success: false,
        message: 'Audio story not found'
      });
    }
    res.json({
      success: true,
      data: audioStory
    });
  } catch (error) {
    console.error('Error fetching audio story by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching audio story',
      error: error.message
    });
  }
});

// POST /api/audiostories - Create new audio story
router.post('/', async (req, res) => {
  try {
    const audioStory = new AudioStory(req.body);
    const savedAudioStory = await audioStory.save();
    res.status(201).json({
      success: true,
      data: savedAudioStory,
      message: 'Audio story created successfully'
    });
  } catch (error) {
    console.error('Error creating audio story:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating audio story',
      error: error.message
    });
  }
});

// PUT /api/audiostories/:id - Update audio story
router.put('/:id', async (req, res) => {
  try {
    const audioStory = await AudioStory.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!audioStory) {
      return res.status(404).json({
        success: false,
        message: 'Audio story not found'
      });
    }
    
    res.json({
      success: true,
      data: audioStory,
      message: 'Audio story updated successfully'
    });
  } catch (error) {
    console.error('Error updating audio story:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating audio story',
      error: error.message
    });
  }
});

// PATCH /api/audiostories/:id/featured - Toggle featured status
router.patch('/:id/featured', async (req, res) => {
  try {
    const { featured } = req.body;
    
    const audioStory = await AudioStory.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { featured: featured },
      { new: true, runValidators: true }
    );
    
    if (!audioStory) {
      return res.status(404).json({
        success: false,
        message: 'Audio story not found'
      });
    }
    
    res.json({
      success: true,
      data: audioStory,
      message: `Audio story ${featured ? 'marked as' : 'unmarked from'} featured`
    });
  } catch (error) {
    console.error('Error updating featured status:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating featured status',
      error: error.message
    });
  }
});

// DELETE /api/audiostories/:id - Delete audio story
router.delete('/:id', async (req, res) => {
  try {
    const audioStory = await AudioStory.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!audioStory) {
      return res.status(404).json({
        success: false,
        message: 'Audio story not found'
      });
    }
    res.json({
      success: true,
      message: 'Audio story deleted successfully',
      data: audioStory
    });
  } catch (error) {
    console.error('Error deleting audio story:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting audio story',
      error: error.message
    });
  }
});

module.exports = router; 