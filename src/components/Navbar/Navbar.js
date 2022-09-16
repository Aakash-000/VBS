import React, { useState,useEffect } from 'react'
import './navbar.css'
import logo from '../../assets/images/navbar_logo_bgr.png'
import {Link,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Reacticonfive,Reacticonsix,Reacticontwentyseven,Reacticontwentyeight} from '../../assets/icons/Reacticon.js'
import { Icon } from '@mui/material';
import { IconContext } from 'react-icons/lib/cjs';

export default function Navbar() {
  const navigate = useNavigate();
  const[MobileRes,SetMobileRes] = useState(false);
  const[navbarColor,setnavbarColor] = useState(false);
// const[isActive,setisActive] = useState({forAbout:false,forAdmin:false,forCustomer:false,forDealer:false});
  
  
//   const handleAboutButton = ()=>{
//     setisActive(()=>({...isActive,forAdmin:false,forAbout:true,forCustomer:false,forDealer:false}))
//     SetMobileRes(false)
//   }
//   const handleAdminButton = () => {
//     SetMobileRes(false)
//     setisActive(()=>({...isActive,forAdmin:true,forAbout:false,forCustomer:false,forDealer:false}))
//   }
//   const handleCustomerButton = () =>{
//     setisActive(()=>({...isActive,forAdmin:false,forAbout:false,forCustomer:true,forDealer:false}))
//     SetMobileRes(false)
//   }
//   const handleDealerButton = () =>{
//     setisActive(()=>({...isActive,forAdmin:false,forAbout:false,forCustomer:false,forDealer:true}))
//     SetMobileRes(false)
//   }
    const changeBackground = ()=>{
      if(window.scrollY >= 80){
        setnavbarColor(true)
      }else{
        setnavbarColor(false)
      }
    }
    window.addEventListener('scroll',changeBackground)

  return (
        <nav className={'navbar sticky-top'}>
         <div className='navbar_logo'>
        <Link to="/" style={{textDecoration:'none'}}><img src={logo} alt="Navbar Logo"/></Link>
        </div>
        <div className={MobileRes ? ('navbar_sub_mobile') : ('navbar_sub')}>
            <Link to='/'>
            <button  className='about_but'
            onClick={()=>SetMobileRes(false)}><Reacticonfive className="navbar_navicon"/>About us</button>
           </Link>
            <Link to="/explorevenue/normal">       
            <button className='styl_exp'><Reacticonsix className="navbar_navicon"/>Explore</button>
            </Link>

            <Link to="/login">
            <button onClick={()=>SetMobileRes(false)}
            style={{display:'flex'}}>
            <Reacticontwentyseven className="navbar_navicon"/>SignIn</button>
            </Link>
          
            <div class="dropdown">
            <button onClick={()=>SetMobileRes(false)}
            style={{display:'flex'}}
            href="#" id="navbarDropdown" role="button" 
            data-bs-toggle="dropdown" aria-expanded="false">
            <Reacticontwentyeight className="navbar_navicon"/>SignUp</button>
            <ul class="dropdown_navbar_signup dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to="/customerregistration" class="dropdown-item">As Customer</Link></li>
            <li><Link to="/dealerregistration" class="dropdown-item">As Dealer</Link></li>
            </ul>
            </div>   
        </div>
        <button className='mobile-menu-icon' onClick={()=>SetMobileRes(!MobileRes)}>
          {MobileRes ? (<i className='fas fa-times' ></i>):(<i className='fas fa-bars'></i>)}
        </button> 
        </nav>
  )
}
