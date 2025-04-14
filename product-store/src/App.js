import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import CreateProductPage from './pages/CreateProductPage';
import UpdateProductPage from './pages/UpdateProductPage';
import UpdateRedirectPage from './pages/UpdateRedirectPage';
import DeleteProductPage from './pages/DeleteProductPage';
import MyProfilePage from './pages/MyProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/update/:id" element={<UpdateProductPage />} />
          <Route path="/products/update/1" element={<UpdateRedirectPage />} />
          <Route path="/products/delete/:id" element={<DeleteProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
