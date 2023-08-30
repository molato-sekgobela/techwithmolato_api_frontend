import React from 'react'

import TechWithMolatoLogo from '../../assets/logos/logo.png'
import BurgerMenu from './burgerMenu'
import Footer from './footer'

const LandingPage = () => {

  return (
    <header className="header text-center">
      <div className="header-item">
        <img src={TechWithMolatoLogo} className="header-logo" alt="logo" />
      </div>
    </header>
    
  )
}

export default LandingPage