import React, { useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar.js'
import Body from './pages/Landing/Body.js'
import Adminloginpage from './pages/Login/Admin/Adminloginpage.js'
import Customerloginpage from './pages/Login/Customer/Customerloginpage.js'
import Dealerloginpage from './pages/Login/Dealer/Dealerloginpage.js'
import Dealeraccountpage from './pages/Account/Dealer/Dealeraccountpage.js'
import Venuecarddetailpage from './pages/Carddetailpage/Venuecarddetailpage.js'
import {VenuecarddetailCustomer} from './pages/Account/Customer/customeraccountpage.js'
import Dealerregistrationpage from './pages/Register/Dealer/Dealerregistrationpage.js'
import Customerregistrationpage from './pages/Register/Customer/Customerregistrationpage.js'
import Explorevenue from './component4/Explorevenue.js'
import Customeraccount from './pages/Account/Customer/customeraccountpage.js'
import Adminaccount from './pages/Account/Admin/Adminaccountpage.js'
import EditCustomeraccount from './pages/Account/Customer/EditCustomeraccount.js'
import EditDealeraccount from './pages/Account/Dealer/Editdealeraccount.js';
import Editadminaccount from './pages/Account/Admin/Editadminaccount.js'
import Bookingreq from './pages/Account/Dealer/Bookingreq';


export default function App() {
    const[noToken,setnoToken] = useState(false);
    useEffect(() => {
      if(sessionStorage.length != 0){
        setnoToken(false)
      }else {
        setnoToken(true)
      }
      return noToken;
    }, [noToken])
    
  return (
      <div className='App'>
        <div>
        <Router>
        {noToken?(
        <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/explorevenue" element={<Explorevenue/>}/>
        <Route path="/adminlogin" element={<Adminloginpage/>}/>
        <Route path="/customerlogin" element={<Customerloginpage/>}/>
        <Route path="/dealerregistration" element={<Dealerregistrationpage/>}/>
        <Route path="/dealerlogin" element={<Dealerloginpage/>}/>
        <Route path="/customerregistration" element={<Customerregistrationpage/>}/>
        <Route path="/explorevenue/venue/:id" element={ <Venuecarddetailpage/>}/>
        <Route path="/dealeraccount" element={<Dealeraccountpage/>}/>
        <Route path="/adminaccount" element={<Adminaccount/>}/>
        <Route path='/vabookingreq' element={<Bookingreq/>}/>
        </Routes>
        ):(
        <Routes>
        <Route path="/customeraccount/:email/venue/:id" element={<VenuecarddetailCustomer/>}/>
        <Route path="/customeraccount/:email" element={<Customeraccount/>}/>
        <Route path="/cadata/:email" element={<EditCustomeraccount/>}/>
        <Route path="/vadata/:email" element={<EditDealeraccount/>}/>
        <Route path="/aadata/:email" element={<Editadminaccount/>}/>
        </Routes>
        )}
        </Router>
      </div>
      </div>
  );
}
