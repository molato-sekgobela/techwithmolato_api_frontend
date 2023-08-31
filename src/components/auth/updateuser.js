import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography,TextField, Button,Box} from '@mui/material';
axios.defaults.baseURL= 'https://s-creations.co.za'


const UpdateUser = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const loggedInId = location.state.loggedInId;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    // Add other form fields here
  });
  
  useEffect(() => {
    console.log(userId,loggedInId);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setFormData({
          username: response.data.username,
          email: response.data.email,
          // Set other form fields here
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/api/users/${userId}/update`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      alert('User updated successfully!');
      console.log(loggedInId);
      navigate('/admindashboard',{state: {loggedInId }}); // Redirect to the admin dashboard after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Box sx={{ width: '300px', margin: '0 auto', paddingTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update User
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="username"
          value={formData.username}
          onChange={handleFormChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          margin="normal"
          variant="outlined"
        />
        {/* Add other input fields for updating user data */}
        <Button type="submit" variant="contained" fullWidth>
          Update
        </Button>
      </form>
    </Box>
  );
};
export default UpdateUser;
