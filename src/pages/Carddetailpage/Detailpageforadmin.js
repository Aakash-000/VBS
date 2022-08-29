import React,{useState,useEffect} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link , useNavigate,useParams} from "react-router-dom";
import { SidebarDataforadmin } from "../Account/Dealer/SidebarData.js";
import "./detailpageforadmin.css";
import Logo from '../../assets/images/navbar_logo_bgr.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'

export default function Detailpageforadmin() {
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
            setviewDetail(findDetail[0])
            console.log(findDetail)
        }catch(err){
          console.log(err)
        }
        },[])
    

      const imagePath = JSON.parse(localStorage.getItem('imagePath'))

    const b64toBlob = (b64Data , contentType , sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

        const contentType = "image/jpeg";
        const blob = b64toBlob(imagePath, contentType)

        const blobUrl = URL.createObjectURL(blob);

          function handleClick(){
            localStorage.removeItem('imagePath')
            localStorage.clear()
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
        <div className='view_detail_cus'>
          <div class="card mb-3" style={{maxWidth:'1000px'}}>
            <div class="row g-0">
            <div class="col-md-4">
            <img src={blobUrl} class="img-fluid rounded-start" alt="..."/>
            </div>
           <div class="col-md-8">
            <div class="card-body">
              <div className="card_body_clickout">
              <h5 class="regven card-title">{viewDetail.venueName}</h5>
              <button onClick={handleClick}>Go Back</button>
              </div>
              <p class="card-text">{viewDetail.userName}</p>
              <p class="card-text">{viewDetail.address}</p>
              <p class="card-text">{viewDetail.contactNumber}</p>
              <p class="card-text">{viewDetail.description}</p>
            </div>
          </div>
        </div>
        </div>
        </div>
        </>
        ):
        (<div>You are logged out of the page.Please try again after login!</div>)
        }
        </div>
    )
}
