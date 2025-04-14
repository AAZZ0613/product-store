// Import Mongoose to define the schema
const mongoose = require('mongoose');

// Define schema for a user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Username is required
    unique: true // No two users can have the same username
  },
  password: {
    type: String,
    required: true // Password is required
  }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
