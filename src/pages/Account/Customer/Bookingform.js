import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './bookingform.css'
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function Bookingform() {
    const navigate = useNavigate();
    const {email,vemail} = useParams();
    const[bookingDetail,setbookingDetail] = useState({bookingDate:"",requiredCapacity:"",functionType:"Marriage"})
    const[isdatevalid,setisdatevalid] = useState(true);
    const[booked,setBooked] = useState([]);
    const[noToken,setnoToken] = useState(false);
    const[isvalid,setisvalid] = useState(true);
    const[isvalidS,setisvalidS] = useState(true);
    const[getUser,setcurrUser] = useState([]);
    const date = new Date();
    const Year = date.getFullYear();
    const Month = date.getMonth()+1;
    const Day = date.getDate();

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

    useEffect(async()=>{
      try{
        let response = await axios.get(`https://venue-booking-system2.herokuapp.com/client-/${email}`,config)
        setcurrUser(response.data.data)
        console.log(response)
      }catch(err){
        console.log(err)
      }
    },[]) 

      useEffect(()=>{
       async function getBookedDate(){
        try{
          let response = await axios.get(`https://venue-booking-system2.herokuapp.com/client-/bookedDate/${vemail}`,config);
          setBooked(response.data.data)
        
          const getDate = booked.filter((item,index)=>{
          return item === bookingDetail.bookingDate 
        })
           if(getDate.includes(bookingDetail.bookingDate)){
            setisdatevalid(false)
          }else{
            setisdatevalid(true)
        }
          console.log(response)
        }catch(err){
          console.log(err)
        }
      }
        getBookedDate()
    },[bookingDetail.bookingDate,isdatevalid])


      async function bookNow(){
        try{
          let response = await axios.post(`https://venue-booking-system2.herokuapp.com/client-/book-venue/${vemail}/${email}`
          ,JSON.stringify(bookingDetail),
          config
          );
          console.log(response);
          setbookingDetail(()=>({...bookingDetail,bookingDate:"",requiredCapacity:"",functionType:""}))
          navigate(`/cabookingdata/${email}/${getUser.name}`)
          window.location.reload();
          setisvalidS(false)
          const timeId = setTimeout(() => {
            setisvalidS(true)
          }, 5000)
  
        return () => {
        clearTimeout(timeId)
        }
      }catch(err){
        console.log(err)
       setbookingDetail(()=>({...bookingDetail,bookingDate:"",requiredCapacity:"",functionType:""}))
       setisvalid(false)
        const timeId = setTimeout(() => {
          setisvalid(true)
        }, 5000)

      return () => {
      clearTimeout(timeId)
      }
      }
    }
      
      const submitHandler = (e) =>{
      e.preventDefault();
      bookNow()
       }

    return (
      <>
      {!noToken?(
        <div className='booking_form_customer'>
        <div className='book_button'>
        <button className="book_button_sub"type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Book Now
        </button>
        </div>
        <div className="book_model modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="book_model_dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="book_model_content modal-content">
      <div className="book_model_header">
        <h5 className="book_model_title modal-title" id="staticBackdropLabel">Booking Form</h5>
        <div className='book_model_button'><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor:'white'}}></button></div>
      </div>                                            
      <div className="book_model_body modal-body">
      {isvalid ? <div></div> : <div className='invalid_req_book'>
        <pre className='invalid_status_req_book'>
          Form Submission Unsuccessfull!
        </pre>
        </div>
        }
        {isvalidS ? <div></div> : <div className='valid_req_book'>
        <pre className='valid_status_req_book'>
          Form Submission Successful!
        </pre>
        </div>
        }
      <form id='venue_booking_form' onSubmit={submitHandler}>
      <div className='booking_form'>
      <label htmlFor='date'>DateBooked:</label>
      <input autoComplete="off" type="date" name='bookingDate' min={`${Year}-0${Month}-0${Day}`} required={true}  onChange={e=>setbookingDetail({...bookingDetail,bookingDate:e.target.value})} value={bookingDetail.bookingDate}/>
      </div>
      <div className='booking_form'>
      <label htmlFor='functionType'>FunctionType:</label>
      <select value={bookingDetail.functionType} onChange={e=>setbookingDetail({...bookingDetail,functionType:e.target.value})}>
      <option >Marriage</option>
      <option >Family Party</option>
      <option >Conclave</option>
      <option >College Functions</option>
      <option >Convention</option>
     </select>
      </div>
      <div className='booking_form'>
      <label htmlFor='capacity'>RequiredCapacity:</label>
      <input autoComplete="off" type="text" name='requiredCapacity'  required={true}  onChange={e=>setbookingDetail({...bookingDetail,requiredCapacity:e.target.value})} value={bookingDetail.requiredCapacity}/>
      </div>
      <div className="book_model_footer ">
        <button type="submit" className="book_model_footer_sub" disabled={isdatevalid ? false : true}>Submit</button>
        {isdatevalid ?<div> </div>: <abbr>*Date is already Booked</abbr>}
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
