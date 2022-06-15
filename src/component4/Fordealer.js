import React,{useState,useEffect} from 'react'
import './fordealer.css'
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Fordealer() {
  
  const errorMsg = [{id:'1',forName: "*Please include at least three character with no special characters in your name"},
  {id:'2',forPassword:"*At least seven char long and Please include three letter one number one specialcharacter"},
  {id:'3',forConfirmPassword:"*Password should match!"},
  {id:'4',forConNum:"*Should be ten digit long"}]

  const[dealerDetail,setDealerDetail] = useState({email:"",userName:"",password:""});
  const[focused,setFocused] = useState(false);
  const[filterD,setfilterD] = useState([]);
  const[filterAccount,setfilterAccount] = useState([]);
  
    function checkData(){
    axios.get('https://venue-booking-system2.herokuapp.com/venue').then((item)=>(setfilterD(item.data.data)));
    const array = filterD.filter((response)=>{
        return ((response.email === dealerDetail.email) && (response.userName === dealerDetail.userName) && (response.password === dealerDetail.password));
    })
    setfilterAccount(array);
  }
  
    
  const submitHandler = async (e) => {
    e.preventDefault();
    checkData();
    console.log(dealerDetail); 
    console.log(filterD); 
    console.log(filterAccount); 
  }
  
  function handleFocus(e){
    setFocused(true);
 }

  return (
    <div className='dealer'>
      <div className='header'>
        <p>Login Page</p>
        </div>
        <form className='admin_form' onSubmit={submitHandler}>
        <div className='form_field'>
        <label htmlFor='email'>Email:</label>
        <input autoComplete="off" type="text" name='email' pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$' id='email' required={true} onBlur={(e)=> setFocused(true)} focused={focused.toString()} onChange={e=>setDealerDetail({...dealerDetail,email:e.target.value})} value={dealerDetail.email}/>
        <span>*Please write valid email</span>
        </div>
        <div className='form_field'>
        <label htmlFor='name'>UserName :</label>
        <input type="text" name='username' id='username' pattern='^[a-zA-Z ]{3,16}$' onBlur={handleFocus} focused={focused.toString()} required={true} value={dealerDetail.userName} onChange={e=>setDealerDetail({...dealerDetail,userName:e.target.value})} />
        <span>{errorMsg.map((item)=>(item.forName))}</span>
        </div>
        <div className='form_field'>
        <label htmlFor='password'>Password :</label>
        <input type="password" name='password' id='password' onBlur={handleFocus} focused={focused.toString()} pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} value={dealerDetail.password} onChange={e=>setDealerDetail({...dealerDetail,password:e.target.value})} />
        <span>{errorMsg.map((item)=>(item.forPassword))}</span>
        </div>
        {/* <div className='form_field'>
        <label htmlFor='password'>ConfirmPassword :</label>
        <input type="password" name='confirmpassword' id='confirmpassword' onBlur={handleFocus} focused={focused.toString()} pattern={dealerDetail.password}required={true} value={dealerDetail.confirmpassword} onChange={e=>setDealerDetail({...dealerDetail,confirmpassword:e.target.value})} />
        <span>{errorMsg.map((item)=>(item.forConfirmPassword))}</span>
        </div> */}
        <div className='form_field_button'>
        <button type="submit">Login</button>
        </div>
        </form>
    </div>
  )
}