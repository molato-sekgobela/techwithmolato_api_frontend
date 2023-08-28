import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const USSERDETAILS_ENDPOINT = '/api/user-details/';
  const customBaseURL = 'http://localhost:3001';

  // Check if the user is authenticated (token is present in localStorage)
  const isAuthenticated = !!localStorage.getItem('token');
  const userId = localStorage.getItem('user_id'); // Get the user_id from localStorage

  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    // Clear the token and user_id from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    // Redirect to the login page after logout
    navigate('/login');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate('/login');
    }

    // Fetch user details using the user_id
    if (userId) {
      axios
        .get(customBaseURL+USSERDETAILS_ENDPOINT+`${userId}`) // Replace with the correct API endpoint
        .then((response) => {
          // Set the user data in state
          setUserData(response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error fetching user details:', error);
        });
    }
  }, [isAuthenticated, navigate, userId]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {userData && (
        <div>
          <p>Welcome, {userData.username}!</p>
          {/* Display other user details */}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
