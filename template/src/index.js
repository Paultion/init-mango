import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render((
  <HashRouter>
    <App/>
  </HashRouter>
), document.getElementById('root'));
