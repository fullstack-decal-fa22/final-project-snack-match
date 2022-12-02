import React, { useState } from 'react';
import StartPartyButton from '../components/StartPartyButton';
import Logo from '../components/LogoAndWebsite';
import NicknameBox from '../components/NicknameBox';
import {Routes, Route, useNavigate, useNavigation} from 'react-router-dom';
import DistanceFilter from '../components/DistanceFilter';
import PriceFilter from '../components/PriceFilter';
import InputBox from '../components/InputBox';

const Host = () => {

    const [ nicknameInput, setInput ] = useState("");

    return (
        <div>
            <Logo />
            <NicknameBox />
            <DistanceFilter />
            <PriceFilter />
            <StartPartyButton onClick={onStart}>Start Party</StartPartyButton>
            <InputBox input={nicknameInput} setInput={setInput} placeholder="Nickname"/>
            <StartPartyButton nickname={nicknameInput}>Start Party</StartPartyButton>
        </div>
    );
};

export default Host;