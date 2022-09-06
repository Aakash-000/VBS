import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import Staticelement from './Staticelement.js'
import './slider.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from'axios'

function Sliderbar() {  
                                                                             
  const [people, setPeople] = useState([]);
  const [index, setIndex] = React.useState(0);
  
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  useEffect(async() => {
    try{
      let response = await axios.get('https://venue-booking-system2.herokuapp.com/home-')
      setPeople(response.data.data)
      console.log(response)
    }catch(err){
      console.log(err)
    }
}, [])

  return (    
  <div className="section-center">
    {people.map((person, personIndex) => {
      const { id, filePath,venueName } = person;

      let position = 'nextSlide';
      if (personIndex === index) {
        position = 'activeSlide';
      }
      if (
        personIndex === index - 1 ||
        (index === 0 && personIndex === people.length - 1)
      ) {
        position = 'lastSlide';
      }

      return (
        <article className={position} key={id}>
              <img src={`data:image/jpeg;base64,${filePath}`} alt="Venue Image" className="person-img" />
              <h4>{venueName}</h4>
              <FaQuoteRight className="icon"/>
              <FaQuoteRight className="icon"/>
              <FaQuoteRight className="icon"/>
            </article>
      );
    })}
    <button className="prev" onClick={() => setIndex(index - 1)}>
      <FiChevronLeft />
    </button>
    <button className="next" onClick={() => setIndex(index + 1)}>
      <FiChevronRight />
    </button>
  </div>
  );
}
export default Sliderbar;
