import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import NicknameBox from '../components/NicknameBox';
import PartyCodeBox from '../components/PartyCodeBox';

const JoinParty = () => {
    return (
        <div>
            <Logo />
            <PartyCodeBox/>
            <NicknameBox/>
            <Button text = "Enter" />
        </div>
    );
};

export default JoinParty;