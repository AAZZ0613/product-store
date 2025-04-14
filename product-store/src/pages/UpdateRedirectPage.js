import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateRedirectPage() {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (id.trim()) {
      navigate(`/products/update/${id}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Enter Product ID to Update</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleRedirect}>Go</button>
    </div>
  );
}

export default UpdateRedirectPage;
