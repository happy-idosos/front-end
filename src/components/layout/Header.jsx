import { useLocation, Link } from 'react-router-dom';

function Header() {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg transparent-header" id="mainNavbar">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="/img/happyidosos.png" alt="Logo Happy Idosos" style={{ height: '80px' }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/')}`} to="/">Início</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/asilos')}`} to="/asilos">Buscar Asilos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/eventos')}`} to="/eventos">Eventos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/videos')}`} to="/videos">Vídeos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/sobrenos')}`} to="/sobrenos">Sobre Nós</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/contato')}`} to="/contato">Contato</Link>
                            </li>
                        </ul>
                        <div className="d-flex flex-column flex-lg-row ms-lg-3 mt-3 mt-lg-0 gap-2">
                            <Link to="/loginvoluntario" className="btn btn-outline-primary">Login Voluntário</Link>
                            <Link to="/loginasilo" className="btn btn-outline-secondary">Login Asilo</Link>
                            <Link to="/cadastrovoluntario" className="btn btn-outline-primary">Fazer Parte - Voluntário</Link>
                            <Link to="/cadastroasilo" className="btn btn-primary">Fazer Parte - Asilo</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;