const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to MongoDB database

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// API Routes for users and products
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Serve static files from the uploads directory (for images, etc.)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve React build static files in production environment
if (process.env.NODE_ENV === 'production') {
  // Serve the build folder from the root directory
  app.use(express.static(path.join(__dirname, '../build')));

  // Handle any unknown routes by returning index.html (for React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
} else {
  // Simple response for development environment
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details to console
  res.status(500).json({ error: 'Something went wrong!' }); // Send generic error response
});

// Start the server on specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
