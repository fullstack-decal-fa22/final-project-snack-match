import React from 'react';
import { useSelector } from 'react-redux';

import { Stack, Text } from "@chakra-ui/react";

import Header from '../components/Header';
import MatchedCard from '../components/MatchedCard';

function Results() {

    const restaurantList = useSelector((state) => state.party.restaurantList);
    const groupResults = useSelector((state) => state.party.groupResults);
    // const hostName = useSelector((state) => state.party.partyHost);

    return (
        <div className='main'>
            <Header />
            <Stack 
                spacing={4}
                alignItems='center'
            >
                <Text as='b' fontSize='xl'>
                    Your Party's Top Matches!
                </Text>
                {restaurantList.filter((restaurant) => 
                    groupResults.includes(restaurant.id)
                ).map((rest, index) => 
                    <MatchedCard
                        key={index}
                        image={rest.image_url}
                        name={rest.name}
                        price={rest.price}
                        rating={rest.rating}
                        reviewCount={rest.review_count}
                        address={rest.location.display_address[0].concat(", ", rest.location.display_address[1])}
                        phone={rest.phone}
                        miles={(rest.distance / 1609).toFixed(1)}
                    />)
                }
            </Stack>
        </div>
    )
}

export default Results;