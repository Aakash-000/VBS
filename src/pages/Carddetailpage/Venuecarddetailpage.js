import React ,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './venuecarddetailpage.css'
import axios from 'axios';


export default function Venuecarddetailpage() {
  const[getregvenue,setgetregvenue] = useState([]);
  const {id} = useParams();

    useEffect(()=>{
    axios.get(`https://venue-booking-system2.herokuapp.com/${id}`)
    .then(response=>(setgetregvenue(response.data.data)));
    }
    ,[])
    console.log(getregvenue);
    // const filterImg = getregvenue.find((item)=> item.id == id) 
    
    return (
      <div className='card_detail_main'>
        <h2>{getregvenue.venueName}</h2>
        <div className='card_detail_image'>
        {/* <img src={filterImg.image} alt="Venue Image" style={{fontSize:'2vw',color:'white'}}/> */}
        <div className='card_detail_image_overlay'>
        <h1>Location:{getregvenue.address}</h1>
        <h3>OwnerName:{getregvenue.userName}</h3>
        <h4>ContactNumber:{getregvenue.contactNumber} </h4>
        </div>
        </div>
      </div>
  )
}





