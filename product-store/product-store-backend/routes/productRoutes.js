const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const auth = require('../middleware/auth');

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});
// Public routes (read-only)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (require authentication)
router.post('/',createProduct);
router.put('/:id',updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;