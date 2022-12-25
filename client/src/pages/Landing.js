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
        <div>
            <Logo />
            <Stack 
                width="100%"
                minWidth="330px"
                alignItems="center"
                padding="20px 20px"
                spacing={4} 
            >
                <Button 
                    variant="secondary"
                    onClick={() => navigateToJoinPage()}
                >
                    Join Party
                </Button>
                <Button 
                    variant="primary"
                    onClick={() => navigateToCreatePage()}
                >
                    Create Party
                </Button>
            </Stack>
        </div>
    );
};

export default Landing;