import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/products/create">Create Product</Link></li>
        <li><Link to="/products/update/1">Update Product</Link></li>
        <li><Link to="/products/delete/1">Delete Product</Link></li>

        {!token ? (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile">My Profile ({username})</Link></li>
            <li>
              <button
                onClick={handleSignOut}
                className="link-button"
              >
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
