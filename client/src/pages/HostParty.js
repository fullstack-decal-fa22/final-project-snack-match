import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Stack, Box, Button } from '@chakra-ui/react';
import axios from 'axios';

import Header from '../components/Header';
import MemberBox from '../components/MemberBox';

const HostParty = () => {
    const { state } = useLocation();
    const { nickname } = state;

    var [memberList, updateList] = useState([]);
    var [partyId, updateId] = useState(nickname);

    const navigate = useNavigate();

    const navigateToRestaurants = () => {
        navigate('/restaurants', { state: { nickname: nickname }})
    }

    const populateList = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { nickname }})
            .then((data) => {
                updateId(data.data.partyId);
                updateList(data.data.partyMembers);
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