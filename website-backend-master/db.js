const mongoose = require('mongoose');

    const mongoURI = "mongodb+srv://keshav:churanchacha@churanchacha.drmpcle.mongodb.net/ChuranChacha?retryWrites=true&w=majority";
   
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            connectTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 30000, // 30 seconds
            maxPoolSize: 10,
            retryWrites: true,
            retryReads: true
        });
        console.log("✅ Connected to MongoDB Atlas successfully");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        console.log("🔄 Retrying connection in 5 seconds...");
        
        // Retry connection after 5 seconds
        setTimeout(() => {
            connectToMongo();
        }, 5000);
    }
};

module.exports = connectToMongo;