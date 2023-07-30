import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestBoard from './pages/TestBoard';
import PVP from './pages/Modes/PVP';
import PvBot from './pages/Modes/PvBot';

const App = () => {

  return (
    <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/room/pvp' element={<PVP />} />
      <Route path='/room/pvb/:difficulty' element={<PvBot />} />
      <Route path='/room' element={<div>hi</div>} />
      <Route path='/board' element={<TestBoard />} />
    </Routes>
  )
}

export default App