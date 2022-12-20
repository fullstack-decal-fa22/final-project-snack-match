import React from 'react';
import { Stack, Select, Input, Button } from '@chakra-ui/react';

const CreatePartyInput = ({ setNickname, setPrice, setDistance, navigateToHostParty }) => {

    const handlePrice = (selection) => {
        var priceList = [];
        for (let i = 1; i <= parseInt(selection); i++) {
            priceList.push(i);
        }
        setPrice(priceList);
    }

    return (
        <Stack spacing={4}>
            <Input  
                placeholder='Nickname' 
                onChange={(event) => setNickname(event.target.value)}
            />
            <Select 
                placeholder="Select Distance"
                onChange={(event) => setDistance(event.target.value)}
            >
                <option value="1">Less than 1 Mile Away</option>
                <option value="3">1-3 Miles Away</option>
                <option value="5">3-5 Miles Away</option>
            </Select>
            <Select 
                placeholder="Select Price"
                onChange={(event) => handlePrice(event.target.value)}
            >
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
            </Select>
            <Button variant="primary" onClick={() => navigateToHostParty()}>Start Party</Button>
        </Stack>
    );
};

export default CreatePartyInput;