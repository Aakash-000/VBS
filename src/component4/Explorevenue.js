import React,{useState,useEffect} from 'react'
import './explorevenue.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Dealercardlist from './Dealercardlist.js'

export default function Explorevenue() {
    return(
    <div>
        <Dealercardlist/>
    </div>
    )
}
