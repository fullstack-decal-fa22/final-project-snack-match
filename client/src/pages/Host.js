import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import NicknameBox from '../components/NicknameBox';

const Host = () => {
    return (
        <div>
            <Logo />
            <NicknameBox/>
            <Button text = "Start Party" />
        </div>
    );
};

export default Host;