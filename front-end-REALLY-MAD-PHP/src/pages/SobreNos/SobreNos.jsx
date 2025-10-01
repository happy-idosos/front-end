import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SobreNos.css';

// Componentes de layout que devem ser importados
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const SobreNos = () => {
  useEffect(() => {
    // Initialize AOS
    if (window.AOS) {
      window.AOS.init();
    }

    // Carousel functionality
    class TeamCarousel {
      constructor(carouselId, trackId, prevBtnId, nextBtnId) {
        this.carousel = document.getElementById(carouselId);
        this.track = document.getElementById(trackId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.cards = this.track.querySelectorAll('.perfil-card');
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        
        this.init();
        this.updateButtons();
        
        window.addEventListener('resize', () => {
          this.cardsPerView = this.getCardsPerView();
          this.currentIndex = Math.min(this.currentIndex, this.cards.length - this.cardsPerView);
          this.updateCarousel();
          this.updateButtons();
        });
      }
      
      getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 991) return 2;
        return 3;
      }
      
      init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
      }
      
      prev() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.updateCarousel();
          this.updateButtons();
        }
      }
      
      next() {
        if (this.currentIndex < this.cards.length - this.cardsPerView) {
          this.currentIndex++;
          this.updateCarousel();
          this.updateButtons();
        }
      }
      
      updateCarousel() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 20;
        const translateX = -(this.currentIndex * (cardWidth + gap));
        this.track.style.transform = `translateX(${translateX}px)`;
      }
      
      updateButtons() {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.cards.length - this.cardsPerView;
      }
    }

    // Initialize carousels
    const rhCarousel = new TeamCarousel('rhCarousel', 'rhTrack', 'rhPrev', 'rhNext');
    const itCarousel = new TeamCarousel('itCarousel', 'itTrack', 'itPrev', 'itNext');

    return () => {
      // Cleanup event listeners if needed
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div className="sobre-nos">
      <Header />
      
      {/* Carrossel */}
      <div id="carouselExampleCaptions" className="carousel slide hero-carousel" data-bs-ride="carousel" data-bs-interval="3000" data-aos="fade-up" data-aos-duration="1200">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/mulheres-trabalhando-juntas-no-campo (1).jpg" className="d-block w-100" alt="Nossa História" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carrossel">Nossa História</h2>
              <p>Conheça a trajetória do Happy Idosos e nossa missão de conectar gerações...</p>
              <a href="#historia" className="btn btn-secondary">Nossa História</a>
              <a href="#equipe" className="btn btn-outline-light">Conheça a Equipe</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/enfermeira-examinando-mulher-idosa-ao-ar-livre-em-uma-casa-de-repouso.jpg" className="d-block w-100" alt="Nossa Missão" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carrossel">Nossa Missão</h2>
              <p>Promover o bem-estar dos idosos através do voluntariado e conexões humanas...</p>
              <a href="#missao" className="btn btn-secondary">Nossa Missão</a>
              <a href="#valores" className="btn btn-outline-light">Nossos Valores</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/mulheres-trabalhando-juntas-no-campo.jpg" className="d-block w-100" alt="Nosso Impacto" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carrossel">Nosso Impacto</h2>
              <p>Veja os resultados do nosso trabalho e como estamos transformando vidas...</p>
              <Link to="/contato" className="btn btn-outline-light">Fale Conosco</Link>
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
        {/* Seção História detalhada */}
        <section className="historia bg-light py-5" id="historia" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <h2 className="text-center mb-5">História do Projeto</h2>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <p>O Happy Idosos nasceu em 2023 com o Grupo de Recursos Humanos da Etec Profª Maria Cristina Medeiros. A ideia surgiu da observação das dificuldades enfrentadas por idosos em instituições de longa permanência, especialmente a solidão e a carência de vínculos afetivos. Desde o início, o projeto se propôs a refletir sobre formas de integração entre gerações, reconhecendo o valor da escuta, da convivência e do afeto como ferramentas de transformação social.</p>
                
                <p>Em 2025, o projeto ganhou força ao se conectar com os alunos da equipe de Técnico em Informática, que trouxeram a contribuição tecnológica necessária para ampliar o alcance da iniciativa por meio da internet. Essa união interdisciplinar entre Recursos Humanos e Informática possibilitou não apenas discutir o aspecto humano da questão, mas também construir uma solução prática e inovadora: o desenvolvimento de uma aplicação digital voltada à interação entre jovens e idosos.</p>
                
                <p>Antes disso, foi realizada uma pesquisa de campo com alunos e professores da Etec Profª Maria Cristina Medeiros, que contribuíram com opiniões diversas sobre o tema da interação intergeracional. A pluralidade das respostas, oriunda de diferentes faixas etárias, enriqueceu significativamente a construção do projeto, proporcionando um panorama mais amplo sobre as percepções juvenis a respeito dos idosos institucionalizados.</p>
                
                <p>A problemática principal que orientou todo o processo foi a carência de vínculos afetivos vivida pelos idosos em instituições de longa permanência. A ausência de contato significativo com outras gerações revelou a necessidade de criar espaços de diálogo e troca, onde a juventude pudesse contribuir com acolhimento, atenção e voluntariado, ao mesmo tempo em que aprendia com as experiências e histórias dos mais velhos.</p>
                
                <p>Para dar sustentação ao projeto, três vertentes metodológicas foram fundamentais: a investigação teórica (bibliográfica e exploratória), a observação direta da realidade (pesquisa de campo, incluindo visitas a asilos) e a experimentação prática por meio do desenvolvimento da aplicação digital. Essa combinação permitiu unir teoria e prática, sensibilidade social e inovação tecnológica, consolidando o Happy Idosos como uma proposta de impacto real e transformador.</p>
              </div>
            </div>
          </div>
        </section>
        <hr className="divisor" />
        
        {/* Seção de perfis individuais dos integrantes com carousels */}
        <section className="perfis-individuais py-5" id="perfis" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <h2 className="text-center mb-5">Conheça Nossa Equipe</h2>
            <p className="text-center text-muted mb-5">Cada membro traz sua expertise única para tornar o Happy Idosos uma realidade</p>
            
            {/* Carousel para Equipe de Recursos Humanos */}
            <div className="mb-5">
              <h3 className="text-center mb-4" style={{color: '#244a96'}}>Equipe de Recursos Humanos</h3>
              <div className="team-carousel-container">
                <div className="team-carousel" id="rhCarousel">
                  <div className="carousel-track" id="rhTrack">
                    {/* Perfil cards RH - repetindo estrutura do original */}
                    <div className="perfil-card">
                      <div className="perfil-image">
                        <img src="/img/sobrenos_integrantes/Ana Caroline.jpeg" alt="Ana Caroline da Silva Santos" className="img-fluid" />
                      </div>
                      <div className="perfil-content">
                        <h4>Ana Caroline da Silva Santos</h4>
                        <p className="perfil-role">Gestão de Voluntários</p>
                        <p className="perfil-description">Especialista em coordenação de equipes e desenvolvimento de programas de voluntariado.</p>
                        <div className="perfil-social">
                          <a href="https://www.instagram.com/anacarolinessz_" className="social-link" aria-label="Instagram de Ana Caroline">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Repetir para os outros membros da equipe RH */}
                    <div className="perfil-card">
                      <div className="perfil-image">
                        <img src="/img/sobrenos_integrantes/Evellyn Soares.png" alt="Evellyn Soares Ferreira" className="img-fluid" />
                      </div>
                      <div className="perfil-content">
                        <h4>Evellyn Soares Ferreira</h4>
                        <p className="perfil-role">Treinamento e Capacitação</p>
                        <p className="perfil-description">Responsável pelo desenvolvimento de programas de treinamento para voluntários.</p>
                        <div className="perfil-social">
                          <a href="https://www.instagram.com/s.evellyn._" className="social-link" aria-label="Instagram de Evellyn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Adicionar os outros membros seguindo o mesmo padrão */}
                  </div>
                </div>
                <div className="carousel-controls">
                  <button className="carousel-btn" id="rhPrev" aria-label="Anterior">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                  <button className="carousel-btn" id="rhNext" aria-label="Próximo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel para Equipe de Informática */}
            <div className="mb-5">
              <h3 className="text-center mb-4" style={{color: '#244a96'}}>Equipe de Informática</h3>
              <div className="team-carousel-container">
                <div className="team-carousel" id="itCarousel">
                  <div className="carousel-track" id="itTrack">
                    {/* Perfil cards TI - seguindo mesmo padrão */}
                    <div className="perfil-card">
                      <div className="perfil-image">
                        <img src="/img/sobrenos_integrantes/Lucas Martins.jpeg" alt="Lucas Martins Pereira" className="img-fluid" />
                      </div>
                      <div className="perfil-content">
                        <h4>Lucas Martins Pereira</h4>
                        <p className="perfil-role">Desenvolvedor Frontend</p>
                        <p className="perfil-description">Especialista em interfaces de usuário e experiência do usuário.</p>
                        <div className="perfil-social">
                          <a href="https://www.instagram.com/__martins_lucass" className="social-link" aria-label="Instagram de Lucas">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                          <a href="#" className="social-link" aria-label="LinkedIn de Lucas">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Adicionar os outros membros de TI seguindo o mesmo padrão */}
                  </div>
                </div>
                <div className="carousel-controls">
                  <button className="carousel-btn" id="itPrev" aria-label="Anterior">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                  <button className="carousel-btn" id="itNext" aria-label="Próximo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="divisor" />

        {/* Seção Equipe detalhada */}
        <section className="integrantes container py-5" id="equipe" data-aos="fade-up" data-aos-duration="800">
          <div className="text-center mt-5" data-aos="zoom-in" data-aos-delay="300">
            <img src="/img/equipefoto.jpg" alt="Equipe Happy Idosos" className="img-fluid rounded" />
            <p className="mt-3 text-muted">Nossa equipe multidisciplinar trabalhando juntos para transformar vidas</p>
          </div>
        </section>
        <hr className="divisor" />

        {/* Seção Missão, Visão e Valores */}
        <section className="missao-visao-valores bg-light py-5" id="missao" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100">
                <div className="card h-100 text-center p-4">
                  <div className="card-body">
                    <div className="mb-3">
                      <i className="fas fa-bullseye fa-3x text-primary"></i>
                    </div>
                    <h3 className="card-title">Nossa Missão</h3>
                    <p className="card-text">Conectar voluntários jovens com idosos em asilos, promovendo interações significativas que enriquecem a vida de ambas as gerações através de tecnologia acessível e humanizada.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
                <div className="card h-100 text-center p-4">
                  <div className="card-body">
                    <div className="mb-3">
                      <i className="fas fa-eye fa-3x text-primary"></i>
                    </div>
                    <h3 className="card-title">Nossa Visão</h3>
                    <p className="card-text">Ser a principal plataforma de conexão intergeracional no Brasil, transformando a realidade dos idosos institucionalizados e criando uma sociedade mais empática e conectada.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                <div className="card h-100 text-center p-4">
                  <div className="card-body">
                    <div className="mb-3">
                      <i className="fas fa-heart fa-3x text-primary"></i>
                    </div>
                    <h3 className="card-title">Nossos Valores</h3>
                    <ul className="list-unstyled text-start">
                      <li><strong>Empatia:</strong> Compreender e valorizar cada história</li>
                      <li><strong>Respeito:</strong> Dignidade em todas as interações</li>
                      <li><strong>Inovação:</strong> Tecnologia a serviço do humano</li>
                      <li><strong>Transparência:</strong> Processos claros e confiáveis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divisor" />
      </main>

      <Footer />
    </div>
  );
};

export default SobreNos;