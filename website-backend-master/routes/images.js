const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Helper function to check if file exists
const fileExists = (filePath) => {
    try {
        return fs.existsSync(filePath);
    } catch (error) {
        return false;
    }
};

// Helper function to check if it's a valid image file
const isImageFile = (filename) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
};

// Route to serve individual image files directly
router.get('/:folder/:folder2/:imageName', (req, res) => {
    try {
        const { folder, folder2, imageName } = req.params;
        
        // Validate that it's an image file
        if (!isImageFile(imageName)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid image file'
            });
        }
        
        const imagePath = path.join(__dirname, '../assets/', folder, folder2, imageName);
        
        if (!fileExists(imagePath)) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        // Set appropriate content type
        const ext = path.extname(imageName).toLowerCase();
        const contentType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml'
        }[ext] || 'application/octet-stream';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        res.sendFile(imagePath);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

module.exports = router; 