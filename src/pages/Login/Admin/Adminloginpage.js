import React,{useState,useEffect} from 'react'
import './adminloginpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Adminloginpage() {
  const errorMsg = [{id:'1',forName: "*Please include at least three letter with no special characters in your name"},
  {id:'2',forPassword:"*At least one uppercase character ,seven char long and Please include three letter one number one specialcharacter"},
  {id:'3',forConfirmPassword:"*Password should match!"}]

  const[AdminDetail,setAdminDetail] = useState({username:"",password:"",confirmpassword:""});
  const[focused,setFocused] = useState(false);
  const submitHandler = e => {
    e.preventDefault();
    console.log(AdminDetail);
  }
  function handleFocus(e){
     setFocused(true);
  }
 
  return (
     <div className='admin_page'>
        <h1>Admin Login</h1>
      
      <form className="admin_form" onSubmit={submitHandler}>
        <div className='form_field_admin'>
        <label htmlFor='name'>UserName :</label>
        <input autoComplete="off" type="text" pattern='^[a-zA-Z ]{3,16}$' required={true} name='username' id="username" onBlur={handleFocus} focused={focused.toString()} onChange={e=>setAdminDetail({...AdminDetail,username:e.target.value})} value={AdminDetail.username}/>
        <span>{errorMsg.map((item)=>(item.forName))}</span>
        </div>
        <div className='form_field_admin'>
        <label htmlFor='password'>Password :</label>
        <input type="password" name='password' onBlur={handleFocus} focused={focused.toString()}  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} id="password" onChange={e=>setAdminDetail({...AdminDetail,password:e.target.value})} value={AdminDetail.password}/>
        <span>{errorMsg.map((item)=>(item.forPassword))}</span>
        </div>
        {/* <div className='form_field'>
        <label htmlFor='password'>ConfirmPassword :</label>
        <input type="password" name='confirmpassword' pattern = {AdminDetail.password} required={true} onBlur={handleFocus} focused={focused.toString()} id="confirmpassword" onChange={e=>setAdminDetail({...AdminDetail,confirmpassword:e.target.value})} value={AdminDetail.confirmpassword}/>
        <span>{errorMsg.map((item)=>(item.forConfirmPassword))}</span>
        </div> */}
        <div className='form_field_button'>
        <button type="submit">Login</button>
        </div>
      </form>
      
      </div>
  )
}

