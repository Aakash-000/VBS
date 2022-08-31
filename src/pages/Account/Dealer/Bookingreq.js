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
import axios from 'axios'


export default function Bookingreq() {
  const [sidebar, setSidebar] = useState(false);    
  const {dealeremail,dealername} = useParams();
  const showSidebar = () => setSidebar(!sidebar);
  const[reqVen,setreqVen]=useState([]);  
  const[noToken,setnoToken] = useState(false);
  const[accept,setAccept]=useState(false);
  const[cancel,setCancel ] =useState(false);
  const navigate = useNavigate();
  const[dealerdetail,setdealerdetail ] = useState([]);
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken])

  
  useEffect(()=>{
    async function getVenue(){
      let response = await axios.get(`https://venue-booking-system2.herokuapp.com/venue-/${dealeremail}`,config);
      console.log(response)
      setdealerdetail(response.data.data)
    }
    getVenue()
  },[])

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
      setAccept(false)
      setCancel(false)
      }catch(err){
        console.log(err)
      }
      },[accept,cancel])

      async function handleAccept(key){
        try{
          let response = await axios.put(`https://venue-booking-system2.herokuapp.com/venue-/response/${reqVen[key].id}`,
                {
                  "status": 1
                }    
            ,config
        );
        console.log(response)
        setAccept(true)
        }catch(err){  
          console.log(err)
          setAccept(false)
          }
      }
      async function handleCancel(key){
        try{
          let response = await axios.put(`https://venue-booking-system2.herokuapp.com/venue-/response/${reqVen[key].id}`,
                {
                  "status": 2
                }    
            ,config
        );
        console.log(response)
        setCancel(true)
        }catch(err){  
          console.log(err)
          setCancel(false)
          }
      }

       return (
         <>
         {!noToken ?(
        <div>
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
          <p>{dealerdetail.userName}</p>
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
                  <Link to={`${item.fordealer.path}`+`/${dealeremail}`+`/${dealername}`} className='sidebard-pa'>
                    <p>{item.fordealer.icon}{item.fordealer.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
        </div>
        <div className="table_t">
        <div className={sidebar ? 'table_container_push container-fluid' : 'table_container_extend container-fluid'}>
        <p className='table_container_req_title'>Booking Request of Customers</p>
        <table class="table_container_req_body table  table-bordered">
        <thead>
        <tr>
      <th>SN</th>
      <th>Customer Detail</th>
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
      <tr key={index}>
      <th>{index+1}</th>
          <div class="modal-body">
          <pre>FullName:{item.client.name}</pre>
          <pre>VenueName:{item.client.email}</pre>
          <pre>Email:{item.client.mobile_no}</pre>
          </div>
      <td>{item.functionType}</td>
    <td>{item.requiredCapacity}</td>
    <td>{item.bookingDate}</td>
    <td>{item.calculatedPayment}</td>
      <td><button className='button_accept' onClick={()=>handleAccept(index)}>Accept</button></td>
      <td><button className='button_cancel' onClick={()=>handleCancel(index)}>Cancel</button></td>
    </tr>
    ))}
        </tbody>
        </table>
        </div>
        </div>
        </div>):(<div>You are logged out of page.Please login and try again.</div>)}
        </>
    )
}
export function Bookingreqstatus(){
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);    
  const {dealeremail,dealername} = useParams();
  const showSidebar = () => setSidebar(!sidebar);
  const[reqVenverify,setreqVenverify] = useState([]);  
  const[reqVenpen,setreqVenpen] = useState([]);
  const[reqVenunsucc,setreqVenunsucc] = useState([]);
  const[noToken,setnoToken] = useState(false);
  const[dealerdetail,setdealerdetail ] = useState([]);

  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken])

  
  useEffect(()=>{
    async function getVenue(){
      let response = await axios.get(`https://venue-booking-system2.herokuapp.com/venue-/${dealeremail}`,config);
      console.log(response)
      setdealerdetail(response.data.data)
    }
    getVenue()
  },[])

  const logout = (e)=> {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    localStorage.clear();
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
      let response =await axios.get(`https://venue-booking-system2.herokuapp.com/venue-/booking/${dealeremail}`,config)
      console.log(response)
      const pendingdata = response.data.data.filter((item)=>{
        return item.bookingStatus === "PENDING"
      })
      const unsuccessfuldata = response.data.data.filter((item)=>{
        return item.bookingStatus === "CANCELED";
      })
      const verifieddata = response.data.data.filter((item)=>{
        return item.bookingStatus === "ACCEPTED"
      })
      setreqVenpen(pendingdata)
      setreqVenverify(verifieddata)
      setreqVenunsucc(unsuccessfuldata)
      }catch(err){
        console.log(err)
      }
      },[])


       return (
         <>
         {!noToken ?(
        <div>
          <div>
           <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebard sticky-top">
          <Link to="#" className="sidemenud-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sided-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-de'>
          <p>{dealerdetail.userName}</p>
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
                  <Link to={`${item.fordealer.path}`+`/${dealeremail}`+`/${dealerdetail.userName}`} className='sidebard-pa'>
                    <p>{item.fordealer.icon}{item.fordealer.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
        </div>
        <div className="table_t">
        <div className={sidebar ? 'table_container_push container-fluid' : 'table_container_extend container-fluid'}>
        <p className='table_container_req_title'>Pending Booking Request of Customers</p>
        <table class="table_container_req_body table  table-bordered">
        <thead>
        <tr>
      <th>SN</th>
      <th>Customer Detail</th>
      <th>Function Type</th>
      <th>Required Capacity</th>
      <th>Date Selected</th>
      <th>Calculated Payment</th>
      <th>Request Status</th>
        </tr>
        </thead>
        <tbody>
    {reqVenpen.map((item,index)=>(
      <tr key={index}>
      <th>{index+1}</th>
          <div class="modal-body">
          <pre>FullName:{item.client.name}</pre>
          <pre>Mobileno:{item.client.mobile_no}</pre>
          <pre>Email:{item.client.email}</pre>
          </div>
      <td>{item.functionType}</td>
    <td>{item.requiredCapacity}</td>
    <td>{item.bookingDate}</td>
    <td>{item.calculatedPayment}</td>
    <td>{item.bookingStatus}</td>
    </tr>
    ))}
        </tbody>
        </table>
        </div>
        <div className={sidebar ? 'table_container_push container-fluid' : 'table_container_extend container-fluid'}>
        <p className='table_container_req_title'>Verified and Cancelled Booking Request of Customers</p>
        <table class="table_container_req_body table  table-bordered">
        <thead>
        <tr>
      <th>SN</th>
      <th>Customer Detail</th>
      <th>Function Type</th>
      <th>Required Capacity</th>
      <th>Date Selected</th>
      <th>Calculated Payment</th>
      <th>Request Status</th>
        </tr>
        </thead>
        <tbody>
    {reqVenverify.map((item,index)=>(
      <tr key={index}>
      <th>{index+1}</th>
          <div class="modal-body">
          <pre>FullName:{item.client.name}</pre>
          <pre>Mobileno:{item.client.mobile_no}</pre>
          <pre>Email:{item.client.email}</pre>
          </div>
      <td>{item.functionType}</td>
    <td>{item.requiredCapacity}</td>
    <td>{item.bookingDate}</td>
    <td>{item.calculatedPayment}</td>
    <td>{item.bookingStatus}</td>
    </tr>
    ))}
    {reqVenunsucc.map((item,index)=>(
      <tr key={index}>
      <th>{index+100}</th>
          <div class="modal-body">
          <pre>FullName:{item.client.name}</pre>
          <pre>Mobileno:{item.client.mobile_no}</pre>
          <pre>Email:{item.client.email}</pre>
          </div>
      <td>{item.functionType}</td>
      <td>{item.requiredCapacity}</td>
      <td>{item.bookingDate}</td>
      <td>{item.calculatedPayment}</td>
      <td>{item.bookingStatus}</td>
      </tr>
    ))}
        </tbody>
        </table>
        </div>
        </div>
        </div>):(<div>You are logged out of page.Please login and try again.</div>)}
        </>
       )
}