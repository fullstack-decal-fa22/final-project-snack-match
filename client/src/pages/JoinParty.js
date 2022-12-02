import React, { useState } from 'react';
import EnterButton from '../components/EnterButton';
import Logo from '../components/LogoAndWebsite';
import InputBox from '../components/InputBox';

const JoinParty = () => {

    const [ nicknameInput, setNameInput ] = useState("");
    const [ codeInput, setCodeInput ] = useState("");

    return (
        <div>
            <Logo />
            <InputBox input={codeInput} setInput={setCodeInput} placeholder="Party Code"/>
            <InputBox input={nicknameInput} setInput={setNameInput} placeholder="Nickname"/>
            <EnterButton nickname={nicknameInput} partyId={codeInput}>Enter</EnterButton>
        </div>
    );
};

export default JoinParty;