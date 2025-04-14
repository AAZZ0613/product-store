import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    fetchProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.name}</strong> - ${product.price}
            <div>
              <Link to={`/products/${product._id}`}>View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;
