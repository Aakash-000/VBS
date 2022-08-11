import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { SidebarDataforadmin } from "../Dealer/SidebarData.js";
import "./adminaccountpage.css";
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import Avatar from '@mui/material/Avatar';


export default function Adminaccount() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebara">
          <Link to="#" className="sidemenua-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sidea-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-ad'>
          <Avatar sx={{ bgcolor: '#ffd43b', color:'#23013f'}}>AD</Avatar>
          <button>Logout</button>
          </div>
        </div>
        <nav className={sidebar ? "sidea-menu active" : "sidea-menu"}>
          <ul className="sidea-menu-items" onClick={showSidebar}>
            <li className="sidea-toggle">
              <Link to="#" className="sidemenua-bars">
                <AiIcons.AiOutlineClose/>
              </Link>
            </li>
            {SidebarDataforadmin.map((item, index) => {
              return (
                <li key={index} className='sidea-text'>
                  <Link to={item.foradmin.path} className='sidebara-pa'>
                    <p>{item.foradmin.icon}{item.foradmin.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* <div className='body_content container-fluid'>
        <div class="card col-lg-12">
        <img src="..." class="card-img-top" alt="..."/>
         <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        </div>
        <div className="body_content_sub container-fluid">
        <div class="row">
        <div class="col-sm-8 col-lg-6">
            <div class="card">
             <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
     </div>
        <div class="col-sm-8 col-lg-6">
        <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
        </div>
        </div>
        </div>
        </div>
        </div> */}
      </IconContext.Provider>
    </>
  );
}
