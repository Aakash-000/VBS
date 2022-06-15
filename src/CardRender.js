import React from 'react';
import Element from './CardElement'
import Card from './Card.js'
export default function CardRender() {
    const data = Element.map(index=> <Card question={index.question} answer={index.answer}/>)
  return (
  <div>
      {data}
  </div>
  );
}
