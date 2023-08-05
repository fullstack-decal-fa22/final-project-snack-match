import React from 'react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const Error = ({ message }) => {

    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{message}</AlertTitle>
        </Alert>
    );
};

export default Error;