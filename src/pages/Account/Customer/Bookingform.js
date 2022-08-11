import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './bookingform.css'

export default function Bookingform() {

    const [bookingDetail,setbookingDetail] = useState({date:null,offeredPayment:'',requiredCapacity:''})
    const submitHandler = (e)=>{
      e.preventDefault();
      console.log(bookingDetail)
    }
    return (
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
      <input autoComplete="off" type="date" name='date' id='date' required={true}  onChange={e=>setbookingDetail({...bookingDetail,date:e.target.value})} value={bookingDetail.date}/>
      </div>
      <div className='booking_form'>
      <label htmlFor='offeredPayment'>OfferedPayment:</label>
      <input autoComplete="off" type="number" name='offeredPayment' id='date' required={true}  onChange={e=>setbookingDetail({...bookingDetail,offeredPayment:e.target.value})} value={bookingDetail.offeredPayment}/>
      </div>
      <div className='booking_form'>
      <label htmlFor='requiredCapacity'>RequiredCapacity:</label>
      <input autoComplete="off" type="number" name='requiredCapacity' id='date' required={true}  onChange={e=>setbookingDetail({...bookingDetail,requiredCapacity:e.target.value})} value={bookingDetail.requiredCapacity}/>
      </div>
      <div className="book_model_footer ">
        <button type="submit" >Submit</button>
      </div>
      </form>
      </div>
      </div>
        </div>
        </div>
        </div>
    )
}
