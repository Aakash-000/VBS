import React, { useState ,useEffect} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link,useParams, useNavigate } from "react-router-dom";
import { SidebarDataforDealer } from "./SidebarData";
import "./dealeraccountpage.css";
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import axios from 'axios'
import {Reacticonnineteen,Reacticontwenty,Reacticontwentyone} from '../../../assets/icons/Reacticon.js'

export default function Dealeraccount() {
  const [sidebar, setSidebar] = useState(true);    
  const {dealeremail,dealername} = useParams();
  const[dealerdetail,setdealerdetail] = useState([]);
  const showSidebar = () => setSidebar(!sidebar);                                                               
  const navigate = useNavigate();
  const[noToken,setnoToken] = useState(false);
  const[reqVenverify,setreqVenverify] = useState([]);  
  const[reqVenpen,setreqVenpen] = useState([]);
  const[reqVenunsucc,setreqVenunsucc] = useState([]);
  const[showNote,setshowNote] = useState(false);
  const[countReq,setcountReq] = useState(0);
  const[showCount,setshowCount] = useState(false);
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
        let response = await axios.get(`https://venue-booking-system2.herokuapp.com/venue-/${dealeremail}`,config);
        let nextResponse  = await axios.get(`https://venue-booking-system2.herokuapp.com/venue-/bookingRequest/${dealeremail}`,config);
        setcountReq(nextResponse.data.data)
        if(nextResponse.data.data != 0){
          setshowCount(true)
        }else{
          setshowCount(false)
        }
        console.log(response)
        setdealerdetail(response.data.data)
        if(response.data.data.functionList.length == 0){
          setshowNote(true)
        }else{
          setshowNote(false)
        }
      }catch(err){
        console.log(err)
      }
    },[])

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
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  }
    


  return (
    <>
    {!noToken ? (
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
                  {item.fordealer.title == "Booking Request"?(<p>{item.fordealer.icon}
                    {item.fordealer.title}<p className={showCount?"showCountDealer":"hideCountDealer"}>{countReq}</p></p>):(<p>{item.fordealer.icon}{item.fordealer.title}</p>)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
        </div>
        <div className="body_b">
        {sidebar ? (
          <div>
        <div className={showNote?"alert_text_push alert-light":
        "alert_text_push_hide alert-light"} role="alert">
        <h4>Note:Please update your venue cost detail at SET EVENT DETAIL menu of Dashboard.In case of updated detail only customer is allowed to BOOK your venue!</h4>
        </div>
        <div className="body_content_sub_push container-fluid ">
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
        </div></div>):(<div>
          <div className={showNote?"alert_text_extend alert-light":
        "alert_text_extend_hide alert-light"} role="alert">
        <h4>Note:Please update your venue cost detail at SET EVENT DETAIL menu of Dashboard.In case of updated detail only customer is allowed to BOOK your venue!</h4>
        </div>
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
          </div>
          </div>)}
        </div>
        </div>
        ):(<div>You are logged out of page.Please login and try again to continue.</div>)}
    </>
  );
}

export function Seteventdetail(){
  const [sidebar, setSidebar] = useState(true);    
  const {dealeremail,dealername} = useParams();
  const showSidebar = () => setSidebar(!sidebar);                                                               
  const navigate = useNavigate();
  const[noToken,setnoToken] = useState(false);
  const[focused,setFocused] = useState(false);
  const[dealerdetail,setdealerdetail] = useState([]);
  const[isvalid,setisvalid] = useState(true);
  const[eventDetail,seteventDetail] = useState({
  marriage:"",
  conclave:"",
  collegeEvent:"",
  annualMeet:"",
  familyParty:"",rate:""}) 
  

  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken])

  const config = {  
    headers:{
      'Content-Type':'application/json',
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
    }
    }
    useEffect(async()=>{
      try{
        let response = await axios.get(`https://venue-booking-system2.herokuapp.com/venue-/${dealeremail}`,config);
        console.log(response)
        setdealerdetail(response.data.data)
      }catch(err){
          console.log(err)
      }
    },[])

    const handleChange = (e)=>{
      seteventDetail({...eventDetail,[e.target.name]:e.target.value})
    }

    const handleSubmit = async()=>{
        try{
        let response = await axios.post(`https://venue-booking-system2.herokuapp.com/venue-/updateEventDetails/${dealerdetail.email}`,
        JSON.stringify(eventDetail),config);
        seteventDetail(()=>({...eventDetail,marriage:"",conclave:"",collegeEvent:"",familyParty:"",annualMeet:"",rate:""}))
        setisvalid(false)
        setTimeout(()=>{
          navigate(`/dealeraccount/${dealeremail}/${dealername}`)
        },5000) 
        const timeId = setTimeout(() => {
          setisvalid(true)
           }, 5000)
          
         return () => {
          clearTimeout(timeId)
            }
      console.log(response)
      }catch(err){
      console.log(err)
      
    }
    }

    const formHandler = (e)=>{
      e.preventDefault();
      handleSubmit();
    }
    const logout = (e)=> {
      sessionStorage.removeItem('token');
      sessionStorage.clear();
      navigate('/login');
      window.location.reload();
    }
      return (
        <>
    {!noToken ? (
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
        <div>
          <div class='container-fluid'> 
        <div className='event_dealer container-fluid'>
        <div className='dealer_event_page'>
        {isvalid ? <div></div> : (<div className='valid_req_book_dealer'>
        <pre className='valid_status_req_book_dealer'>
           Update Successful!
        </pre>
        </div>)
        }
        <form className='dealer_event_form row g-3' onSubmit={formHandler}>
        <h1 className='heading_event_dlog'>Set Event Detail</h1>
         
        <div class="form_field_event_dealer col-md-6">
        <label for="marriage" class="form-label">Marriage Base Cost</label>
        <input autoComplete="off" type="text" name="marriage" required={true} 
        focused={focused.toString()} placeholder="Write Basecost for 100 guest in Marriage" onChange={handleChange} value={eventDetail.marriage}/>
        </div>
          
        <div class="form_field_event_dealer col-md-6">
        <label for="conclave" class="form-label">Conclave Base Cost</label>
        <input autoComplete="off" type="text" name='conclave' required={true} 
        focused={focused.toString()}  placeholder="Write Basecost for 100 guest in Conclave" onChange={handleChange} value={eventDetail.conclave}/>
        </div>

        <div class="form_field_event_dealer col-md-6">
        <label for="family party" class="form-label">Family Party Base Cost</label>
        <input autoComplete="off" type="text" name='familyParty' required={true} 
        focused={focused.toString()} placeholder="Write Basecost for 100 guest in Family Party" onChange={handleChange} value={eventDetail.familyParty}/>
        </div>
        
        <div class="form_field_event_dealer col-md-6">
        <label for="annual meet" class="form-label">Annual Meet Base Cost</label>
        <input autoComplete="off" type="text" name='annualMeet' required={true} 
        focused={focused.toString()} placeholder="Write Basecost for 100 guest in Annual Meet" onChange={handleChange} value={eventDetail.annualMeet}/>
        </div>

        <div class="form_field_event_dealer col-md-6">
        <label for="college event" class="form-label">College Event Base Cost</label>
        <input autoComplete="off" type="text" name='collegeEvent' required={true} 
        focused={focused.toString()}  placeholder="Write Basecost for 100 guest in College Function" onChange={handleChange} value={eventDetail.collegeEvent}/>
        </div>

        <div class="form_field_event_dealer col-md-6">
        <label for="rate" class="form-label">Increase Rate</label>
        <input autoComplete="off" type="text" name='rate' required={true} 
        focused={focused.toString()}  placeholder="Write rate to increase" onChange={handleChange} value={eventDetail.rate}/>
        </div>

        <div className="form_event_field_dealer col-12">
            <button type="submit">Submit</button>
         </div>
       </form>
       </div>
       </div>
       </div>
       </div>
       </div>
        ):(<div>You are logged out of page.Please login and try again to continue.</div>)}
    </>
      )
}