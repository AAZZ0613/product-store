import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Used to navigate programmatically after product creation
import { createProduct } from '../services/api'; // Custom API function to create a product
import axios from 'axios'; // Axios is used to handle image upload request
import './CreateProductPage.css'; // CSS styles for the page

function CreateProductPage() {
  // ✅ Component state for storing form data
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const navigate = useNavigate(); // React Router hook to navigate after form submission

  // ✅ Handle input field changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value }); // Update form state based on input name
  };

  // ✅ Handle image file upload
  const handleImageUpload = async (e) => {
    const formData = new FormData(); // Create a FormData object to send file
    formData.append('image', e.target.files[0]); // Append the selected file

    try {
      // Send POST request to backend upload endpoint
      const res = await axios.post('http://localhost:5000/api/products/upload', formData);
      
      // Update image path in state (res.data.imageUrl should contain `/uploads/filename.jpg`)
      setProduct(prev => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      console.error('Upload failed', err); // Log any error
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload behavior
    try {
      await createProduct(product); // Call API to create product with form data
      navigate('/products'); // Redirect to product list page
    } catch (err) {
      console.error('Failed to create product:', err); // Log error if API fails
    }
  };

  return (
    <div className="create-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="create-form">
        {/* Input for product name */}
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        
        {/* Textarea for product description */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
        />

        {/* Input for product price */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        {/* File input for image upload */}
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
        />

        {/* ✅ Image preview (if uploaded) */}
        {product.image && (
          <img
            src={`http://localhost:5000${product.image}`} // Full URL to preview the image
            alt="Preview"
            className="preview-image"
          />
        )}

        {/* Submit button */}
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default CreateProductPage;
