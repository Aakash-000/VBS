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

export default function Dealeraccount() {
  const [sidebar, setSidebar] = useState(false);    
  const {dealeremail} = useParams();
  const showSidebar = () => setSidebar(!sidebar);                                                               
  const navigate = useNavigate();
  const[reqVen,setreqVen]=useState([]);
  const[noToken,setnoToken] = useState(false);
  const[dealerName,setdealerName] = useState('');
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
      let response =await axios.get(`https://venue-booking-system2.herokuapp.com/venue-/requests/${dealeremail}`,config)
      console.log(response)
      if(response.data.data)
      setreqVen(response.data.data)
      }catch(err){
        console.log(err)
      }
      }, [])

      useEffect(()=>{
        async function getVenue(){
          let response = await axios.get('https://venue-booking-system2.herokuapp.com/client-',config);
          console.log(response)
          const editDealer = response.data.data.filter((value,index)=>{
            return value.email === dealeremail;
          })
          setdealerName(editDealer[0].userName)
        }
        getVenue()
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
      <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebard">
          <Link to="#" className="sidemenud-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sided-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-de'>
          <p>{dealerName}</p>
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
        </IconContext.Provider>):(<div>You are logged out of page.Please login and try again to continue.</div>)}
        {/* <div className='body_content container'>
        <div class="card col-lg-4">
         <div class="card-body">
            <h5 class="card-title">{reqVen.length}</h5>
            <p class="card-text">Number of Venue Booking Request</p>
        </div>
        </div>
        </div> */}
        {/*<div className="body_content_sub container-fluid">
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
    </>
  );
}

