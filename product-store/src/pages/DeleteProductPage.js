// src/pages/DeleteProductPage.js

import React, { useState } from 'react';
import { deleteProduct } from '../services/api'; // Import API function to delete a product by ID
import './DeleteProductPage.css'; // Import styles for this page

function DeleteProductPage() {
  // State to store the entered product ID
  const [productId, setProductId] = useState('');

  // State to show success/error messages
  const [message, setMessage] = useState('');

  // ✅ Handle delete action
  const handleDelete = async () => {
    if (!productId) {
      setMessage('❌ Product ID cannot be empty'); // Simple validation
      return;
    }

    try {
      console.log('Attempting to delete product with ID:', productId);
      await deleteProduct(productId); // Call API to delete the product
      setMessage('✅ Product deleted successfully'); // Show success message
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage('❌ Error: Failed to delete product. Please check if the ID is correct.');
    }
  };

  return (
    <div className="delete-container">
      <h2>Delete Product</h2>

      {/* Input field to enter the product ID to delete */}
      <input
        className="delete-input"
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />

      {/* Delete button triggers the delete operation */}
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>

      {/* Display feedback message */}
      <p className="delete-message">{message}</p>
    </div>
  );
}

export default DeleteProductPage;
