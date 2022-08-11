import React from 'react'
import {Reacticontwelve,Reacticonthree,Reacticonsix,Reacticonthirteen,Reacticonone,Reacticonfourteen} from '../../../assets/icons/Reacticon.js'
export const SidebarDataforDealer = [
    
    {fordealer:{
        title:'Home',
        path:'/dealeraccount',
        icon:<Reacticontwelve/>,
        cName: 'sided-text'
    }},
    {fordealer:{
        title:'Edit Profile',
        path:'/vadata/:email',
         icon:<Reacticonthirteen/>
         ,cName: 'sided-text'
    }},
    {  fordealer:{
        title:'Booking Request',
        path:'/vabookingreq',
        icon:<Reacticonthree/>
        ,cName: 'sided-text'
    }}
   ]
   export const SidebarDataforcustomer = [
   {
        forcustomer:{
                title:'Explore Venue',
                path:'/customeraccount',
                icon:<Reacticonsix/>
            }},
            {forcustomer:{
                title:'Edit Profile',
                path:'/cadata',
                 icon:<Reacticonthirteen/>
            }}

]
export const SidebarDataforadmin =[
        {foradmin:{
            title:'Home',
                path:'#',
                icon:<Reacticontwelve/>
        }},
        {foradmin:{
            title:'Edit Profile',
                path:'/aadata',
                 icon:<Reacticonthirteen/>
        }},
        {foradmin:{
            title:'Explore Venue',
                path:'/explorevenue',
                icon:<Reacticonsix/>
        }},
        {foradmin:{
            title:'Booking Request',
        path:'/vabookingreq',
        icon:<Reacticonthree/>
        }},
        {foradmin:{
            title:'Venue Add Request',
                path:'/acceptvenue',
                icon:<Reacticonone/>
        }},
        {foradmin:{
            title:'Customer List',
                path:'/customerlist',
                icon:<Reacticonfourteen/>
        }}

]
