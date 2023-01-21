import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPartyId, setNickname, setConnection } from '../redux/user';
import axios from 'axios';

import { Container, Stack, Input, Button } from '@chakra-ui/react';

import Logo from '../components/Logo';
import Error from '../components/ErrorMessage';

function JoinParty() {

    let [ codeInput, setCodeInput ] = useState("");
    let [ nicknameInput, setNicknameInput ] = useState("");
    let [ errorMessage, setError ] = useState(null);

    const navigate = useNavigate();
	const dispatch = useDispatch();
    function navigateToMemberLobby() {
		let params = {
			nickname: nicknameInput,
			partyId: codeInput
		};
		axios
			.post('http://localhost:9000/party/join', params)
			.then(() => {
				dispatch(setPartyId(codeInput));
            	dispatch(setNickname(nicknameInput));
				dispatch(setConnection());
				navigate('/party')
			})
			.catch((error) => {
				console.log(error.response.data);
				setError(<Error message={error.response.data.message}/>)
			});
    };

    return (
		<div>
			<Logo />
			<Container>
				<Stack spacing={4}>
					<Input  
						placeholder='Party Code' 
						onChange={(event) => setCodeInput(event.target.value)}
					/>
					<Input  
						placeholder='Nickname' 
						onChange={(event) => setNicknameInput(event.target.value)}
					/>
					<Button variant="primary" onClick={() => navigateToMemberLobby()}>Join Party</Button>
					{errorMessage}
				</Stack>
			</Container>
		</div>
    );
};

export default JoinParty;