import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantList } from '../redux/party';

import Header from '../components/Header';
import MemberBox from '../components/MemberBox';

const HostParty = () => {

    var [memberList, updateList] = useState([]);
    const partyId = useSelector((state) => state.user.partyId);
    const nickname = useSelector((state) => state.user.nickname);

    const navigate = useNavigate();

    const navigateToRestaurants = () => {
        navigate('/restaurants', { state: { nickname: nickname }})
    }

    const dispatch = useDispatch();

    const populateList = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { partyId }})
            .then((data) => {
                updateList(data.data.partyMembers);
                dispatch(setRestaurantList(data.data.restaurantList));
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
                    <Button 
                        variant="primary" 
                        onClick={() => navigateToRestaurants()}
                    >
                        Start Matching
                    </Button>
                </Stack>
            </Container>
        </div>
    );
};

export default HostParty;