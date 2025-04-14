import axios from 'axios';

// ✅ Create an Axios instance with base URL for all requests
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // All requests will be relative to this
});

// ========== PRODUCTS ==========

// ✅ Fetch all products
export const fetchProducts = () => API.get('/products');

// ✅ Fetch a single product by ID
export const fetchProductById = (id) => API.get(`/products/${id}`);

// ✅ Create a new product
export const createProduct = (productData) => API.post('/products', productData);

// ✅ Update a product by ID
export const updateProduct = (id, updatedData) => API.put(`/products/${id}`, updatedData);

// ✅ Delete a product by ID
export const deleteProduct = (id) => API.delete(`/products/${id}`);


// ========== USERS ==========

// ✅ Register a new user
export const registerUser = (userData) => API.post('/users/signup', userData);

// ✅ Login a user
export const loginUser = (credentials) => API.post('/users/signin', credentials);

export default API; // Export the Axios instance in case it's needed elsewhere
