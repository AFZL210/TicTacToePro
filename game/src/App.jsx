import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestBoard from './pages/TestBoard';
import PVP from './pages/Modes/PVP';
import PvBot from './pages/Modes/PvBot';
import { useSocket } from './providers/SocketProvider';

const App = () => {

  const { socket } = useSocket()

  useEffect(() => {
    socket.on("new", (data) => console.log(data));
  }, [socket])

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