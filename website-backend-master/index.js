const connectToMongo = require("./db")
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const port = 7500

app.use(cors())
app.use(express.json());

// Serve static files from assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API Routes
app.use('/api/products', require('./routes/products'))
app.use('/api/comics', require('./routes/comics'))
app.use('/api/audiostories', require('./routes/audioStories'))
app.use('/api/videos', require('./routes/videos'))
app.use('/api/customerstories', require('./routes/customerStories'))
app.use('/api/competitions', require('./routes/competitions'))
app.use('/api/images', require('./routes/images'))

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Churan Chacha Backend API is running!',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            comics: '/api/comics',
            audioStories: '/api/audiostories',
            videos: '/api/videos',
            customerStories: '/api/customerstories',
            competitions: '/api/competitions',
            competitionRegistration: '/api/competitions/:id/register',
            images: '/api/images',
            imageExample: '/api/images/chatpati_imli/chatpati_imli_1.png'
        }
    })
})

// Start server function
const startServer = async () => {
    try {
        // Try to connect to MongoDB, but don't exit if it fails
        await connectToMongo();
    } catch (error) {
        console.warn('⚠️  MongoDB connection failed, but server will continue running');
    }
    
    // Start server regardless of MongoDB connection status
    app.listen(port, () => {
        console.log(`🚀 Churan Chacha Backend listening on port ${port}`)
        console.log(`🌐 Server running at http://localhost:${port}`)
        console.log(`📡 API endpoints available at http://localhost:${port}/api/products`)
        console.log(`🖼️  Test image route: http://localhost:${port}/api/images/chatpati_imli/chatpati_imli_1.png`)
    })
};

// Start the server
startServer();