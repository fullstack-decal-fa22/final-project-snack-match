import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';

const First = () => {
    return (
        <div>
            <Logo />
            <Button backgroundColor= "gray" text = "Join Party"/>
            <Button text = "Create Party" />
        </div>
    );
};

export default First;