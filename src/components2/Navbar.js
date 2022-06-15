import React from 'react';
import './navbar.css'
import logo from '../components2/airbnb-logo.png'
export default function Navbar() {
  return (
  <div className='navbar'>
      <div className='navbar_logo'>
          <img src={logo} alt="AirBNB"/>
      </div>
  </div>
    );
}
