// src/pages/ProductsListPage.js
import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';
import { Link } from 'react-router-dom';

function ProductsListPage() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>
      <Link to="/products/create">Create New Product</Link>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <img src={p.image} alt={p.name} style={{ width: '100px' }} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>${p.price}</p>
            <Link to={`/products/update/${p._id}`}>Edit</Link> | <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsListPage;
