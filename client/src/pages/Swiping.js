import React from 'react';
import Header from '../component/Header';
import Card from '/Users/thu/cs198-99/final-project-snack-match/client/src/component/Card.js';

const Swiping = () => {
    var hostName = 'John';
    var restImage = 'https://s3-media0.fl.yelpcdn.com/bphoto/FFvrEmgRuJtp090BTuBhBA/348s.jpg';
    var restName = 'U Dessert Story';
    var restPrice = '$$';
    var restRating = '4.5';
    var restCategories = 'Desserts';

    return (
        <div>
            <Header hostName={hostName}/>
            <Card image={restImage} name={restName} price={restPrice} rating={restRating} categories={restCategories}/>
        </div>
    );
};

export default Swiping;