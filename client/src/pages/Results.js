import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, Stack, Center } from "@chakra-ui/react";

import Header from '../components/Header';
import MatchedCard from '../components/MatchedCard';

function Results() {

    const restaurantList = useSelector((state) => state.party.restaurantList);
    const groupResults = useSelector((state) => state.party.groupResults);
    const hostName = useSelector((state) => state.party.partyHost);

    return (
        <div>
            <Header hostName={hostName}/>
            <Container>
                <Stack spacing={4}>
                    <Center as='b' fontSize='xl'>
                        Party's Top Matches
                    </Center>
                    {restaurantList.filter((restaurant) => 
                        groupResults.includes(restaurant.id)
                    ).map((rest, index) => 
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

export default Results;