import React, {useState, useEffect} from 'react';
import StartMatchingButton from '../components/StartMatchingButton';
import Logo from '../components/LogoAndWebsite';
import siteStyles from '../components/LogoAndWebsite.module.css';
import MemberBox from '../components/MemberBox';
import {Routes, Route, useNavigate, useNavigation} from 'react-router-dom';
import axios from 'axios';

const HostParty = () => {
    const navigate = useNavigate();

    var [memberList, updateList] = useState([]);
    var [partyId, updateId] = useState("");

    const populateList = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { nickname: "ronnie5" }})
            .then((data) => {
                updateId(data.data.partyId);
                updateList(data.data.partyMembers);
            })
            .catch((error) => console.log(error.response.data));
    };

    useEffect(() => {
        populateList();
    }, [])

    const navigateToSwiping = () => {
        navigate('/swiping');
    }

    return (
        <div>
            <Logo />
            <h2 className = {siteStyles['site']}>Code: {partyId}</h2>
            <MemberBox memberList={memberList}/>
            <StartMatchingButton onClick={navigateToSwiping}>Start Matching</StartMatchingButton>
        </div>
    );
};

export default HostParty;