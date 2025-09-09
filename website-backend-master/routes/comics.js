const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Comic = require('../models/Comic');

// Helper function to check if file exists
const fileExists = (filePath) => {
    try {
        return fs.existsSync(filePath);
    } catch (error) {
        return false;
    }
};

// Route to serve comic PDF files
router.get('/pdf/:comicFolder/:pdfName', (req, res) => {
    try {
        const { comicFolder, pdfName } = req.params;
        
        // Validate that it's a PDF file
        if (!pdfName.toLowerCase().endsWith('.pdf')) {
            return res.status(400).json({
                success: false,
                message: 'Invalid PDF file'
            });
        }
        
        const pdfPath = path.join(__dirname, '../assets/comics/', comicFolder, pdfName);
        
        if (!fileExists(pdfPath)) {
            return res.status(404).json({
                success: false,
                message: 'Comic PDF not found'
            });
        }

        // Set appropriate headers for PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        res.setHeader('Content-Disposition', `inline; filename="${pdfName}"`);
        res.sendFile(pdfPath);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

// GET /api/comics - Get all comics with optional filtering
router.get('/', async (req, res) => {
  try {
    const {
      featured,
      comicOfMonth,
      mood,
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
    
    if (comicOfMonth !== undefined) {
      filter.comicOfMonth = comicOfMonth === 'true';
    }
    
    if (mood) {
      filter.mood = mood;
    }
    
    if (age) {
      filter.age = age;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { characters: { $regex: search, $options: 'i' } },
        { themes: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get comics with pagination and sorting
    const comics = await Comic.find(filter)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Comic.countDocuments(filter);

    res.json({
      success: true,
      data: comics,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalComics: total,
        hasNextPage: skip + comics.length < total,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching comics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching comics',
      error: error.message
    });
  }
});

// GET /api/comics/featured - Get featured comics
router.get('/featured', async (req, res) => {
  try {
    const comics = await Comic.find({ featured: true }).sort({ id: 1 });
    res.json({
      success: true,
      data: comics,
      count: comics.length
    });
  } catch (error) {
    console.error('Error fetching featured comics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured comics',
      error: error.message
    });
  }
});

// GET /api/comics/comic-of-month - Get comic of the month
router.get('/comic-of-month', async (req, res) => {
  try {
    const comic = await Comic.findOne({ comicOfMonth: true });
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'No comic of the month found'
      });
    }
    res.json({
      success: true,
      data: comic
    });
  } catch (error) {
    console.error('Error fetching comic of the month:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching comic of the month',
      error: error.message
    });
  }
});

// GET /api/comics/moods - Get available moods
router.get('/moods', async (req, res) => {
  try {
    const moods = await Comic.distinct('mood');
    res.json({
      success: true,
      data: moods
    });
  } catch (error) {
    console.error('Error fetching moods:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching moods',
      error: error.message
    });
  }
});

// GET /api/comics/ages - Get available age ranges
router.get('/ages', async (req, res) => {
  try {
    const ages = await Comic.distinct('age');
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

// GET /api/comics/:id - Get comic by ID
router.get('/:id', async (req, res) => {
  try {
    const comic = await Comic.findOne({ id: parseInt(req.params.id) });
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found'
      });
    }
    res.json({
      success: true,
      data: comic
    });
  } catch (error) {
    console.error('Error fetching comic:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching comic',
      error: error.message
    });
  }
});

// GET /api/comics/slug/:slug - Get comic by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.slug });
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found'
      });
    }
    res.json({
      success: true,
      data: comic
    });
  } catch (error) {
    console.error('Error fetching comic by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching comic',
      error: error.message
    });
  }
});

// POST /api/comics - Create new comic
router.post('/', async (req, res) => {
  try {
    const comic = new Comic(req.body);
    const savedComic = await comic.save();
    res.status(201).json({
      success: true,
      data: savedComic,
      message: 'Comic created successfully'
    });
  } catch (error) {
    console.error('Error creating comic:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating comic',
      error: error.message
    });
  }
});

// PUT /api/comics/:id - Update comic
router.put('/:id', async (req, res) => {
  try {
    const comic = await Comic.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found'
      });
    }
    
    res.json({
      success: true,
      data: comic,
      message: 'Comic updated successfully'
    });
  } catch (error) {
    console.error('Error updating comic:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating comic',
      error: error.message
    });
  }
});

// PATCH /api/comics/:id/comic-of-month - Set/unset comic of the month
router.patch('/:id/comic-of-month', async (req, res) => {
  try {
    const { comicOfMonth } = req.body;
    
    const comic = await Comic.findOne({ id: parseInt(req.params.id) });
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found'
      });
    }
    
    comic.comicOfMonth = comicOfMonth;
    await comic.save(); // This will trigger the pre-save middleware
    
    res.json({
      success: true,
      data: comic,
      message: `Comic ${comicOfMonth ? 'set as' : 'removed from'} comic of the month`
    });
  } catch (error) {
    console.error('Error updating comic of the month:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating comic of the month',
      error: error.message
    });
  }
});

// DELETE /api/comics/:id - Delete comic
router.delete('/:id', async (req, res) => {
  try {
    const comic = await Comic.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found'
      });
    }
    res.json({
      success: true,
      message: 'Comic deleted successfully',
      data: comic
    });
  } catch (error) {
    console.error('Error deleting comic:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting comic',
      error: error.message
    });
  }
});

module.exports = router; 