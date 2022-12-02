import React, {useState, useEffect} from 'react';
import StartMatchingButton from '../components/StartMatchingButton';
import Logo from '../components/LogoAndWebsite';
import siteStyles from '../components/LogoAndWebsite.module.css';
import MemberBox from '../components/MemberBox';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const HostParty = () => {
    const { state } = useLocation();
    const { nickname } = state;

    var [memberList, updateList] = useState([]);
    var [partyId, updateId] = useState(nickname);

    const populateList = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { nickname }})
            .then((data) => {
                updateId(data.data.partyId);
                updateList(data.data.partyMembers);
            })
            .catch((error) => console.log(error.response.data));
    };

    useEffect(() => {
        populateList();
    }, [])

    return (
        <div>
            <Logo />
            <h3 className = {siteStyles['site']}>Code: {partyId}</h3>
            <MemberBox memberList={memberList}/>
            <StartMatchingButton nickname={nickname} partyId={partyId}>Start Matching</StartMatchingButton>
        </div>
    );
};

export default HostParty;