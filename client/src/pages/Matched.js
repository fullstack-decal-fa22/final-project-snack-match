import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { Center } from "@chakra-ui/react";
import MatchedCard from '../components/MatchedCard';
import axios from 'axios';

const Matched = () => {
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
    var menu = 'French Toast, Pancake'
    var reviews = 'Amazing! - Carol Christ'

    return (
        <div>
            <Header hostName={hostName}/>
            <Center as='b' fontSize='xl' marginBottom='1rem'>
                Party's Top Matches
            </Center>
            <MatchedCard
                image='https://pbs.twimg.com/media/FMLUhT7VkAYKwR0.jpg'
                name='Testing Testing Testing Testing Testing'
                price={restPrice}
                rating={restRating}
                categories={restCategories}
                address='2517 Durant Ave, Berkeley, CA Test Test'
                phone={phone}
                hours={hours}
                miles={miles}
                menu={menu}
                reviews={reviews}
            />
            <br></br>
            <MatchedCard
                image='https://images.happycow.net/venues/1024/22/06/hcmp220697_1067080.jpeg'
                name={restName}
                price={restPrice}
                rating={restRating}
                categories={restCategories}
                address={address}
                phone={phone}
                hours={hours}
                miles={miles}
                menu={menu}
                reviews={reviews}
            />
            <br></br>
            <MatchedCard
                image={restImage}
                name={restName}
                price={restPrice}
                rating={restRating}
                categories={restCategories}
                address={address}
                phone={phone}
                hours={hours}
                miles={miles}
                menu={menu}
                reviews={reviews}
            />
            <br></br>
        </div>
    )
}

export default Matched;