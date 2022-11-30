import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import MemberBox from '../components/MemberBox';

const HostParty = () => {
    return (
        <div>
            <Logo />
            <MemberBox/>
            <Button text = "Start Matching" />
        </div>
    );
};

export default HostParty;