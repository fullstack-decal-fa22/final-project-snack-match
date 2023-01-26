import React from "react";
import { Text, Icon, HStack } from "@chakra-ui/react";
import { FaStar as Filled, FaStarHalfAlt as HalfFilled, FaRegStar as Empty } from "react-icons/fa";

const PriceRatings = (props) => {

    function displayStars(rating) {
        const rate = parseFloat(rating);
        var status = [Empty, Empty, Empty, Empty, Empty];
        var full = Math.floor(rate);
        var half = rate % full;
        for (let i=0; i < full; i++) {
            status[i] = Filled
        };
        if (half === 0.5) {
            status[full] = HalfFilled
        };
        if (rate === 0.5) {
            status[0] = HalfFilled
        };
        return (
            <HStack spacing={0}>
                {status.map((icon, index) => (
                    <Icon key={index} as={icon} color='orange'/>
                ))}
            </HStack>
        );
    };

    return(
        <HStack 
            display='flex'
            alignItems='left' 
            width='100%'
            my='0'
        >
            <Text fontSize='sm' color='green'>
                {props.price}
            </Text>
            {displayStars(props.rating)}
            <Text fontSize='sm' color='grey'>
                ({props.reviewCount})
            </Text>
        </HStack>
    );
};

export default PriceRatings;