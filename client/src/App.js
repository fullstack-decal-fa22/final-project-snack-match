import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { ChakraProvider } from '@chakra-ui/react';
import { BaseTheme } from "./styles/theme";

import Landing from "./pages/Landing.js";
import CreateParty from "./pages/CreateParty";
import JoinParty from "./pages/JoinParty.js";
import { GameContainer } from "./components/GameContainer";


function RequireLogin ({ children, redirectTo }) {
	const isConnected = useSelector((state) => state.user.isConnected);
	return isConnected ? children : <Navigate to={redirectTo} />
};

function App() {
  return (
	<div className='app'>
		<ChakraProvider theme={BaseTheme}>
			<Routes>
				<Route exact path='/' element={<Landing />} />
				<Route path='/create' element={<CreateParty />} />
				<Route path='/join' element={<JoinParty />} />
				{/* Protected Routes */}
				<Route path='*' element={
					<RequireLogin redirectTo='/'>
						<Routes>
							<Route path='/party/*' element={<GameContainer />} />
						</Routes>
					</RequireLogin>
				} />
        	</Routes>
		</ChakraProvider>
	</div>
  );
}

export default App;
