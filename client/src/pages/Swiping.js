import { Center } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card.js';
import axios from 'axios';

const Swiping = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { nickname } = state;

    var [restaurantIndex, updateIndex] = useState(0);
    var [voteCounter, updateCounter] = useState({});

    var [hostName, updateHostName] = useState('Host');
    var [restId, updateRestId] = useState("")
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
            .get('http://localhost:9000/party/info', { params: { nickname } })
            .then((data) => {
                updateIndex(restaurantIndex + 1)
                var card = data.data;
                updateHostName(card.host);
                var restaurantObj = card.restaurantList[restaurantIndex];
                updateRestId(restaurantObj.id);
                updateRestImage(restaurantObj.image_url);
                updateRestName(restaurantObj.name);
                updateRestPrice(restaurantObj.price);
                updateRestRating(restaurantObj.rating);
                var rCat = [];
                var tags = restaurantObj.categories;
                if (tags.length > 0) {
                    for (let i = 0; i < tags.length; i++) {
                        rCat.push(tags[i].title);
                    }
                } else {
                    rCat.push("No category tags"); // in case of no category tags
                }
                updateRestCategories(rCat);
                updateAddress(restaurantObj.location.display_address[0].concat(", ", restaurantObj.location.display_address[1]));
                updatePhone(restaurantObj.display_phone);
                updateMiles(Math.round(restaurantObj.distance / 1609));
            })
            .catch((error) => console.log(error.response.data));
    };

    const fetchCounter = () => {
        axios
            .get('http://localhost:9000/party/user', { params: { nickname }})
            .then((data) => {
                updateCounter(data.data.voteCounter);
            })
            .catch((error) => console.log(error.response.data));
    }

    const buttonClick = (clickType) => {

        if (restaurantIndex < 10 )  {
            if (clickType === 'like') {
                let temp = voteCounter;
                temp[restId] = 1;
                updateCounter(temp);
                updateIndex(restaurantIndex + 1);
                populateList();
            } else if (clickType === 'superlike') {
                let temp = voteCounter;
                temp[restId] = 2;
                updateCounter(temp);
                updateIndex(restaurantIndex + 1);
                populateList();
            } else if (clickType === 'dislike') {
                let temp = voteCounter;
                temp[restId] = -1;
                updateCounter(temp);
                updateIndex(restaurantIndex + 1);
                populateList();
            } else if (clickType === 'back') {
                if (restaurantIndex !== 0) {
                    updateIndex(restaurantIndex - 1);
                    populateList();
                } else {
                    console.log("Cannot go back!");
                }
            }
        } else {
            console.log("last item!");
            navigate('/matched', { state: { nickname, voteCounter }})
        }
    }

    useEffect(() => {
        populateList();
        fetchCounter();
    }, []);

    return (
        <div>
            <Header hostName={hostName}/>
            <Center as='b' fontSize='xl' marginBottom='1rem'>
                {hostName}'s Party
            </Center>
            <Card
                image={restImage}
                name={restName}
                price={restPrice}
                rating={restRating}
                categories={restCategories}
                address={address}
                phone={phone}
                miles={miles}
                buttonClick={buttonClick}
            />
            <br></br>
        </div>
    );
};

export default Swiping;