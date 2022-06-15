import React from 'react';

export default function Card(props) {
  return (
  <div>
        <h1>Question:{props.question}</h1>
        <p>Answer:{props.answer}</p>
        <hr/>
  </div>
    );
}
