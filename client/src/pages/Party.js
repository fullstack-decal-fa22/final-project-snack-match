import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import MemberBox from '../components/MemberBox';
import Logo from '../components/LogoAndWebsite';
import siteStyles from '../components/LogoAndWebsite.module.css';
import styles from "../components/WaitingText.module.css";
import axios from 'axios';

const Party = (props) => {

    const { state } = useLocation();
    const { nickname } = state;

    var [memberList, updateList] = useState([]);
    var [partyId, updateId] = useState("");

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
            <p className = {styles['text']}>Waiting for host to start...</p>
        </div>
    );
};

export default Party;