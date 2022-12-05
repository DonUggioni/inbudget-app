import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import AppContext from './components/store/AppContext';
import AuthContext from './components/store/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContext>
      <AuthContext>
        <App />
      </AuthContext>
    </AppContext>
  </React.StrictMode>
);
