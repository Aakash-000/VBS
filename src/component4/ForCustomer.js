import React,{useState} from 'react'
import './forcustomer.css'
import {FaSearchLocation} from 'react-icons/fa'
import Venuecarddetail from './Venuecarddetail'
import {Link} from 'react-router-dom'
import Element from './Element'
import { useEffect } from 'react'
import axios from 'axios'

export default function ForCustomer() {
  const[searchTerm,setSearchTerm]=useState('');
  const [getregvenue,setgetregvenue] = useState([]);
    useEffect(async()=>{
        let response = await axios.get('https://venue-booking-system2.herokuapp.com/venue');
        setgetregvenue(response.data.data);
    },[])
    console.log(getregvenue);
  return (
    <div className='customer'>
      <div className='search_bar'>
       <input type="text" name="search" autoComplete="off" id="search"  value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search For Location' /><FaSearchLocation style={{color:'#ffffb1',fontSize:'30px'}}/>
      </div>
      <div className='grid_view' style={{padding:'0vw 4vw 4vw 4vw',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'4vw'}}>
        {getregvenue.filter((item)=>{
          if(searchTerm == ""){
            return item;
          }else if(item.address.toLowerCase().includes(searchTerm.toLowerCase())){
            return item;
          }
        }).map((item)=>
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
