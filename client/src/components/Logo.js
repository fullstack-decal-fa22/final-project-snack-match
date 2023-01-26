import React from 'react';
import logo from '../styles/landing-logo.png'
import { Image, Flex } from '@chakra-ui/react';

const LandingLogo = () => {
    return(
        <>
            <Image 
                src={logo} 
                alt="fullstack logo"
                width="300px"
                marginBottom="10px"
            />
        </>
    )
};

export default LandingLogo;