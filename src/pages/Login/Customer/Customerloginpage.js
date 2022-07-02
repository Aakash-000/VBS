import React,{useState,useEffect} from 'react'
import {Reacticoneight} from '../../../assets/icons/Reacticon.js'
import './customerloginpage.css'


export default function Customerloginpage() {
  const errorMsg = [{id:'1',forName: "*Please include at least five letter with no special characters in your name"},
  {id:'2',forPassword:"*At least one uppercase character ,seven char long and Please include three letter one number one specialcharacter"},
  {id:'3',forConfirmPassword:"*Password should match!"}]

  const[CustomerDetail,setCustomerDetail] = useState({username:"",password:"",confirmpassword:""});
  const[focused,setFocused] = useState(false);
  const submitHandler = e => {
    e.preventDefault();
    console.log(CustomerDetail);
  }
  function handleFocus(e){
     setFocused(true);
  }
  return (
    <div className='customer_page container'>
        <form className='customer_form' onsubmit={submitHandler}>
        <h1 className='heading_clog'><Reacticoneight/>Customer Login</h1>
        <div className='form_field_customer'>
        <label htmlFor='username'>UserName :</label>
        <input autoComplete="off" type="text" pattern='^[a-zA-Z ]{5,16}$' required={true} name='username' id="username" onBlur={handleFocus} focused={focused.toString()} onChange={e=>setCustomerDetail({...CustomerDetail,username:e.target.value})} value={CustomerDetail.username}/>
        <span>{errorMsg.map((item)=>(item.forName))}</span>
        </div>
        <div className='form_field_customer'>
        <label htmlFor='password'>Password :</label>
        <input type="password" name='password' onBlur={handleFocus} focused={focused.toString()}  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} id="password" onChange={e=>setCustomerDetail({...CustomerDetail,password:e.target.value})} value={CustomerDetail.password}/>
        <span>{errorMsg.map((item)=>(item.forPassword))}</span>
        </div>
        {/* <div className='form_field'>
        <label htmlFor='password'>ConfirmPassword :</label>
        <input type="password" name='confirmpassword' pattern = {AdminDetail.password} required={true} onBlur={handleFocus} focused={focused.toString()} id="confirmpassword" onChange={e=>setAdminDetail({...AdminDetail,confirmpassword:e.target.value})} value={AdminDetail.confirmpassword}/>
        <span>{errorMsg.map((item)=>(item.forConfirmPassword))}</span>
        </div> */}
        <div className="form_field_customer">
         <button type="submit">Login</button>
         </div>
       </form>
      </div>
  )
}
