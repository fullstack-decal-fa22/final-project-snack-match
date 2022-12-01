import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import NicknameBox from '../components/NicknameBox';
import {Routes, Route, useNavigate, useNavigation} from 'react-router-dom';

const Host = () => {
    const navigate = useNavigate();

    const onStart = () => {
        navigate('/hostParty');
    }

    return (
        <div>
            <Logo />
            <NicknameBox/>
            <Button onClick={onStart}>Start Party</Button>
        </div>
    );
};

export default Host;