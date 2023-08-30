import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for routing
import { Button } from '@mui/material';

const LogoutButton = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Perform any logout-related actions here, such as clearing local storage, destroying tokens, etc.
      localStorage.removeItem('access');
      // Redirect the user to the login page or any desired route after logout
      alert('You have been logged out!')
      navigate('/');
    };
  
    return (
        <Button onClick={handleLogout} style={{marginTop:'20px',backgroundColor:'#0064ff',fontSize:'30px',color:'white'}} variant="contained" >
        Logout
       </Button>
    );
  };
  export default LogoutButton;