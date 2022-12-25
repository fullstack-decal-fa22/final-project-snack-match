import React from "react";
import { Box, Badge, Center, Container, Image, Flex, Text, Icon, VStack, HStack, IconButton, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Tag } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { IoArrowBackCircle, IoCloseCircle, IoHeartCircle } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import PriceRatings from "./PriceRatings";

function Card(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <div>
            <Center position='relative'>
                <Box boxShadow='2xl' maxW='sm' borderWidth='xs' borderRadius='2xl' overflow='hidden' height={{base: '100%', md: '50%', xl: '25%'}} width="100%">
                    <Image 
                        objectFit='cover'
                        height='300px'
                        width='400px'
                        src={props.image} 
                        alt='Restaurant' />
                    <Container>
                        <VStack alignItems="left" spacing={3}>
                            <Flex w='100%' py='10px' align='center' justify='space-between' p='0' mt='10px'>
                                <Text fontSize='xl' as='b'>
                                    {props.name}
                                </Text>
                                <IconButton variant='ghost' icon={<InfoIcon />} onClick={onOpen} size='md'/>
                            </Flex>

                            <PriceRatings price={props.price} rating={props.rating} />

                            <HStack m={0}>
                                {
                                    props.categories.map((category, index) => (
                                        <Badge colorScheme="blue" key={index}>{category}</Badge>
                                    ))
                                }
                            </HStack>

                            <Center>
                                <HStack py='5'>
                                    <IconButton onClick={()=>props.buttonClick('dislike')} variant='link' color='#F16056' icon={<Icon as={IoCloseCircle} w='4rem' h='4rem'/>}/>
                                    <IconButton onClick={()=>props.buttonClick('like')} variant='link' color='#89C092' icon={<Icon as={IoHeartCircle} w='4rem' h='4rem'/>}/>
                                    <IconButton onClick={()=>props.buttonClick('superlike')} variant='link' color='#ADD8E6' icon={<Icon as={MdStars} w='2.8rem' h='2.8rem'/>}/>
                                </HStack>
                            </Center>
                        </VStack>
                        
                    </Container>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered='true' overflow='scroll'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Flex>
                                    {props.name}
                                    <Tag ml={2} fontSize='sm'>
                                        {props.miles} miles away
                                    </Tag>
                                </Flex>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <b>Address: </b> {props.address} <br></br>
                                <b>Phone: </b> {props.phone} <br></br>
                                {/* <b>Reviews: </b> {props.reviews} <br></br> */}
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Box>
            </Center>
        </div>
    );
};

export default Card;