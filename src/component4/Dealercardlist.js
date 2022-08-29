import React,{useState,useEffect}  from 'react'
import axios from'axios'
import {Link, useParams, Navigate, useNavigate} from 'react-router-dom'
import './dealercardlist.css'


export default function Dealercardlist({filterSearch}) {
    
    const [getregVenue,setregVenue] = useState([]);
    const[getImage,setImage] = useState([]);
    const {email }= useParams();
    const navigate = useNavigate();
    const imagestore = [];
    const config = {  
      headers:{
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
      }
    }
                                                                            
          useEffect(async()=>{
            try{
              let response = await axios.get('https://venue-booking-system2.herokuapp.com/client-',config)
              setregVenue(response.data.data)
              console.log(response.data.data.filePath)
            }catch(err){
              console.log(err)
            }
          },[])

          useEffect(async()=>{
            try{
              let response = await axios.get('https://venue-booking-system2.herokuapp.com/client-',config)
              setImage(response.data.data)
              for(let i=0; i <= getImage.length ; i++){
              localStorage.setItem(`imageitem${[i]}`,JSON.stringify(response.data.data[i].filePath))
              }
            }catch(err){
              console.log(err)
            }
          },[])
               
            const b64toBlob = (b64Data , contentType = "" , sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];

              for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);
            
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
                }
            
                const byteArray = new Uint8Array(byteNumbers);
            
                byteArrays.push(byteArray);
              }

              const blob = new Blob(byteArrays, { type: contentType });
              return blob;
            };

          for(let i = 0;i<=localStorage.length;i++){
            const imageArr =  JSON.parse(localStorage.getItem(`${localStorage.key(i)}`))
            const contentType = "image/jpeg";
            const blob = b64toBlob(imageArr, contentType);
            const blobUrl = URL.createObjectURL(blob);
            imagestore.push(blobUrl)
            }

            const handleClick = (demail,cemail,index)=> {
              localStorage.setItem(`imageitemarr`,JSON.stringify(getregVenue[index].filePath))
              navigate(`/venue/${cemail}/${demail}`)
            }
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
    {getregVenue.filter((item)=>{if(item.address.toLowerCase().substring(0,4).includes(filterSearch.toLowerCase().substring(0,4))){
        return item;
    }}).map((item,index)=>
         (
        <div class="grid_layout_col col" onClick={()=>handleClick(item.email,email,index)} key={index}>
        <div class="card_list card">
        <img src={imagestore[index]} class="card-img-top" alt="..."/>
        <div class="card_list_sub card-body"> 
        <h5 class="card_list_title card-title">{item.venueName.toUpperCase()}</h5>
        </div>
        </div>
        </div>
         ))}
    </div>
    </div>
    )
}
