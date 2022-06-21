import React,{useState,useEffect}  from 'react'
import axios from'axios'
import {Link} from 'react-router-dom'
import './dealercardlist.css'

export default function Dealercardlist({filterSearch}) {
    const [getregvenue,setgetregvenue] = useState([]);
    
    useEffect(async()=>{
        let response = await axios.get('https://venue-booking-system2.herokuapp.com/venue');
        setgetregvenue(response.data.data);
    },[])
    
    return (
        <div>
        <div className='grid_view' style={{padding:'0vw 4vw 4vw 4vw',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'4vw'}}>
        {getregvenue.map((item)=>
        (
          <Link to={`venue/${item.id}`} key={item.id}>
          <div className='item' style={{height:'400px',background:'white'}}> 
          {/* <img src={item.image} alt="Venue Image"/> */}
           <div className='span_element'>
          <h1>{item.venueName}</h1>
          </div>
          </div>
          </Link>
          ))}
      </div>  
        </div>
    )
}
