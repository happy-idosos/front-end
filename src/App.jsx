import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Outras rotas como placeholders por enquanto */}
        <Route path="/asilos" element={<div><h1>Página de Asilos</h1></div>} />
        <Route path="/eventos" element={<div><h1>Página de Eventos</h1></div>} />
        <Route path="/videos" element={<div><h1>Página de Vídeos</h1></div>} />
        <Route path="/sobre-nos" element={<div><h1>Sobre Nós</h1></div>} />
        <Route path="/contato" element={<div><h1>Contato</h1></div>} />
        <Route path="/cadastro-voluntario" element={<div><h1>Cadastro Voluntário</h1></div>} />
        <Route path="/cadastro-asilo" element={<div><h1>Cadastro Asilo</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;