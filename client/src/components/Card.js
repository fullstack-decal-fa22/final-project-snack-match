import * as React from "react";
import { Box, Center, Image, Flex, Text, Icon, HStack, IconButton } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { IoArrowBackCircle, IoCloseCircle, IoHeartCircle } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";
import styles from "./Card.module.css";

function Card(props) {
    function displayStars(rating) {
        var status = [FaRegStar, FaRegStar, FaRegStar, FaRegStar, FaRegStar];
        var full = Math.floor(rating);
        var half = rating % full;
        for (let i=0; i < full; i++) {
            status[i] = FaStar
        };
        if (half === 0.5) {
            status[full] = FaStarHalfAlt
        };
        if (parseFloat(rating) === 0.5) {
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
            <Text px='6' fontSize='15px'>
                {string}
            </Text>
        )
    }

    return(
        <Center position='relative'>
            <Box p='12' maxW='350px' borderWidth='1px' height={{base: '100%', md: '50%', xl: '25%'}} width={['100%', '50%']}>
                <Image borderRadius='md' src={props.image} />
                
                <Flex w='100%' px='6' py='5' align='center' justify='space-between'>
                    <Text fontSize='25px' as='b'>
                        {props.name}
                    </Text>
                    <IconButton icon={<InfoIcon color='black'/>}/>
                </Flex>

                <HStack px='6'>
                    <Text fontSize='15px' color='green'>
                        {props.price}
                    </Text>
                    {displayStars(props.rating)}
                </HStack>

                {displayCategories(props.categories)}

                <hr></hr>
                <HStack py='10'>
                    <IconButton aria-label="back" icon={<Icon as={IoArrowBackCircle} w={50} h={50} color='orange'/>}/>
                    <IconButton aria-label='dislike' icon={<Icon as={IoCloseCircle} w={80} h={80} color='red'/>}/>
                    <IconButton aria-label='like' icon={<Icon as={IoHeartCircle} w={80} h={80} color='green'/>}/>
                    <IconButton aria-label='superlike' icon={<Icon as={MdStars} w={50} h={50} color='blue'/>}/>
                </HStack>
                <br></br>
            </Box>
        </Center>
    );
};

export default Card;