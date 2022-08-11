import React, { useState ,useEffect} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link, Navigate } from "react-router-dom";
import { SidebarDataforcustomer } from "../Dealer/SidebarData.js";
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'
import "./customeraccountpage.css";
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import Avatar from '@mui/material/Avatar';
import {Reacticonfifteen} from '../../../assets/icons/Reacticon.js'
import Explorevenue from '../../../component4/Explorevenue.js'
import Bookingform from './Bookingform.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


export function VenuecarddetailCustomer(){  
  const[getregvenue,setgetregvenue] = useState([]);
  const {id} = useParams();
  

    useEffect(()=>{
    axios.get(`https://venue-booking-system2.herokuapp.com/venue/${id}`)
    .then(response=>(setgetregvenue(response.data.data)));
    }
    ,[])
    console.log(getregvenue);
    // const filterImg = getregvenue.find((item)=> item.id == id) 
    return (
      <>
      <div className='card_detail_customer container-fluid'>
      <div class="card_customer mb-3" style={{width:'800px',height:'500px'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card_body_cus">
        <h5 class="card-title">{getregvenue.venueName}</h5>
        <h3>Location:{getregvenue.address}</h3>
        <p class="card-text">Email:{getregvenue.email}</p>
        <p class="card-text">OwnerName:{getregvenue.userName}</p>
        <p class="card-text">ContactNumber:{getregvenue.contactNumber}</p>
        <Bookingform/>
      </div>
    </div>
  </div>
    </div>
  </div>
      </>
    )
}

  
export default function Customeraccount() {
  
  const navigate = useNavigate();
  const {email} = useParams();
  const [sidebar, setSidebar] = useState(true);
  const[customerdetail,setcustomerDetail] = useState([]);
  const[noToken,setnoToken] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
    const config = {  
      headers:{
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
      }
    }

    useEffect(() => {
        if(sessionStorage.length == 0){
          setnoToken(true);
        }else{
          setnoToken(false);
        }
    }, [noToken])


    useEffect(async()=>{
      function getUser(){
        axios.get(`https://venue-booking-system2.herokuapp.com/client-/${email}`,config)
        .then(response => {
          console.log(response.data.data) 
          setcustomerDetail(response.data.data)
        })
        .catch(err=> {console.log(err)});
      }
       getUser();
    },[])

    useEffect(async()=>{
      function getVenue(){
        axios.get('https://venue-booking-system2.herokuapp.com/client-',config)
        .then(response => {console.log(response)})
        .catch(err=> {console.log(err)});
      }
      getVenue();
    },[])
    
    const logout = (e)=> {
      sessionStorage.removeItem('token');
      sessionStorage.clear();
      navigate('/customerlogin');
      window.location.reload();
  }
    

  return (
    <>{noToken ? (<div className='logout_message'><Reacticonfifteen /><strong>You are logged out from the page.Please login to continue.</strong></div>)
      : 
    (<div>
        <IconContext.Provider value={{ color: "#011627" }}>
          <div className="sidebarc sticky-top">
            <Link to="#" className="sidemenuc-bars">
              <FaIcons.FaBars onClick={showSidebar} />
              <div className='sidec-logo'>
                <img src={Logo} alt='logo'/>
            </div>
            </Link>
            <div className='right-group-cus'>
            <p>{customerdetail.name}</p>
            <button onClick={logout}>Logout</button>
            </div>
          </div>
          <nav className={sidebar ? "sidec-menu active" : "sidec-menu"}>
            <ul className="sidec-menu-items" onClick={showSidebar}>
              <li className="sidec-toggle">
                <Link to="#" className="sidemenuc-bars">
                  <AiIcons.AiOutlineClose/>
                </Link>
              </li>
              {
              SidebarDataforcustomer.map((item, index) => {
                return (
                  <li key={index} className='sidec-text' onClick={showSidebar}>
                    <Link to={`${item.forcustomer.path}`+`/${email}`} className='sidebarc-pa'>
                      <p>{item.forcustomer.icon}{item.forcustomer.title}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          </IconContext.Provider>
        <div className='body_content'>
          { sidebar ? (<div className='pushexplore'>
            <Explorevenue/>
        </div>): (<div className='stretchexplore'>
          <Explorevenue/></div>)}
        {sidebar ? (<div className="body_content_sub_push ">
        <div class   ="row">
        <div class="col-sm-8 col-lg-6 col-xl-6">
            <div class="card">
             <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
     </div>
        <div class="col-sm-8 col-lg-6 col-xl-6">
        <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
        </div>
        </div>
        </div>
        </div>):(
          <div className="body_content_sub_extend col-xl-8">
          <div class="row">
          <div class="col-sm-8 col-lg-6 col-xl-6">
              <div class="card">
               <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
       </div>
          <div class="col-sm-8 col-lg-6 col-xl-6">
          <div class="card">
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
          </div>
          </div>
          </div>
          </div>)}
        </div>
        </div>
    )}
    </>
  );
  
}
