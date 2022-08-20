import React, {useState,useEffect}from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import './editcustomeraccount.css'
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import Avatar from '@mui/material/Avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Customeraccount from './customeraccountpage.js'
import axios from 'axios'

export default function EditCustomeraccount() {
    const errorMsg = [{id:'1',forName: "*Please include at least five letter with no special characters in your name"},
  {id:'2',forPassword:"*At least one uppercase character ,seven char long and Please include three letter one number one specialcharacter"},
  {id:'6',forConNum:"*Should be ten digit long"}]

  const navigate = useNavigate();
  const {email} = useParams();
  const[noToken,setnoToken] = useState(false);
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken])

  useEffect(async()=>{
    function getUser(){
      axios.get(`https://venue-booking-system2.herokuapp.com/client-/${email}`,config)
      .then(response => {
        console.log(response.data.data)
        seteditData({...editData,userName:response.data.data.name,
          password:response.data.data.password,
          contactNumber:response.data.data.mobile_no})
      })
      .catch(err=> {console.log(err)});
    }
     getUser();
  },[])
  
  const[editData,seteditData] = useState({userName:'',password:'',contactNumber:''});
  const[focused,setFocused] = useState(false);
  function handleFocus(e){
    setFocused(true);
 }

 const config = {  
  headers:{                                                                                                 
    Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
  }
}

 function submitHandler(e){
    e.preventDefault();
    // navigate(`/customeraccount/${email}`);
    console.log(editData)
 }
    return (
      <>
      {!noToken ?(
        <div className='edit_customer container'>
             <div className='customer_edit_page container'>
        <form className='customer_edit_form' onSubmit={submitHandler}>
        <h1 className='heading_edit_clog'>Edit Account</h1>
        <div class="form_edit_field_customer">
        <label htmlFor="username" >User Name:</label>
        <input autoComplete="off" type="text" name='username' id='username' required={true} pattern='^[a-zA-Z ]{3,16}$'  onBlur={handleFocus} focused={focused.toString()} onChange={e=>seteditData({...editData,userName:e.target.value})} value={editData.userName}/>
        <span>{errorMsg.map((item)=>(item.forName))}</span>
        </div>
        <div className='form_edit_field_customer'>
        <label htmlFor='password'>Password :</label>
        <input type="password" name='password' onBlur={handleFocus} focused={focused.toString()}  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} id="password" onChange={e=>seteditData({...editData,password:e.target.value})} value={editData.password}/>
        <span>{errorMsg.map((item)=>(item.forPassword))}</span>
        </div>
        <div className='form_edit_field_customer'>
        <label for="contactnumber" class="form-label">Contact Number:</label>
    <input type="text" name='contactNumber' id='number' required={true} onBlur={handleFocus} focused={focused.toString()} pattern='^[9][6-8]{1}[0-9]{8}$' onChange={e=>seteditData({...editData,contactNumber:e.target.value})} value={editData.contactNumber}/>
    <span>{errorMsg.map((item)=>(item.forConNum))}</span>
        </div>
        <div className="form_edit_field_customer">
        <button type="submit">Update</button>
         </div>
       </form>
      </div>
        </div>):(<div>You are logged out of page.Please login to continue.</div>)}
        </>
    )
}
