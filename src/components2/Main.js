import React from 'react';
import './main.css'
import mainImage from '../components2/main-img.png'

export default function Main() {
  return (
  <div className='main_container'>
      <div className='main_img'>
          <img src={mainImage} alt="MainImage"/>
      </div>
      <h1> Online Experiences</h1>
      <p>Join unique interacive activities led by AirBNB for hosting room when leaving outside of house</p>
  </div>
    );
}
