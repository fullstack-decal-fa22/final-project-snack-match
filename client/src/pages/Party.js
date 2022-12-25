import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantList } from '../redux/party';
import { setVoteCounter } from '../redux/user';
import axios from 'axios';

import { Container, Stack, Box, Button } from '@chakra-ui/react';

import Header from '../components/Header';
import MemberBox from '../components/MemberBox';


function HostParty() {

    let [memberList, updateList] = useState([]);
    const partyId = useSelector((state) => state.user.partyId);
    // const nickname = useSelector((state) => state.user.nickname);
    const isHost = useSelector((state) => state.user.isHost);

    const navigate = useNavigate();
    function navigateToRestaurants () {
        navigate('/restaurants')
    }

    const dispatch = useDispatch();
    function populateList() {
        axios
            .get('http://localhost:9000/party/info', { params: { partyId }})
            .then((data) => {
                updateList(data.data.partyMembers);
                let restaurantList = data.data.restaurantList
                dispatch(setRestaurantList(restaurantList));
                let voteCounter = {};
                for (let element of restaurantList) {
                    voteCounter[element.id] = 0
                };
                dispatch(setVoteCounter(voteCounter));
            })
            .catch((error) => console.log(error.response.data));
    };

    useEffect(() => {
        populateList();
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <Stack spacing={4}>
                    <Box 
                        size="lg"
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        Code: {partyId}
                    </Box>
                    <MemberBox memberList={memberList}/>

                    {
                        isHost ? 
                            <Button 
                                variant="primary" 
                                onClick={() => navigateToRestaurants()}
                            >
                                Start Matching
                            </Button>
                        :
                            <Box 
                                size="lg"
                                width="100%"
                                display="flex"
                                justifyContent="center"
                                fontSize="xl"
                                fontWeight="bold"
                            >
                                Waiting for host to start...
                            </Box>
                    }
                </Stack>
            </Container>
        </div>
    );
};

export default HostParty;