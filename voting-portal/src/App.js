import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VotingPortal from './VotingPortal';
import VotersPortal from './VotersPortal';

function App() {
  return (
    <BrowserRouter>
      <div>
      <Routes>
        <Route exact path="/" element={<VotingPortal />} />
        <Route path="/voters" element={<VotersPortal />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;