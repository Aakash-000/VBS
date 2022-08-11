import React from 'react'
import {Reacticonsixteen,Reacticonseventeen} from '../../../assets/icons/Reacticon.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './bookingreq.css'
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { SidebarDataforDealer } from "./SidebarData";
import "./dealeraccountpage.css";
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import Avatar from '@mui/material/Avatar';



export default function Bookingreq() {
  const [sidebar, setSidebar] = useState(false);    

  const showSidebar = () => setSidebar(!sidebar);                                                               
        
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
          <Avatar sx={{ bgcolor: '#ffd43b', color:'#23013f'}}>AD</Avatar>
          <button>Logout</button>
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
                  <Link to={item.fordealer.path} className='sidebard-pa'>
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
      <th>Name</th>
      <th>Required Capacity</th>
      <th>Date Selected</th>
      <th>Offered Payment</th>
      <th><Reacticonsixteen/></th>
      <th><Reacticonseventeen/></th>
        </tr>
        </thead>
        <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Rs 50000</td>
      <td><button className='button_accept'>Accept</button></td>
      <td><button className='button_cancel'>Cancel</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Rs 70000</td>
      <td><button className='button_accept'>Accept</button></td>
      <td><button className='button_cancel'>Cancel</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td>Larry</td>
      <td>the bird</td>
      <td>@twitter</td>
      <td>Rs 80000</td>
      <td><button className='button_accept'>Accept</button></td>
      <td><button className='button_cancel'>Cancel</button></td>
    </tr>
        </tbody>
        </table>
        </div>
        </div>
    )
}
