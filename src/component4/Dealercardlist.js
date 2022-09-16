import React,{useState,useEffect}  from 'react'
import axios from'axios'
import {Link, useParams, Navigate, useNavigate} from 'react-router-dom'
import './dealercardlist.css'


export default function Dealercardlist({filterSearch}) {
    const[isLoading,setisLoading] = useState(true);
    const [getregVenue,setregVenue] = useState([]);
    const {email }= useParams();
    const navigate = useNavigate();
    const config = {  
      headers:{
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
      }
    }
                                                                            
          useEffect(async()=>{
            try{
              let response = await axios.get('https://venue-booking-system2.herokuapp.com/client-/clientHome',config)
              setregVenue(response.data.data)
              console.log(response.data.data.filePath)
              setisLoading(false)
            }catch(err){
              console.log(err)
            }
          },[])
       
            const handleClick = (demail,cemail,index)=> {
              navigate(`/venue/${cemail}/${demail}`)
            }
        return (
          <>
    {isLoading?(<div style={{fontSize:'15px',textAlign:'center',fontFamily:'sans-serif,Raleway'}}><p style={{fontSize:'20px',fontWeight:'500'}}>...Loading</p></div>):(<div className='grid_layout'>                                                                      
    <div className="grid_layout_row row row-cols-1 row-cols-md-3 row-cols-lg-4">                      
    {getregVenue.filter((item)=>{if(item.address.toLowerCase().substring(0,4).includes(filterSearch.toLowerCase().substring(0,4))){
        return item;
    }}).map((item,index)=>
         (
        <div class="grid_layout_col col" onClick={()=>handleClick(item.email,email,index)} key={index}>
        <div class="card_list card">
        <img src={`data:image/jpeg;base64,${item.filePath}`} class="card-img-top" alt="Image Array"/>
        <div class="card_list_sub card-body"> 
        <h5 class="card_list_title card-title">{item.venueName.toUpperCase()}</h5>
        </div>
        </div>
        </div>
         ))}
    </div>
    </div>)}
    </>
    )
}
