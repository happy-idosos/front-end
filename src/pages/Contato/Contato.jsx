// src/pages/Contato/Contato.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import './Contato.css';

// Importações de bibliotecas
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
    arquivo: null
  });

  const [fileName, setFileName] = useState('Nenhum arquivo escolhido');
  const carouselRef = useRef(null);

  // Inicializa AOS, Bootstrap Carousel e configura scroll navbar
  useEffect(() => {
    // Inicializa AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });

    // Inicializa Bootstrap Carousel manualmente
    if (carouselRef.current) {
      const carousel = new window.bootstrap.Carousel(carouselRef.current, {
        interval: 5000,
        wrap: true
      });
    }

    // Configura scroll navbar
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

  // Manipula mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manipula upload de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        arquivo: file
      }));
      setFileName(file.name);
    }
  };

  // Scroll para seção de contato
  const scrollToContato = (e) => {
    e.preventDefault();
    const contatoSection = document.getElementById('contato-form');
    if (contatoSection) {
      contatoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Envia o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    
    // Aqui você pode adicionar a lógica de envio para a API
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset do formulário
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      mensagem: '',
      arquivo: null
    });
    setFileName('Nenhum arquivo escolhido');
  };

  return (
    <>
      <Header />

      <main>
        {/* Carousel - IDENTICO ao HTML original */}
        <div
          ref={carouselRef}
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
                alt="Entre em Contato Conosco"
              />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="carrossel">Entre em Contato Conosco</h2>
                <p>Estamos aqui para ajudar você a conectar-se com asilos e fazer a diferença na vida dos idosos.</p>
                <button onClick={scrollToContato} className="btn btn-secondary">
                  Fale Conosco
                </button>
                <Link to="/asilos" className="btn btn-outline-light">
                  Buscar Asilos
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="img/enfermeira-examinando-mulher-idosa-ao-ar-livre-em-uma-casa-de-repouso.jpg"
                className="d-block w-100"
                alt="Suporte e Orientação"
              />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="carrossel">Suporte e Orientação</h2>
                <p>Nossa equipe está pronta para esclarecer suas dúvidas sobre voluntariado e parcerias.</p>
                <button onClick={scrollToContato} className="btn btn-secondary">
                  Fale Conosco
                </button>
                <Link to="/eventos" className="btn btn-outline-light">
                  Ver Eventos
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="img/mulheres-trabalhando-juntas-no-campo.jpg"
                className="d-block w-100"
                alt="Juntos Fazemos a Diferença"
              />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="carrossel">Juntos Fazemos a Diferença</h2>
                <p>Conte conosco para construir pontes entre voluntários e instituições de cuidado aos idosos.</p>
                <button onClick={scrollToContato} className="btn btn-secondary">
                  Fale Conosco
                </button>
                <Link to="/" className="btn btn-outline-light">
                  Página Inicial
                </Link>
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

        {/* Seção de Contato */}
        <section className="contato-section py-5" id="contato-form" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-xl-6">
                <div className="contato-header text-center mb-5">
                  <div className="contato-badge">
                    <span>CONTATO</span>
                  </div>
                  <h2 className="mt-4">Faça seu registro abaixo e entraremos em contato</h2>
                </div>
                
                <div className="contato-form-container">
                  <form className="contato-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nome completo"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group mb-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group mb-4">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group mb-4">
                      <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="form-group mb-4">
                      <div className="file-upload">
                        <input
                          type="file"
                          id="arquivo"
                          className="file-input"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="arquivo" className="file-label">
                          <span className="file-button">Escolher arquivo</span>
                          <span className="file-text">{fileName}</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button type="submit" className="btn-enviar">
                        ENVIAR
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}