import React, { useState ,useEffect} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link,useParams, useNavigate } from "react-router-dom";
import { SidebarDataforDealer } from "./SidebarData";
import "./dealeraccountpage.css";
import Dealerloginpage from '../../Login/Dealer/Dealerloginpage.js'
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import {Reacticonnineteen,Reacticontwenty,Reacticontwentyone} from '../../../assets/icons/Reacticon.js'

export default function Dealeraccount() {
  const [sidebar, setSidebar] = useState(false);    
  const {dealeremail,dealername} = useParams();
  const showSidebar = () => setSidebar(!sidebar);                                                               
  const navigate = useNavigate();
  const[noToken,setnoToken] = useState(false);
  const[reqVenverify,setreqVenverify] = useState([]);  
  const[reqVenpen,setreqVenpen] = useState([]);
  const[reqVenunsucc,setreqVenunsucc] = useState([]);
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
        return item.bookingStatus === "SUCCESSFUL"
      })
      setreqVenpen(pendingdata)
      setreqVenverify(verifieddata)
      setreqVenunsucc(unsuccessfuldata)
      }catch(err){
        console.log(err)
      }
      },[])


  const logout = (e)=> {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/dealerlogin');
    window.location.reload();
  }
    


  return (
    <>
    {!noToken ? (
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
          <p>{dealername.toUpperCase()}</p>
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
        <div>
        {sidebar ? (<div className="body_content_sub_push container-fluid ">
        <div class="row">
        <div class="col-sm-8 col-lg-4 col-xl-4">
            <div class="card_c card">
             <div class="card_body card-body">
               <div className='card_body_sub_push'>
               <Reacticontwenty/>
        <p class="card_title_push card-title">{reqVenverify.length}</p>
        </div>
        <p class="card_text_push card-text">Number of Booked Venue Accepted</p>
      </div>
    </div>
     </div>
        <div class="col-sm-8 col-lg-4 col-xl-4">
        <div class="card_c card">
      <div class="card_body card-body">
      <div className='card_body_sub_push'>
        <Reacticonnineteen/>
        <p class="card_title_push card-title">{reqVenpen.length}</p>
        </div>
        <p class="card_text_push card-text">Number of Booked Venue Pending</p>
      </div>
        </div>
        </div>
        <div class="col-sm-8 col-lg-4 col-xl-4">
            <div class="card_c card">
             <div class="card_body card-body">
               <div className='card_body_sub_push'>
               <Reacticontwentyone/>
        <p class="card_title_push card-title">{reqVenunsucc.length}</p>
        </div>
        <p class="card_text_push card-text">Number of Booked Venue Cancelled</p>
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
        <Reacticontwenty/>
        <p class="card_title_extend card-title">{reqVenverify.length}</p>
        </div>
        <p class="card_text_extend card-text">Number of Booked Venue Accepted</p>
      </div>
      </div>
       </div>
          <div class="col-sm-8 col-lg-6 col-xl-4">
          <div class="card_c card">
          <div class="card_body card-body">
          <div className='card_body_sub_extend'>
        <Reacticonnineteen/>
        <p class="card_title_extend card-title">{reqVenpen.length}</p>
        </div>
        <p class="card_text_extend card-text">Number of Booked Venue Pending</p>
      </div>
          </div>
          </div>
          <div class="col-sm-8 col-lg-6 col-xl-4">
              <div class="card_c card">
              <div class=" card_body card-body">
              <div className='card_body_sub_extend'>
        <Reacticontwentyone/>
        <p class="card_title_extend card-title">{reqVenunsucc.length}</p>
        </div>
        <p class="card_text_extend card-text">Number of Booked Venue Cancelled</p>
      </div>
      </div>
          </div>
          </div>
          </div>)}
        </div>
        </div>
        ):(<div>You are logged out of page.Please login and try again to continue.</div>)}
    </>
  );
}

export function Seteventdetail(){
  const [sidebar, setSidebar] = useState(false);    
  const {dealeremail,dealername} = useParams();
  const showSidebar = () => setSidebar(!sidebar);                                                               
  const navigate = useNavigate();
  const[noToken,setnoToken] = useState(false);
  const[focused,setFocused] = useState(false);
  const[eventDetail,seteventDetail] = useState({
    marriage:{marriagebasePayment:"",marriageRate:""},
  conclave:{conclavebasePayment:"",conclaveRate:""},
  collegefunction:{collegefunctionbasePayment:"",collegefunctionRate:""},
  annualmeet:{annualMeetbasePayment:"",annualMeetRate:""},
  familyparty:{familyPartybasePayment:"",familyPartyrate:""}}) 
  

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

    const handleChange = (e)=>{
      seteventDetail(()=>({
        ...eventDetail ,
        [e.target.name]:e.target.value
      }))
    }
  
    function handleFocus(e){
      setFocused(true);
   }
    const handleSubmit = (e)=>{
      e.preventDefault()
      console.log(eventDetail)
    }
    const logout = (e)=> {
      sessionStorage.removeItem('token');
      sessionStorage.clear();
      navigate('/dealerlogin');
      window.location.reload();
    }
      return (
        <>
    {!noToken ? (
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
          <p>{dealername.toUpperCase()}</p>
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
        <div>
          </div>
          <div class='container-fluid'>
      </div> 
        <div className='edit_dealer container-fluid'>
        <div className='dealer_edit_page'>
        <form className='dealer_edit_form row g-3' onSubmit={handleSubmit}>
        <h1 className='heading_edit_dlog'>Set Event Detail</h1>
        <div class="form_edit_field_dealer col-lg-6">
        <label htmlFor="marriage" >Marriage:</label>
        <input autoComplete="off" type="text" name='marriagebasePayment' required={true} 
        focused={focused.toString()} placeholder="Write Basecost for 100 guest in Marriage" onChange={(e)=>{(seteventDetail({...eventDetail,[e.target.marriage.marriagebasePayment]:e.target.value}))}} value={eventDetail.marriage.marriagebasePayment}/>
        <input autoComplete="off" type="text" name='marriageRate' required={true} 
        focused={focused.toString()} placeholder="Write rate to Increase after 100 guest in Marriage" onChange={handleChange} value={eventDetail.marriage.marriageRate}/>
        </div>
        <div class="form_edit_field_dealer col-lg-6">
        <label htmlFor="conclave" >Conclave:</label>
        <input autoComplete="off" type="text" name='conclavebasePayment' required={true} 
        focused={focused.toString()}  placeholder="Write Basecost for 100 guest in Conclave" onChange={handleChange} value={eventDetail.conclave.conclavebasePayment}/>
        <input autoComplete="off" type="text" name='conclaveRate' required={true} 
        focused={focused.toString()}  placeholder="Write rate to Increase after 100 guest in Conclave" onChange={handleChange} value={eventDetail.conclave.conclaveRate}/>
        </div>
        <div className='form_edit_field_dealer col-md-6'>
        <label htmlFor="familyparty" >Family Party:</label>
        <input autoComplete="off" type="text" name='familyPartybasePayment' required={true} 
        focused={focused.toString()} placeholder="Write Basecost for 100 guest in Family Party" onChange={handleChange} value={eventDetail.familyparty.familyPartybasePayment}/>
        <input autoComplete="off" type="text" name='familyPartyrate' required={true} 
        focused={focused.toString()}  placeholder="Write rate to Increase after 100 guest in Family Party" onChange={handleChange} value={eventDetail.familyparty.familyPartyrate}/>
        </div>
        <div className='form_edit_field_dealer col-md-6'>
        <label htmlFor="annualmeet" >Annual Meet:</label>
        <input autoComplete="off" type="text" name='annualMeetbasePayment' required={true} 
        focused={focused.toString()} placeholder="Write Basecost for 100 guest in Annual Meet" onChange={handleChange} value={eventDetail.annualmeet.annualMeetbasePayment}/>
        <input autoComplete="off" type="text" name='annualMeetRate' required={true} 
        focused={focused.toString()} placeholder="Write rate for 100 guest in Annual Meet" onChange={handleChange} value={eventDetail.annualmeet.annualMeetRate}/>
        </div>
        <div className='form_edit_field_dealer col-md-6'>
        <label htmlFor="collegefunction" >College Functions:</label>
        <input autoComplete="off" type="text" name='collegefunctionbasePayment' required={true} 
        focused={focused.toString()}  placeholder="Write Basecost for 100 guest in College Function" onChange={handleChange} value={eventDetail.collegefunction.collegefunctionbasePayment}/>
        <input autoComplete="off" type="text" name='collegefunctionRate' required={true} 
        focused={focused.toString()}  placeholder="Write rate for 100 guest in College Function" onChange={handleChange} value={eventDetail.collegefunction.collegefunctionRate}/>
        </div>
        <div className="form_edit_field_dealer col-12">
        <button type="submit">Submit</button>
         </div>
       </form>
      </div>
      </div>
        </div>
        ):(<div>You are logged out of page.Please login and try again to continue.</div>)}
    </>
      )
}