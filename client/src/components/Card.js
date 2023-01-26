import React from "react";
import { Box, Badge, Image, Text, Icon, VStack, HStack, IconButton, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Tag } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { IoCloseCircle, IoHeartCircle } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import PriceRatings from "./PriceRatings";

function Card(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
                <Box 
                    boxShadow='2xl' 
                    borderWidth='xs' 
                    borderRadius='2xl' 
                    overflow='hidden' 
                    height="550px"
                    width="100%"
                >
                    <Image 
                        objectFit='cover'
                        height='60%'
                        width='100%'
                        src={props.image} 
                        alt='Restaurant' 
                    />

                    <VStack 
                        display='flex'
                        alignItems='center'
                        height='40%'
                        width='100%'
                        padding='10px 20px' 
                        spacing='0px'
                    >
                        <HStack 
                            width='100%' 
                            height='20%'
                            alignItems='center' 
                            justifyContent='space-between' 
                            spacing={0}
                        >
                            <Text fontSize='xl' as='b'>
                                {props.name}
                            </Text>
                            <IconButton 
                                variant='ghost' 
                                icon={<InfoIcon size='md'/>} 
                                onClick={onOpen} 
                                height='30px'/>
                        </HStack>

                        <VStack
                            height='30%'
                            width='100%'
                        >
                            <PriceRatings 
                                price={props.price} 
                                rating={props.rating} 
                                reviewCount={props.reviewCount}
                            />

                            <HStack 
                                width='100%'
                                m={0}
                            >
                                {
                                    props.categories.map((category, index) => (
                                        <Badge colorScheme="blue" key={index}>{category}</Badge>
                                    ))
                                }
                            </HStack>

                        </VStack>

                        <HStack 
                            display='flex'
                            justifyContent='center'
                            height='50%'
                            spacing='8px'
                        >
                            <IconButton onClick={()=>props.buttonClick('dislike')} variant='link' color='#F16056' icon={<Icon as={IoCloseCircle} w='4rem' h='4rem'/>}/>
                            <IconButton onClick={()=>props.buttonClick('like')} variant='link' color='#89C092' icon={<Icon as={IoHeartCircle} w='4rem' h='4rem'/>}/>
                            <IconButton onClick={()=>props.buttonClick('superlike')} variant='link' color='#ADD8E6' icon={<Icon as={MdStars} w='4rem' h='4rem'/>}/>
                        </HStack>
                    </VStack>
                        
                    <Modal isOpen={isOpen} onClose={onClose} isCentered='true'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <HStack
                                    display='flex'
                                    justifyContent='space-between'
                                    width='90%'
                                >
                                    <Text
                                        width='68%'
                                    >
                                        {props.name}
                                    </Text>
                                    <Tag 
                                        fontSize='sm'
                                        width='32%'
                                    >
                                        {props.miles} miles away
                                    </Tag>
                                    <ModalCloseButton />
                                </HStack>
                            </ModalHeader>
                            <ModalBody
                                padding='0 24px 16px'
                            >
                                <b>Address: </b> {props.address} <br></br>
                                <b>Phone: </b> {props.phone} <br></br>
                                {/* <b>Reviews: </b> {props.reviews} <br></br> */}
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Box>

        </>
    );
};

export default Card;