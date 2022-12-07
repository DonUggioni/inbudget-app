import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import AppContext from './components/store/AppContext';
import AuthContext from './components/store/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext>
        <AuthContext>
          <App />
        </AuthContext>
      </AppContext>
    </BrowserRouter>
  </React.StrictMode>
);
