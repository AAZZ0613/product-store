import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/api'; // API calls
import axios from 'axios'; // Used for uploading images
import './UpdateProductPage.css'; // CSS styles

function UpdateProductPage() {
  const { id } = useParams();       // Get the product ID from the URL
  const navigate = useNavigate();   // Hook to navigate after updating

  // ✅ State to store product data
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [error, setError] = useState('');       // Error message state

  // ✅ Fetch product data on component mount
  useEffect(() => {
    fetchProductById(id)
      .then((res) => {
        setProduct(res.data); // Fill form fields with existing product data
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch failed:', err);
        setError('❌ Failed to fetch product data');
        setLoading(false);
      });
  }, [id]);

  // ✅ Handle form input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Handle image file upload
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]); // Append selected file

    try {
      const res = await axios.post('http://localhost:5000/api/products/upload', formData);
      setProduct((prev) => ({ ...prev, image: res.data.imageUrl })); // Safely update image path
    } catch (err) {
      console.error('Upload failed', err);
      setError('❌ Image upload failed.');
    }
  };

  // ✅ Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Updating product with data:', product);

    try {
      await updateProduct(id, product); // Call update API
      navigate('/products');           // Redirect to product list page
    } catch (err) {
      console.error('Update failed:', err);
      setError('❌ Update failed. Please try again.');
    }
  };

  // ✅ Display loading or error message
  if (loading) return <div>Loading product...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="update-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="update-form">
        {/* Product Name */}
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        {/* Product Description */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
        />

        {/* Product Price */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <input type="file" onChange={handleImageUpload} accept="image/*" />

        {/* ✅ Image Preview (if available) */}
        {product.image && (
          <img
            src={`http://localhost:5000${product.image}`}
            alt="Preview"
            className="preview-image"
          />
        )}

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProductPage;
