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
    let [restaurantId, setId] = useState("");
    let [image, setImage] = useState('https://htmlcolorcodes.com/assets/images/colors/light-blue-color-solid-background-1920x1080.png');
    let [restaurantName, setName] = useState("Restaurant");
    let [price, setPrice] = useState('$');
    let [rating, setRating] = useState('5');
    let [reviewCount, setReviewCount] = useState('10');
    let [categories, setCategories] = useState(['Restaurant']);
    let [address, setAddress] = useState('123 Gob Ears Ave, Berkeley, CA');
    let [phone, setPhone] = useState('(123) 456-7890');
    let [distanceMiles, setDistanceMiles] = useState('0.5');

    function populateCard() {

        let data = restaurantList[restaurantIndex];
        setId(data.id);
        setImage(data.image_url);
        setName(data.name);
        setPrice(data.price);
        setRating(data.rating);
        setReviewCount(data.review_count);
        let categoryList = [];
        let tags = data.categories;
        if (tags.length > 0) {
            for (let i = 0; i < tags.length; i++) {
                categoryList.push(tags[i].title);
            }
        } else {
            categoryList.push("-----"); // in case of no category tags
        }
        setCategories(categoryList);
        setAddress(data.location.display_address[0].concat(", ", data.location.display_address[1]));
        setPhone(data.display_phone);
        setDistanceMiles((data.distance / 1609).toFixed(1));
    };

    function buttonClick(clickType) {

        let payload = {
            id: restaurantId,
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
        <div className='main'>
            <Header />
            {
                !isFinished ? 
                    <Card
                        image={image}
                        name={restaurantName}
                        price={price}
                        rating={rating}
                        reviewCount={reviewCount}
                        categories={categories}
                        address={address}
                        phone={phone}
                        miles={distanceMiles}
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
        </div>
    );
};

export default Swiping;