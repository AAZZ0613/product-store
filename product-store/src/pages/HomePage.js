import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api'; // Custom API function to fetch all products

function HomePage() {
  const [products, setProducts] = useState([]); // State to store fetched product list

  // ✅ Fetch products once when component is mounted
  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data)) // Store products in state
      .catch((error) => console.error(error)); // Log error if fetch fails
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* ✅ Page header with logo and title */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src="/Logo.png" alt="Team Logo" style={{ height: '100px' }} />
        <h1>Product Store</h1>
      </header>

      {/* ✅ Grid layout with 2 columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* ✅ Map through all products and render each card */}
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            {/* ✅ Product image with fixed height and zoom-in effect */}
            <img
              src={`http://localhost:5000${product.image}`} // Show image from server path
              alt={product.name}
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'contain',
                borderRadius: '8px',
                marginBottom: '15px',
              }}
            />

            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>

            {/* ✅ Link to product detail page */}
            <Link
              to={`/products/${product._id}`}
              style={{
                display: 'inline-block',
                marginTop: '10px',
                textDecoration: 'none',
                color: 'white',
                backgroundColor: '#007bff',
                padding: '8px 16px',
                borderRadius: '5px',
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
