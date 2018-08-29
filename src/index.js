import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Register service worker to cache responses to request for assets for offline use
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root'));
registerServiceWorker();
