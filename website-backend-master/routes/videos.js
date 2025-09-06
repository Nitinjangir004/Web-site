const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// GET /api/videos - Get all videos with optional filtering
router.get('/', async (req, res) => {
  try {
    const {
      featured,
      presenter,
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
    
    if (presenter) {
      filter.presenter = { $regex: presenter, $options: 'i' };
    }
    
    if (age) {
      filter.age = age;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { presenter: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get videos with pagination and sorting
    const videos = await Video.find(filter)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Video.countDocuments(filter);

    res.json({
      success: true,
      data: videos,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalVideos: total,
        hasNextPage: skip + videos.length < total,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching videos',
      error: error.message
    });
  }
});

// GET /api/videos/featured - Get featured videos
router.get('/featured', async (req, res) => {
  try {
    const videos = await Video.find({ featured: true }).sort({ id: 1 });
    res.json({
      success: true,
      data: videos,
      count: videos.length
    });
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured videos',
      error: error.message
    });
  }
});

// GET /api/videos/presenters - Get available presenters
router.get('/presenters', async (req, res) => {
  try {
    const presenters = await Video.distinct('presenter');
    res.json({
      success: true,
      data: presenters.sort()
    });
  } catch (error) {
    console.error('Error fetching presenters:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching presenters',
      error: error.message
    });
  }
});

// GET /api/videos/ages - Get available age ranges
router.get('/ages', async (req, res) => {
  try {
    const ages = await Video.distinct('age');
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

// GET /api/videos/by-presenter/:presenter - Get videos by presenter
router.get('/by-presenter/:presenter', async (req, res) => {
  try {
    const presenter = decodeURIComponent(req.params.presenter);
    const videos = await Video.find({ 
      presenter: { $regex: presenter, $options: 'i' } 
    }).sort({ id: 1 });
    
    res.json({
      success: true,
      data: videos,
      count: videos.length,
      presenter: presenter
    });
  } catch (error) {
    console.error('Error fetching videos by presenter:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching videos by presenter',
      error: error.message
    });
  }
});

// GET /api/videos/by-duration - Get videos sorted by duration
router.get('/by-duration', async (req, res) => {
  try {
    const { order = 'asc' } = req.query;
    const sortOrder = order === 'desc' ? -1 : 1;
    
    const videos = await Video.find().sort({ duration: sortOrder });
    
    res.json({
      success: true,
      data: videos,
      count: videos.length,
      sortedBy: `duration (${order}ending)`
    });
  } catch (error) {
    console.error('Error fetching videos by duration:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching videos by duration',
      error: error.message
    });
  }
});

// GET /api/videos/:id - Get video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findOne({ id: parseInt(req.params.id) });
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching video',
      error: error.message
    });
  }
});

// GET /api/videos/slug/:slug - Get video by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const video = await Video.findOne({ slug: req.params.slug });
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching video by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching video',
      error: error.message
    });
  }
});

// POST /api/videos - Create new video
router.post('/', async (req, res) => {
  try {
    const video = new Video(req.body);
    const savedVideo = await video.save();
    res.status(201).json({
      success: true,
      data: savedVideo,
      message: 'Video created successfully'
    });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating video',
      error: error.message
    });
  }
});

// PUT /api/videos/:id - Update video
router.put('/:id', async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    res.json({
      success: true,
      data: video,
      message: 'Video updated successfully'
    });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating video',
      error: error.message
    });
  }
});

// PATCH /api/videos/:id/featured - Toggle featured status
router.patch('/:id/featured', async (req, res) => {
  try {
    const { featured } = req.body;
    
    const video = await Video.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { featured: featured },
      { new: true, runValidators: true }
    );
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    res.json({
      success: true,
      data: video,
      message: `Video ${featured ? 'marked as' : 'unmarked from'} featured`
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

// DELETE /api/videos/:id - Delete video
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    res.json({
      success: true,
      message: 'Video deleted successfully',
      data: video
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting video',
      error: error.message
    });
  }
});

module.exports = router; 