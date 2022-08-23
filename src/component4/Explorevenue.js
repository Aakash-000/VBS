import React,{useState,useEffect} from 'react'
import './explorevenue.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Dealercardlist from './Dealercardlist.js'
import { Searchbar } from '../components/Searchbar/Searchbar'

export default function Explorevenue() {
    return(
    <div>
        <Searchbar/>
    </div>
    )
}

export function Explorevenuenormal(){
    return(
        <div>
            <Searchbar/>
        </div>
    )
}
