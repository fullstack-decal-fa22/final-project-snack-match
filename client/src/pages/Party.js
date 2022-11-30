import React from 'react';
import MemberBox from '../components/MemberBox';
import Logo from '../components/LogoAndWebsite';
import styles from "../components/WaitingText.module.css";

const Party = () => {
    return (
        <div>
            <Logo />
            <MemberBox/>
            <p className = {styles['text']}>Waiting for host to start...</p>
        </div>
    );
};

export default Party;