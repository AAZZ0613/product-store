import React from 'react';

function MyProfilePage() {
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');

  return (
    <div>
      <h1>My Profile</h1>
      {username ? (
        <div>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>User ID:</strong> {userId}</p>
        </div>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
}

export default MyProfilePage;
