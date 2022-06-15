import React from 'react'
import './body.css'
import image from './body-image-new.jpg'
import { useState } from 'react'
import Slider from './Slider';

export default function Body() {
  const info = "When a customer needs to organize an event, he/she definitely tries to search for a manageable online venue booking system.Booking Commerce is all that you need to create an online venue booking system. You can create multiple categories for the venue bookings that will reflect on the front end. After that, you can start adding venues and add them in defined categories.So, you can effortlessly get started with the venue booking service and let the customers book the finest venue.Explore Venues around Nepal and find your fit.";
  const[readMore,setreadMore] = useState(false);
  return (
    <div className='body_head'>
        <div className='body_image'>
          <img src={image} alt="Body Image"/>
          </div>  
          <div className='body_text'>
          <h1>{readMore ? info : `${info.substring(0,201)}...`}
          </h1>
          <button onClick={()=>setreadMore(!readMore)}>{readMore ? 'Show Less':'ReadMore'} </button>  
          </div>
          <div className='slider_block'>
          <Slider/>
          </div>
          </div>
  )
}
