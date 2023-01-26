import React, { useContext, useState } from "react";
import { SocketContext } from './GameContainer';
import { 
    Box, 
    Button,
    Text, 
    VStack, 
    HStack,
    Spinner
} from "@chakra-ui/react";
import { CheckCircleIcon } from '@chakra-ui/icons';

function LoadingCard({ isHost, finishMatching }) {
    
    const { partyMembers, isGroupFinished } = useContext(SocketContext);
    const [ isLoading, setLoading ] = useState(false);

    function handleButtonPress() {
        setLoading(true);
        finishMatching();
    }

    return(
        <>
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
                        Your Group Is Still Voting...
                    </Text>

                    {Object.keys(partyMembers).map((name, index) => (
                        <HStack 
                            key={index}
                            width="100%" 
                            height="42px"
                            display="flex" 
                            justifyContent="left"
                            borderWidth="1px"
                            borderRadius="md" 
                            bg="white"
                            p="2"
                        >  
                            {
                                partyMembers[name] ?
                                    <CheckCircleIcon 
                                        color='primary'
                                        width='24px'
                                        height='24px'
                                    />
                                :   
                                    <Spinner 
                                        color='primary'
                                        size='md'
                                        speed='1.0s'
                                    />
                            } 
                            <Text
                                pl='4px'
                            >
                                {name}
                            </Text>
                        </HStack>
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

                    {isHost ?
                        <>
                            <Button 
                                variant="primary"
                                onClick={() => handleButtonPress()}
                                isDisabled={isGroupFinished ? false : true}
                                isLoading={isLoading}
                            >
                                Finish Game
                            </Button>
                        </>
                    :
                        null
                    }
                </VStack>               
            </Box>
        </>
    );
};

export default LoadingCard;