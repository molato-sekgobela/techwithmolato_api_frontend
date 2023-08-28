// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css'; // Import the CSS file
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const REGISTER_ENDPOINT = '/api/register';
  const customBaseURL = 'http://localhost:3001';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '', // Add confirmPassword field
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirmation do not match.');
      return;
    }

    try {
      const response = await axios.post(customBaseURL + REGISTER_ENDPOINT, formData);

      if (response.status === 201) {
        setSuccess('Registration successful. You can now log in.');
        // Redirect to the login page after successful registration
        // Delay the redirect to the login page for 5 seconds
        setTimeout(() => {
            navigate('/login');
        }, 5000); // 5000 milliseconds = 5 seconds
      } else {
        setError('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('User with this email or username already exists.');
        } else {
          setError('Registration failed: ' + error.response.data.message);
        }
      } else {
        setError('Registration failed: ' + error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="registration-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-table">
            <h2>Registration</h2>
            <table>
              <tbody>
                <tr>
                  <td><label>Email:</label></td>
                  <td><input type="email" name="email" onChange={handleInputChange} required /></td>
                </tr>
                <tr>
                  <td><label>Username:</label></td>
                  <td><input type="text" name="username" onChange={handleInputChange} required /></td>
                </tr>
                <tr>
                  <td><label>Name:</label></td>
                  <td><input type="text" name="name" onChange={handleInputChange} required /></td>
                </tr>
                <tr>
                  <td><label>Surname:</label></td>
                  <td><input type="text" name="surname" onChange={handleInputChange} required /></td>
                </tr>
                <tr>
                  <td><label>Password:</label></td>
                  <td><input type="password" name="password" onChange={handleInputChange} required /></td>
                </tr>
                <tr>
                  <td><label>Confirm Password:</label></td>
                  <td><input type="password" name="confirmPassword" onChange={handleInputChange} required /></td>
                </tr>
              </tbody>
            </table>
          </div>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
          {success && <div className="success-message" style={{ color: 'green' }}>{success}</div>}
          <div className="bottom-right-button"> {/* Position button at bottom right */}
            <button type="submit" className="register-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
