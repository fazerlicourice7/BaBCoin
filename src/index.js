import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Login from 'components/login'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Login/>, serviceWorker.unregister());
