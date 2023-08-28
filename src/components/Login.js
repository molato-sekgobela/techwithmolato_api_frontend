import React, { useState } from 'react';
import './Login.css';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LOGIN_ENDPOINT = 'api/login';
const customBaseURL = 'http://localhost:3001';

function Login({ isLoggedOut }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        LOGIN_ENDPOINT,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          baseURL: customBaseURL,
        }
      )
      .then((response) => {
        // Handle successful login
        alert('Login successful');
        setError(null);

        const { token, is_admin, user_id } = response.data;

        // Store the token, user role (admin or user), and user ID in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('is_admin', is_admin);
        localStorage.setItem('user_id', user_id);

        // Redirect based on the user's role
        if (is_admin) {
          navigate('/admindashboard');
        } else {
          navigate('/userdashboard');
        }
      })
      .catch((error) => {
        // Handle errors
        if (error.response) {
          // ...
        } else {
          // ...
        }
      });
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {error && (
              <div className="error-message" style={{ color: 'red' }}>
                {error}
              </div>
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
