import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get route parameters (e.g., /products/:id)
import { fetchProductById } from '../services/api'; // API function to fetch a single product by ID
import './ProductPage.css'; // Import custom styles

function ProductPage() {
  const { id } = useParams(); // Extract product ID from the URL
  const [product, setProduct] = useState(null); // State to store product details
  const [error, setError] = useState(null);     // State to store error message (if any)

  // ✅ Fetch product details when component mounts or ID changes
  useEffect(() => {
    if (!id) {
      setError('❌ No product ID provided');
      return;
    }

    fetchProductById(id)
      .then((res) => {
        console.log('Fetched product data:', res.data);
        setProduct(res.data); // Store fetched product data
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setError('❌ Failed to fetch product');
      });
  }, [id]);

  // ✅ If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  // ✅ If product data hasn't loaded yet, show loading state
  if (!product) {
    return <div>Loading...</div>;
  }

  // ✅ Normalize image URL or show a placeholder if not available
  let fullImageUrl = '';
  if (typeof product.image === 'string' && product.image.trim() !== '') {
    // Ensure image path starts with a slash
    const normalizedImage = product.image.startsWith('/')
      ? product.image
      : '/' + product.image;

    fullImageUrl = `http://localhost:5000${normalizedImage}`; // Build full URL
  } else {
    fullImageUrl = 'https://placehold.co/350x200?text=No+Image'; // Placeholder image
  }

  console.log('Product ID:', id);
  console.log('Full image URL:', fullImageUrl);

  // ✅ Render product details
  return (
    <div className="product-page">
      {/* Show image if available */}
      {fullImageUrl && (
        <img
          src={fullImageUrl}
          alt={product.name}
          className="product-image"
        />
      )}
      
      <h2>{product.name}</h2>

      <p>
        <strong>Product Number:</strong> {product._id}
      </p>

      <p>{product.description}</p>

      <p>
        <strong>Price:</strong> ${product.price}
      </p>
    </div>
  );
}

export default ProductPage;
