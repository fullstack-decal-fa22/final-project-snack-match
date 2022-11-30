import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChakraProvider } from '@chakra-ui/react';

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from "./pages/First.js";
import Host from "./pages/Host.js";
import HostParty from "./pages/HostParty.js";
import JoinParty from "./pages/JoinParty.js";
import Party from "./pages/Party.js";
import Swiping from "./pages/Swiping.js";

function App() {
  const [expressCheck, setExpressCheck] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/testAPI`)
      .then((res) => {
        setExpressCheck(res.data);
        console.log(res.data);
      })
      .catch(() => setExpressCheck("Currently down."));
  }, []);

  return (
    <div>
      {/* TEST PAGES HERE: UNCOMMENT TO SEE A PAGE */}
      <First />
      <Host />
      <HostParty />
      <JoinParty />
      <Party/> */}
      <Swiping />

      {/* PAGE ROUTING */}
      {/* <ChakraProvider> */}
        {/* <Router>
          <div>
          <Routes>
            <Route exact path='/' element={<First />} />
            <Route path='/host' element={<Host />} />
            <Route path='/hostParty' element={<HostParty />} />
            <Route path='/joinParty' element={<JoinParty />} />
            <Route path='/party' element={<Party />} />
            <Route path='/swiping' element={<Swiping />} />
          </Routes>
          </div>
        </Router> */}
        {/* <Swiping/>
      </ChakraProvider> */}
    </div>
  );
}

export default App;
