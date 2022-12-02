import "./App.css";
import React from "react";
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import First from "./pages/First.js";
import CreateParty from "./pages/CreateParty";
import HostParty from "./pages/HostParty.js";
import JoinParty from "./pages/JoinParty.js";
import Party from "./pages/Party.js";
import Swiping from "./pages/Swiping.js";
import Matched from "./pages/Matched.js";

function App() {

  return (
    <div>
      {/* TEST PAGES HERE: UNCOMMENT TO SEE A PAGE */}
      {/* <First />
      <Host />
      <HostParty />
      <JoinParty />
      <Party />
      <Swiping /> */}
      {/* <ChakraProvider>
        <Matched />
      </ChakraProvider> */}

      {/* PAGE ROUTING */}
      <ChakraProvider>
        <div>
          <Routes>
            <Route exact path='/' element={<First />} />
            <Route path='/host' element={<CreateParty />} />
            <Route path='/hostParty' element={<HostParty />} />
            <Route path='/joinParty' element={<JoinParty />} />
            <Route path='/party' element={<Party />} />
            <Route path='/swiping' element={<Swiping />} />
            <Route path='/matched' element={<Matched />} />
          </Routes>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
