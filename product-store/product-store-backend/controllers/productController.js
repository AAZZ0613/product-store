const Product = require('../models/Product'); // Import the Product model
const mongoose = require('mongoose');         // Import Mongoose to work with MongoDB ObjectIDs

// ✅ Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.json(products); // Return products as JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return 500 error if something goes wrong
  }
};

// ✅ Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID from the request URL
    if (!product) return res.status(404).json({ message: 'Product not found' }); // Return 404 if product doesn't exist
    res.json(product); // Return found product
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return 500 on error
  }
};

// ✅ Create a new product
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body; // Get product data from the request body

    // If no image is provided, use a default image path
    if (!productData.image || productData.image.trim() === '') {
      productData.image = '/uploads/default.jpg';
    }

    const newProduct = new Product(productData); // Create a new Product instance
    await newProduct.save(); // Save it to the database
    res.status(201).json(newProduct); // Return the newly created product with status 201 (Created)
  } catch (err) {
    res.status(400).json({ error: err.message }); // Return 400 if validation or saving fails
  }
};

// ✅ Get product data for update (fetch before editing)
exports.getUpdateById = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id); // Find product by ID
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product); // Return product data for editing
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return 500 if something goes wrong
  }
};

// ✅ Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId before attempting to update
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    // Find product by ID and update it with request body, return the updated document
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct); // Return the updated product
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return 500 on failure
  }
};

// ✅ Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    // Find product by ID and delete it
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' }); // Return confirmation
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return 500 on error
  }
};
