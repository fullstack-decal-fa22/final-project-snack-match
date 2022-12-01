import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import MemberBox from '../components/MemberBox';
import {Routes, Route, useNavigate, useNavigation} from 'react-router-dom';

const HostParty = () => {
    const navigate = useNavigate();

    const onStart = () => {
        navigate('/swiping');
    }

    return (
        <div>
            <Logo />
            <MemberBox/>
            <Button onClick={onStart}>Start Matching</Button>
        </div>
    );
};

export default HostParty;