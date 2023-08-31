import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokenToLocalStorage } from '../helpers/auth.js';
import LandingPage from '../layout/header'
import HealthStatus from '../core/healthstatus'

axios.defaults.baseURL= 'https://s-creations.co.za';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', // Updated field name to 'email'
    password: '',
  });
  const [errors, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  }

  // Submit login request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', formData);
      const accessKey = data.access;
      setTokenToLocalStorage(accessKey);

      if (!data.is_admin)
        navigate('/dashboard', { state: { userId: data.id } });
      else
        navigate('/admindashboard', { state: { loggedInId: data.id } });
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (status === 500) {
          setError('User does not Exist!');
        } else {
          setError(`Error ${status}: ${data.message}`);
        }
      } else if (error.request) {
        setError('No response received from the server. Please check your internet connection.');
      } else {
        setError('An error occurred during the request.');
      }
    }
  };

  return (
    <div>
      <LandingPage />
    <Container className='page-container form-container'>
      <form className='login-form mt-4' onSubmit={handleSubmit}>
        <h2 className='page-title auth-title text-center'>Account Login</h2>

        {/* Email */}
        <label htmlFor="email" className='label'>Email</label>
        <input type="email" name='email' className='input' placeholder='Email' required value={formData.email} onChange={handleChange} />
        
        {/* Password */}
        <label htmlFor="password" className='label'>Password</label>
        <input type="password" name='password' className='input' required placeholder='Password' value={formData.password} onChange={handleChange} />
        
        {/* Display Errors */}
        {errors && <p className='text-center text-danger'> ❌ {errors} ❌ </p> }

        {/* Submit */}
        <button type='submit' className='btn' id='login-btn'>Login</button>

        <Link className='link text-center' id='register-link' to='/register'>Not a member yet? Create Account.</Link>
      </form>
    </Container>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    < HealthStatus />
    </div>
  )
}

export default Login;
