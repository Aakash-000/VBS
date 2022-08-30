import React,{ useState } from 'react'
import './body.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sliderbar from '../../components/SliderBar/Sliderbar';
import Icongridelement from './Icongridelement.js'
import Navbar from '../../components/Navbar/Navbar.js'
import Accordionelement from './Accordionelement.js';
import Footer from '../../components/Footer/Footer';

export default function Body() {

  return (
           <>
           <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet"/>
            <div className='landing_page'>
              <Navbar/>
            <div className='upper container-fluid'>
              <div className='row'>
              <div className='text_sec col-4 .col-md-2'>
              <h5 className="title card-title">Explore Best class venue of your fit!</h5>
              <p className="text card-text">Discover the list of legally registered venues and book match of your best fit.Our service of making your reach to top class Venue from any remote location safer,easier and faster is for free.Book venue right now.</p>
              <button className='hero_button'>Book Now</button>
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
                <div class="accordion" id="accordionExample">
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
            </div>
                </div>  
              </div> 
              <Footer/>
              </>
  )
}
