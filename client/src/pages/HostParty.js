import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import MemberBox from '../components/MemberBox';
import {Routes, Route, useNavigate, useNavigation} from 'react-router-dom';

const HostParty = () => {
    const navigate = useNavigate();

    const navigateToSwiping = () => {
        navigate('/swiping');
    }

    return (
        <div>
            <Logo />
            <MemberBox/>
            <Button onClick={navigateToSwiping}>Start Matching</Button>
        </div>
    );
};

export default HostParty;