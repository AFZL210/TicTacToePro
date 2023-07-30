import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GameContextProvider } from './providers/GameContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GameContextProvider>
      <App />
      </GameContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
