import React, { useState } from 'react';
import StartPartyButton from '../components/StartPartyButton';
import Logo from '../components/LogoAndWebsite';
import DistanceFilter from '../components/DistanceFilter';
import PriceFilter from '../components/PriceFilter';
import InputBox from '../components/InputBox';

const Host = () => {

    const [ nicknameInput, setNickname ] = useState("");
    const [ distanceInput, setDistance ] = useState(5);
    const [ priceList, setPrice ] = useState([1, 2, 3, 4]);

    return (
        <div>
            <Logo />
            <InputBox input={nicknameInput} setInput={setNickname} placeholder="Nickname" />
            <DistanceFilter setDistance={setDistance}/>
            <PriceFilter setPrice={setPrice} />
            <StartPartyButton nickname={nicknameInput} distance={distanceInput} priceList={priceList}>Start Party</StartPartyButton>
        </div>
    );
};

export default Host;