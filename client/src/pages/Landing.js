import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Button } from '@chakra-ui/react';

import Logo from '../components/Logo';

function Landing() {

    const navigate = useNavigate();
    function navigateToJoinPage() {
        navigate('/join');
    };

    function navigateToCreatePage() {
        navigate('/create');
    };

    return (
        <div className='main'>
            <Stack 
                width="100%"
                alignItems="center"
                spacing={4} 
            >
                <Logo />
                <Button 
                    variant='outline'
                    width='100%'
                    onClick={() => navigateToJoinPage()}
                >
                    Join Party
                </Button>
                <Button 
                    variant='primary'
                    onClick={() => navigateToCreatePage()}
                >
                    Create Party
                </Button>
            </Stack>
        </div>
    );
};

export default Landing;