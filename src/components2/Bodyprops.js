import React from 'react';
import './body.css'

export default function Bodyprops(props) {
  let badgeText 
      if(props.newitem.openspot === 0){
       badgeText="SOLD OUT"
      }else if(props.newitem.location === "online"){
       badgeText = "ONLINE"
      }
   return (
      <div className='body_content_one'>
        <div className='body_text'><p>{badgeText}</p></div>
      <img className='body_content_one_main'src={props.newitem.image} alt="Person"/>
      <div className='body_content_logo'>
        <img className='body_content_one_sub'src={props.newitem.imagesub} alt="Star Logo"/>
        <span>{props.newitem.spanone}</span>
        <span>{props.newitem.spantwo}</span>
        <span>{props.newitem.spanthree}</span>
        </div>
        <p>{props.newitem.pone}</p>
        <p>{props.newitem.ptwo}</p>
      </div>
   )
  
}
