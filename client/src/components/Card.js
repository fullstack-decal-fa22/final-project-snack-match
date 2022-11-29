import * as React from "react";
import { Box, Center, Image, Flex, Icon, HStack, IconButton } from "@chakra-ui/react";
import { InfoIcon, ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import { FaArrowLeft, FaTimes, FaHeart, FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";
import styles from "./Card.module.css";

function Card(props) {
    function displayStars(rating) {
        var status = [FaRegStar, FaRegStar, FaRegStar, FaRegStar, FaRegStar];
        var full = Math.floor(rating);
        var half = rating % full;
        for (let i=0; i < full; i++) {
            status[i] = FaStar
        }
        if (half === 0.5) {
            status[full] = FaStarHalfAlt
        }
        return (
            <div>
                <Icon as={status[0]} color='orange'/>
                <Icon as={status[1]} color='orange'/>
                <Icon as={status[2]} color='orange'/>
                <Icon as={status[3]} color='orange'/>
                <Icon as={status[4]} color='orange'/>
            </div>
        )
    }

    return(
        <Center position='relative'>
            <Box p='12' maxW='420px' borderWidth='1px'>
                <div className='restaurantImage'>
                    <Image borderRadius='md' src={props.image} />
                    <InfoIcon color='white'/>
                </div>
                <h1 style={{ fontSize: "1.5em"}}>
                    <b>{props.name}</b>
                </h1>
                <HStack>
                    <h3 style={{ fontSize: "1.1em" }}>
                        {props.price}
                    </h3>
                    {displayStars(props.rating)}
                </HStack>
                <h3 style={{ fontSize: "1.1em" }}>{props.categories}</h3>
                <hr></hr>
                <br></br>
                <HStack>
                    <IconButton aria-label='Search database' icon={<SearchIcon />} />
                    <IconButton aria-label="back" icon={<ArrowBackIcon />}/>
                    <IconButton aria-label="back" icon={<Icon as={FaArrowLeft} color='orange'/>}/>
                    <IconButton aria-label='dislike' icon={<Icon as={FaTimes} color='red'/>}/>
                    <IconButton aria-label='like' icon={<Icon as={FaHeart} color='green'/>}/>
                    <IconButton aria-label='superlike' icon={<Icon as={FaStar} color='blue'/>}/>
                </HStack>
            </Box>
        </Center>
        
    );
};

export default Card;