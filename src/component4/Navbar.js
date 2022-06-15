import React from 'react'
import './navbar.css'
import logo from '../component4/navbar_logo.png'
import {FaOdnoklassniki} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'
import {FaChalkboardTeacher} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import { useState } from 'react'

export default function Navbar() {
  const[MobileRes,SetMobileRes] = useState(false);
  return (
    <div className='navbar'>
        <div className='navbar_logo'>
            <img src={logo} alt="Navbar Logo"/>
           <Link to="/" style={{textDecoration:'none'}}> <h1 className='heading_route'>Venue Booking System</h1></Link>
        </div>
        <div className={MobileRes ? ('navbar_sub_mobile'): ('navbar_sub')} 
        onClick={()=>SetMobileRes(false)}>
            <Link to="/ForAdmin">
            <button><FaChalkboardTeacher style={{color:"#301934",size:"1em"}}/>ForAdmin</button>
            </Link>
            <Link to="/ForCustomer">
            <button><FaOdnoklassniki style={{color:"#301934",size:"1em"}}/>ForCustomer</button>
            </Link>
            <Link to="/ForDealer">
            <button><HiUserGroup style={{color:"#301934",size:"1em"}}/>ForDealer</button>
            </Link>
        </div>
        <button className='mobile-menu-icon' onClick={()=>SetMobileRes(!MobileRes)}>
          {MobileRes ? (<i className='fas fa-times'></i>):(<i className='fas fa-bars'></i>)}
        </button>
    </div>
    
  )
}
