import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container, Stack, Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantList } from '../redux/party';

import Header from '../components/Header';
import MemberBox from '../components/MemberBox';

const Party = () => {

    var [memberList, updateList] = useState([]);
    const partyId = useSelector((state) => state.user.partyId);

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
                <Stack
                    spacing={4}
                >
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
                </Stack>
            </Container>
        </div>
    );
};

export default Party;