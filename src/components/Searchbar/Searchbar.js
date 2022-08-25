import './searchbar.css'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Dealercardlist from '../../component4/Dealercardlist.js';
import {Reacticonseven} from '../../assets/icons/Reacticon.js'
import './searchbar.css'


export const Searchbar = () =>{
    const[searchTerm,setSearchTerm]=useState("");
    return (
        <>
    <div>
    <div className='search_bar'>
    <input type="text" name="search" autoComplete="off" id="search"  value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Searchfor Venue Location'/><Reacticonseven/>
    </div>
    </div>
    <Dealercardlist filterSearch={searchTerm}/>
    </>
    )
}



