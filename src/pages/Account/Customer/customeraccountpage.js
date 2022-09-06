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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Reacticonnineteen,Reacticontwenty,Reacticontwentyone, Reacticontwentyfour, Reacticontwentysix} from '../../../assets/icons/Reacticon.js'
import Bookingform from "./Bookingform.js";
import {FiChevronLeft} from 'react-icons/fi'

export function VenuecarddetailCustomer(){  
  const[getregvenue,setgetregvenue] = useState([]);
  const[getFunctionlist,setFunctionlist] = useState([]);
  const[isLoading,setisLoading] = useState(true);
  const {vemail} = useParams();
  const[noToken,setnoToken] = useState(false);
  const navigate = useNavigate();
  const {email} = useParams();
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const[currUser,setcurrUser] = useState([]);

  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken]) 
    
  const logout = (e)=> {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    localStorage.clear();
    navigate('/customerlogin');
    window.location.reload();
  }

  const handleOut =()=>{
    localStorage.clear()
    navigate(`/customeraccount/${email}/${currUser.name}`)
  }

     const config = {  
      headers:{                                                                                                 
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
      }
    }

     
    useEffect(async()=>{
      try{
        let response = await axios.get(`https://venue-booking-system2.herokuapp.com/client-/${email}`,config)
        setcurrUser(response.data.data)
        console.log(response)
      }catch(err){
        console.log(err)
      }
    },[])

    useEffect(async()=>{
        try{
          let response = await axios.get(`https://venue-booking-system2.herokuapp.com/client-/venue/${vemail}`,config)
          setgetregvenue(response.data.data)
          setFunctionlist(response.data.data.functionList[0])
          setisLoading(false)
          console.log(response)
          console.log(response.data.data.functionList[0])
        }catch(err){
          console.log(err)
        }
    },[])  
  
    return (
      <>
      {!noToken?(
        <div>
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
            <p>{currUser.name}</p>
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
                    <Link to={`${item.forcustomer.path}`+`/${email}`+`/${currUser.name}`} className='sidebarc-pa'>
                      <p>{item.forcustomer.icon}{item.forcustomer.title}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          </IconContext.Provider>
          </div>
          {isLoading?(<div style={{fontSize:'30px',display:'flex',marginTop:'300px',marginLeft:'270px',justifyContent:'center',alignItems:'center',textAlign:'center',fontFamily:'sans-serif,Raleway'}}><p>...Loading</p></div>):(<div className='view_detail_cus'>
          <div class="view_detail_cus_sub card mb-3" style={{maxWidth:'1000px',boxShadow:'rgba(230, 225, 219, 0.979) 5px 5px 10px 2px'}}>
            <div class="row g-0">
            <div class="button_position col-md-8">
            <img src={`data:image/jpeg;base64,${getregvenue.filePath}`} class="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="booking_button_display">
            <Bookingform/>
           </div>
           <div class="col-md-4">
            <div class="card-body">
              <div className="card_body_clickout">
              <h5 class="regven card-title">{getregvenue.venueName}</h5>
              <button className="card_body_clickout_sub" onClick={handleOut}><FiChevronLeft size={25}/></button>
              </div>
              <p class="d_card_title card-text">{getregvenue.userName}</p>
              <p class="card-text" style={{display:'flex'}}><Reacticontwentysix/>{getregvenue.address}</p>
              <p class="card-text">{getregvenue.contactNumber}</p>
              <p class="card-text">{getregvenue.email}</p>
              <p class="d_card_desc card-text">{getregvenue.description}</p>
              <p class="card-text" style={{display:'flex'}}><Reacticontwentyfour/>{getregvenue.capacity}</p>
              <h4>Base Cost Payment for 100 Guests </h4>
              <li>Marriage:{getFunctionlist.marriageCost}</li>
              <li>Conclave:{getFunctionlist.conclaveCost}</li>
              <li>College Event:{getFunctionlist.collegeEventCost}</li>
              <li>Annual Meet:{getFunctionlist.annualMeetCost}</li>
              <li>Family Function:{getFunctionlist.familyFunctionCost}</li>
              <br/>
              <h4>Price Increase Rate after 100 guests is {getFunctionlist.rate}</h4>
            </div>
          </div>
        </div>
        </div>
        </div>)}
        </div>
        ):(<div>You are logged out of page.Please login to continue.</div>)}
        </>
    )
}


export default function Customeraccount() {

  const navigate = useNavigate();
  const {email,customername} = useParams();
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const[noToken,setnoToken] = useState(false);
  const[mybookedVenverify,setmybookedVenverify] = useState([]);
  const[mybookedVenpen,setmybookedVenpen] = useState([]);
  const[mybookedVenunsucc,setmybookedVenunsucc] = useState([]);

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
        axios.get('https://venue-booking-system2.herokuapp.com/client-/clientHome',config)
        .then(response => {console.log(response)})                                                            
        .catch(err => {console.log(err)});                                                                     
      }
      getVenue();
    },[])

    useEffect(async()=>{
      try{
      let response = await axios.get(`https://venue-booking-system2.herokuapp.com/client-/booking/${email}`,config);
      console.log(response)
      const verifiedData = response.data.data.filter((item)=>{
        return item.bookingStatus === "ACCEPTED";
      })
      const unsuccessfuldata = response.data.data.filter((item)=>{
        return item.bookingStatus === "CANCELED";
      })
      const pendingData = response.data.data.filter((item)=>{
        return item.bookingStatus === "PENDING";
      })
      setmybookedVenpen(pendingData)
      setmybookedVenverify(verifiedData)
      setmybookedVenunsucc(unsuccessfuldata)
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
        {sidebar ? (<div className="body_content_sub_push container-fluid ">
        <div class="row">
        <div class="col-sm-8 col-lg-4 col-xl-4">
            <div class="card_c card">
             <div class="card_body card-body">
               <div className='card_body_sub_push'>
               <Reacticonnineteen/>
        <p class="card_title_push card-title">{mybookedVenverify.length}</p>
        </div>
        <p class="card_text_push card-text">Accepted Request</p>
      </div>
    </div>
     </div>
        <div class="col-sm-8 col-lg-4 col-xl-4">
        <div class="card_c card">
      <div class="card_body card-body">
      <div className='card_body_sub_push'>
        <Reacticontwenty/>
        <p class="card_title_push card-title">{mybookedVenpen.length}</p>
        </div>
        <p class="card_text_push card-text">Pending  Request</p>
      </div>
        </div>
        </div>
        <div class="col-sm-8 col-lg-4 col-xl-4">
            <div class="card_c card">
             <div class="card_body card-body">
               <div className='card_body_sub_push'>
               <Reacticontwentyone/>
        <p class="card_title_push card-title">{mybookedVenunsucc.length}</p>
        </div>
        <p class="card_text_push card-text">Cancelled Request</p>
      </div>
      </div>
      </div>
        </div>
        </div>):(
          <div className="body_content_sub_extend container-fluid">
          <div class="row">
          <div class="col-sm-8 col-lg-6 col-xl-4">
              <div class="card_c card">
              <div class="card_body card-body">
              <div className='card_body_sub_extend'>
        <Reacticonnineteen/>
        <p class="card_title_extend card-title">{mybookedVenverify.length}</p>
        </div>
        <p class="card_text_extend card-text">Accepted Request</p>
      </div>
      </div>
       </div>
          <div class="col-sm-8 col-lg-6 col-xl-4">
          <div class="card_c card">
          <div class="card_body card-body">
          <div className='card_body_sub_extend'>
        <Reacticontwenty/>
        <p class="card_title_extend card-title">{mybookedVenpen.length}</p>
        </div>
        <p class="card_text_extend card-text">Pending Request</p>
      </div>
          </div>
          </div>
          <div class="col-sm-8 col-lg-6 col-xl-4">
              <div class="card_c card">
              <div class=" card_body card-body">
              <div className='card_body_sub_extend'>
        <Reacticontwentyone/>
        <p class="card_title_extend card-title">{mybookedVenunsucc.length}</p>
        </div>
        <p class="card_text_extend card-text">Cancelled Request</p>
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
  const[isLoading,setisLoading] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const[mybookedVenverify,setmybookedVenverify] = useState([]);
  const[mybookedVenpen,setmybookedVenpen] = useState([]);
  const[mybookedVenunsucc,setmybookedVenunsucc] = useState([]);
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
      return item.bookingStatus === "ACCEPTED";
    })
    const unsuccessfuldata = response.data.data.filter((item)=>{
      return item.bookingStatus === "CANCELED";
    })
    const pendingdata = response.data.data.filter((item)=>{
      return item.bookingStatus === "PENDING"
    })
    setmybookedVenverify(verifiedData)
    setmybookedVenunsucc(unsuccessfuldata)
    setmybookedVenpen(pendingdata)
    setisLoading(false)
    }catch(err){
      console.log(err)
    }
  },[])

  const logout = (e)=> {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    localStorage.clear();
    navigate('/customerlogin');
    window.location.reload();
}
  
  
  return(
    <>
     {!noToken?(
       <div>
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
          </div>
          {isLoading?(<div class="isLoading_pending_req"><p>...Loading</p></div>):(
          <div className="table_t">
          <div className={sidebar ? 'table_container_push container-fluid' : 'table_container_extend container-fluid'}>
            <p className='table_container_title'>Pending Venue of My Booking List</p>
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
          <td>{val.eventType}</td>
          <td>{val.requiredCapacity}</td>
          <td>{val.bookingDate}</td>
          <td>Rs {val.calculatedPayment}</td>
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
            <p className='table_container_title'>Successfully and Unsucessfully Booked Venue</p>
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
          <td>{val.eventType}</td>
          <td>{val.requiredCapacity}</td>
          <td>{val.bookingDate}</td>
          <td>Rs {val.calculatedPayment}</td>
          <td>{val.bookingStatus}</td>
          <div class="modal-body">
          <pre>FullName:{val.venue.userName}</pre>
          <pre>VenueName:{val.venue.venueName}</pre>
          <pre>Email:{val.venue.email}</pre>
          <pre>ContactNumber:{val.venue.contactNumber}</pre>
          </div>
            </tr>
              ))}
              {mybookedVenunsucc.map((val,index)=>(              
              <tr key={index}>
            <th>{index+100}</th>
          <td>{val.eventType}</td>
          <td>{val.requiredCapacity}</td>
          <td>{val.bookingDate}</td>
          <td>Rs {val.calculatedPayment}</td>
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
            </div>)}
            </div>
          ):(<div>You are logged out of page please login and try again.</div>)}
          </>
  )
}

