import React,{useState,useEffect} from 'react'
import './dealerregistrationpage.css'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import {Reacticonfour} from '../../../assets/icons/Reacticon.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../../../components/Navbar/Navbar.js'

export default function Dealerregistrationpage() {
  const errorMsg = [{id:'1',forName: "*Please include at least ten letter with no special characters in your Venue Name"},
  {id:'5',forUserName: "*Please include at least six letter with no special characters in your Name"},
  {id:'2',forImage:"*Image should be in proper format"},
  {id:'3',forLocation:"*Please include at least five letter with no special character in your Venue Location"},
  {id:'4',forComment:"*Please include description more than 50 letters with no special characters"},
  {id:'6',forConNum:"*Should be ten digit long"},
  {id:'7',forPassword:"*At least seven char long and Please include three letter one number one specialcharacter"}]

    const navigate = useNavigate();
    const[focused,setFocused] = useState({email:false,name:false,uname:false,passw:false,addr:false,cnum:false,img:false,desc:false,capc:false});
    const[dealerDetail,setDealerDetail] = useState({email:"",venueName:"",userName:"",address:"",contactNumber:"",password:"",description:"",capacity:""});
    const[venueFile,setimageFile]=useState(null);
    const[isvalid,setisvalid] = useState(true);
    const[isvalidS,setisvalidS] = useState(true);

      async function nextPageRedirect(){
        try{
          let formData = new FormData();
          formData.append('email',dealerDetail.email)
          formData.append('venueName', dealerDetail.venueName)
          formData.append('userName', dealerDetail.userName)
          formData.append('address', dealerDetail.address)
          formData.append('contactNumber', dealerDetail.contactNumber)
          formData.append('password',dealerDetail.password)
          formData.append('description',dealerDetail.description)
          formData.append('capacity',dealerDetail.capacity)
          formData.append('venueFile',venueFile)
       let response = await axios.post('https://venue-booking-system2.herokuapp.com/register/venue',
            formData,
        {headers: {
          'Content-Type': 'multipart/form-data'
        }
      }); 
          setTimeout(()=>{
            navigate('/dealerlogin')
          },5000)
          window.scrollTo(0,0)
          setDealerDetail(()=>({...dealerDetail,email:"",venueName:"",capacity:"",userName:"",address:"",contactNumber:"",password:"",description:""}));
          console.log(response);
      setisvalidS(false)
      const timeId = setTimeout(() => {
        setisvalidS(true)
      }, 5000)

    return () => {
    clearTimeout(timeId)
    }
    }catch(err){
      console.log(err);
      setDealerDetail(()=>({...dealerDetail,email:"",venueName:"",userName:"",address:"",contactNumber:"",password:"",description:"",capacity:""}));
      setisvalid(false)
        const timeId = setTimeout(() => {
          setisvalid(true)
        }, 5000)
      return () => {
      clearTimeout(timeId)
      }
    }
  }

        const nextHandler = (e)=> {            
        e.preventDefault();
        nextPageRedirect();
      }

  function handleFocus(e){
    setFocused(true);
 }
 
  return (
    <div> 
      <Navbar/>
    <div className='dealer_reg_page container-fluid'>
      {isvalid ? <div></div> : <div className='invalid_req_book'>
        <pre className='invalid_status_req_book'>
           Registration Unsuccessfull!
        </pre>
        </div>
        }
        {isvalidS ? <div></div> : <div className='valid_req_book'>
        <pre className='valid_status_req_book'>
          Registered Successfully.Please wait for response email for Login!
        </pre>
        </div>
        }
      <form class="dreg_form row g-3" onSubmit={nextHandler} encType="multipart/form-data">
        <h1 className='heading_dreg'><Reacticonfour className='reg_icon'/>Dealer Registration</h1>
    <div class="dreg_field col-md-6">
    <label for="email" class="form-label">Email</label>
    <input autoComplete="off" type="text" name='email' pattern='^\w.+@[a-z.A-Z_].+?\.[a-zA-Z]{2,3}$' id='email' required={true} onBlur={()=> setFocused({...focused,email:true})} focused={focused.email.toString()} onChange={e=>setDealerDetail({...dealerDetail,email:e.target.value})} value={dealerDetail.email}/>
    <span>*Please write valid email</span>
  </div>
  <div class="dreg_field col-md-6">
  <label for="username" class="form-label">User Name</label>
  <input autoComplete="off" type="text" name='userName' id='username' required={true} pattern='^[a-zA-Z ]{3,40}$'  onBlur={()=>setFocused({...focused,uname:true})} focused={focused.uname.toString()} onChange={e=>setDealerDetail({...dealerDetail,userName:e.target.value})} value={dealerDetail.userName}/>
    <span>{errorMsg.map((item)=>(item.forUserName))}</span>
    </div>

  <div class="dreg_field col-md-6">
    <label for="password" class="form-label">Password</label>
    <input type="password" name='password' id='password' onBlur={()=>setFocused({...focused,passw:true})} focused={focused.passw.toString()} pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} onChange={e=>setDealerDetail({...dealerDetail,password:e.target.value})} value={dealerDetail.password}/>
    <span>{errorMsg.map((item)=>(item.forPassword))}</span>
  </div>
  <div class="dreg_field col-md-6">
  <label for="venuename" class="form-label">Venue Name</label>
  <input autoComplete="off" type="text" name='venueName' id='name' required={true} pattern='^[a-zA-Z ]{10,200}$'  onBlur={()=>setFocused({...focused,name:true})} focused={focused.name.toString()} onChange={e=>setDealerDetail({...dealerDetail,venueName:e.target.value})} value={dealerDetail.venueName}/>
  <span>{errorMsg.map((item)=>(item.forName))}</span>
    </div>

    <div class="dreg_field col-md-6">
    <label for="address" class="form-label">Address</label>
    <input autoComplete="off" type="text" name='address'  required={true} id='address' pattern='^[a-zA-Z ]{5,200}$'  onBlur={()=>setFocused({...focused,addr:true})} focused={focused.addr.toString()} onChange={e=>setDealerDetail({...dealerDetail,address:e.target.value})} value={dealerDetail.address}/>
    <span>{errorMsg.map((item)=>(item.forLocation))}</span>
    </div>
    <div class="dreg_field col-md-6">
    <label for="contactnumber" class="form-label">Contact Number</label>
    <input type="text" name='contactNumber' id='number' required={true}  maxLength='10' onBlur={()=>setFocused({...focused,cnum:true})} focused={focused.cnum.toString()} pattern='^[9][6-8]{1}[0-9]{8}$' onChange={e=>setDealerDetail({...dealerDetail,contactNumber:e.target.value})} value={dealerDetail.contactNumber}/>
    <span>{errorMsg.map((item)=>(item.forConNum))}</span>
    </div>
    <div class="dreg_field col-md-12">
    <label for="file" class="form-label">Choose Image</label>
    <input type="file" name="imageFile" id="file" required={true} accept=".jpg, .jpeg, .png, .svg, .gif" onBlur={()=>setFocused({...focused,img:true})} focused={focused.img.toString()} onChange={e=>{setimageFile(e.target.files[0])}} />
    <span>{errorMsg.map((item)=>(item.forImage))}</span>
    </div>
    <div class="dreg_field col-md-12">
    <label for="desc" class="form-label">Description</label>
    <textarea name='description' pattern='^[a-zA-Z ]{10,200}$' onBlur={()=>setFocused({...focused,desc:true})} focused={focused.desc.toString()} required={true} id='desc' onChange={e=>setDealerDetail({...dealerDetail,description:e.target.value})} value={dealerDetail.description}/>
    <span>{errorMsg.map((item)=>(item.forComment))}</span>
    </div>
    <div class="dreg_field col-md-12">
    <label for="desc" class="form-label">Venue Capacity</label>
    <input type="text" name="capacity" id='capacity' pattern="[0-9]*" required={true}  onBlur={()=>setFocused({...focused,capc:true})} focused={focused.capc.toString()}  onChange={e=>setDealerDetail({...dealerDetail,capacity:e.target.value})} value={dealerDetail.capacity}/>
    <span>*Your Venue Capacity in Number</span>
    </div>
    <div class="dreg_field col-12">
     <button type="submit">Add Venue</button>
    </div>
    </form>
    </div>
    </div>
  )
}

// export function Uploadfile(){

//   const[venueFile,setimageFile]=useState(null);
//   const[focused,setFocused] = useState(false);
//   const navigate = useNavigate();
//   async function uploadFile(){
//     try{
//           let formData = new FormData();
//           ;formData.append('venueFile', venueFile)
//           let response = await axios.post('https://venue-booking-system2.herokuapp.com/register/venue',
//           {headers: {
//             'Content-Type': 'multipart/form-data',
//           }
//           ,
//           data:formData
//         });
//         if(response.response.request.status != 201){
//           navigate('/dealerlogin');
//         }else{
//           alert('POST ERROR');
//         }
//         }catch(err){
//           console.log(err);
//         }
//   }
//   const uploadHandle =(e)=>{
//     e.preventDefault();
//     uploadFile();
//   }
//   function handleFocus(e){
//     setFocused(true);
//  }

//   return(
//     <div class='container-fluid'>
//     <div class="container_row row">
//     <div class="col-sm-6">
//      <div class="upload_image_card card">
//       <div class="upload_image_card_body card-body">
//       <form onSubmit={uploadHandle} encType="multipart/form-data" >
//       <div class="dreg_field col-md-12">
//       <label for="file" class="form-label">Choose Image:</label>
//       <input type="file" name="imageFile" id="file" required={true} accept=".jpg, .jpeg, .png, .svg, .gif" onBlur={handleFocus} focused={focused.toString()} onChange={e=>{setimageFile(e.target.files[0])}} />
//       <span>*Please choose an Image!</span>
//       </div>
//       <div class="dreg_field col-12">
//       <button type="submit">Next</button>
//       </div>
//       </form>
//       </div>
//       </div>
//       </div>
//       </div>
//       </div> 
//       )
// }

