const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect using the connection string from .env
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Success message
        console.log('MongoDB connected successfully');
    } catch (error) {
        // Log error message if connection fails
        console.error('MongoDB connection error:', error.message);

        // Exit process if DB connection fails
        process.exit(1);
    }
};

// Export the function so server.js can use it
module.exports = connectDB;
