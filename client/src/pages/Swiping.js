import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card.js';
import { Box, Center, Image, Flex, Text, Icon, HStack, IconButton } from "@chakra-ui/react";
import axios from 'axios';

const Swiping = () => {
    // var hostName = 'Erudian';
    // var restImage = 'https://pm1.narvii.com/7697/1637f6f5e56d2ed3b6309a67ce30b7b7360070eer1-672-846v2_hq.jpg';
    // var restName = "Seduce the Villain's Father";
    // var restPrice = '$$$$';
    // var restRating = '4.5';
    // var restCategories = ['Desserts', 'Sweets', 'Restaurant'];
    // var address = '2517 Durant Ave, Berkeley, CA';
    // var phone = '(123) 456-7890';
    // var miles = '0.5';


    var [restaurantIndex, updateIndex] = useState(0);

    var [hostName, updateHostName] = useState('Host');
    var [restImage, updateRestImage] = useState('https://htmlcolorcodes.com/assets/images/colors/light-blue-color-solid-background-1920x1080.png');
    var [restName, updateRestName] = useState("Restaurant");
    var [restPrice, updateRestPrice] = useState('$');
    var [restRating, updateRestRating] = useState('5');
    var [restCategories, updateRestCategories] = useState(['Restaurant']);
    var [address, updateAddress] = useState('123 Gob Ears Ave, Berkeley, CA');
    var [phone, updatePhone] = useState('(123) 456-7890');
    var [miles, updateMiles] = useState('0.5');

    const populateList = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { nickname: "Fizz1" } })
            .then((data) => {
                updateIndex(restaurantIndex + 1);
                var card = data.data;
                updateHostName(card.host);
                var restaurantObj = card.restaurantList[restaurantIndex];
                updateRestImage(restaurantObj.image_url);
                updateRestName(restaurantObj.name);
                updateRestPrice(restaurantObj.price);
                updateRestRating(restaurantObj.rating);
                var rCat = [];
                if (restaurantObj.categories.length > 0) {
                    var tags = restaurantObj.categories;
                    for (let i = 0; i < tags.length; i++) {
                        rCat.append(tags[i].title);
                        console.log(rCat);
                    }
                } else {
                    rCat = "No category tags"; // in case of no category tags
                }
                updateRestCategories(rCat);
                updateAddress(restaurantObj.display_address);
                updatePhone(restaurantObj.display_phone);
                updateMiles(Math.round(restaurantObj.distance / 1609));
            })
            .catch((error) => console.log(error.response.data));
    };

    // onClick for moving forward and backward + updateIndex here, use useEffect to reflect changes?



    useEffect(() => {
        populateList();
    });

    return (
        <div>
            <Header hostName={hostName} />
            <Card
                image={restImage}
                name={restName}
                price={restPrice}
                rating={restRating}
                categories={restCategories}
                address={address}
                phone={phone}
                miles={miles}
            />
            <br></br>
        </div>
    );
};

export default Swiping;