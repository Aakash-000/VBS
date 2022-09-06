import React,{useState,useEffect} from 'react'
import './explorevenue.css'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import Dealercardlist from './Dealercardlist.js'
import { Searchbar } from '../components/Searchbar/Searchbar'
import {Reacticonseven,Reacticontwentysix, Reacticontwentyfive, Reacticontwentyfour} from '../assets/icons/Reacticon.js'
import Navbar from '../components/Navbar/Navbar'
export default function Explorevenue() {
    return(
    <div>
        <Searchbar/>
    </div>
    )
}

export function Explorevenuenormal(){
    const[isLoading,setisLoading] = useState(true);
    const [getregVenue,setregVenue] = useState([]);
    const[searchTerm,setSearchTerm]=useState("");
                                                                            
          useEffect(async()=>{
            try{
              let response = await axios.get('https://venue-booking-system2.herokuapp.com/home-')
              setregVenue(response.data.data)
              console.log(response.data.data)
              setisLoading(false)
            }catch(err){
              console.log(err)
            }
          },[])
       

        return (
          <>
          <Navbar/>
    {isLoading?(<div style={{fontSize:'30px',paddingTop:'200px',textAlign:'center',fontFamily:'sans-serif,Raleway'}}><p>...Page is Loading</p></div>):(<div className='grid_layout_norm'>                                                                      
    <div className='search_bar'>
    <input type="text" name="search" autoComplete="off" id="search"  value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Searchfor Venue Location'/><Reacticonseven/>
    </div>
    <div className="grid_layout_row_norm row row-cols-1 row-cols-md-3 row-cols-lg-4">                      
    {getregVenue.filter((item)=>{if(item.address.toLowerCase().substring(0,4).includes(searchTerm.toLowerCase().substring(0,4))){
        return item;
    }}).map((item,index)=>
         (
        <Link to="/customerlogin"><div class="grid_layout_col_norm col" key={index}>
        <div class="card_list_norm card">
        <img src={`data:image/jpeg;base64,${item.filePath}`} class="card-img-top" alt="Image Array"/>
        <div class="card_list_sub_norm card-body"> 
        <h5 class="card_list_title_norm card-title">{item.venueName.toUpperCase()}</h5>
        <div className="main_page_pre">
        <pre><Reacticontwentysix/>{item.address}</pre>
        </div>
        <pre className="pre_capac"><Reacticontwentyfour/>Capacity:{item.capacity}</pre>
        </div>
        </div>
        </div>
        </Link>
         ))}
    </div>
    </div>)}
    </>
        )
}
