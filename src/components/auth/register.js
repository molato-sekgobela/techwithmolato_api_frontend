import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import LandingPage from '../layout/header'

axios.defaults.baseURL= 'https://s-creations.co.za'

const Register = () => {

  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // * Post form info to /register endpoint on submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      console.log(formData.password + formData.password_confirmation)
      return;
    }
    try {
      
      await axios.post('/api/users/register', formData)
      alert('REGISTRATION SUCCESSFUL -->')
      console.log('REGISTRATION SUCCESSFUL -->', formData)
      navigate('/')
      // ^ post the form data and navigate to login page

    } catch (error) {
      setError(error.response.data.error);
    }
    
  };
  return (
    <div>
    <LandingPage />
    <Container className='page-container form-container'>
      <Row>
        <form className='login-form col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-4' onSubmit={handleSubmit}>

          <h2 className='page-title auth-title text-center'>REGISTER</h2>
          

          {/* Name */}
          <label htmlFor="username" className='label'>Name</label>
          <input type="text" name='username' className='input' placeholder='username' required value={formData.username} onChange={handleChange} />
          {/* Name */}
          <label htmlFor="nickname" className='label'>What's your favourite nickname?</label>
          <input type="text" name='nickname' className='input' placeholder='nickname' required value={formData.nickname} onChange={handleChange} />
          {/* Email */}
          <label htmlFor="email" className='label'>Email</label>
          <input type="email" name='email' className='input' placeholder='email' required value={formData.email} onChange={handleChange} />
          {/* Password */}
          <label htmlFor="password" className='label'>Password</label>
          <input type="password" name='password' className='input' placeholder='password' required value={formData.password} onChange={handleChange}/>
          {/* Password Confirmation*/}
          <label htmlFor="password_confirmation" className='label'>Password confirmation</label>
          <input type="password" name='password_confirmation' className='input' placeholder='password confirmation' required value={formData.password_confirmation} onChange={handleChange}/>
          {/* * ADD ERRORS IN WHEN GOT TOKEN ETC */}
          {error && <p className='text-center text-danger' style={{ color: 'red' }}>{error}</p>}
      
          {/* Submit */}
          <button type='submit' className='btn' id='login-btn'>Register me</button>
          <Link className='link text-center' id='register-link' to='/'>Already a member? click to Login</Link>
        </form>
      </Row>
    </Container>
    </div>
  )
}

export default Register