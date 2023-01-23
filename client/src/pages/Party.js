import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../components/GameContainer';

import { Container, Stack, Box, Button } from '@chakra-ui/react';
import Header from '../components/Header';

function Party({ startMatching }) {
    
    const partyId = useSelector((state) => state.user.partyId);
    const isHost = useSelector((state) => state.user.isHost);
    const { partyMembers } = useContext(SocketContext);
    let [ isLoading, setLoading ] = useState(false);

    function handleButtonPress() {
        setLoading(true);
        startMatching();
    }
    
    // const fillerLength = 6 - props.memberList.length;
    // for (let i = 0; i < fillerLength; i++) {
    //     memberNames.push("--------");
    // };

    return (
        <>
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

                    <Stack spacing={3}>
                        {Object.keys(partyMembers).map((name, index) => (
                            <Box 
                                key={index}
                                width="100%" 
                                height="42px"
                                display="flex" 
                                justifyContent="center"
                                borderWidth="1px"
                                borderRadius="md" 
                                bg="white"
                                p="2"
                            >
                                {name}
                            </Box>
                        ))}
                        {[...Array(6 - Object.keys(partyMembers).length).keys()].map((index) => (
                            <Box 
                                key={index}
                                width="100%" 
                                height="42px"
                                display="flex" 
                                borderWidth="1px"
                                borderRadius="md" 
                                bg="secondary"
                                p="2"
                            />
                        ))}
                    </Stack>
                    {
                        isHost ? 
                            <Button 
                                variant="primary" 
                                onClick={() => handleButtonPress()}
                                isLoading={isLoading}
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
        </>
    );
};

export default Party;