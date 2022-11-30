import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import InputTextBox from '../components/InputTextBox';

const JoinParty = () => {
    return (
        <div>
            <Logo />
            <InputTextBox/>
            <Button text = "Enter" />
        </div>
    );
};

export default JoinParty;