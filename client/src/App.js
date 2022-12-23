import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { BaseTheme } from "./styles/theme";

import Landing from "./pages/Landing.js";
import CreateParty from "./pages/CreateParty";
import JoinParty from "./pages/JoinParty.js";
import HostParty from "./pages/HostParty.js";
import Party from "./pages/Party.js";
import Restaurants from "./pages/Restaurants.js";
import Matched from "./pages/Matched.js";

function App() {

  return (
	<div className='app'>
		<ChakraProvider theme={BaseTheme}>
			<Routes>
				<Route exact path='/' element={<Landing />} />
				<Route path='/create' element={<CreateParty />} />
				<Route path='/join' element={<JoinParty />} />
				<Route path='/host-party' element={<HostParty />} />
				<Route path='/party' element={<Party />} />
				<Route path='/restaurants' element={<Restaurants />} />
				<Route path='/matched' element={<Matched />} />
			</Routes>
		</ChakraProvider>
	</div>
  );
}

export default App;
