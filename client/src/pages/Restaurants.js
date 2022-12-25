import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Center } from "@chakra-ui/react";

import Header from '../components/Header';
import Card from '../components/Card.js';

const Swiping = () => {

    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const restaurantList = useSelector((state) => state.party.restaurantList);

    var [restaurantIndex, updateIndex] = useState(0);
    var [voteCounter, updateCounter] = useState({});

    var hostName = 'Host' // useSelector((state) => state.party.host);
    var nickname = useSelector((state) => state.user.nickname);
    var [restId, updateRestId] = useState("");
    var [restImage, updateRestImage] = useState('https://htmlcolorcodes.com/assets/images/colors/light-blue-color-solid-background-1920x1080.png');
    var [restName, updateRestName] = useState("Restaurant");
    var [restPrice, updateRestPrice] = useState('$');
    var [restRating, updateRestRating] = useState('5');
    var [restCategories, updateRestCategories] = useState(['Restaurant']);
    var [address, updateAddress] = useState('123 Gob Ears Ave, Berkeley, CA');
    var [phone, updatePhone] = useState('(123) 456-7890');
    var [miles, updateMiles] = useState('0.5');

    const populateCard = () => {

        var restaurantData = restaurantList[restaurantIndex];
        updateRestId(restaurantData.id);
        updateRestImage(restaurantData.image_url);
        updateRestName(restaurantData.name);
        updateRestPrice(restaurantData.price);
        updateRestRating(restaurantData.rating);
        var categoryList = [];
        var tags = restaurantData.categories;
        if (tags.length > 0) {
            for (let i = 0; i < tags.length; i++) {
                categoryList.push(tags[i].title);
            }
        } else {
            categoryList.push("No category tags"); // in case of no category tags
        }
        updateRestCategories(categoryList);
        updateAddress(restaurantData.location.display_address[0].concat(", ", restaurantData.location.display_address[1]));
        updatePhone(restaurantData.display_phone);
        updateMiles(Math.round((restaurantData.distance / 1609) * 10) / 10);
    };

    const buttonClick = (clickType) => {

        if (restaurantIndex < 10 )  {
            if (clickType === 'like') {
                let temp = voteCounter;
                temp[restId] = 1;
                updateCounter(temp);
                updateIndex(restaurantIndex + 1);
                populateCard();
            } else if (clickType === 'superlike') {
                let temp = voteCounter;
                temp[restId] = 2;
                updateCounter(temp);
                updateIndex(restaurantIndex + 1);
                populateCard();
            } else if (clickType === 'dislike') {
                let temp = voteCounter;
                temp[restId] = -1;
                updateCounter(temp);
                updateIndex(restaurantIndex + 1);
                populateCard();
            } else if (clickType === 'back') {
                if (restaurantIndex !== 0) {
                    updateIndex(restaurantIndex - 1);
                    populateCard();
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
        populateCard();
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
        </div>
    );
};

export default Swiping;