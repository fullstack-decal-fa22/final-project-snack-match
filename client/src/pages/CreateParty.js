import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPartyId, setNickname, setHost, setConnection } from '../redux/user';
import axios from 'axios';

import { Container, Stack, Select, Input, Button } from '@chakra-ui/react';

import Logo from '../components/Logo';
import Error from '../components/ErrorMessage';

function Host() {

    let [ nicknameInput, setNicknameInput ] = useState("");
    let [ distanceInput, setDistance ] = useState(5);
    let [ priceList, setPrice ] = useState([1, 2, 3, 4]);
    let [ errorMessage, setError ] = useState(null);
    let [ isLoading, setLoading ] = useState(false);

    function handlePrice (selection) {
        let priceList = [];
        for (let i = 1; i <= parseInt(selection); i++) {
            priceList.push(i);
        }
        setPrice(priceList);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function createParty() {
        setLoading(true);
        let params = {
            nickname: nicknameInput,
            location: "Berkeley",
            distance: distanceInput, 
            price: priceList, 
            limit: 10 
        };
        axios
        .post('http://localhost:9000/party/create', params)
        .then((data) => {
            dispatch(setPartyId(data.data.partyId));
            dispatch(setNickname(nicknameInput));
            dispatch(setHost());
            dispatch(setConnection());
            navigate('/party');
        })
        .catch((error) => {
            console.log(error.response.data);
            setLoading(false);
            setError(<Error message={error.response.data.message} />);
        });
    };

    return (
        <div className='main'>
            <Stack 
                width='100%'
				spacing={4}
				display='flex'
				alignItems='center'
            >
                <Logo />
                <Input  
                    placeholder='Nickname' 
                    onChange={(event) => setNicknameInput(event.target.value)}
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
                <Button 
                    variant="primary" 
                    onClick={() => createParty()}
                    isLoading={isLoading}
                >
                    Start Party
                </Button>
                {errorMessage}
            </Stack>
        </div>
    );
};

export default Host;