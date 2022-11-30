import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card.js';

const Swiping = () => {
    var hostName = 'John';
    var restImage = 'https://s3-media0.fl.yelpcdn.com/bphoto/FFvrEmgRuJtp090BTuBhBA/348s.jpg';
    var restName = 'U Dessert Story';
    var restPrice = '$$';
    var restRating = '4.5';
    var restCategories = ['Desserts', 'Sweets', 'Restaurant'];

    return (
        <div>
            <Header hostName={hostName}/>
            <Card image={restImage} name={restName} price={restPrice} rating={restRating} categories={restCategories}/>
        </div>
    );
};

export default Swiping;