import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInPage() {
  // ✅ Form state for username and password
  const [form, setForm] = useState({ username: '', password: '' });

  // ✅ Message state for success or error display
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Used to redirect after login

  // ✅ Handle input field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // Update field by name
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload

    try {
      // Send POST request to login endpoint
      const res = await axios.post('http://localhost:5000/api/users/login', form);

      // ✅ Save JWT token and user info in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.user.username);
      localStorage.setItem('userId', res.data.user.id);

      setMessage('✅ Login successful!');

      // ✅ Redirect to homepage after slight delay (ensures localStorage is written)
      setTimeout(() => {
        navigate('/');
        // Optional: full reload — window.location.href = '/';
      }, 100);
    } catch (err) {
      // ✅ Handle and display login errors
      setMessage('❌ Login failed: ' + (err.response?.data?.message || 'Unknown error'));
      console.error(err);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Sign In</h1>

      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        {/* Username input */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br />

        {/* Password input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />

        {/* Submit button */}
        <button type="submit">Sign In</button>
      </form>

      {/* Display message */}
      <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>
    </div>
  );
}

export default SignInPage;
