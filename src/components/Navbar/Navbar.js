import React, { useState,useEffect } from 'react'
import './navbar.css'
import logo from '../../assets/images/navbar_logo_bgr.png'
import {FaOdnoklassniki,FaChalkboardTeacher,FaLinkedin} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'
import {Link,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Reacticonfive,Reacticonsix} from '../../assets/icons/Reacticon.js'

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
            onClick={()=>SetMobileRes(false)}><Reacticonfive style={{marginBottom:'10px'}}/>Aboutus</button>
           </Link>
            <Link to="/explorevenue/normal">       
            <button className='styl_exp'><Reacticonsix className='buttonicon'/>Explore</button>
            </Link>
            
            <Link to='/adminlogin'>
            <button onClick={()=>SetMobileRes(false)}><FaChalkboardTeacher size={16} className='buttonicon'/>Admin</button>
            </Link>
            
            <Link to="/customerlogin"><button onClick={()=>SetMobileRes(false)} ><FaOdnoklassniki size={16} className='buttonicon'/>Customer</button>
            </Link>  
            
            <Link to="/dealerlogin"><button onClick={()=>SetMobileRes(false)} ><HiUserGroup size={16} className='buttonicon'/>Dealer</button>
            </Link>
        </div>
        <button className='mobile-menu-icon' onClick={()=>SetMobileRes(!MobileRes)}>
          {MobileRes ? (<i className='fas fa-times' ></i>):(<i className='fas fa-bars'></i>)}
        </button> 
        </nav>
        
  )
}
