const mongoose = require('mongoose'); // Import the Mongoose library to interact with MongoDB

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI stored in environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,      // Use the new MongoDB connection string parser
      useUnifiedTopology: true,   // Use the new server discovery and monitoring engine
    });
    console.log('MongoDB Connected...'); // Log success message if connection is successful
  } catch (err) {
    // Log an error message and exit the process if the connection fails
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB; // Export the connectDB function to use in other files
