import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../components/GameContainer';
import { startMatching } from '../sockets/emit';

import { Container, Stack, Box, Button } from '@chakra-ui/react';
import Header from '../components/Header';

function Party() {
    
    const partyId = useSelector((state) => state.user.partyId);
    const isHost = useSelector((state) => state.user.isHost);
    const { memberList } = useContext(SocketContext);

    // const memberNames = props.memberList;
    
    // const fillerLength = 6 - props.memberList.length;
    // for (let i = 0; i < fillerLength; i++) {
    //     memberNames.push("--------");
    // };

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

                    <Stack spacing={4}>
                        {memberList.map((name, index) => (
                            <Box 
                                key={index}
                                width="100%" 
                                display="flex" 
                                justifyContent="center"
                                borderWidth="1px"
                                borderRadius="md" 
                                bg="secondary"
                                p="2"
                            >
                                {name}
                            </Box>
                        ))}
                    </Stack>
                    {
                        isHost ? 
                            <Button 
                                variant="primary" 
                                onClick={() => startMatching(partyId)}
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

export default Party;