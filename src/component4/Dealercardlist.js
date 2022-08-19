import React,{useState,useEffect}  from 'react'
import axios from'axios'
import {Link, useParams} from 'react-router-dom'
import './dealercardlist.css'
import Staticelement from '../components/SliderBar/Staticelement.js'

export default function Dealercardlist({filterSearch}) {
    const [getregVenue,setregVenue] = useState([]);
    const[getImage,setgetImage] = useState([]);
    const {email }= useParams();

    const config = {  
      headers:{
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
      }
    }

    useEffect(()=>{
            async function getVenue(){
              let response = await axios.get('https://venue-booking-system2.herokuapp.com/client-',config)
              setregVenue(response.data.data)
              .catch(err=> {console.log(err)});
            }
            getVenue();
          },[])

    return (
        // <div>
        // <div className='grid_view' style={{padding:'0vw 4vw 4vw 4vw',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'4vw'}}>
        // {getregvenue.map((item)=>
        // (
        //   <Link to={`venue/${item.id}`} key={item.id}>
        //   <div className='item' style={{height:'400px',background:'white'}}> 
    //       {/* <img src={item.image} alt="Venue Image"/> */}
    //        <div className='span_element'>
    //       <h1>{item.venueName}</h1>
    //       </div>
    //       </div>
    //       </Link>
    //       ))}
    //      </div>  
    //     </div>
    <div className='grid_layout'>
    <div className="grid_layout_row row row-cols-1 row-cols-md-3 row-cols-lg-4">
    {getregVenue.filter((item)=>{if(item.address.toLowerCase().includes(filterSearch.toLowerCase())){
        return item;
    }}).map((item)=>
         (
        <Link className='grid_layout_link' to={`/venue/${email}/${item.id}`} key={item.id}>
        <div class="grid_layout_col col">
        <div class="card">
        <img src={item.image} class="card-img-top" alt="..."/>
        <div class="card-body"> 
        <h5 class="card-title">{item.venueName}</h5>
        </div>
        </div>
        </div>
        </Link>
         ))}
    </div>
    </div>
    )
}
