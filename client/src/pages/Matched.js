import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Stack, Center } from "@chakra-ui/react";
import axios from 'axios';

import Header from '../components/Header';
import MatchedCard from '../components/MatchedCard';

const Matched = () => {

    const { state } = useLocation();
    const { nickname, voteCounter } = state;

    var [ restaurantList, setList ] = useState([]);

    const fetchTopRestaurants = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { nickname } })
            .then((data) => {
                setList(data.data.restaurantList);
            })
            .catch((error) => console.log(error.response.data));        
    }

    useEffect(() => {
        fetchTopRestaurants();
    }, [])

    return (
        <div>
            <Header hostName={nickname}/>
            <Container>
                <Stack spacing={4}>
                    <Center as='b' fontSize='xl'>
                        Party's Top Matches
                    </Center>
                    {restaurantList.filter(word => voteCounter[word.id] > 1).map((rest, index) =>
                        <MatchedCard
                            key={index}
                            image={rest.image_url}
                            name={rest.name}
                            price={rest.price}
                            rating={rest.rating}
                            address={rest.location.display_address[0].concat(", ", rest.location.display_address[1])}
                            phone={rest.phone}
                            miles={Math.round(rest.distance / 1609)}
                        />)
                    }
                </Stack>
            </Container>
        </div>
    )
}

export default Matched;