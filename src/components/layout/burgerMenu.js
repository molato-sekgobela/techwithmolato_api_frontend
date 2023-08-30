import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getTokenFromLocalStorage } from '../helpers/auth.js'

const BurgerMenu = () => {
  const navigate = useNavigate();

  const userHasToken = getTokenFromLocalStorage()
  console.log('User token -->', userHasToken)

  // * REVEAL DROPDOWN MENU ON CLICK
  const menuReveal = () => {
    let menu = document.getElementById('burger-menu')
    menu.classList.toggle('active')

    let burger = document.getElementById('burger')
    burger.classList.toggle('active')
  }

  const menuDisappear = () => {
    let menu = document.getElementById('burger-menu')
    menu.classList.remove('active')

    let burger = document.getElementById('burger')
    burger.classList.remove('active')
  }

  // * HANDLE LOGOUT
  const handleLogout = () => {
    // Perform any logout-related actions here, such as clearing local storage, destroying tokens, etc.
    localStorage.removeItem('access');
    // Redirect the user to the login page or any desired route after logout
    // alert('You have been logged out!')
    navigate('/');
    menuDisappear()
  };

  return (
    <div className='header-item burger-nav'>
      <div id='burger-menu' className='burger-menu'>
        {!userHasToken ?
          <h3 onClick={menuDisappear}><Link to='/' className='burger-link'>Login</Link></h3>
          :
          <h3 onClick={handleLogout}><Link to='/' className='burger-link'>Log out</Link></h3>
        }
      </div>
      {/* <div id='burger-menu' className='burger-menu'>
        
      </div> */}
      <div id='burger' className='burger-icon' onClick={menuReveal}>
        <div className='burger-line'></div>
        <div className='burger-line'></div>
        <div className='burger-line'></div>
      </div>
    </div>
  )
}

export default BurgerMenu