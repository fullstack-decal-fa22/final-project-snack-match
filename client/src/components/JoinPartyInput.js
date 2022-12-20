import React from 'react';
import { Stack, Input, Button } from '@chakra-ui/react';

const CreatePartyInput = ({ setCode, setNickname, navigateToMemberLobby }) => {

    return (
        <Stack spacing={4}>
            <Input  
                placeholder='Party Code' 
                onChange={(event) => setCode(event.target.value)}
            />
            <Input  
                placeholder='Nickname' 
                onChange={(event) => setNickname(event.target.value)}
            />
            <Button variant="primary" onClick={() => navigateToMemberLobby()}>Join Party</Button>
        </Stack>
    );
};

export default CreatePartyInput;