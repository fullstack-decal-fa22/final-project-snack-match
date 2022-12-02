import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Card from '../components/Card.js';
import { Box, Center, Image, Flex, Text, Icon, HStack, IconButton } from "@chakra-ui/react";
import axios from 'axios';

const Swiping = () => {
    var hostName = 'Erudian';
    var restImage = 'https://pm1.narvii.com/7697/1637f6f5e56d2ed3b6309a67ce30b7b7360070eer1-672-846v2_hq.jpg';
    var restName = "Seduce the Villain's Father";
    var restPrice = '$$$$';
    var restRating = '4.5';
    var restCategories = ['Desserts', 'Sweets', 'Restaurant'];
    var address = '2517 Durant Ave, Berkeley, CA';
    var phone = '(123) 456-7890';
    var hours = '8am - 11pm';
    var miles = '0.5';

    var [restaurantList, updateList] = useState([]);

    const populateList = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { nickname: "ronnie5" }})
            .then((data) => {
                updateList(data.data.partyMembers);
            })
            .catch((error) => console.log(error.response.data));
    };

    useEffect(() => {
        populateList();
    }, [])

    return (
        <div>
            <Header hostName={hostName}/>
                <Card
                    image={restImage}
                    name={restName}
                    price={restPrice}
                    rating={restRating}
                    categories={restCategories}
                    address={address}
                    phone={phone}
                    hours={hours}
                    miles={miles}
                />
            <br></br>
        </div>
    );
};

export default Swiping;