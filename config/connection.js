// Function to connect to MongoDB
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    //Connect successful
    console.log("MongoDB connected successfully");
  } catch (error) {
    //Error if it didnt connect
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Export the function so server.js can use it
module.exports = connectDB;
