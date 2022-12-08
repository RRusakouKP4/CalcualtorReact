import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './navbar.scss';
import './back.scss';
import App from './App.js';
import NavBar from './NavBar.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <NavBar />
    <App />

  </React.StrictMode>,
);



