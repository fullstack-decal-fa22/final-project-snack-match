import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Button } from '@chakra-ui/react';

import Logo from '../components/Logo';

const Landing = () => {

    const navigate = useNavigate();
  
    const navigateToJoinPage = () => {
        navigate('/join');
        //send party ID and nickname to backend
    };

    const navigateToCreatePage = () => {
        //send nickname to backend
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