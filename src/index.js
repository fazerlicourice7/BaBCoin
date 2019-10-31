import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Login from './components/login'
import LandingPage from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<LandingPage />, serviceWorker.unregister());
