import { Routes, Route } from 'react-router-dom';

// Import das páginas
import Home from '../pages/Home/Home';
import Asilos from '../pages/Asilos/Asilos';
import CadastroAsilo from '../pages/CadastroAsilo/CadastroAsilo';
import CadastroVoluntario from '../pages/CadastroVoluntario/CadastroVoluntario';
import Contato from '../pages/Contato/Contato';
import EsqueciASenha from '../pages/EsqueciASenha/EsqueciASenha';
import Eventos from '../pages/Eventos/Eventos';
import LoginAsilo from '../pages/LoginAsilo/LoginAsilo';
import LoginVoluntario from '../pages/LoginVoluntario/LoginVoluntario';
import SobreNos from '../pages/SobreNos/SobreNos';
import Videos from '../pages/Videos/Videos';

function AppRoutes() {
    return (
        <Routes>
            {/* Rota principal */}
            <Route path="/" element={<Home />} />
            
            {/* Rotas principais do site */}
            <Route path="/asilos" element={<Asilos />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/sobrenos" element={<SobreNos />} />
            <Route path="/contato" element={<Contato />} />
            
            {/* Rotas de cadastro */}
            <Route path="/cadastroasilo" element={<CadastroAsilo />} />
            <Route path="/cadastrovoluntario" element={<CadastroVoluntario />} />
            
            {/* Rotas de login */}
            <Route path="/loginasilo" element={<LoginAsilo />} />
            <Route path="/loginvoluntario" element={<LoginVoluntario />} />
            
            {/* Rota de recuperação de senha */}
            <Route path="/esqueciasenha" element={<EsqueciASenha />} />
        </Routes>
    );
}

export default AppRoutes;