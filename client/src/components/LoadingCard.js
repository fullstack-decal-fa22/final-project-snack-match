import React, { useContext, useState } from "react";
import { SocketContext } from './GameContainer';
import { 
    Box, 
    Button,
    Center, 
    Text, 
    VStack, 
    HStack,
    // useDisclosure,
    // AlertDialog, 
    // AlertDialogContent,
    // AlertDialogHeader,
    // AlertDialogFooter,
    // AlertDialogOverlay,
    // AlertDialogCloseButton,
    // AlertDialogBody,
    Spinner
} from "@chakra-ui/react";
import { CheckCircleIcon } from '@chakra-ui/icons';

function LoadingCard({ isHost, partyId, finishMatching }) {
    
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const cancelRef = React.useRef()
    const { partyMembers, isGroupFinished } = useContext(SocketContext);
    const [ isLoading, setLoading ] = useState(false);

    function handleButtonPress() {
        setLoading(true);
        finishMatching();
    }

    return(
        <>
            <Center position='relative'>
                <Box 
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    height='500px'
                    width='400px'

                    boxShadow='2xl' 
                    maxW='sm' 
                    borderWidth='xs' 
                    borderRadius='2xl' 
                    overflow='hidden' 
                >
                    <VStack alignItems="center" spacing={3} margin='0'>
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
                                {/* <AlertDialog
                                    motionPreset='slideInBottom'
                                    leastDestructiveRef={cancelRef}
                                    onClose={onClose}
                                    isOpen={isOpen}
                                    isCentered
                                >
                                <AlertDialogOverlay />
                        
                                <AlertDialogContent>
                                    <AlertDialogHeader>Finish Voting?</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                        Are you sure you would like to 
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        No
                                    </Button>
                                    <Button 
                                        colorScheme='red' 
                                        ml={3}
                                        onClick={() => finishMatching()}
                                    >
                                        Yes
                                    </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog> */}
                            </>
                        :
                            null
                        }
                        </VStack>               
                </Box>
            </Center>
        </>
    );
};

export default LoadingCard;