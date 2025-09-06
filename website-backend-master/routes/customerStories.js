const express = require('express');
const router = express.Router();
const CustomerStory = require('../models/CustomerStory');

// GET /api/customerstories - Get all customer stories with optional filtering
router.get('/', async (req, res) => {
  try {
    const {
      featured,
      author,
      search,
      page = 1,
      limit,
      sort = 'id'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    
    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination only if limit is provided
    let stories;
    let total;
    
    if (limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Get customer stories with pagination and sorting
      stories = await CustomerStory.find(filter)
        .sort({ [sort]: 1 })
        .skip(skip)
        .limit(parseInt(limit));
      
      // Get total count for pagination
      total = await CustomerStory.countDocuments(filter);
      
      res.json({
        success: true,
        data: stories,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalStories: total,
          hasNextPage: skip + stories.length < total,
          hasPrevPage: parseInt(page) > 1
        }
      });
    } else {
      // Get all customer stories without pagination
      stories = await CustomerStory.find(filter).sort({ [sort]: 1 });
      
      res.json({
        success: true,
        data: stories,
        count: stories.length
      });
    }
  } catch (error) {
    console.error('Error fetching customer stories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching customer stories',
      error: error.message
    });
  }
});

// GET /api/customerstories/featured - Get featured customer stories
router.get('/featured', async (req, res) => {
  try {
    const stories = await CustomerStory.find({ featured: true }).sort({ id: 1 });
    res.json({
      success: true,
      data: stories,
      count: stories.length
    });
  } catch (error) {
    console.error('Error fetching featured customer stories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured customer stories',
      error: error.message
    });
  }
});

// GET /api/customerstories/authors - Get available authors
router.get('/authors', async (req, res) => {
  try {
    const authors = await CustomerStory.distinct('author');
    res.json({
      success: true,
      data: authors.sort()
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching authors',
      error: error.message
    });
  }
});

// GET /api/customerstories/by-author/:author - Get stories by author
router.get('/by-author/:author', async (req, res) => {
  try {
    const author = decodeURIComponent(req.params.author);
    const stories = await CustomerStory.find({ 
      author: { $regex: author, $options: 'i' } 
    }).sort({ id: 1 });
    
    res.json({
      success: true,
      data: stories,
      count: stories.length,
      author: author
    });
  } catch (error) {
    console.error('Error fetching stories by author:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching stories by author',
      error: error.message
    });
  }
});

// GET /api/customerstories/:id - Get customer story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await CustomerStory.findOne({ id: parseInt(req.params.id) });
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Customer story not found'
      });
    }
    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    console.error('Error fetching customer story:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching customer story',
      error: error.message
    });
  }
});

// GET /api/customerstories/slug/:slug - Get customer story by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const story = await CustomerStory.findOne({ slug: req.params.slug });
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Customer story not found'
      });
    }
    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    console.error('Error fetching customer story by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching customer story',
      error: error.message
    });
  }
});

// POST /api/customerstories - Create new customer story
router.post('/', async (req, res) => {
  try {
    const story = new CustomerStory(req.body);
    const savedStory = await story.save();
    res.status(201).json({
      success: true,
      data: savedStory,
      message: 'Customer story created successfully'
    });
  } catch (error) {
    console.error('Error creating customer story:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating customer story',
      error: error.message
    });
  }
});

// PUT /api/customerstories/:id - Update customer story
router.put('/:id', async (req, res) => {
  try {
    const story = await CustomerStory.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Customer story not found'
      });
    }
    
    res.json({
      success: true,
      data: story,
      message: 'Customer story updated successfully'
    });
  } catch (error) {
    console.error('Error updating customer story:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating customer story',
      error: error.message
    });
  }
});

// PATCH /api/customerstories/:id/featured - Toggle featured status
router.patch('/:id/featured', async (req, res) => {
  try {
    const { featured } = req.body;
    
    const story = await CustomerStory.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { featured: featured },
      { new: true, runValidators: true }
    );
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Customer story not found'
      });
    }
    
    res.json({
      success: true,
      data: story,
      message: `Customer story ${featured ? 'marked as' : 'unmarked from'} featured`
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

// DELETE /api/customerstories/:id - Delete customer story
router.delete('/:id', async (req, res) => {
  try {
    const story = await CustomerStory.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Customer story not found'
      });
    }
    res.json({
      success: true,
      message: 'Customer story deleted successfully',
      data: story
    });
  } catch (error) {
    console.error('Error deleting customer story:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting customer story',
      error: error.message
    });
  }
});

module.exports = router; 