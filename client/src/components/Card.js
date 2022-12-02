import * as React from "react";
import { Box, Center, Image, Flex, Text, Icon, HStack, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Tag } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { IoArrowBackCircle, IoCloseCircle, IoHeartCircle } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";
import styles from "./Card.module.css";

function Card(props) {
    function displayStars(rating) {
        const rate = parseFloat(rating);
        var status = [FaRegStar, FaRegStar, FaRegStar, FaRegStar, FaRegStar];
        var full = Math.floor(rate);
        var half = rate % full;
        for (let i=0; i < full; i++) {
            status[i] = FaStar
        };
        if (half === 0.5) {
            status[full] = FaStarHalfAlt
        };
        if (rate === 0.5) {
            status[0] = FaStarHalfAlt
        };
        return (
            <div>
                <Icon as={status[0]} color='orange'/>
                <Icon as={status[1]} color='orange'/>
                <Icon as={status[2]} color='orange'/>
                <Icon as={status[3]} color='orange'/>
                <Icon as={status[4]} color='orange'/>
            </div>
        );
    };

    function displayCategories(categories) {
        var string = '';
        for (let i=0; i < categories.length; i++) {
            string = string.concat(categories[i])
            if (i !== categories.length-1) {
                string = string.concat(', ')
            }
        };
        return (
            <Text px='6' fontSize='sm'>
                {string}
            </Text>
        )
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <div>
            <Center position='relative'>
                <Box className={styles['card']} maxW='sm' borderWidth='xs' borderRadius='2xl' overflow='hidden' height={{base: '100%', md: '50%', xl: '25%'}} width={['100%', '50%']}>
                    <Flex height='xs' overflow='hidden' alignItems='center' justifyContent='center'>
                        <Image src={props.image} alt='Restaurant' />
                    </Flex>

                    <Box>
                        <Flex w='100%' px='6' py='5' align='center' justify='space-between'>
                            <Text fontSize='xl' as='b'>
                                {props.name}
                            </Text>
                            <IconButton variant='ghost' className={styles['door']} icon={<InfoIcon />} onClick={onOpen} size='sm'/>
                        </Flex>

                        <HStack px='6'>
                            <Text fontSize='sm' color='green'>
                                {props.price}
                            </Text>
                            {displayStars(props.rating)}
                        </HStack>

                        {displayCategories(props.categories)}

                        <br></br>
                        <hr></hr>
                        <Center>
                            <HStack py='5'>
                                <IconButton onClick={()=>props.buttonClick('back')} variant='link' color='' className={styles['back']} icon={<Icon as={IoArrowBackCircle} w='2.8rem' h='2.8rem'/>}/>
                                <IconButton onClick={()=>props.buttonClick('dislike')} variant='link' color='' className={styles['dislike']} icon={<Icon as={IoCloseCircle} w='4rem' h='4rem'/>}/>
                                <IconButton onClick={()=>props.buttonClick('like')} variant='link' color='' className={styles['like']} icon={<Icon as={IoHeartCircle} w='4rem' h='4rem'/>}/>
                                <IconButton onClick={()=>props.buttonClick('superlike')} variant='link' color='' className={styles['superlike']} icon={<Icon as={MdStars} w='2.8rem' h='2.8rem'/>}/>
                            </HStack>
                        </Center>
                    </Box>
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