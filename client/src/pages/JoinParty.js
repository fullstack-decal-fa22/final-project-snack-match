import React from 'react';
import EnterButton from '../components/EnterButton';
import Logo from '../components/LogoAndWebsite';
import NicknameBox from '../components/NicknameBox';
import PartyCodeBox from '../components/PartyCodeBox';

const JoinParty = () => {
    return (
        <div>
            <Logo />
            <PartyCodeBox/>
            <NicknameBox/>
            <EnterButton nickname="ronnie5" partyId="CPLQDX">Enter</EnterButton>
        </div>
    );
};

export default JoinParty;