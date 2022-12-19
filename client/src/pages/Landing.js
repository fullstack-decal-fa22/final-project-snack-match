import React from 'react';
import NavJoinButton from '../components/NavJoinButton';
import NavCreateButton from '../components/NavCreateButton';
import Logo from '../components/LogoAndWebsite';
import { Container, Stack } from '@chakra-ui/react';


const First = () => {
    return (
        <div>
            <Logo />
            <Container>
                <Stack spacing={4}>
                    <NavJoinButton />
                    <NavCreateButton />
                </Stack>
            </Container>
        </div>
    );
};

export default First;