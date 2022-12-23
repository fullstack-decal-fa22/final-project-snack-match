import React from 'react';
import logo from '../styles/landing-logo.png'
import { Image, Flex } from '@chakra-ui/react';

const LandingLogo = () => {
    return(
        <Flex >
            <Image 
                src={logo} 
                margin="10px"
                alt="fullstack logo"
                width="300px"
            />
        </Flex>
    )
};

export default LandingLogo;