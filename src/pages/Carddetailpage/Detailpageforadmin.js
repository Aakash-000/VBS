import React,{useState,useEffect} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {FiChevronLeft} from 'react-icons/fi'
import { IconContext } from "react-icons";
import { Link , useNavigate,useParams} from "react-router-dom";
import { SidebarDataforadmin } from "../Account/Dealer/SidebarData.js";
import "./detailpageforadmin.css";
import Logo from '../../assets/images/navbar_logo_bgr.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'

export default function Detailpageforadmin() {
    const[isLoading,setisLoading] = useState(true);
    const[noToken,setnoToken] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const[viewDetail,setviewDetail] = useState([]);
    const navigate = useNavigate();
    const {adminemail,id,demail} = useParams();

    const config = {  
        headers:{
          Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
        }
      }

      useEffect(() => {
        if(sessionStorage.length != 0){
          setnoToken(false)
        }else {
          setnoToken(true)
        }
      }, [noToken])


      useEffect(async()=>{
        try{
          let response = await axios.get('https://venue-booking-system2.herokuapp.com/admin-/registerRequests',config)
            const findDetail = response.data.data.filter((item)=>{
              return id == item.id;
            })
            console.log(response)
            setviewDetail(findDetail[0])
            setisLoading(false)
        }catch(err){
          console.log(err)
        }
        },[])
    
          function handleClick(){
            navigate(`/acceptvenue/${adminemail}`)
          }
          
          const logout = (e)=> {
            e.preventDefault();
            sessionStorage.removeItem('token');
            sessionStorage.clear();
            navigate('/adminlogin');
            window.location.reload();
          }

    return (
        <div className="relative_path">
        {!noToken ? (
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
        <div className='view_detail_adm'>
          {isLoading?(<div className="detail_page_loading"><p>...Loading</p></div>):(<div class="view_detail_adm_sub card mb-3" style={{maxWidth:'1000px'}}>
            <div class="row g-0">
            <div class="col-md-7">
            <img src={`data:image/jpeg;base64,${viewDetail.filePath}`} class="img-fluid rounded-start" alt="..."/>
            </div>
           <div class="col-md-5">
            <div class="view_detail_cus_card_body card-body">
              <div className="card_body_clickout">
              <h5 class="regven card-title">{viewDetail.venueName}</h5>
              <button onClick={handleClick}><FiChevronLeft size={25}/></button>
              </div>
              <p class="card-text">{viewDetail.userName}</p>
              <p class="card-text">{viewDetail.address}</p>
              <p class="card-text">{viewDetail.email}</p>
              <p class="card-text">{viewDetail.contactNumber}</p>
              <p class="card-text">{viewDetail.description}</p>
            </div>
          </div>
        </div>
        </div>)}
        </div>
        </>
        ):
        (<div>You are logged out of the page.Please try again after login!</div>)
        }
        </div>
    )
}
