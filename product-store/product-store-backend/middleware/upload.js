const multer = require('multer'); // Import multer for handling multipart/form-data (file uploads)
const path = require('path');     // Node.js built-in module for handling file paths

// Set up multer's disk storage engine
const storage = multer.diskStorage({
  // Define destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files will be saved in the "uploads" folder (ensure it exists)
  },

  // Define how file names should be saved
  filename: function (req, file, cb) {
    // Use current timestamp + original file extension to ensure unique filenames
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with the defined storage config
const upload = multer({ storage });

// Export the upload middleware to use in routes
module.exports = upload;
