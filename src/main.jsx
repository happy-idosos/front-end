import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importar Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// REMOVER AOS daqui - será inicializado nos componentes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);