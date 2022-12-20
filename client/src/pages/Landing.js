import React from 'react';
import Main from '../components/MainContainer';
import NavJoinButton from '../components/NavJoinButton';
import NavCreateButton from '../components/NavCreateButton';
import Logo from '../components/LogoAndWebsite';
import { Container, Stack } from '@chakra-ui/react';


const First = () => {
    return (
        <div className="main">
            <Logo />
            <Stack 
                width="100%"
                minWidth="330px"
                alignItems="center"
                padding="20px 20px"
                spacing={4} 
            >
                <NavJoinButton />
                <NavCreateButton />
            </Stack>
        </div>
    );
};

export default First;