import React, { useState,useEffect} from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar.js'
import Body from './pages/Landing/Body.js'
import Adminloginpage, { Adminregisterpage } from './pages/Login/Admin/Adminloginpage.js'
import Customerloginpage from './pages/Login/Customer/Customerloginpage.js'
import Dealerloginpage from './pages/Login/Dealer/Dealerloginpage.js'
import Dealeraccountpage from './pages/Account/Dealer/Dealeraccountpage.js'
import Venuecarddetailpage from './pages/Carddetailpage/Venuecarddetailpage.js'
import {VenuecarddetailCustomer, MybookedVenue} from './pages/Account/Customer/customeraccountpage.js'
import Dealerregistrationpage from './pages/Register/Dealer/Dealerregistrationpage.js'
import Customerregistrationpage from './pages/Register/Customer/Customerregistrationpage.js'
import Explorevenue, { Explorevenuenormal } from './component4/Explorevenue.js'
import Customeraccount from './pages/Account/Customer/customeraccountpage.js'
import Adminaccount, { Venueaccept } from './pages/Account/Admin/Adminaccountpage.js'
import EditCustomeraccount from './pages/Account/Customer/EditCustomeraccount.js'
import EditDealeraccount from './pages/Account/Dealer/Editdealeraccount.js';
import Editadminaccount from './pages/Account/Admin/Editadminaccount.js'
import Bookingreq from './pages/Account/Dealer/Bookingreq';


export default function App() {
  return (
      <div className='App'>
        <div>
        <Router>
        <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/explorevenue" element={<Explorevenue/>}/>
        <Route path="/explorevenue/normal" element={<Explorevenuenormal/>}/>
        <Route path="/adminlogin" element={<Adminloginpage/>}/>
        <Route path='/adminregistration' element={<Adminregisterpage/>}/>
        <Route path="/customerlogin" element={<Customerloginpage/>}/>
        <Route path="/dealerregistration" element={<Dealerregistrationpage/>}/>
        <Route path="/dealerlogin" element={<Dealerloginpage/>}/>
        <Route path="/customerregistration" element={<Customerregistrationpage/>}/>
        <Route path="/explorevenue/venue/:id" element={ <Venuecarddetailpage/>}/>
        <Route path="/dealeraccount/:dealeremail/:dealername"  element={<Dealeraccountpage/>}/>
        <Route path="/vabookingreq/:dealeremail/:dealername" element={<Bookingreq/>}/>
        <Route path="/venue/:email/:id" element={<VenuecarddetailCustomer/>}/>
        <Route path="/customeraccount/:email/:customername" element={<Customeraccount/>}/>
        <Route path="/cabookingdata/:email/:customername" element={<MybookedVenue/>}/>
        <Route path="/adminaccount/:adminemail" element={<Adminaccount/>}/>
        <Route path="/cadata/:email/:customername" element={<EditCustomeraccount/>}/>
        <Route path='/acceptvenue/:adminemail' element={<Venueaccept/>}/>
         <Route path="/vadata/:dealeremail/:dealername" element={<EditDealeraccount/>}/>
        </Routes>
        </Router>
      </div>
      </div>
  );
}
