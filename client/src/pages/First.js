import React from 'react';
import CreatePartyButton from '../components/CreatePartyButton';
import JoinPartyButton from '../components/JoinPartyButton';
import Logo from '../components/LogoAndWebsite';


const First = () => {
    return (
        <div>
            <Logo />
            <JoinPartyButton backgroundColor="#F0F0F0">Join Party</JoinPartyButton>
            <CreatePartyButton>Create Party</CreatePartyButton>
        </div>
    );
};

export default First;