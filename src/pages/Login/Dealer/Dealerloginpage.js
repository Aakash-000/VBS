import React,{useState,useEffect} from 'react'
import './dealerloginpage.css'
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Reacticoneight,Reacticonnine} from '../../../assets/icons/Reacticon.js';
import Navbar from '../../../components/Navbar/Navbar.js'

export default function Dealerloginpage() {
  const navigate = useNavigate();                                                                                            
  const errorMsg = [{id:'1',forName: "*Please include at least three character with no special characters in your name"},
  {id:'2',forPassword:"*At least seven char long and Please include three letter one number one specialcharacter"},
  {id:'3',forConfirmPassword:"*Password should match!"},
  {id:'4',forConNum:"*Should be ten digit long"},{id:'5',forEmail:"*Please write valid email"}]   

  const[dealerDetail,setDealerDetail] = useState({email:"",password:""});
  const[focused,setFocused] = useState(false);
  const[filterD,setfilterD] = useState([]);
  const[filterAccount,setfilterAccount] = useState([]);
    
    
    const submitHandler = async (e) => {
    e.preventDefault();
    // checkData();
    // console.log(dealerDetail); 
    // console.log(filterD); 
    // setDealerDetail(()=>({...dealerDetail, email:"",password:""}));
    }
    
    function handleFocus(e){
    setFocused(true);
    }

    return (
      <div> 
        <Navbar/>
    <div className='dealer_page container'>
       
    <form className='dealer_form' onSubmit={submitHandler}>
    <h1 className='heading_dlog'><Reacticoneight/>Dealer Login</h1>
    <div className='form_field_dealer'>
      <label htmlFor='email'>Email:</label>
      <input autoComplete="off" type="text" name='email' pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$' id='email' required={true} onBlur={(e)=> setFocused(true)} focused={focused.toString()} onChange={e=>setDealerDetail({...dealerDetail,email:e.target.value})} value={dealerDetail.email}/>
      <span>{errorMsg.map((item)=>(item.forEmail))}</span>
      </div>
    <div className='form_field_dealer'>
    <label htmlFor='password'>Password :</label>
    <input type="password" name='password' onBlur={handleFocus} focused={focused.toString()}  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} id="password" onChange={e=>setDealerDetail({...dealerDetail,password:e.target.value})} value={dealerDetail.password}/>
    <span>{errorMsg.map((item)=>(item.forPassword))}</span>
    </div>
    <div className="form_field_dealer">
     <button type="submit">Login</button>
     </div>
     <div className='dealer_registration'>
     <Link to="/dealerregistration"><pre><Reacticonnine className='dot_icon_new'/>Haven't registered yet.Register now!</pre></Link>
       </div>
   </form>
  </div>
        
      </div>  
  )
}


