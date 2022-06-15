import React from 'react';
import Bodyprops from './Bodyprops';
import './body.css'
import BodyElement from './BodyElement';

export default function Body() {
  const data = BodyElement.map(item=>{
    return (
    <Bodyprops newitem={item}/>
    )
})
  return (
    <div className='body_content'>
    {data}
    </div>
    );
}
