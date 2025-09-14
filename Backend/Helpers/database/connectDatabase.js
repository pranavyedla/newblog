const mongoose = require("mongoose")

const connectDatabase = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error("MongoDB URI not found in environment variables");
        }

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            // Removed deprecated bufferMaxEntries and bufferCommands
        };

        await mongoose.connect(mongoURI, options);

        console.log("✅ MongoDB connected successfully");
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
        console.log(`🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });

    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDatabase
