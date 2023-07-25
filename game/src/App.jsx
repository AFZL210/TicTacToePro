import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/room' element={<div>hi</div>} />
    </Routes>
  )
}

export default App