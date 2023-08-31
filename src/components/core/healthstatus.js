import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HealthStatus.css'; // Import the CSS file for styling
import LandingPage from '../layout/header'
axios.defaults.baseURL= 'https://s-creations.co.za'

const HealthStatus = () => {
  const [status, setStatus] = useState('Checking...');
  const [health, setHealth] = useState('');
  const [error, setError] = useState('');
  const [smiley, setSmiley] = useState('');

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const response = await axios.get('api/health-check');

        if (response.data.database === 'OK') {
          setStatus('Database Connection: OK');
          setHealth(response.data.health);
          setSmiley('😊');
          setError(null);
        } else {
          setStatus('Database Connection: Failed');
          setHealth('Health Test Failed');
          setSmiley('😞');
          setError('Error fetching health status');
        }
      } catch (error) {
        setStatus('Database Connection: Failed');
        setHealth('Health Test Failed');
        setSmiley('😞');
        setError('Error fetching health status');
      }
    };
    fetchHealthStatus();
  }, []);

  return (
    <div>
    <div className="health-status-container">
      <h1 className="title">Health Status</h1>
      <div className="status-item">
        <h3 className="status-label"><p className={`status-text ${status === 'Database Connection: OK' ? 'green' : 'red'}`}>
          {status} {smiley}
        </p></h3> 
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
    </div>
  );
};

export default HealthStatus;
