import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../components/GameContainer';

import { VStack, Box, Button, Text } from '@chakra-ui/react';
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

    return (
        <div className='main'>
            <Header />
            <Box 
                display='flex'
                alignItems='center'
                justifyContent='center'
                height='550px'
                width='100%'
                boxShadow='2xl' 
                borderRadius='2xl' 
            >
                <VStack 
                    width="80%"
                    alignItems="center" 
                    spacing={3} 
                    margin='0'
                >

                    <Text fontSize='xl' as='b'>
                        Code: {partyId}
                    </Text>

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
                            justifyContent="left"
                            borderWidth="1px"
                            borderRadius="md" 
                            bg="secondary"
                            p="2"
                        />
                    ))}

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
                </VStack>
            </Box>
        </div>
    );
};

export default Party;