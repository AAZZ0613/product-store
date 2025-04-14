// Import Mongoose library to define a schema and model
const mongoose = require('mongoose');

// ✅ Define the schema for a product document
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Product must have a name (this field is required)
  },
  price: {
    type: Number,
    required: true // Product must have a price (required field)
  },
  description: String, // Optional: a brief description of the product
  category: String,    // Optional: category to which the product belongs

  image: {
    type: String,
    default: '/uploads/default.jpg' // Default image path if none is provided
  }
}, { 
  timestamps: true // Automatically includes `createdAt` and `updatedAt` fields
});

// ✅ Export the Product model based on the product schema
// This will create a "products" collection in MongoDB (Mongoose pluralizes model name by default)
module.exports = mongoose.model('Product', productSchema);
