import React from "react";
import { Image, Text, Tag, Card, CardBody, Stack, Heading } from "@chakra-ui/react";
import PriceRatings from "./PriceRatings";

function MatchedCard(props) {

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
                    
                    <PriceRatings price={props.price} rating={props.rating}/>
                    
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