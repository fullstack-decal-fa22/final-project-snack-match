import React from 'react';
import { Stack, Input, Button } from '@chakra-ui/react';

const CreatePartyInput = ({ setCode, setNickname, navigateToMemberLobby }) => {

    return (
        <Stack spacing={4}>
            <Input  
                variant='filled' 
                size="lg"
                placeholder='Party Code' 
                onChange={(event) => setCode(event.target.value)}
            />
            <Input  
                variant='filled' 
                size="lg"
                placeholder='Nickname' 
                onChange={(event) => setNickname(event.target.value)}
            />
            <Button size="lg" colorScheme='blue' onClick={() => navigateToMemberLobby()}>Join Party</Button>
        </Stack>
    );
};

export default CreatePartyInput;