import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPartyId, setNickname, setConnection } from '../redux/user';
import axios from 'axios';

import { Stack, Input, Button } from '@chakra-ui/react';

import Logo from '../components/Logo';
import Error from '../components/ErrorMessage';

function JoinParty() {

    let [ codeInput, setCodeInput ] = useState("");
    let [ nicknameInput, setNicknameInput ] = useState("");
    let [ errorMessage, setError ] = useState(null); 
	let [ isLoading, setLoading ] = useState(false);

    const navigate = useNavigate();
	const dispatch = useDispatch();

    function joinParty() {
		setLoading(true);
		let params = {
			nickname: nicknameInput,
			partyId: codeInput
		};
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/party/join`, params)
			.then(() => {
				dispatch(setPartyId(codeInput));
            	dispatch(setNickname(nicknameInput));
				dispatch(setConnection());
				navigate('/party')
			})
			.catch((error) => {
				console.log(error.response.data);
				setLoading(false);
				setError(<Error message={error.response.data.message}/>)
			});
    };

    return (
		<div className='main'>
			<Stack 
				width='100%'
				spacing={4}
				display='flex'
				alignItems='center'
			>	
				<Logo />
				<Input  
					placeholder='Party Code' 
					onChange={(event) => setCodeInput(event.target.value)}
				/>
				<Input  
					placeholder='Nickname' 
					onChange={(event) => setNicknameInput(event.target.value)}
				/>
				<Button 
					variant="primary" 
					onClick={() => joinParty()}
					isLoading={isLoading}
				>
					Join Party
				</Button>
				{errorMessage}
			</Stack>
		</div>
    );
};

export default JoinParty;