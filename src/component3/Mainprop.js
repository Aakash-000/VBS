import React from 'react'
import './main.css'

export default function Mainprop(prop) {
  return (
    <div className='main_content'>
        <div className='main_image'>
            <img src={prop.item.image} alt="Image"/>
            <div className='main_subone'>
                <h3>{prop.item.countryName}</h3>
                <a href={prop.item.location} target="_blank">View on Google Maps</a>
                <h1 className ='main_subone_three'>{prop.item.place}</h1>
                <h3 className='main_subone_one'>{prop.item.travelleddate}</h3>
                <h4 className='main_subone_two'>{prop.item.description}</h4>
            </div>
            </div>
        </div>
  )
}





