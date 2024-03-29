import React,{useState,useEffect} from 'react'
import {Reacticoneight,Reacticonnine} from '../../../assets/icons/Reacticon.js'
import {Link, useNavigate} from 'react-router-dom';
import './customerloginpage.css'
import Navbar from '../../../components/Navbar/Navbar.js'
import axios from 'axios';


export default function Customerloginpage() {
  const errorMsg = [{id:'1',forName: "*Please include at least five letter with no special characters in your name"},
  {id:'2',forPassword:"*At least one uppercase character ,seven char long and Please include three letter one number one specialcharacter"},
  {id:'3',forConfirmPassword:"*Password should match!"},{id:'4',forEmail:"*Please write valid email"}]
  
  const navigate = useNavigate();
  const[cusres,setcusRes] = useState([]);
  const[LoginDetail,setLoginDetail] = useState({username:'',password:''});
  const[focused,setFocused] = useState({name:false,passw:false});
  const[invalid,setInvalid] = useState(false);
  const[isvalid,setisvalid] = useState(true);
 

    async function login(){
      try{
          let response = await axios.post('https://venue-booking-system2.herokuapp.com/login',
          JSON.stringify(LoginDetail),
          {headers:{'Content-Type':'application/json'}});
            
          if(response.data.data.applicationUserRole === "CLIENT"){
            console.log(response);
            navigate(`/customeraccount/${response.data.data.email}/${response.data.data.uname}`);
            sessionStorage.setItem('token',JSON.stringify(response.data.data.token));
            setLoginDetail(()=>({...LoginDetail,username:'',password:''}));
            window.location.reload();
          }else if(response.data.data.applicationUserRole === "ADMIN"){
            console.log(response);
          navigate(`/adminaccount/${response.data.data.email}`);
          sessionStorage.setItem('token',JSON.stringify(response.data.data.token));
          setLoginDetail(()=>({...LoginDetail,username:'',password:''}));
          window.location.reload();
          }else if(response.data.data.applicationUserRole === "VENUE"){
            navigate(`/dealeraccount/${response.data.data.email}/${response.data.data.uname}`);
            sessionStorage.setItem('token',JSON.stringify(response.data.data.token));
            setLoginDetail(()=>({...LoginDetail,username:'',password:''}));
            window.location.reload();
          }
          console.log(response)
          
          }catch(response){
            if(response.response.request.status != 200){
              console.log(response);
              setInvalid(true);
              setLoginDetail(()=>({...LoginDetail,username:'',password:''}));
            }else if(response.response.request.status == 500){
              alert('Internal Server Error');
            }
            setisvalid(false)
            const timeId = setTimeout(() => {
          setisvalid(true)
           }, 5000)
          
         return () => {
          clearTimeout(timeId)
            }
          }
        }

    const submitHandler = e => {
    e.preventDefault();
    login();
    }

  return (
    <div>
      
        <Navbar/>
    <div className='customer_page container'>
    {isvalid ? <div></div> : <div className='invalid_req_book'>
        <pre className='invalid_status_req_book'>
          Login Unsuccessfull!
        </pre>
        </div>
        }
        <form className='customer_form' onSubmit={submitHandler}>
        <h1 className='heading_clog'><Reacticoneight/>Login</h1>
        <div className='form_field_customer'>
      <label htmlFor='email' className="lemail">Email:</label>
      <input autoComplete="off" type="email" name='email' pattern='^\w.+@[a-z.A-Z_].+?\.[a-zA-Z]{2,3}$' id='email' required={true} onBlur={()=>setFocused({...focused,name:true})} focused={focused.name.toString()} onChange={e=>setLoginDetail({...LoginDetail,username:e.target.value})} value={LoginDetail.username}/>
      <span>{errorMsg.map((item)=>(item.forEmail))}</span>
      </div>
        <div className='form_field_customer'>
        <label htmlFor='password' className="lpassword">Password :</label>
        <input type="password" name='password' onBlur={()=>setFocused({...focused,passw:true})} focused={focused.passw.toString()}  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} id="password" onChange={e=>setLoginDetail({...LoginDetail,password:e.target.value})} value={LoginDetail.password}/>
        <span>{errorMsg.map((item)=>(item.forPassword))}</span>
        </div>
        <div className="form_field_customer">
        <button type="submit">Login</button>
         </div>
       </form>
      
      </div>
      </div>
  )
  
}
