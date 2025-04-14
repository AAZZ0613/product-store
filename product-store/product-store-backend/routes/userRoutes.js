const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;