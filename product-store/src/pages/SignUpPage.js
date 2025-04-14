import React, { useState } from 'react';
import axios from 'axios';

function SignUpPage() {
  // ✅ Form state for user input
  const [form, setForm] = useState({ username: '', password: '' });

  // ✅ State to display success/error messages
  const [message, setMessage] = useState('');

  // ✅ Update form fields on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload

    try {
      // Send POST request to registration endpoint
      const res = await axios.post('http://localhost:5000/api/users/register', form);

      setMessage('✅ Registration successful!');
      console.log('Token:', res.data.token); // Log JWT token (if needed)

      // 👉 You can also:
      // - Store token in localStorage
      // - Automatically log in the user
      // - Redirect to another page (e.g., homepage or login)
    } catch (err) {
      // Show detailed error message (if available)
      setMessage('❌ Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
      console.error(err);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>

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
        <button type="submit">Sign Up</button>
      </form>

      {/* Message display (success or error) */}
      <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>
    </div>
  );
}

export default SignUpPage;
