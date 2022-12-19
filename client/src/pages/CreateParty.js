import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/LogoAndWebsite';
import CreatePartyInput from '../components/CreatePartyInput';
import Error from '../components/ErrorMessage';
import { Container } from '@chakra-ui/react';

const Host = () => {

    const [ nicknameInput, setNickname ] = useState("");
    const [ distanceInput, setDistance ] = useState(5);
    const [ priceList, setPrice ] = useState([1, 2, 3, 4]);
    const [ errorMessage, setError ] = useState(null);

    const navigate = useNavigate();
  
    const navigateToHostParty = () => {

        const params = {
        nickname: nicknameInput,
        location: "Berkeley",
        distance: distanceInput, 
        price: priceList, 
        limit: 10 
        };
        console.log(params);
        axios
        .post('http://localhost:9000/party/create', params)
        .then(() => navigate('/host-party', { state: { nickname: nicknameInput }}))
        .catch((error) => {
            console.log(error.response.data);
            setError(<Error message={error.response.data.message} />);
        });
    };

    const stateFuncs = { setNickname, setDistance, setPrice, navigateToHostParty };

    return (
        <div>
            <Logo />
            <Container>
                <CreatePartyInput {...stateFuncs} />
                {errorMessage}
            </Container>
        </div>
    );
};

export default Host;