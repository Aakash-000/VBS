import React, { useState,useEffect } from 'react'
import './navbar.css'
import logo from '../../assets/images/navbar_logo_bgr.png'
import {FaOdnoklassniki,FaChalkboardTeacher,FaLinkedin} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Reacticonfive,Reacticonsix} from '../../assets/icons/Reacticon.js'
export default function Navbar() {
  const[MobileRes,SetMobileRes] = useState(false);

  return (
        <nav className={'navbar sticky-top'}>
         <div className='navbar_logo'>
        <Link to="/" style={{textDecoration:'none'}}><img src={logo} alt="Navbar Logo"/></Link>
        </div>
        <div className={MobileRes ? ('navbar_sub_mobile') : ('navbar_sub')}>
            <Link to="/">
            <button className='about_but'><Reacticonfive className='buttonicon'/>Aboutus</button>
            </Link>
            <Link to="/explorevenue">       
            <button className='styl_exp'><Reacticonsix className='buttonicon'/>Explore</button>
            </Link>
            
            <Link to="/adminlogin"><button onClick={(()=>SetMobileRes(false))} aria-expanded="false"><FaChalkboardTeacher size={16} className='buttonicon'/>Admin</button>
            </Link> 
            
          
            <Link to="/customerlogin"><button onClick={(()=>SetMobileRes(false))} aria-expanded="false"><FaOdnoklassniki size={16} className='buttonicon'/>Customer</button>
            </Link>  
            
            <Link to="/dealerlogin"><button onClick={(()=>SetMobileRes(false))} aria-expanded="false"><HiUserGroup size={16} className='buttonicon'/>Dealer</button>
            </Link>
        </div>
        <button className='mobile-menu-icon' onClick={()=>SetMobileRes(!MobileRes)}>
          {MobileRes ? (<i className='fas fa-times' ></i>):(<i className='fas fa-bars'></i>)}
        </button> 
        </nav>
        
  )
}
