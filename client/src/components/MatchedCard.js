import * as React from "react";
import { Center, Image, Text, Icon, HStack, Tag, Card, CardBody, Stack, Heading } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";

function MatchedCard(props) {
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
            <HStack spacing={0}>
                <Icon as={status[0]} color='orange'/>
                <Icon as={status[1]} color='orange'/>
                <Icon as={status[2]} color='orange'/>
                <Icon as={status[3]} color='orange'/>
                <Icon as={status[4]} color='orange'/>
            </HStack>
        );
    };

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            marginLeft='5rem'
            marginRight='5rem'
            w='100%'
            h='auto'
        >
            <Image
                objectFit='cover'
                maxW={{ sm: '8rem' }}
                maxH={{ sm: 'auto' }}
                src={props.image}
                alt='Restaurant'
            />
            <Stack>
                <CardBody>
                <Heading size='md'>{props.name}</Heading>

                <Tag fontSize='sm' marginTop='0.5rem' marginBottom='0.2rem'>
                    {props.miles} miles away
                </Tag>
                
                <HStack alignItems="center" m={0}>
                    <Text fontSize='sm' color='green'>
                        {props.price}
                    </Text>
                    {displayStars(props.rating)}
                </HStack>
                
                <Text fontSize='sm' marginTop='1rem'>
                    <b>Address: </b> {props.address} <br></br>
                    <b>Phone: </b> {props.phone} <br></br>
                </Text>

                </CardBody>
            </Stack>
        </Card>
    )
}

export default MatchedCard;