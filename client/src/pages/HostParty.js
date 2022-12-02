import React from 'react';
import StartMatchingButton from '../components/StartMatchingButton';
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
            <StartMatchingButton onClick={navigateToSwiping}>Start Matching</StartMatchingButton>
        </div>
    );
};

export default HostParty;