import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthCheck.css'; // Import your CSS file for styling

function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    // Define the URL of your Django health check endpoint
    const healthCheckUrl = '/api/health-check';
    const customBaseURL = 'http://localhost:3001';

    // Make a GET request to the health check endpoint
    axios
      .get(customBaseURL + healthCheckUrl)
      .then((response) => {
        // Set the health status based on the response
        setHealthStatus(response.data.status);
      })
      .catch((error) => {
        // Handle errors (e.g., network error or server error)
        console.error('Error checking health:', error);
        setHealthStatus('error');
      });
  }, []);

  return (
    <div className="health-check-container">
      <h2 className="health-check-title">Health Check</h2>
      <div className={`health-status ${healthStatus === 'ok' ? 'healthy' : 'error'}`}>
        {healthStatus === 'ok' ? (
          <p>The backend is healthy.</p>
        ) : (
          <p>There was an issue with the backend. Please check the server logs.</p>
        )}
      </div>
    </div>
  );
}

export default HealthCheck;
