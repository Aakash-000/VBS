import React,{ useState,useEffect} from 'react'
import './body.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sliderbar from '../../components/SliderBar/Sliderbar';
import Icongridelement from './Icongridelement.js'
import Footer from '../../components/Footer/Footer';
import {Link} from 'react-router-dom'
import {FaOdnoklassniki,FaChalkboardTeacher,FaLinkedin} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'
import {Reacticonfive,Reacticonsix} from '../../assets/icons/Reacticon.js'
import logo from '../../assets/images/navbar_logo_bgr.png'
import axios from 'axios'



export default function Body() {
  
  const[MobileRes,SetMobileRes] = useState(false);
  const[navbarColor,setnavbarColor] = useState(false);

  const changeBackground = ()=>{
    if(window.scrollY >= 80){
      setnavbarColor(true)
    }else{
      setnavbarColor(false)
    }
  }
  window.addEventListener('scroll',changeBackground)

  useEffect(async() => {
      try{
        let response = await axios.get('https://venue-booking-system2.herokuapp.com/home-')
        console.log(response)
      }catch(err){
        console.log(err)
      }
  }, [])
  return (
           <>
           <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet"/>
           
            <div className='landing_page'>
            <nav className={navbarColor ? 'navbar_change sticky-top':'navbar_rest sticky-top'}>
         <div className='navbar_logo'>
        <Link to="/" style={{textDecoration:'none'}}><img src={logo} alt="Navbar Logo"/></Link>
        </div>
        <div className={MobileRes ? ('navbar_sub_mobile') : ('navbar_sub')}>
            <Link to='/'>
            <button  className='about_but'
            onClick={()=>SetMobileRes(false)}><Reacticonfive style={{marginBottom:'10px'}}/>Aboutus</button>
           </Link>
            <Link to="/explorevenue/normal">       
            <button className='styl_exp'><Reacticonsix className='buttonicon'/>Explore</button>
            </Link>
            
            <Link to='/adminlogin'>
            <button onClick={()=>SetMobileRes(false)}><FaChalkboardTeacher size={16} className='buttonicon'/>Admin</button>
            </Link>
            
            <Link to="/customerlogin"><button onClick={()=>SetMobileRes(false)} ><FaOdnoklassniki size={16} className='buttonicon'/>Customer</button>
            </Link>  
            
            <Link to="/dealerlogin"><button onClick={()=>SetMobileRes(false)} ><HiUserGroup size={16} className='buttonicon'/>Dealer</button>
            </Link>
        </div>
        <button className='mobile-menu-icon' onClick={()=>SetMobileRes(!MobileRes)}>
          {MobileRes ? (<i className='fas fa-times' ></i>):(<i className='fas fa-bars'></i>)}
        </button> 
        </nav>
            <div className='upper container-fluid'>
              <div className='row'>
              <div className='text_sec col-4 .col-md-2'>
              <h5 className="title card-title">Explore Best class venue of your fit!</h5>
              <p className="text card-text">Discover the list of legally registered venues and book match of your best fit.Our service of making your reach to top class Venue from any remote location safer,easier and faster is for free.Book venue right now.</p>
             <Link to="/customerlogin"><button className='hero_button'>Book Now</button></Link>
              </div>
              <div className='slider_bar col-7 .col-md-4'>
                <Sliderbar/>
              </div>
              </div>
            </div>
            <div className='icon_grid container'>
              <div className="icon_heading_new">Service for Everyone</div>
            </div>
            <div className="lower container-fluid">
            <div className="make_grid grid">
            {Icongridelement.map((value,index)=>(
              <div className="grid_layer g-col-6 g-col-md-4" key={index}>
              <div class="box_card card" style={{width:'30vw'}}>
                <div className="card_body_head card-body">
                  <div className='gicon'>{value.icon}</div>
                  <div className='card_body_sub'>
                <h5 className="card_head">{value.head}</h5>
                <p>{value.text}</p>
                </div>
                </div>
                </div>
                </div>))}
                </div>
                </div>
              <div className='accordion_def container'>
                <pre>About us</pre>
                <div class="accordion_main accordion" id="accordionExample">
              <div class="accordion_sub_one accordion-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-controls="collapseOne">
                <abbr class="accordion-header" id="headingOne">
                  <abbr  type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  How can we believe that the registered Venue is legal and safe to book?
                 </abbr>
                </abbr>
                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne">
                  <div class="accordion-body">
                    <strong>We ensure the safety and legal status by implementing our field officer and security to the Venue location and note down the status of Venue.If venue approved we being out venue to you.</strong>
                  </div>
                </div>
              </div>
              <div class="accordion_sub_two accordion-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-controls="collapseTwo">
                <abbr class="accordion-header" id="headingTwo">
                 <abbr type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                 How long have you been giving this service?
                 </abbr>
                </abbr>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo">
                 <div class="accordion-body">
                    <strong>We have recently registered as an organization and been helping Venue owner and customer since last 3 months.</strong>
                  </div>
                </div>
              </div>
              <div class=" accordion_sub_three accordion-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-controls="collapseThree">
                <abbr class="accordion-header" id="headingThree">
                 <abbr type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                 How can we contact you?
                 </abbr>
                </abbr>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree">
                  <div class="accordion-body">
                   <strong>You can contact us via our Hotline service or email us at our official email.</strong>
                  </div>
               </div>
              </div>
              <div class="accordion_sub_four accordion-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-controls="collapseFour">
                <abbr class="accordion-header" id="headingFour">
                 <abbr type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                 How is the cost of Venue calculated?
                 </abbr>
                </abbr>
                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour">
                 <div class="accordion-body">
                    <strong>Venue Owner is responsible for defining base cost and rate of increase for venue capacity and type of event being conducted.
                      Customer select event type and capacity necessary and add base cost with rate to increase depending upon the capacity customer provide.
                    </strong>
                  </div>
                </div>
              </div>
            </div>
                </div>  
              </div> 
              <Footer/>
              </>
  )
}
