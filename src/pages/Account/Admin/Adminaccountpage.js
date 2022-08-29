import React, { useState,useEffect} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link , useNavigate,useParams} from "react-router-dom";
import { SidebarDataforadmin } from "../Dealer/SidebarData.js";
import "./adminaccountpage.css";
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import {Reacticonsixteen,Reacticonseventeen} from '../../../assets/icons/Reacticon.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'


export default function Adminaccount() {
  const[noToken,setnoToken] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const {adminemail} = useParams();
  const[getFilepath,setFilepath] = useState([]);
  
  const config = {  
    headers:{
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
    }
  }

  useEffect(async()=>{
    try{
      let response = await axios.get('https://venue-booking-system2.herokuapp.com/admin-/registerRequests',config)
        setFilepath(response.data.data.filePath)
    }catch(err){
      console.log(err)
    }
    },[])

  
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken])


  const logout = (e)=> {
    e.preventDefault();
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/adminlogin');
    window.location.reload();
  }
  return (
    <>{!noToken ? (
      <>
      <div>
      <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebara">
          <Link to="#" className="sidemenua-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sidea-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-ad'>
          <p>{adminemail}</p>
          <button onClick={logout}>Logout</button>
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
                  <Link to={`${item.foradmin.path}`+`/${adminemail}`} className='sidebara-pa'>
                    <p>{item.foradmin.icon}{item.foradmin.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
        </div>
        <div>
        {/* <img src={blobUrl} alt="Image"/> */}
        </div>
        </>
        ):
        (<div>You are logged out of the page.Please try again after login!</div>)
        }
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
    </>
  );
}

export function Venueaccept(){
  const[noToken,setnoToken] = useState(false);
  const [sidebar, setSidebar] = useState(false);    
  const [pendingVenuelist,setpendingVenuelist] = useState([]);
  const {adminemail} = useParams();
  const[accept,setAccept] = useState(false);
  const[cancel,setCancel] = useState(false);
  const showSidebar = () => setSidebar(!sidebar); 
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
  
  useEffect(()=>{
    axios.get('https://venue-booking-system2.herokuapp.com/admin-/registerRequests',config)
    .then(response => {
      console.log(response) 
      setpendingVenuelist(response.data.data)
      setAccept(false)
      setCancel(false)
    })
    .catch(err=> {console.log(err)});
  },[accept,cancel])

  
  async function handleAccept(key){
    try{
      let response = await axios.put(`https://venue-booking-system2.herokuapp.com/admin-/update/${pendingVenuelist[key].id}`,
            {
              "status": 0
            }    
        ,{ 
          headers:{
          Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token')) 
        }
      }
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
      let response = await axios.put(`https://venue-booking-system2.herokuapp.com/admin-/update/${pendingVenuelist[key].id}`,
            {
              "status": 1
            }    
        ,{ 
          headers:{
          Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token')) 
        }
      }
    );
    console.log(response)
    setCancel(true)
    }catch(err){  
      console.log(err)
      setCancel(false)
      }
  }

  const handleDetail = (demail,key,index)=>{
      localStorage.setItem('imagePath',JSON.stringify(pendingVenuelist[index].filePath))
      navigate(`/viewdetail/${adminemail}/${demail}/${key}`)
  }
  const logout = (e)=> {
    e.preventDefault();
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/adminlogin');
    window.location.reload();
  }

    return(
    <>
    {noToken ? (<div>You are logged out of page.Please login to continue!</div>):
      (
      <>
      <div>
      <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebara">
          <Link to="#" className="sidemenua-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sidea-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-ad'>
          <p>{adminemail}</p>
          <button onClick={logout}>Logout</button>
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
                  <Link to={`${item.foradmin.path}`+`/${adminemail}`} className='sidebara-pa'>
                    <p>{item.foradmin.icon}{item.foradmin.title}</p>
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
      <p className='table_container_accept_title'>Venue Add Request By Dealer</p>
      <table class="table_container_accept_body table  table-bordered">
      <thead>
      <tr>
    <th>SN</th>
    <th>VenueName</th>
    <th>View Detail</th>
    <th><Reacticonsixteen/></th>
    <th><Reacticonseventeen/></th>
      </tr>
      </thead>
      <tbody>
        {pendingVenuelist.map((item,index)=>(
          <tr key={index}>
          <th>{index+1}</th>
          <td>{item.venueName}</td>
          <td className="view_detail" onClick={()=>handleDetail(item.email,item.id,index)}>Click to View</td>
          <td><button className='button_accept' onClick={()=>handleAccept(index)}>Accept</button></td>
          <td><button className='button_cancel' onClick={()=>handleCancel(index)}>Cancel</button></td>
        </tr>
        ))}
      </tbody>
      </table>
      </div>
      </div>
      </>)}
      </>
    )
}

export function Customerlist(){
  const[noToken,setnoToken] = useState(false);
  const [sidebar, setSidebar] = useState(false);    
  const [customerlist,setcustomerlist] = useState([]);
  const {adminemail} = useParams();
  const showSidebar = () => setSidebar(!sidebar); 
  const navigate = useNavigate();
  
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken])

    useEffect(async()=>{
      try{
        let response = await axios.get('https://venue-booking-system2.herokuapp.com/admin-/allClient',config)
        setcustomerlist(response.data.data)
        console.log(response)
      }catch(err){
        console.log(err)
      }
    },[])

  const config = {  
    headers:{
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
    }
  }
  const logout = (e)=> {
    e.preventDefault();
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/adminlogin');
    window.location.reload();
  }

  return(
      <>
         {!noToken ?(
        <div>
           <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebara">
          <Link to="#" className="sidemenua-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sidea-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-de'>
          <p>{adminemail}</p>
          <button onClick={logout}>Logout</button>
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
                <li key={index} className={"sidea-text"}>
                  <Link to={`${item.foradmin.path}`+`/${adminemail}`} className='sidebara-pa'>
                    <p>{item.foradmin.icon}{item.foradmin.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
        <div className="table_t">
        <div className={sidebar ? 'table_container_push container-fluid' : 'table_container_extend container-fluid'}>
        <p className='table_container_req_title'>Registered Customer List</p>
        <table class="table_container_req_body table  table-bordered">
        <thead>
        <tr>
      <th>SN</th>
      <th>CustomerName</th>
      <th>ContactNumber</th>
      <th> More Detail</th>
        </tr>
        </thead>
        <tbody>
    {customerlist.map((item,index)=>(
      <tr key={index}>
      <th>{index+1}</th>
            <td>{item.name}</td>
            <td>{item.mobile_no}</td>
          <div class="modal-body">
             <pre>FullName:{item.email}</pre>
          <pre>Address:{item.address}</pre>
          </div>
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

export function Venuelist(){
  const[noToken,setnoToken] = useState(false);
  const [sidebar, setSidebar] = useState(false);    
  const [venuelist,setvenuelist] = useState([]);
  const {adminemail} = useParams();
  const showSidebar = () => setSidebar(!sidebar); 
  const navigate = useNavigate();
  
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken])

    useEffect(async()=>{
      try{
        let response = await axios.get('https://venue-booking-system2.herokuapp.com/admin-/allVenue',config)
        setvenuelist(response.data.data)
        console.log(response)
      }catch(err){
        console.log(err)
      }
    },[])

  const config = {  
    headers:{
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
    }
  }
  const logout = (e)=> {
    e.preventDefault();
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/adminlogin');
    window.location.reload();
  }

  return(
        <>
         {!noToken ?(
           <>
        <div>
           <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebara">
          <Link to="#" className="sidemenua-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sidea-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-de'>
          <p>{adminemail}</p>
          <button onClick={logout}>Logout</button>
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
                <li key={index} className={"sidea-text"}>
                  <Link to={`${item.foradmin.path}`+`/${adminemail}`} className='sidebara-pa'>
                    <p>{item.foradmin.icon}{item.foradmin.title}</p>
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
        <p className='table_container_req_title'>Registered Venue List</p>
        <table class="table_container_req_body table  table-bordered">
        <thead>
        <tr>
      <th>SN</th>
      <th>UserName</th>
      <th>Email</th>
      <th> More Detail</th>
        </tr>
        </thead>
        <tbody>
        {venuelist.map((item,index)=>(
      <tr key={index}>
      <th>{index+1}</th>
            <td>{item.userName}</td>
            <td>{item.email}</td>
          <div class="modal-body">
             <pre>VenueName:{item.venueName}</pre>
              <pre>Address:{item.address}</pre>
            <pre>ContactNumber:{item.contactNumber}</pre>
          </div>
    </tr>
    ))}
        </tbody>
        </table>
        </div>
        </div>
        </>
        ):(<div>You are logged out of page.Please login and try again.</div>)}
        </>
  )
}

