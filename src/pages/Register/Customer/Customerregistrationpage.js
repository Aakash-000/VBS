import React,{useState,useEffect} from 'react'
import './customerregistrationpage.css'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import {Reacticonfour} from '../../../assets/icons/Reacticon.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../../../components/Navbar/Navbar.js'

export default function Customerregistrationpage() {
  const errorMsg = [{id:'1',forName: "*Please include at least ten letter with no special characters in your Venue Name"},
  {id:'5',forUserName: "*Please include at least six letter with no special characters in your Name"},
  {id:'2',forImage:"*Image should be in proper format"},
  {id:'3',forLocation:"*Please include at least five letter with no special character in your Venue Location"},
  {id:'4',forComment:"*Please include description more than 50 letters with no special characters"},
  {id:'6',forConNum:"*Should be ten digit long"},
  {id:'7',forPassword:"*At least seven char long and Please include three letter one number one specialcharacter"}]
    
    const navigate = useNavigate();
    const[focused,setFocused] = useState({email:false,name:false,city:false,cnum:false,passw:false});
    const[customerDetail,setCustomerDetail] = useState({email:"",username:"",city_name:"",mobile_no:"",password:""});
    const[isvalid,setisvalid] = useState(true);
    const[isvalidS,setisvalidS] = useState(true);
    
      async function register(){
        try{
        let response = await axios.post('https://venue-booking-system2.herokuapp.com/register/client',JSON.stringify(customerDetail),
        {headers:{'Content-Type':'application/json'
        }});

        console.log(response);
        
        setCustomerDetail(()=>({...customerDetail,email:" ",username:" ",city_name:" ",mobile_no:" ",password:" "}));
        setTimeout(()=>{
          navigate('/login');
        },5000)
        setisvalidS(false)
        const timeId = setTimeout(() => {
          setisvalidS(true)
        }, 5000)

      return () => {
      clearTimeout(timeId)
      }
      }catch(err){
        console.log(err)
        setCustomerDetail(()=>({...customerDetail,email:" ",username:" ",city_name:" ",mobile_no:" ",password:" "}));
        setisvalid(false)
        const timeId = setTimeout(() => {
          setisvalid(true)
        }, 5000)

      return () => {
      clearTimeout(timeId)
      }
      }
    }

       function submitHandler(e){
      e.preventDefault();
        register();
      }
      

  //   const submitHandler = async(e) => {            
  //   e.preventDefault();
  //   console.log(dealerDetail);
  //   console.log(fileUpload);
  // }
  function handleFocus(e){
    setFocused(true);
 }
 
  return (
    <div> 
      <Navbar/>
    <div className='customer_reg_page container-fluid'>

    {isvalid ? <div></div> : <div className='invalid_req_book'>
        <pre className='invalid_status_req_book'>
          Registration Unsuccessfull!
        </pre>
        </div>
        }
        {isvalidS ? <div></div> : <div className='valid_req_book'>
        <pre className='valid_status_req_book'>
          Registration Successful!
        </pre>
        </div>
        }
      <form class="creg_form row g-3" onSubmit={submitHandler}>
        <h1 className='heading_creg'><Reacticonfour className='reg_icon'/>Customer Registration</h1>
      
    <div class="creg_field col-md-6">
    <label for="email" class="form-label">Email</label>
    <input autoComplete="off" type="text" name='email' pattern='^\w.+@[a-z.A-Z_].+?\.[a-zA-Z]{2,3}$' id='email' required={true} onBlur={()=> setFocused({...focused,email:true})} focused={focused.email.toString()} onChange={e=>setCustomerDetail({...customerDetail,email:e.target.value})} value={customerDetail.email}/>
    <span>*Please write valid email</span>
  </div>
  <div class="creg_field col-md-6">
  <label for="username" class="form-label">User Name</label>
  <input autoComplete="off" type="text" name='name' id='username' required={true} pattern='^[a-zA-Z ]{3,50}$'  onBlur={()=>setFocused({...focused,name:true})} focused={focused.name.toString()} onChange={e=>setCustomerDetail({...customerDetail,username:e.target.value})} value={customerDetail.username}/>
    <span>{errorMsg.map((item)=>(item.forUserName))}</span>
    </div>

   
  <div class="creg_field col-md-6">
    <label for="password" class="form-label">Password</label>
    <input type="password" name='password' id='password' onBlur={()=>setFocused({...focused,passw:true})} focused={focused.passw.toString()} pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} onChange={e=>setCustomerDetail({...customerDetail,password:e.target.value})} value={customerDetail.password}/>
    <span>{errorMsg.map((item)=>(item.forPassword))}</span>
  </div>
   
  <div class="creg_field col-md-6">
    <label for="address" class="form-label">Address</label>
    <input autoComplete="off" type="text" name='city_name'  required={true} id='address' pattern='^[a-zA-Z ]{5,200}$'  onBlur={()=>setFocused({...focused,city:true})} focused={focused.city.toString()} onChange={e=>setCustomerDetail({...customerDetail,city_name:e.target.value})} value={customerDetail.city_name}/>
    <span>{errorMsg.map((item)=>(item.forLocation))}</span>
    </div>
    <div class="creg_field col-md-6">
    <label for="contactnumber" class="form-label">Contact Number</label>
    <input type="text" name='mobile_number' id='number' required={true} maxLength='10' onBlur={()=>setFocused({...focused,cnum:true})} focused={focused.cnum.toString()} pattern='^[9][6-8]{1}[0-9]{8}$' onChange={e=>setCustomerDetail({...customerDetail,mobile_no:e.target.value})} value={customerDetail.mobile_no}/>
    <span>{errorMsg.map((item)=>(item.forConNum))}</span>
  </div>

  <div class="creg_field col-12">
    <button type="submit" >Register</button>
  </div>
    </form>
    </div>
    </div>
  )
}





