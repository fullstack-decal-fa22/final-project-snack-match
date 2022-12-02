import React, { useState } from 'react';
import StartPartyButton from '../components/StartPartyButton';
import Logo from '../components/LogoAndWebsite';
import InputBox from '../components/InputBox';

const Host = () => {

    const [ nicknameInput, setInput ] = useState("");

    return (
        <div>
            <Logo />
            <InputBox input={nicknameInput} setInput={setInput} placeholder="Nickname"/>
            <StartPartyButton nickname={nicknameInput}>Start Party</StartPartyButton>
        </div>
    );
};

export default Host;