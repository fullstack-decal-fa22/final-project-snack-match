import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/LogoAndWebsite';
import JoinPartyInput from '../components/JoinPartyInput';
import Error from '../components/ErrorMessage';

const JoinParty = () => {

    const [ codeInput, setCode ] = useState("");
    const [ nicknameInput, setNickname ] = useState("");
    const [ errorMessage, setError ] = useState(null);

    const navigate = useNavigate();
  
    const navigateToMemberLobby = () => {
  
      const params = {
        nickname: nicknameInput,
        partyId: codeInput
      };
  
      axios
        .post('http://localhost:9000/party/join', params)
        .then(() => navigate('/party', { state: { nickname: nicknameInput }}))
        .catch((error) => {
          console.log(error.response.data);
          setError(<Error message={error.response.data.message}/>)
        });
    };
  
    const stateFuncs = { setCode, setNickname, navigateToMemberLobby };

    return (
        <div>
            <Logo />
            <JoinPartyInput {...stateFuncs}/>
            {errorMessage}
        </div>
    );
};

export default JoinParty;