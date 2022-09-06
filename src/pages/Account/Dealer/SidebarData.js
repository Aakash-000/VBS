import React from 'react'
import {Reacticontwelve,Reacticonthree,Reacticontwentytwo,Reacticontwentyfive,Reacticonsix,Reacticonthirteen,Reacticonone,Reacticonfourteen,Reacticoneighteen} from '../../../assets/icons/Reacticon.js'
export const SidebarDataforDealer = [
    
    {fordealer:{
        title:'Home',
        path:'/dealeraccount',
        icon:<Reacticontwelve/>,
        cName: 'sided-text'
    }},
    {fordealer:{
        title:'Edit Profile',
        path:'/vadata',
         icon:<Reacticonthirteen/>
         ,cName: 'sided-text'
    }},
    {  fordealer:{
        title:'Booking Request',
        path:'/vabookingreq',
        icon:<Reacticonthree/>
        ,cName: 'sided-text'
    }},
    {  fordealer:{
        title:'Booking Request Status',
        path:'/vabookingreqstatus',
        icon:<Reacticontwentytwo/>
        ,cName: 'sided-text'
    }},
    {  fordealer:{
        title:'Set Event Detail',
        path:'/vaeventdetail',
        icon:<Reacticontwentyfive/>
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
            }},
            {forcustomer:{
                title:'My Booking Data',
                path:'/cabookingdata',
                 icon:<Reacticoneighteen/>
            }}

]
export const SidebarDataforadmin =[
        {foradmin:{
            title:'Home',
                path:'/adminaccount',
                icon:<Reacticontwelve/>
        }},
        {foradmin:{
            title:'Venue List',
        path:'/aavenuelist',
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