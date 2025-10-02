import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Asilos.css';

// Importações de bibliotecas
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Asilos() {
  // Estados para filtros e loading
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [distancia, setDistancia] = useState('25');
  const [atividade, setAtividade] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializa AOS e configura scroll navbar
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });

    const navbar = document.getElementById('mainNavbar');
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Simula busca de asilos (API)
  const buscarAsilos = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Buscando asilos com filtros:', { cidade, estado, distancia, atividade });
      // Aqui você pode atualizar estado com resultados reais da API
    }, 2000);
  };

  // Registra interesse de voluntário
  const interesseVoluntario = (asiloId) => {
    alert('Interesse registrado! Entraremos em contato em breve.');
    console.log('Interesse registrado para:', asiloId);
    // Aqui você pode fazer chamada API para registrar interesse
  };

  // Carregar mais asilos (placeholder)
  const carregarMaisAsilos = () => {
    console.log('Carregando mais asilos...');
    // Implemente paginação ou carregamento incremental aqui
  };

  return (
    <>
      <Header />

      <main>
        {/* Carousel */}
        <div
          id="carouselExampleCaptions"
          className="carousel slide hero-carousel"
          data-bs-ride="carousel"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="img/mulheres-trabalhando-juntas-no-campo (1).jpg"
                className="d-block w-100"
                alt="Encontre Asilos Próximos a Você"
              />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="carrossel">Encontre Asilos Próximos a Você</h2>
                <p>Conecte-se com instituições que precisam de voluntários na sua região.</p>
                <a href="#busca-asilos" className="btn btn-secondary">
                  Buscar Agora
                </a>
                <a href="eventos.html" className="btn btn-outline-light">
                  Ver eventos
                </a>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="img/enfermeira-examinando-mulher-idosa-ao-ar-livre-em-uma-casa-de-repouso.jpg"
                className="d-block w-100"
                alt="Faça a Diferença na Vida de Alguém"
              />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="carrossel">Faça a Diferença na Vida de Alguém</h2>
                <p>Descubra oportunidades de voluntariado em asilos da sua cidade.</p>
                <a href="cadastro-voluntario.html" className="btn btn-secondary">
                  Cadastrar-se
                </a>
                <a href="#asilos-proximos" className="btn btn-outline-light">
                  Ver asilos
                </a>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="img/mulheres-trabalhando-juntas-no-campo.jpg"
                className="d-block w-100"
                alt="Conectando Gerações"
              />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="carrossel">Conectando Gerações</h2>
                <p>Encontre o asilo ideal para compartilhar seus talentos e experiências.</p>
                <a href="#filtros-busca" className="btn btn-secondary">
                  Filtrar Busca
                </a>
                <a href="contato.html" className="btn btn-outline-light">
                  Fale conosco
                </a>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <hr className="divisor" />

        {/* Busca e filtros */}
        <section
          className="busca-asilos py-5"
          id="busca-asilos"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="container">
            <h2 className="text-center mb-4">Encontre Asilos Próximos</h2>
            <p className="text-center lead mb-5">
              Use nossa ferramenta de busca para encontrar asilos que precisam de voluntários na sua região.
            </p>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="search-container p-4 bg-light rounded-4 shadow-sm">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="cidade" className="form-label fw-bold">
                        Cidade
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cidade"
                        placeholder="Digite sua cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="estado" className="form-label fw-bold">
                        Estado
                      </label>
                      <select
                        className="form-select"
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      >
                        <option value="">Selecione o estado</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RS">Rio Grande do Sul</option>
                        {/* Mais estados podem ser adicionados */}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="distancia" className="form-label fw-bold">
                        Distância máxima
                      </label>
                      <select
                        className="form-select"
                        id="distancia"
                        value={distancia}
                        onChange={(e) => setDistancia(e.target.value)}
                      >
                        <option value="5">Até 5 km</option>
                        <option value="10">Até 10 km</option>
                        <option value="25">Até 25 km</option>
                        <option value="50">Até 50 km</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="atividade" className="form-label fw-bold">
                        Tipo de Atividade
                      </label>
                      <select
                        className="form-select"
                        id="atividade"
                        value={atividade}
                        onChange={(e) => setAtividade(e.target.value)}
                      >
                        <option value="">Todas as atividades</option>
                        <option value="musica">Música</option>
                        <option value="leitura">Leitura</option>
                        <option value="conversa">Conversação</option>
                        <option value="jogos">Jogos</option>
                        <option value="artesanato">Artesanato</option>
                      </select>
                    </div>
                    <div className="col-12 text-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg px-5"
                        id="btnBuscar"
                        onClick={buscarAsilos}
                        disabled={loading}
                      >
                        <i className="fas fa-search me-2"></i>
                        {loading ? 'Buscando...' : 'Buscar Asilos'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Asilos disponíveis */}
        <section
          className="asilos-section py-5"
          id="asilos-proximos"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="container">
            <h2 className="text-center mb-4">Asilos Disponíveis</h2>
            <p className="text-center text-muted mb-5">
              Instituições que estão buscando voluntários na sua região
            </p>

            {/* Loading indicator */}
            {loading && (
              <div className="loading-indicator text-center" id="loadingIndicator">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-2">Buscando asilos próximos...</p>
              </div>
            )}

            <div className="asilos-container" id="asilosContainer">
              {/* Cards estáticos - substitua por dados dinâmicos se desejar */}
              <div className="asilo-card" data-aos="zoom-in" data-aos-delay="100">
                <div className="asilo-header">
                  <h3>Lar Vicentino</h3>
                  <span className="badge bg-success">Ativo</span>
                </div>
                <div className="asilo-info">
                  <p>
                    <strong>
                      <i className="fas fa-map-marker-alt text-primary"></i> Local:
                    </strong>{' '}
                    São Paulo, SP - 2.5 km
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-info-circle text-primary"></i> Descrição:
                    </strong>{' '}
                    Entidade sem fins lucrativos, fundada em 1972 por um grupo de Vicentinos preocupados com idosos em situação de risco social e abandono.
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-hands-helping text-primary"></i> Precisamos de:
                    </strong>
                  </p>
                  <ul className="lista-atividades">
                    <li>
                      <i className="fas fa-utensils"></i> Mantimentos
                    </li>
                    <li>
                      <i className="fas fa-soap"></i> Materiais de limpeza e higiene
                    </li>
                    <li>
                      <i className="fas fa-gift"></i> Doações para bazar
                    </li>
                  </ul>
                </div>
                <div className="asilo-actions">
                  <a
                    href="https://www.larvicentino.org.br/"
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt me-1"></i>Ver Site
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={() => interesseVoluntario('lar-vicentino')}
                  >
                    <i className="fas fa-heart me-1"></i>Tenho Interesse
                  </button>
                </div>
              </div>

              <div className="asilo-card" data-aos="zoom-in" data-aos-delay="200">
                <div className="asilo-header">
                  <h3>Casa Luz do Caminho</h3>
                  <span className="badge bg-success">Ativo</span>
                </div>
                <div className="asilo-info">
                  <p>
                    <strong>
                      <i className="fas fa-map-marker-alt text-primary"></i> Local:
                    </strong>{' '}
                    São Paulo, SP - 4.1 km
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-info-circle text-primary"></i> Descrição:
                    </strong>{' '}
                    A "Casa Luz do Caminho" foi fundada em 08 de setembro de 1999, é uma Entidade civil beneficente, filantrópica, assistencial, educacional e cultural, sem fins lucrativos.
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-hands-helping text-primary"></i> Precisamos de:
                    </strong>
                  </p>
                  <ul className="lista-atividades">
                    <li>
                      <i className="fas fa-broom"></i> Itens de limpeza
                    </li>
                    <li>
                      <i className="fas fa-soap"></i> Itens de higiene
                    </li>
                    <li>
                      <i className="fas fa-utensils"></i> Mantimentos
                    </li>
                  </ul>
                </div>
                <div className="asilo-actions">
                  <a
                    href="https://casaluzdocaminho.org.br/"
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt me-1"></i>Ver Site
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={() => interesseVoluntario('casa-luz-caminho')}
                  >
                    <i className="fas fa-heart me-1"></i>Tenho Interesse
                  </button>
                </div>
              </div>

              <div className="asilo-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="asilo-header">
                  <h3>Casa Odina Lobo</h3>
                  <span className="badge bg-warning">Urgente</span>
                </div>
                <div className="asilo-info">
                  <p>
                    <strong>
                      <i className="fas fa-map-marker-alt text-primary"></i> Local:
                    </strong>{' '}
                    São Paulo, SP - 6.8 km
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-info-circle text-primary"></i> Descrição:
                    </strong>{' '}
                    É uma instituição de longa permanência para idosos (ILPI), sem fins lucrativos, fundada em 1950. Somos uma entidade totalmente Filantrópica.
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-hands-helping text-primary"></i> Precisamos de:
                    </strong>
                  </p>
                  <ul className="lista-atividades">
                    <li>
                      <i className="fas fa-donate"></i> Doações financeiras
                    </li>
                    <li>
                      <i className="fas fa-music"></i> Atividades musicais
                    </li>
                  </ul>
                </div>
                <div className="asilo-actions">
                  <a
                    href="https://casa.ondinalobo.org.br/"
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt me-1"></i>Ver Site
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={() => interesseVoluntario('casa-odina-lobo')}
                  >
                    <i className="fas fa-heart me-1"></i>Tenho Interesse
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-5">
              <button
                className="btn btn-outline-primary btn-lg"
                id="btnCarregarMais"
                onClick={carregarMaisAsilos}
                disabled={loading}
              >
                <i className="fas fa-plus me-2"></i>Carregar Mais Asilos
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta text-center py-5" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <h2>Seja a Mudança na Vida de Alguém!</h2>
            <p className="lead mb-4">
              Se você é um jovem artista, um bom ouvinte ou simplesmente quer dedicar um tempo para sorrir com um idoso, cadastre-se agora.
            </p>
            <div className="d-grid gap-2 d-md-block" data-aos="zoom-in" data-aos-delay="200">
              <a href="cadastrovoluntario.html" className="btn btn-secondary btn-lg me-md-2 mb-2">
                Cadastrar como Voluntário
              </a>
              <a href="cadastroasilo.html" className="btn btn-outline-light btn-lg mb-2">
                Cadastrar seu Asilo
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
