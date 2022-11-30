import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card.js';

const Swiping = () => {
    var hostName = 'John';
    var restImage = 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/87208235_2801196573261053_755589316935155712_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9267fe&_nc_ohc=6LOPFFwc_wIAX9lQE3m&_nc_ht=scontent-lax3-1.xx&oh=00_AfCVLn-_Vat4-XkYx3BMciVdfcutEvGjsqOJW4FJU_768A&oe=63AE1742';
    var restName = 'U Dessert Story';
    var restPrice = '$$';
    var restRating = '4.5';
    var restCategories = ['Desserts', 'Sweets', 'Restaurant'];

    return (
        <div>
            <Header hostName={hostName}/>
            <Card image={restImage} name={restName} price={restPrice} rating={restRating} categories={restCategories}/>
            <br></br>
        </div>
    );
};

export default Swiping;