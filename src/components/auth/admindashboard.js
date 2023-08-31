import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import UserProfile from './userprofile';
import LandingPage from '../layout/headerdashboard'

axios.defaults.baseURL = 'https://s-creations.co.za'

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInId = location.state.loggedInId;
  const [user, setUser] = useState(null);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/' + loggedInId , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        const responseUsersData = await axios.get('/api/users/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setUsersData(responseUsersData.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const filteredUsers = usersData.filter((userData) => userData.id !== loggedInId);


  if (!user) {
    return <h1 style={{ textAlign: 'center', paddingTop: '50px' }}> ❌ Unauthorized Access ( •̀ᴗ•́ )و</h1>;
  }

  const handleUpdateUser = (userId, loggedInId) => {
    // Redirect to the update page with the selected user's ID
    console.log(userId, loggedInId);
    navigate("/update-user", { state: { userId, loggedInId } });
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      deleteUser(userId);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}/delete/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      // Fetch the updated user data after deletion
      const responseUsersData = await axios.get('/api/users/all/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      setUsersData(responseUsersData.data);
      alert('User Deleted!')
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <div>
    <LandingPage />
    <Container className='center flex-end items-center justify-center mt-5 p-3 dashboard-container'>
      <Row className='dashboard dashboard-admin'>

        <div className="dash-contents" style={{ padding: '20px' }}>
          <h2 className="dash-title">Welcome {user.username}</h2>
          <h3 className="border-b-bright">... or should I call you {user.nickname}??</h3>

          <UserProfile className="mb-20" user={user} />

          <h1 className="dash-text align-center mt-40" style={{ textAlign: 'center' }}>
            Admin Panel
          </h1>
          <Grid container spacing={2}>
            {filteredUsers.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" component="div">
                      <b>Username:</b> <br />
                      {item.username}
                    </Typography>
                    <Typography variant="body2">
                      <b>Email:</b> <br />
                      {item.email}
                    </Typography>
                    <br />
                    <Button variant="contained" onClick={() => handleUpdateUser(item.id, user.id)}>
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: '20px' }}
                      className='btn'
                      id='login-btn'
                      variant="contained"
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          </div >
      </Row>
    </Container>
    </div>
  );
};

export default AdminDashboard;
