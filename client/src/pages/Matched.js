import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { Center } from "@chakra-ui/react";
import MatchedCard from '../components/MatchedCard';
import axios from 'axios';

const Matched = () => {

    const { state } = useLocation();
    const { nickname, voteCounter } = state;
    // const nickname = "ryan";

    var [ restaurantList, setList ] = useState([]);

    const fetchTopRestaurants = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { nickname } })
            .then((data) => {
                setList(data.data.restaurantList);
            })
            .catch((error) => console.log(error.response.data));        
    }

    const mapCards = (fullList) => {

        console.log("full list: ", fullList);
        console.log("vote counter: ", voteCounter);

        // priority queue 

        var topVoted = [];

        topVoted.map((rest, index) => 
            <div key={index}>
                <MatchedCard
                    image={rest.image_url}
                    name={rest.name}
                    price={rest.price}
                    rating={rest.rating}
                    address={rest.location.display_address[0].concat(", ", rest.location.display_address[1])}
                    phone={rest.phone}
                    miles={Math.round(rest.distance / 1609)}
                />
                <br></br>
            </div>
        )
    }

    useEffect(() => {
        fetchTopRestaurants();
    }, [])

    return (
        <div>
            <Header hostName={nickname}/>
            <Center as='b' fontSize='xl' marginBottom='1rem'>
                Party's Top Matches
            </Center>
            {mapCards(restaurantList)}
        </div>
    )
}

export default Matched;