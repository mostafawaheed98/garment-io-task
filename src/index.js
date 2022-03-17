import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Importing CSS Files
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Importing JS Files
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

