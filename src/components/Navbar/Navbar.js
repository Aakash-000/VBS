import React, { useState,useEffect } from 'react'
import './navbar.css'
import logo from '../../assets/images/navbar_logo_bgr.png'
import {FaOdnoklassniki,FaChalkboardTeacher} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'
import {IoLogoGithub} from 'react-icons/io'
import {BsFacebook} from 'react-icons/bs'
import {FaLinkedin} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Navbar() {
  const[MobileRes,SetMobileRes] = useState(false);
 
  return (
    // <div className='navbar'>
    //     <div className='navbar_logo'>
    //     <Link to="/" style={{textDecoration:'none'}}><img src={logo} alt="Navbar Logo"/></Link>
    //     </div>
    //     <div className={MobileRes ? ('navbar_sub_mobile') : ('navbar_sub')} 
    //     onClick={()=>SetMobileRes(false)}>
    //         <Link to="aboutus">
    //         <button><FaChalkboardTeacher style={{color:"#301934",size:"1em"}}/>Aboutus</button>
    //         </Link>
    //         <Link to="explorevenue">
    //         <button><FaChalkboardTeacher style={{color:"#301934",size:"1em"}}/>Explore</button>
    //         </Link>
    //         <Link to="adminlogin">
    //         <button><FaChalkboardTeacher style={{color:"#301934",size:"1em"}}/>Admin</button>
    //         </Link>
    //         <Link to="customerlogin">
    //         <button><FaOdnoklassniki style={{color:"#301934",size:"1em"}}/>Customer</button>
    //         </Link>
    //         <Link to="dealerregistration">
    //         <button><HiUserGroup style={{color:"#301934",size:"1em"}}/>Dealer</button>
    //         </Link>
    //     </div>
    //     <button className='mobile-menu-icon' onClick={()=>SetMobileRes(!MobileRes)}>
    //       {MobileRes ? (<i className='fas fa-times'></i>):(<i className='fas fa-bars'></i>)}
    //     </button>
    // </div>
        <nav class="navbar sticky-top">
         <div className='navbar_logo'>
        <Link to="/" style={{textDecoration:'none'}}><img src={logo} alt="Navbar Logo"/></Link>
        </div>
        <div className={MobileRes ? ('navbar_sub_mobile') : ('navbar_sub')}>
            <Link to="/aboutus">
            <button><FaChalkboardTeacher className='buttonicon'/>Aboutus</button>
            </Link>
            <Link to="/explorevenue">
            <button className='styl_exp'><FaChalkboardTeacher className='buttonicon'/>Explore</button>
            </Link>
            <div className="dropdown" >
            <button id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><FaChalkboardTeacher className='buttonicon'/>Admin</button>
            <ul className="dropdown-menu" onClick={(()=>SetMobileRes(false))} aria-labelledby="dropdownMenuLink">
            <li><Link to="/adminlogin" className="dropdown-item">Login</Link></li>
            </ul>
            </div>
            <div className="dropdown">
            <button id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><FaOdnoklassniki className='buttonicon'/>Customer</button>
            <ul className="dropdown-menu" onClick={(()=>SetMobileRes(false))} aria-labelledby="dropdownMenuLink">
            <li><Link to="/customerlogin" className="dropdown-item">Login</Link></li>
            </ul>
            </div>
            <div className="dropdown">
            <button id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><HiUserGroup className='buttonicon'/>Dealer</button>
            <ul className="dropdown-menu" onClick={(()=>SetMobileRes(false))} aria-labelledby="dropdownMenuLink">
            <li><Link to="/dealerlogin" className="dropdown-item">Login</Link></li>
            <li><Link to="/dealerregistration" className="dropdown-item">Register</Link></li>
            </ul>
            </div>
            <IoLogoGithub className='mediaicon'/>
            <BsFacebook className='mediaicon'/>
            <FaLinkedin className='mediaicon'/>
        </div>
        <button className='mobile-menu-icon' onClick={()=>SetMobileRes(!MobileRes)}>
          {MobileRes ? (<i className='fas fa-times' ></i>):(<i className='fas fa-bars'></i>)}
        </button> 
        </nav>
        
  )
}
