import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Home.css';

// Importações de bibliotecas
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar imagens
import logo from '../../assets/img/happyidosos.png';
import carousel1 from '../../assets/img/mulheres-trabalhando-juntas-no-campo (1).jpg';
import carousel2 from '../../assets/img/enfermeira-examinando-mulher-idosa-ao-ar-livre-em-uma-casa-de-repouso.jpg';
import carousel3 from '../../assets/img/mulheres-trabalhando-juntas-no-campo.jpg';
import iconIdoso from '../../assets/img/idoso.png';
import iconEvento from '../../assets/img/evento-eleitoral-em-um-calendario-com-o-simbolo-de-estrela.png';
import iconAperto from '../../assets/img/aperto-de-mao.png';

function Home() {
  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.getElementById('mainNavbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Header */}
      <header>
        <nav className="navbar navbar-expand-lg transparent-header" id="mainNavbar">
          <div className="container">
            <Link className="navbar-brand" to="/" data-aos="fade-right" data-aos-duration="1000">
              <img src={logo} alt="Logo Happy Idosos" style={{ height: '80px' }} />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item"><Link className="nav-link active" to="/">Início</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/asilos">Buscar Asilos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/eventos">Eventos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/videos">Vídeos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/sobre-nos">Sobre Nós</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contato">Contato</Link></li>
              </ul>
              <div className="d-flex flex-column flex-lg-row ms-lg-3 mt-3 mt-lg-0 gap-2">
                <Link to="/cadastro-voluntario" className="btn btn-outline-primary">Fazer Parte - Voluntário</Link>
                <Link to="/cadastro-asilo" className="btn btn-primary">Fazer Parte - Asilo</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide hero-carousel" data-bs-ride="carousel" data-aos="fade-up" data-aos-duration="1200">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={carousel1} className="d-block w-100" alt="Voluntárias trabalhando" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carrossel">Conectando Voluntários e Idosos</h2>
              <p>O projeto Happy Idosos facilita o acesso entre voluntários e entidades...</p>
              <Link to="/asilos" className="btn btn-secondary">Encontrar Asilos</Link>
              <Link to="/eventos" className="btn btn-outline-light">Ver eventos</Link>
            </div>
          </div>
          <div className="carousel-item">
            <img src={carousel2} className="d-block w-100" alt="Cuidado com idosos" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carrossel">Conectando Voluntários e Idosos</h2>
              <p>O projeto Happy Idosos facilita o acesso entre voluntários e entidades...</p>
              <Link to="/asilos" className="btn btn-secondary">Encontrar Asilos</Link>
              <Link to="/eventos" className="btn btn-outline-light">Ver eventos</Link>
            </div>
          </div>
          <div className="carousel-item">
            <img src={carousel3} className="d-block w-100" alt="Trabalho em equipe" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carrossel">Conectando Voluntários e Idosos</h2>
              <p>O projeto Happy Idosos facilita o acesso entre voluntários e entidades...</p>
              <Link to="/asilos" className="btn btn-secondary">Encontrar Asilos</Link>
              <Link to="/eventos" className="btn btn-outline-light">Ver eventos</Link>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <hr className="divisor" />
      
      <main>
        {/* Section nossos serviços */}
        <section className="servicos py-5" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <h2 className="text-center mb-5">Nossos Serviços</h2>
            <div className="row">
              <div className="col-md-6 mb-4" data-aos="fade-right" data-aos-delay="100">
                <div className="service-card">
                  <div className="service-icon">
                    <img src={iconIdoso} alt="Voluntariado" width="60" />
                  </div>
                  <div className="service-content">
                    <h4>Programa de Voluntariado</h4>
                    <p>Conectamos pessoas dispostas a ajudar com asilos que precisam de apoio em atividades recreativas, educacionais e de cuidado.</p>
                    <Link to="/asilos" className="service-link">Saiba mais →</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4" data-aos="fade-left" data-aos-delay="200">
                <div className="service-card">
                  <div className="service-icon">
                    <img src={iconEvento} alt="Eventos" width="60" />
                  </div>
                  <div className="service-content">
                    <h4>Organização de Eventos</h4>
                    <p>Facilitamos a criação e divulgação de eventos especiais, festas temáticas e atividades culturais para os idosos.</p>
                    <Link to="/eventos" className="service-link">Saiba mais →</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4" data-aos="fade-right" data-aos-delay="300">
                <div className="service-card">
                  <div className="service-icon">
                    <img src={iconAperto} alt="Capacitação" width="60" />
                  </div>
                  <div className="service-content">
                    <h4>Capacitação de Voluntários</h4>
                    <p>Oferecemos treinamentos e orientações para voluntários sobre como interagir e cuidar melhor dos idosos.</p>
                    <Link to="/contato" className="service-link">Saiba mais →</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4" data-aos="fade-left" data-aos-delay="400">
                <div className="service-card">
                  <div className="service-icon">
                    <img src={logo} alt="Suporte" width="60" />
                  </div>
                  <div className="service-content">
                    <h4>Suporte às Instituições</h4>
                    <p>Auxiliamos asilos na gestão de voluntários, organização de atividades e melhoria da qualidade de vida dos residentes.</p>
                    <Link to="/contato" className="service-link">Saiba mais →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <hr className="divisor" />

        {/* Section como funciona */}
        <section className="como-funciona" data-aos="fade-up" data-aos-duration="800">
          <div className="container text-center py-5">
            <h2 className="mb-4">Como Funciona</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col" data-aos="zoom-in" data-aos-delay="100">
                <div className="card h-100 p-4">
                  <img src={iconIdoso} width="35px" alt="Ícone 1" className="mx-auto mb-3" />
                  <div className="card-body">
                    <h3 className="card-title">Encontre Asilos</h3>
                    <p className="card-text">Busque por casas de repouso e centros de atividades para idosos próximos a você.</p>
                  </div>
                </div>
              </div>
              <div className="col" data-aos="zoom-in" data-aos-delay="200">
                <div className="card h-100 p-4">
                  <img src={iconEvento} width="35px" alt="Ícone 2" className="mx-auto mb-3" />
                  <div className="card-body">
                    <h3 className="card-title">Participe de Eventos</h3>
                    <p className="card-text">Inscreva-se em eventos organizados pelas instituições e compartilhe seus talentos.</p>
                  </div>
                </div>
              </div>
              <div className="col" data-aos="zoom-in" data-aos-delay="300">
                <div className="card h-100 p-4">
                  <img src={iconAperto} width="35px" alt="Ícone 3" className="mx-auto mb-3" />
                  <div className="card-body">
                    <h3 className="card-title">Faça a Diferença</h3>
                    <p className="card-text">Crie conexões significativas e troque experiências valiosas com os idosos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <hr className="divisor" />
        
        {/* Section benefícios */}
        <section className="beneficios container py-5" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-center mb-4">Benefícios</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col" data-aos="fade-right" data-aos-delay="100">
              <div className="card h-100 p-4">
                <div className="card-body">
                  <h3 className="card-title">Para os Idosos</h3>
                  <ul>
                    <li>Maior interação social e redução da solidão</li>
                    <li>Acesso a atividades culturais e recreativas</li>
                    <li>Oportunidade de compartilhar conhecimentos e experiências</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col" data-aos="fade-left" data-aos-delay="200">
              <div className="card h-100 p-4">
                <div className="card-body">
                  <h3 className="card-title">Para os Voluntários</h3>
                  <ul>
                    <li>Experiência enriquecedora de troca intergeracional</li>
                    <li>Oportunidade de desenvolver habilidades sociais e empáticas</li>
                    <li>Satisfação pessoal por contribuir com uma causa social</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>  

        <hr className="divisor" />

        {/* Section encontre asilos */}
        <section className="localizacao bg-light py-5" data-aos="fade-up" data-aos-duration="800">
          <div className="container text-center">
            <h2 className="mb-4">Encontre Asilos Próximos a Você</h2>
            <p className="lead mb-5">Conectamos voluntários com asilos em todo o Brasil. Selecione seu estado e descubra oportunidades de voluntariado.</p>
            
            <div className="row">
              <div className="col-md-4 mb-3" data-aos="fade-up" data-aos-delay="100">
                <div className="region-card">
                  <h4>Região Sudeste</h4>
                  <div className="estados-grid">
                    <Link to="/asilos?estado=sp" className="estado-link">São Paulo <span className="badge">45</span></Link>
                    <Link to="/asilos?estado=rj" className="estado-link">Rio de Janeiro <span className="badge">32</span></Link>
                    <Link to="/asilos?estado=mg" className="estado-link">Minas Gerais <span className="badge">28</span></Link>
                    <Link to="/asilos?estado=es" className="estado-link">Espírito Santo <span className="badge">12</span></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3" data-aos="fade-up" data-aos-delay="200">
                <div className="region-card">
                  <h4>Região Nordeste</h4>
                  <div className="estados-grid">
                    <Link to="/asilos?estado=ba" className="estado-link">Bahia <span className="badge">18</span></Link>
                    <Link to="/asilos?estado=pe" className="estado-link">Pernambuco <span className="badge">15</span></Link>
                    <Link to="/asilos?estado=ce" className="estado-link">Ceará <span className="badge">12</span></Link>
                    <Link to="/asilos?estado=pb" className="estado-link">Paraíba <span className="badge">8</span></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3" data-aos="fade-up" data-aos-delay="300">
                <div className="region-card">
                  <h4>Região Sul</h4>
                  <div className="estados-grid">
                    <Link to="/asilos?estado=rs" className="estado-link">Rio Grande do Sul <span className="badge">22</span></Link>
                    <Link to="/asilos?estado=pr" className="estado-link">Paraná <span className="badge">19</span></Link>
                    <Link to="/asilos?estado=sc" className="estado-link">Santa Catarina <span className="badge">16</span></Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Link to="/asilos" className="btn btn-primary btn-lg">Ver Todos os Asilos</Link>
            </div>
          </div>
        </section>

        {/* Section integrantes */}
        <section className="integrantes container py-5" id="equipe" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-center mb-5">Nossa Equipe</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col" data-aos="flip-left" data-aos-delay="100">
              <div className="card h-100 p-4">
                <div className="card-body">
                  <h3 className="card-title">Equipe de Recursos Humanos</h3>
                  <p className="mb-3">Responsável pela gestão de voluntários, treinamentos e relacionamento com as instituições.</p>
                  <ul>
                    <li>Ana Caroline da Silva Santos</li>
                    <li>Evellyn Soares Ferreira</li>
                    <li>Giovanna Queiroz Carvalho</li>
                    <li>Heloisa Emanuele Gonçalves Godinho</li>
                    <li>Heloysa Beatriz Santos</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col" data-aos="flip-right" data-aos-delay="200">
              <div className="card h-100 p-4">
                <div className="card-body">
                  <h3 className="card-title">Equipe de Informática</h3>
                  <p className="mb-3">Responsável pelo desenvolvimento e manutenção da plataforma digital.</p>
                  <ul>
                    <li>Vinícius Araujo Ramos</li>
                    <li>Tiago de Carvalho Estrada</li>
                    <li>Lucas Martins Pereira</li>
                    <li>Pedro Henrique Assunção Medeiros</li>
                    <li>Wesley Mendes de Sousa</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section junte-se a nós */}
        <section className="cta text-center py-5" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <h2>Junte-se a Nós</h2>
            <p className="lead mb-4">Faça parte dessa iniciativa e nos ajude a transformar a vida dos idosos.</p>
            <div className="d-grid gap-2 d-md-block" data-aos="zoom-in" data-aos-delay="200">
              <Link to="/asilos" className="btn btn-secondary btn-lg">Encontrar Asilos</Link>
              <Link to="/contato" className="btn btn-outline-light btn-lg">Contate-nos</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3" data-aos="fade-up">
        <div className="container">
          <p className="mb-0">Happy Idosos &copy; 2025. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;