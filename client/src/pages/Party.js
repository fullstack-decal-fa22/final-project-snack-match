import React, {useEffect, useState} from 'react';
import MemberBox from '../components/MemberBox';
import Logo from '../components/LogoAndWebsite';
import styles from "../components/WaitingText.module.css";
import axios from 'axios';

const Party = (props) => {

    var [memberList, updateList] = useState([]);

    const populateList = () => {
        axios
            .get('http://localhost:9000/party/info', { params: { nickname: "ronnie5" }})
            .then((data) => {
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
            <MemberBox memberList={memberList}/>
            <p className = {styles['text']}>Waiting for host to start...</p>
        </div>
    );
};

export default Party;