import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import NicknameBox from '../components/NicknameBox';
import PartyCodeBox from '../components/PartyCodeBox';
import {Routes, Route, useNavigate, useNavigation} from 'react-router-dom';

const JoinParty = () => {
    const navigate = useNavigate();

    const onEnter = () => {
        //send party ID and nickname to backend
        navigate('/party');
    }

    return (
        <div>
            <Logo />
            <PartyCodeBox/>
            <NicknameBox/>
            <Button onClick={onEnter}>Enter</Button>
        </div>
    );
};

export default JoinParty;