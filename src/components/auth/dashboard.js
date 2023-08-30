import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import UserProfile from './userprofile'
import LandingPage from '../layout/headerdashboard'
axios.defaults.baseURL = 'http://localhost:3001'


const Dashboard = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/' + userId , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setUser(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);

      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <h1 style={{ textAlign: 'center', paddingTop: '50px' }}> ❌ Unauthorized Access ( •̀ᴗ•́ )و</h1>;
  }

  return (
    <div>
      <LandingPage />
    <Container className='center flex-end items-center justify-center mt-5 p-3 dashboard-container'>
      <Row className='dashboard'>
        <div className='dash-contents'>
          <h2 className='dash-title'>Welcome {user.username}</h2>
          <h3 className='border-b-bright'>... or should I call you {user.nickname}??</h3>

          <p className='dash-text'>You're just a simple user... you have no rights... now GET TO WORK!</p>
        </div>
        <div>
          <UserProfile user={user} />
        </div>
        <br />
      </Row>

    </Container>
    </div>
  )
}
export default Dashboard;