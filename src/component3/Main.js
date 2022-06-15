import React from 'react'
import './main.css'
import Mainprop from './Mainprop.js'
import element from './Elements.js'
export default function Main() {
    const data = element.map(item => {return <Mainprop item={item}/>})
  return (
        <div>
            {data}
        </div>
  )
}


