import React from 'react';
import logo from '../components1/react-logo.png'
import './navbar.css'
export default function Navbar() {
  return (
  <div className='navbar'>
      <div className='navbar_logo'>
        <img src={logo} alt="React Logo"/>
        <h1 className='react_fact'>ReactFacts</h1>
        <div className='navbar_link'>
            <p><a href="#home">Pricing</a></p>
            <p><a href="#home">About</a></p>
            <p><a href="#home">Contact</a></p>
        </div>
  </div>
  </div>
    );
}
