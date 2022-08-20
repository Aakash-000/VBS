import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './bookingform.css'
import { useParams } from 'react-router-dom';
import axios from 'axios'
export default function Bookingform() {

    const {clientemail,id} = useParams();
    const[bookingDetail,setbookingDetail] = useState({bookingDate:"",calculatedPayment:"",requiredCapacity:"",functionType:"Marriage"})
    const prevBooked = [];
    const[booked,setBooked] = useState([]);
    const[isAvailable,setisAvailable] = useState(true);
    const[noToken,setnoToken] = useState(false);
    useEffect(() => {
      if(sessionStorage.length != 0){
        setnoToken(false)
      }else {
        setnoToken(true)
      }
    }, [noToken])                                        

    const config = {      
      headers:{                                                                                                 
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token')),
        "Content-Type" : "application/json"
      }
    }

      useEffect(()=>{
          
      })

      async function bookNow(){
        try{
          let response = await axios.post(`https://venue-booking-system2.herokuapp.com/client-/book-venue/${id}/${clientemail}`
          ,JSON.stringify(bookingDetail),
          config
          );
          console.log(response);
          setBooked(response.data.data)   
          if(booked.includes(bookingDetail.date)){
            setisAvailable(false)
          }else{
            prevBooked.push(bookingDetail.date);
          }
      }catch(err){
        console.log(err)
        setbookingDetail(()=>({...bookingDetail,bookingDate:"",calculatedPayment:"",requiredCapacity:"",functionType:""}))
      }
      
    }
      
      const submitHandler = (e) =>{
      e.preventDefault();
      bookNow()
       }

    return (
      <>
      {noToken?(
        <div className='booking_form_customer'>
        <div className='book_button'>
        <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Book Now
        </button>
        </div>
        <div className="book_model modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="book_model_dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="book_model_content modal-content">
      <div className="book_model_header">
        <h5 className="book_model_title modal-title" id="staticBackdropLabel">Booking Form</h5>
        <div className='book_model_button'><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
      </div>                                            
      <div className="book_model_body modal-body">
      <form id='venue_booking_form' onSubmit={submitHandler}>
      <div className='booking_form'>
      <label htmlFor='date'>DateBooked:</label>
      <input autoComplete="off" type="date" name='date' id='date' required={true}  onChange={e=>setbookingDetail({...bookingDetail,bookingDate:e.target.value})} value={bookingDetail.bookingDate}/>
      </div>
      <div className='booking_form'>
      <label htmlFor='date'>FunctionType:</label>
      <select value={bookingDetail.functionType} onChange={e=>setbookingDetail({...bookingDetail,functionType:e.target.value})}>
      <option >Marriage</option>
      <option >Family Party</option>
      <option >Conclave</option>
      <option >College Functions</option>
      <option >Convention</option>
     </select>
      </div>
      <div className='booking_form'>
      <label htmlFor='offeredPayment'>CalculatedPayment:</label>
      <input autoComplete="off" type="text" name='offeredPayment' id='date' placeholder={`0`} required={true}  onChange={e=>setbookingDetail({...bookingDetail,calculatedPayment:e.target.value})} value={bookingDetail.calculatedPayment}/>
      </div>
      <div className='booking_form'>
      <label htmlFor='requiredCapacity'>RequiredCapacity:</label>
      <input autoComplete="off" type="text" name='requiredCapacity' id='date' required={true}  onChange={e=>setbookingDetail({...bookingDetail,requiredCapacity:e.target.value})} value={bookingDetail.requiredCapacity}/>
      </div>
      <div className="book_model_footer ">
        <button type="submit" disabled={!isAvailable} >Submit</button>
      </div>
      </form>
      </div>
      </div>
        </div>
        </div>
        </div>):(<div>You are logged out of page.Please login and try again.</div>)}
        </>
    )
}
