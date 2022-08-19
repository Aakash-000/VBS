import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './adminloginpage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {Reacticoneight,Reacticonfour} from '../../../assets/icons/Reacticon.js'
import Navbar from '../../../components/Navbar/Navbar.js'
import axios from 'axios'

export default function Adminloginpage() {
  const errorMsg = [{id:'1',forName: "*Please include at least five letter with no special characters in your name"},
  {id:'2',forPassword:"*At least one uppercase character ,seven char long and Please include three letter one number one specialcharacter"},
  {id:'3',forConfirmPassword:"*Password should match!"}]

  const[AdminDetail,setAdminDetail] = useState({username:'',password:''});
  const[focused,setFocused] = useState(false);
  const navigate = useNavigate();
  
    async function login(){
      try{
      let response = await axios.post('https://venue-booking-system2.herokuapp.com/login',JSON.stringify(AdminDetail),
      {headers:{'Content-Type':'application/json'
    }});
      if(response.data.data.email == AdminDetail.username){
        console.log(response);
        navigate(`/adminaccount/${response.data.data.email}`);
        sessionStorage.setItem('token',JSON.stringify(response.data.data.token));
        setAdminDetail(()=>({...AdminDetail,username:'',password:''}));
        window.location.reload();
      }
      }catch(response){
        if(response.response.request.status != 200){
          console.log(response);
          setAdminDetail(()=>({...AdminDetail,username:'',password:''}));
        }else if(response.response.request.status == 500){
          alert('Internal Server Error');
        }
      }
    }

  const submitHandler = e => {
    e.preventDefault();
    login();
  }
  function handleFocus(e){
     setFocused(true);
  }
 
  return (
    <div>
       <Navbar/>
     <div className='admin_page container'>
        
        <form className='admin_control_form' onSubmit={submitHandler}>
        <h1 className='heading_alog'><Reacticoneight/>Admin Login</h1>
        <div className='form_field_admin'>
        <label htmlFor='username'>Email :</label>
        <input autocomplete="off" type="text" required={true} pattern='^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$' name='username' id="username" onBlur={handleFocus} focused={focused.toString()} onChange={e=>setAdminDetail({...AdminDetail,username:e.target.value})} value={AdminDetail.username}/>
        <span>{errorMsg.map((item)=>(item.forName))}</span>
        </div>
        <div className='form_field_admin'>
        <label htmlFor='password'>Password :</label>
        <input  type="password" name='password' onBlur={handleFocus} focused={focused.toString()}  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} id="password" onChange={e=>setAdminDetail({...AdminDetail,password:e.target.value})} value={AdminDetail.password}/>
        <span>{errorMsg.map((item)=>(item.forPassword))}</span>
        </div>
        {/* <div className='form_field'>
        <label htmlFor='password'>ConfirmPassword :</label>
        <input type="password" name='confirmpassword' pattern = {AdminDetail.password} required={true} onBlur={handleFocus} focused={focused.toString()} id="confirmpassword" onChange={e=>setAdminDetail({...AdminDetail,confirmpassword:e.target.value})} value={AdminDetail.confirmpassword}/>
        <span>{errorMs  g.map((item)=>(item.forConfirmPassword))}</span>
        </div> */}
        <div className="form_field_admin">
         <button type="submit">Login</button>
         </div>
       </form>
      </div>
      </div>
  )
}

export function Adminregisterpage(){
  const navigate = useNavigate();
    const[customerDetail,setCustomerDetail] = useState({email:"",name:"",password:""});
    async function register(){
      let response = await axios.post('https://venue-booking-system2.herokuapp.com/register/admin',JSON.stringify(customerDetail),
      {headers:{'Content-Type':'application/json'
      }});

      console.log(response);
      setCustomerDetail(()=>({...customerDetail,email:" ",name:" ",password:" "}));
      navigate('/adminlogin');
    }

     function submitHandler(e){
      e.preventDefault();
      register();
    }
    return(
      <div className='customer_reg_page container-fluid'>
      
      <form class="creg_form row g-3" onSubmit={submitHandler}>
        <h1 className='heading_creg'><Reacticonfour className='reg_icon'/>Admin Registration</h1>
      
    <div class="creg_field col-md-6">
    <label for="email" class="form-label">Email</label>
    <input autoComplete="off" type="text" name='email' id='email' required={true}  onChange={e=>setCustomerDetail({...customerDetail,email:e.target.value})} value={customerDetail.email}/>
  </div>
  <div class="creg_field col-md-6">
  <label for="username" class="form-label">User Name</label>
  <input autoComplete="off" type="text" name='name' id='username' required={true} pattern='^[a-zA-Z ]{3,16}$'  onChange={e=>setCustomerDetail({...customerDetail,name:e.target.value})} value={customerDetail.name}/>
    </div>
  <div class="creg_field col-md-6">
    <label for="password" class="form-label">Password</label>
    <input type="password" name='password' id='password' pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} onChange={e=>setCustomerDetail({...customerDetail,password:e.target.value})} value={customerDetail.password}/>
  </div>
   
  {/* <div class="creg_field col-md-6">
    <label for="address" class="form-label">Address</label>
    <input autoComplete="off" type="text" name='city_name'  required={true} id='address' pattern='^[a-zA-Z ]{5,200}$'  onBlur={handleFocus} focused={focused.toString()} onChange={e=>setCustomerDetail({...customerDetail,city_name:e.target.value})} value={customerDetail.city_name}/>
    <span>{errorMsg.map((item)=>(item.forLocation))}</span>
    </div>
    <div class="creg_field col-md-6">
    <label for="contactnumber" class="form-label">Contact Number</label>
    <input type="text" name='mobile_number' id='number' required={true} onBlur={handleFocus} focused={focused.toString()} pattern='^[9][6-8]{1}[0-9]{8}$' onChange={e=>setCustomerDetail({...customerDetail,mobile_no:e.target.value})} value={customerDetail.mobile_no}/>
    <span>{errorMsg.map((item)=>(item.forConNum))}</span>
  </div> */}

  <div class="creg_field col-12">
    <button type="submit" >Register</button>
  </div>
    </form>
    </div>
    )
}
