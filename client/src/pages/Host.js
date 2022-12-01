import React from 'react';
import StartPartyButton from '../components/StartPartyButton';
import Logo from '../components/LogoAndWebsite';
import NicknameBox from '../components/NicknameBox';
import {Routes, Route, useNavigate, useNavigation} from 'react-router-dom';

const Host = () => {
    const navigate = useNavigate();

    const onStart = () => {
        navigate('/hostParty');
        //send data to backend
    }

    return (
        <div>
            <Logo />
            <NicknameBox/>
            <StartPartyButton onClick={onStart}>Start Party</StartPartyButton>
        </div>
    );
};

export default Host;