import React from 'react';
import Button from '../components/Button';
import Logo from '../components/LogoAndWebsite';
import {Routes, Route, useNavigate, Navigate, Link} from 'react-router-dom';



const First = () => {
    const navigate = useNavigate();

    const navigateToHost = () => {
        navigate('/host');
    }

    const navigateToJoin = () => { 
        navigate('/joinParty'); 
    }

    return (
        <div>
            <Logo />
            <Button onClick={navigateToJoin} backgroundColor="#F0F0F0">Join Party</Button>
            <Button onClick={navigateToHost}>Create Party</Button>
        </div>
    );
};

export default First;