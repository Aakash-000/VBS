import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {routes} from './routes.js';
import Navbar from './components/Navbar/Navbar.js'


export default function App() {

    
  return (
      <div className='App'>
        <div>
        <Router>
        <Navbar/>
        <Routes>
        {routes.map((route,index) => (
        <Route path={route.path} key={index} element={route.component}/>
        ))}
        </Routes>
        </Router>
      </div>
      </div>
  );
}
