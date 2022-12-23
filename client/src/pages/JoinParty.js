import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

import Logo from '../components/Logo';
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

    return (
		<div>
			<Logo />
			<Container>
				<Stack spacing={4}>
					<Input  
						placeholder='Party Code' 
						onChange={(event) => setCode(event.target.value)}
					/>
					<Input  
						placeholder='Nickname' 
						onChange={(event) => setNickname(event.target.value)}
					/>
					<Button variant="primary" onClick={() => navigateToMemberLobby()}>Join Party</Button>
					{errorMessage}
				</Stack>
			</Container>
		</div>
    );
};

export default JoinParty;