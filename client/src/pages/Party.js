import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import MemberBox from '../components/MemberBox';
import Header from '../components/Header';
import axios from 'axios';
import { Container, Stack, Box } from '@chakra-ui/react';

const Party = (props) => {

    const { state } = useLocation();
    const { nickname } = state;

    var [memberList, updateList] = useState([]);
    var [partyId, updateId] = useState("");

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
        <div className="main">
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