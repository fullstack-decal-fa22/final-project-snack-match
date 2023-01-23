import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCount } from '../redux/user';
import { SocketContext } from '../components/GameContainer';

import { Center } from "@chakra-ui/react";

import Header from '../components/Header';
import Card from '../components/Card';
import LoadingCard from '../components/LoadingCard';

function Swiping({ uploadVoteCount, finishMatching }) {

    const dispatch = useDispatch();

    const restaurantList = useSelector((state) => state.party.restaurantList);
    let [ restaurantIndex, updateIndex ] = useState(0);
    let [ isFinished, setFinished ] = useState(false);

    const partyHost = useSelector((state) => state.party.partyHost);
    const isHost = useSelector((state) => state.user.isHost);
    const partyId = useSelector((state) => state.user.partyId);
    let [restId, updateRestId] = useState("");
    let [restImage, updateRestImage] = useState('https://htmlcolorcodes.com/assets/images/colors/light-blue-color-solid-background-1920x1080.png');
    let [restName, updateRestName] = useState("Restaurant");
    let [restPrice, updateRestPrice] = useState('$');
    let [restRating, updateRestRating] = useState('5');
    let [restCategories, updateRestCategories] = useState(['Restaurant']);
    let [address, updateAddress] = useState('123 Gob Ears Ave, Berkeley, CA');
    let [phone, updatePhone] = useState('(123) 456-7890');
    let [miles, updateMiles] = useState('0.5');

    function populateCard() {

        let restaurantData = restaurantList[restaurantIndex];
        updateRestId(restaurantData.id);
        updateRestImage(restaurantData.image_url);
        updateRestName(restaurantData.name);
        updateRestPrice(restaurantData.price);
        updateRestRating(restaurantData.rating);
        let categoryList = [];
        let tags = restaurantData.categories;
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

    function buttonClick(clickType) {

        let payload = {
            id: restId,
            vote: 0
        }
        if (clickType === 'like') {
            payload.vote = 1
            dispatch(updateCount(payload))
        } else if (clickType === 'superlike') {
            payload.vote = 2
            dispatch(updateCount(payload))
        } else { // dislike
            payload.vote = -1
            dispatch(updateCount(payload))
        };
        if (restaurantIndex < restaurantList.length) {
            updateIndex(restaurantIndex + 1);
            populateCard();
        } else {
            uploadVoteCount();
            setFinished(true);
        }
    };

    useLayoutEffect(() => {
        populateCard();
        buttonClick();
    }, []);

    return (
        <>
            <Header hostName={partyHost}/>
            <Center as='b' fontSize='xl' marginBottom='1rem'>
                {partyHost}'s Party
            </Center>
            {
                !isFinished ? 
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
                :
                    <LoadingCard
                        isHost={isHost}
                        partyId={partyId}
                        uploadVoteCount={uploadVoteCount}
                        finishMatching={finishMatching}
                    />
            }   
        </>
    );
};

export default Swiping;