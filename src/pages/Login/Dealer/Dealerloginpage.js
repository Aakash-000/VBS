import React,{useState,useEffect} from 'react'
import './dealerloginpage.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Reacticoneight} from '../../../assets/icons/Reacticon.js'

export default function Dealerloginpage() {
  
  const errorMsg = [{id:'1',forName: "*Please include at least three character with no special characters in your name"},
  {id:'2',forPassword:"*At least seven char long and Please include three letter one number one specialcharacter"},
  {id:'3',forConfirmPassword:"*Password should match!"},
  {id:'4',forConNum:"*Should be ten digit long"},{id:'5',forEmail:"*Please write valid email"}]   

  const[dealerDetail,setDealerDetail] = useState({email:"",userName:"",password:""});
  const[focused,setFocused] = useState(false);
  const[filterD,setfilterD] = useState([]);
  const[filterAccount,setfilterAccount] = useState([]);

    useEffect(async () =>{
      axios.get('https://venue-booking-system2.herokuapp.com/venue').then((item)=>(setfilterD(item.data.data)));
       checkData(); 
    },[])
    
    function checkData(){  
      const array = filterD.filter((response)=>{
            return (response.email === dealerDetail.email);
        })
        setfilterAccount(array);
        console.log(filterAccount);
      }
    
  const submitHandler = async (e) => {
    e.preventDefault();
    checkData();
    console.log(dealerDetail); 
    console.log(filterD); 
    setDealerDetail(()=>({...dealerDetail, email:"",userName:"",password:""}));
  }
  
  function handleFocus(e){
    setFocused(true);
 }

  return (

    <div className='dealer_page container'>
    <form className='dealer_form' onsubmit={submitHandler}>
    <h1 className='heading_dlog'><Reacticoneight/>Dealer Login</h1>
    <div className='form_field_dealer'>
      <label htmlFor='email'>Email:</label>
      <input autoComplete="off" type="text" name='email' pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$' id='email' required={true} onBlur={(e)=> setFocused(true)} focused={focused.toString()} onChange={e=>setDealerDetail({...dealerDetail,email:e.target.value})} value={dealerDetail.email}/>
      <span>{errorMsg.map((item)=>(item.forEmail))}</span>
      </div>
      <div className='form_field_dealer'>
        <label htmlFor='username'>UserName :</label>
        <input autoComplete="off" type="text" pattern='^[a-zA-Z ]{5,16}$' required={true} name='username' id="username" onBlur={handleFocus} focused={focused.toString()} onChange={e=>setDealerDetail({...dealerDetail,userName:e.target.value})} value={dealerDetail.userName}/>
        <span>{errorMsg.map((item)=>(item.forName))}</span>
        </div>
    <div className='form_field_dealer'>
    <label htmlFor='password'>Password :</label>
    <input type="password" name='password' onBlur={handleFocus} focused={focused.toString()}  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} id="password" onChange={e=>setDealerDetail({...dealerDetail,password:e.target.value})} value={dealerDetail.password}/>
    <span>{errorMsg.map((item)=>(item.forPassword))}</span>
    </div>
    <div className="form_field_dealer">
     <button type="submit">Login</button>
     </div>
   </form>
  </div>
        
        
  )
}