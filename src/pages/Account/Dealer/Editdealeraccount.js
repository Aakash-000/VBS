import React, {useState,useEffect}from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import './editdealeraccount.css'
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import Avatar from '@mui/material/Avatar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import axios from 'axios'
import './editdealeraccount.css'

export default function EditDealeraccount() {
    const errorMsg = [{id:'1',forName: "*Please include at least five letter with no special characters in your name"},
  {id:'2',forPassword:"*At least one uppercase character ,seven char long and Please include three letter one number one specialcharacter"},
  {id:'6',forConNum:"*Should be ten digit long"},
  {id:'3',forLocation:"*Please include at least five letter with no special character in your Venue Location"}]

  const navigate = useNavigate();
  const {dealeremail} = useParams();
  const[dealerDetail,setdealerDetail] = useState({venueName:'',userName:'',password:'',contactNumber:'',address:''});
  const[focused,setFocused] = useState(false);
  const[getdealer,setDealer] = useState([]);
  const[venueFile,setimageFile]=useState(null);
  

  const configforImg = {  
    headers:{
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token')),
      'Content-Type': 'multipart/form-data'
    }
    }
    const config = {  
      headers:{
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token')),
        'Content-Type': 'application/json'
      }
      }
    useEffect(()=>{
      function getVenue(){
        axios.get('https://venue-booking-system2.herokuapp.com/client-',config)
        .then(response => {console.log(response)
        setDealer(response.data.data)})
        .catch(err=> {console.log(err)});
      }
      getVenue()
    },[])

  async function uploadFile(){
    try{
          let formData = new FormData();
          formData.append('venueFile', venueFile);
          let response = await axios.put(`https://venue-booking-system2.herokuapp.com/register/uploadImage/${dealeremail}`,
          formData,configforImg);
          console.log(response)
        }catch(err){
          console.log(err);
        }
  }
  const uploadHandle =(e)=>{
    e.preventDefault();
    uploadFile();
  }
  function handleFocus(e){
    setFocused(true);
 }

 function submitHandler(e){
    e.preventDefault();
    // navigate(`/dealeraccount/${dealeremail}`);
    console.log(dealeremail)
 }
    return (
      <>
      <div class='container-fluid'>
    <div class="container_row row">
    <div class="col-sm-6">
     <div class="upload_image_card card">
      <div class="upload_image_card_body card-body">
      <form onSubmit={uploadHandle} encType="multipart/form-data" >
      <div class="dreg_field col-md-12">
      <label for="file" class="form-label">Choose Image:</label>
      <input type="file" name="imageFile" id="file" required={true} accept=".jpg, .jpeg, .png, .svg, .gif" onBlur={handleFocus} focused={focused.toString()} onChange={e=>{setimageFile(e.target.files[0])}} />
      <span>*Please choose an Image!</span>
      </div>
      <div class="file_img_button">
      <button type="submit">Upload</button>
      </div>
      </form>
      </div>
      </div>
      </div>
      </div>
      </div> 
        <div className='edit_dealer container-fluid'>
        <div className='dealer_edit_page'>
        <form className='dealer_edit_form row g-3' onSubmit={submitHandler}>
        <h1 className='heading_edit_dlog'>Edit Account</h1>
        <div class="form_edit_field_dealer col-lg-6">
        <label htmlFor="username" >Venue Name :</label>
        <input autoComplete="off" type="text" name='venueName' id='venueName' required={true} pattern='^[a-zA-Z ]{3,50}$'  onBlur={handleFocus} focused={focused.toString()} onChange={e=>setdealerDetail({...dealerDetail,venueName:e.target.value})} value={dealerDetail.venueName}/>
        <span>{errorMsg.map((item)=>(item.forName))}</span>
        </div>
        <div class="form_edit_field_dealer col-lg-6">
        <label htmlFor="username" >User Name :</label>
        <input autoComplete="off" type="text" name='username' id='userName' required={true} pattern='^[a-zA-Z ]{3,16}$'  onBlur={handleFocus} focused={focused.toString()} onChange={e=>setdealerDetail({...dealerDetail,userName:e.target.value})} value={dealerDetail.userName}/>
        <span>{errorMsg.map((item)=>(item.forName))}</span>
        </div>
        <div className='form_edit_field_dealer col-md-6'>
        <label htmlFor='password'>Password :</label>
        <input type="password" name='password' onBlur={handleFocus} focused={focused.toString()}  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} id="password" onChange={e=>setdealerDetail({...dealerDetail,password:e.target.value})} value={dealerDetail.password}/>
        <span>{errorMsg.map((item)=>(item.forPassword))}</span>
        </div>
        <div className='form_edit_field_dealer col-md-6'>
        <label for="contactnumber" class="form-label">Contact Number :</label>
        <input type="text" name='contacNnumber' id='number' required={true} onBlur={handleFocus} focused={focused.toString()} pattern='^[9][6-8]{1}[0-9]{8}$' onChange={e=>setdealerDetail({...dealerDetail,contactNumber:e.target.value})} value={dealerDetail.contactNumber}/>
        <span>{errorMsg.map((item)=>(item.forConNum))}</span>
        </div>
        <div className='form_edit_field_dealer col-md-6'>
        <label for="address" class="form-label">Address :</label>
         <input autoComplete="off" type="text" name='address'  required={true} id='address' pattern='^[a-zA-Z ]{5,200}$'  onBlur={handleFocus} focused={focused.toString()} onChange={e=>setdealerDetail({...dealerDetail,address:e.target.value})} value={dealerDetail.address}/>
        <span>{errorMsg.map((item)=>(item.forLocation))}</span>
        </div>
        <div className="form_edit_field_dealer col-12">
        <button type="submit">Update</button>
         </div>
       </form>
      </div>
        </div>
        </>
    )
}
