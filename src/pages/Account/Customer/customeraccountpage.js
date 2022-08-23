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
import Explorevenue from '../../../component4/Explorevenue.js'
import Bookingform from './Bookingform.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { CgArrowsExpandDownRight } from "react-icons/cg";


export function VenuecarddetailCustomer(){  
  const[getregvenue,setgetregvenue] = useState([]);
  const {id} = useParams();
  const[noToken,setnoToken] = useState(false);
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken]) 
    
    // const filterImg = getregvenue.find((item)=> item.id == id) 
    return (
      <>
      {!noToken?(
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
  </div>):(<div>You are logged out of page.Please login to continue.</div>)}
      </>
    )
}

  
export default function Customeraccount() {
  
  const navigate = useNavigate();
  const {email,customername} = useParams();
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const[noToken,setnoToken] = useState(false);
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken]) 

    const config = {  
      headers:{                                                                                                 
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
      }
    }

    useEffect(async()=>{
      function getVenue(){
        axios.get('https://venue-booking-system2.herokuapp.com/client-',config)
        .then(response => {console.log(response)})                                                            
        .catch(err => {console.log(err)});                                                                     
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
    <>
     {!noToken?(
   <div>
        <IconContext.Provider value={{ color: "#011627" }}>
          <div className="sidebarc sticky-top">
            <Link to="#" className="sidemenuc-bars">
              <FaIcons.FaBars onClick={showSidebar} />
              <div className='sidec-logo'>
                <img src={Logo} alt='logo'/>
            </div>
            </Link>
            <div className='right-group-cus'>
            <p>{customername}</p>
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
                    <Link to={`${item.forcustomer.path}`+`/${email}`+`/${customername}`} className='sidebarc-pa'>
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
        </div>):(<div>You are logged out of page.Please login to continue.</div>)}
    </>
  );
  
}

export function MybookedVenue(){
  const[noToken,setnoToken] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const[mybookedVenverify,setmybookedVenverify] = useState([]);
  const[mybookedVenpen,setmybookedVenpen] = useState([]);

  const {email,customername} = useParams();
  const navigate = useNavigate();
                                                  
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken]) 
  const config = {  
    headers:{                                                                                                 
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
    }
  }
  useEffect(async()=>{
    try{
    let response = await axios.get(`https://venue-booking-system2.herokuapp.com/client-/booking/${email}`,config);
    console.log(response)
    const verifiedData = response.data.data.filter((item)=>{
      return item.venueStatus === "VERIFY";
    })
    setmybookedVenverify(verifiedData)
    }catch(err){
      console.log(err)
    }
  },[])

  useEffect(async()=>{
    try{
    let response = await axios.get(`https://venue-booking-system2.herokuapp.com/client-/booking/${email}`,config);
    console.log(response)
    const pendingData = response.data.data.filter((item)=>{
      return item.venueStatus === "PENDING";
    })
    setmybookedVenpen(pendingData)
    }catch(err){
      console.log(err)
    }
  },[])

  const logout = (e)=> {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/customerlogin');
    window.location.reload();
}
  
  
  return(
    <>
     {!noToken?(
       <div>
        <IconContext.Provider value={{ color: "#011627" }}>
          <div className="sidebarc sticky-top">
            <Link to="#" className="sidemenuc-bars">
              <FaIcons.FaBars onClick={showSidebar} />
              <div className='sidec-logo'>
                <img src={Logo} alt='logo'/>
            </div>
            </Link>
            <div className='right-group-cus'>
            <p>{customername}</p>
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
                    <Link to={`${item.forcustomer.path}`+`/${email}`+`/${customername}`} className='sidebarc-pa'>
                      <p>{item.forcustomer.icon}{item.forcustomer.title}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          </IconContext.Provider>
            <div className={sidebar ? 'table_container_push container-fluid' : 'table_container_extend container-fluid'}>
            <p className='table_container_title'>Successfully Booked Venue</p>
            <table class="table_container_body table  table-bordered">
            <thead>
            <tr>
          <th>SN</th>
          <th>Function Type</th>
          <th>Required Capacity</th>
          <th>Date Selected</th>
          <th>Calculated Payment</th>
          <th>Booking Status</th>
          <th>Venue Detail</th>
            </tr>
            </thead>
            <tbody>
              {mybookedVenverify.map((val,index)=>(              
              <tr key={index+1}>
            <th>{index+1}</th>
          <td>{val.functionType}</td>
          <td>{val.requiredCapacity}</td>
          <td>{val.bookingDate}</td>
          <td>{val.calculatedPayment}</td>
          <td>{val.bookingStatus}</td>
          <div class="modal-body">
          <pre>FullName:{val.venue.userName}</pre>
          <pre>VenueName:{val.venue.venueName}</pre>
          <pre>Email:{val.venue.email}</pre>
          <pre>ContactNumber:{val.venue.contactNumber}</pre>
          </div>
            </tr>
              ))}
            </tbody>
            </table>
            </div>
            <div className={sidebar ? 'table_container_push container-fluid' : 'table_container_extend container-fluid'}>
            <p className='table_container_title'>Pending Venue for Booking</p>
            <table class="table_container_body table  table-bordered">
            <thead>
            <tr>
          <th>SN</th>
          <th>Function Type</th>
          <th>Required Capacity</th>
          <th>Date Selected</th>
          <th>Calculated Payment</th>
          <th>Booking Status</th>
          <th>Venue Detail</th>
            </tr>
            </thead>
            <tbody>
              {mybookedVenpen.map((val,index)=>(              
              <tr key={index+1}>
            <th>{index+1}</th>
          <td>{val.functionType}</td>
          <td>{val.requiredCapacity}</td>
          <td>{val.bookingDate}</td>
          <td>{val.calculatedPayment}</td>
          <td>{val.bookingStatus}</td>
          <div class="modal-body">
          <pre>FullName:{val.venue.userName}</pre>
          <pre>VenueName:{val.venue.venueName}</pre>
          <pre>Email:{val.venue.email}</pre>
          <pre>ContactNumber:{val.venue.contactNumber}</pre>
          </div>
            </tr>
              ))}
            </tbody>
            </table>
            </div>
            </div>
          ):(<div>You are logged out of page please login and try again.</div>)}
          </>
  )
}

