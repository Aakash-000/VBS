import React from 'react';
import './App.css';
import Navbar from './component4/Navbar.js';
import Body from './component4/Body.js';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ForAdmin from './component4/ForAdmin';
import ForCustomer from './component4/ForCustomer';
import ForDealer from './component4/Fordealer';
import Footer from './component4/Footer.js';
import DealerRegistration from './component4/Dealerregistration';
import Venuecarddetail from './component4/Venuecarddetail';
import DealerAccount from './component4/DealerAccount';
import Slider from './component4/Slider';



export default function App() {
  return (
      <div className='App'>
        <div>
        <Router>
        <Navbar/>
        <Routes>
        <Route  path="/" element={<Body/>}/>
        <Route  path="ForAdmin" element={<ForAdmin/>}/>
        <Route  path="ForCustomer" element={<ForCustomer/>}/>
        <Route  path="ForDealer" element={ <DealerRegistration/>}/>
        <Route  path="Dealerloginpage" element={<ForDealer/>}/>
        <Route  path="DealerAccount/:id" element={<DealerAccount/>}/>
        <Route  path= "ForCustomer/venue/:id" element={<Venuecarddetail/>}/>
        </Routes> 
      </Router>
      </div>
      </div>
  );
}
