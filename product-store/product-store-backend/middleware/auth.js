const jwt = require('jsonwebtoken');     // Import JWT library for token verification
const User = require('../models/User');  // Import User model to look up user data in the database

// Middleware to authenticate users using JWT
const auth = async (req, res, next) => {
  try {
    // Get the Authorization header from the request
    const authHeader = req.header('Authorization');

    // Check if header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Please authenticate' }); // Unauthorized
    }

    // Extract token string from header (e.g. "Bearer abc123..." → "abc123...")
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract user ID from decoded token
    const userId = decoded.id || decoded._id;

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Attach user and token to request object for later use in route handlers
    req.user = user;
    req.token = token;

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    // Handle invalid/missing/expired token errors
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth; // Export the middleware to use in protected routes
