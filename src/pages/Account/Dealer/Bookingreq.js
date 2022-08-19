import React from 'react'
import {Reacticonsixteen,Reacticonseventeen} from '../../../assets/icons/Reacticon.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './bookingreq.css'
import { useState,useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link,useParams,useNavigate } from "react-router-dom";
import { SidebarDataforDealer } from "./SidebarData";
import "./dealeraccountpage.css";
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import Avatar from '@mui/material/Avatar';
import axios from 'axios'


export default function Bookingreq() {
  const [sidebar, setSidebar] = useState(false);    
  const {dealeremail} = useParams();
  const showSidebar = () => setSidebar(!sidebar);
  const[reqVen,setreqVen]=useState([]);   

  const navigate = useNavigate();
  
  const logout = (e)=> {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/dealerlogin');
    window.location.reload();
  }

  const config = {  
    headers:{
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
    }
    }

    useEffect(async() => {
      try{
      let response =await axios.get(`https://venue-booking-system2.herokuapp.com/venue-/requests/${dealeremail}`,config)
      console.log(response)
      setreqVen(response.data.data)
      }catch(err){
        console.log(err)
      }
      }, [])


       return (
        <div>
           <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebard">
          <Link to="#" className="sidemenud-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sided-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-de'>
          <p>{dealeremail}</p>
          <button onClick={logout}>Logout</button>
          </div>
        </div>
        <nav className={sidebar ? "sided-menu active" : "sided-menu"}>
          <ul className="sided-menu-items" onClick={showSidebar}>
            <li className="sided-toggle">
              <Link to="#" className="sidemenud-bars">
                <AiIcons.AiOutlineClose/>
              </Link>
            </li>
            {SidebarDataforDealer.map((item, index) => {
              return (
                <li key={index} className={item.fordealer.cName}>
                  <Link to={`${item.fordealer.path}`+`/${dealeremail}`} className='sidebard-pa'>
                    <p>{item.fordealer.icon}{item.fordealer.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
        <div className={sidebar ? 'table_container_push container-fluid' : 'table_container_extend container-fluid'}>
        <p className='table_container_title'>Booking Request of Customers</p>
        <table class="table_container_body table  table-bordered">
        <thead>
        <tr>
      <th>SN</th>
      <th>Function Type</th>
      <th>Required Capacity</th>
      <th>Date Selected</th>
      <th>Calculated Payment</th>
      <th><Reacticonsixteen/></th>
      <th><Reacticonseventeen/></th>
        </tr>
        </thead>
        <tbody>
    {reqVen.map((item,index)=>(
      <tr>
      <th>{index}</th>
      <td>{item.functionType}</td>
    <td>{item.requiredCapacity}</td>
    <td>{item.bookingDate}</td>
    <td>{item.calculatedPayment}</td>
      <td><button className='button_accept'>Accept</button></td>
      <td><button className='button_cancel'>Cancel</button></td>
    </tr>))}
        </tbody>
        </table>
        </div>
        </div>
    )
}