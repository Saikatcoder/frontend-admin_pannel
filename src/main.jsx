import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ yeh import zaruri hai
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>   {/* ✅ yeh wrapper lagao */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
