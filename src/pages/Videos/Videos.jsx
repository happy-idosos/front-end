import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Videos.css';

// Components


const Videos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("todos");
  const [currentSearch, setCurrentSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoPlayerModalRef = useRef(null);
  const uploadModalRef = useRef(null);
  const videoPlayerRef = useRef(null);

  const API_CONFIG = {
    BASE_URL: process.env.NODE_ENV === 'production' 
      ? "https://api.happyidosos.com.br" 
      : "http://localhost:3001",
    ENDPOINTS: {
      videos: "/api/videos",
      upload: "/api/videos/upload",
      categories: "/api/categories",
      stats: "/api/stats"
    },
    AUTH_TOKEN_KEY: "happyidosos_auth_token"
  };

  // Mock data para desenvolvimento
  const mockVideos = [
    {
      id: "1",
      title: "Atividades Recreativas no Asilo São José",
      description: "Momentos especiais durante as atividades de pintura e música com os residentes.",
      category: "atividades",
      author: "Maria Silva",
      createdAt: "2025-01-15T10:00:00Z",
      duration: 225,
      views: 1200,
      likes: 89,
      thumbnail: "/img/placeholder.jpg",
      videoUrl: "/videos/1.mp4",
    },
    {
      id: "2",
      title: "Festa de Aniversário - 90 Anos da Dona Rosa",
      description: "Celebração especial dos 90 anos da querida Dona Rosa com toda a família do lar.",
      category: "eventos",
      author: "João Santos",
      createdAt: "2025-01-12T14:30:00Z",
      duration: 312,
      views: 856,
      likes: 124,
      thumbnail: "/img/placeholder.jpg",
      videoUrl: "/videos/2.mp4",
    },
    {
      id: "3",
      title: "Depoimento: A Importância do Voluntariado",
      description: "Seu Antônio conta como o trabalho voluntário transformou sua vida no lar.",
      category: "depoimentos",
      author: "Ana Costa",
      createdAt: "2025-01-10T16:00:00Z",
      duration: 150,
      views: 2100,
      likes: 203,
      thumbnail: "/img/placeholder.jpg",
      videoUrl: "/videos/3.mp4",
    }
  ];

  useEffect(() => {
    loadVideos();
    loadStats();
    
    // Inicializar modais do Bootstrap
    if (window.bootstrap) {
      videoPlayerModalRef.current = new window.bootstrap.Modal(document.getElementById('videoPlayerModal'));
      uploadModalRef.current = new window.bootstrap.Modal(document.getElementById('uploadModal'));
    }
  }, []);

  const fetchVideos = async (page = 1, category = "todos", search = "") => {
    try {
      const params = new URLSearchParams({
        page: page,
        limit: 6,
        category: category !== "todos" ? category : "",
        search: search,
      });

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.videos}?${params}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro na API:", error);
      // Retorna dados mockados em caso de erro
      return getMockVideos(page, category, search);
    }
  };

  const getMockVideos = (page, category, search) => {
    let filteredVideos = mockVideos;

    if (category !== "todos") {
      filteredVideos = filteredVideos.filter(video => video.category === category);
    }

    if (search) {
      filteredVideos = filteredVideos.filter(
        video =>
          video.title.toLowerCase().includes(search.toLowerCase()) ||
          video.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    const paginatedVideos = filteredVideos.slice(startIndex, endIndex);

    return {
      videos: paginatedVideos,
      hasMore: endIndex < filteredVideos.length,
      totalPages: Math.ceil(filteredVideos.length / 6),
      currentPage: page,
    };
  };

  const loadVideos = async (reset = true) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const data = await fetchVideos(reset ? 1 : currentPage, currentCategory, currentSearch);

      if (reset) {
        setVideos(data.videos);
        setCurrentPage(1);
      } else {
        setVideos(prev => [...prev, ...data.videos]);
      }

      setHasMore(data.hasMore);
      if (!reset) {
        setCurrentPage(prev => prev + 1);
      }
    } catch (error) {
      showError("Erro ao carregar vídeos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreVideos = () => {
    setCurrentPage(prev => prev + 1);
    loadVideos(false);
  };

  const filterVideos = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
    loadVideos(true);
  };

  const searchVideos = (query) => {
    setCurrentSearch(query);
    setCurrentPage(1);
    loadVideos(true);
  };

  const openVideoPlayer = (video) => {
    setSelectedVideo(video);
    videoPlayerModalRef.current?.show();
    trackVideoView(video.id);
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    
    if (!isUserLoggedIn()) {
      showError("Você precisa estar logado para enviar vídeos.");
      return;
    }

    const formData = new FormData(e.target);
    
    try {
      setUploadProgress(0);
      // Simular upload
      for (let i = 0; i <= 100; i += 10) {
        setTimeout(() => setUploadProgress(i), i * 100);
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showSuccess("Vídeo enviado com sucesso! Aguarde a aprovação.");
      uploadModalRef.current?.hide();
      e.target.reset();
      loadVideos(true);
    } catch (error) {
      showError("Erro ao enviar vídeo. Tente novamente.");
    } finally {
      setUploadProgress(0);
    }
  };

  const validateVideoFile = (file) => {
    if (!file) return true;

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      showError("O arquivo é muito grande. Tamanho máximo: 100MB");
      return false;
    }

    const allowedTypes = ["video/mp4", "video/avi", "video/mov", "video/quicktime"];
    if (!allowedTypes.includes(file.type)) {
      showError("Formato de arquivo não suportado. Use MP4, AVI ou MOV.");
      return false;
    }

    return true;
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const showError = (message) => {
    alert(`Erro: ${message}`);
  };

  const showSuccess = (message) => {
    alert(`Sucesso: ${message}`);
  };

  const isUserLoggedIn = () => {
    return localStorage.getItem(API_CONFIG.AUTH_TOKEN_KEY) !== null;
  };

  const getAuthToken = () => {
    return localStorage.getItem(API_CONFIG.AUTH_TOKEN_KEY);
  };

  const trackVideoView = (videoId) => {
    fetch(`${API_CONFIG.BASE_URL}/api/videos/${videoId}/view`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    }).catch(error => console.error('Erro ao rastrear visualização:', error));
  };

  const loadStats = () => {
    // Implementar carregamento de estatísticas
  };

  return (
    <div className="videos-page">
      <Header />
      
      {/* Hero Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide hero-carousel" data-bs-ride="carousel" data-aos="fade-up" data-aos-duration="1200">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/mulheres-trabalhando-juntas-no-campo (1).jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Galeria de Vídeos da Comunidade</h2>
              <p>Compartilhe momentos especiais e inspire outras pessoas através dos vídeos da nossa comunidade de idosos</p>
              <a href="#videos-grid" className="btn btn-secondary">Ver Vídeos</a>
              <button className="btn btn-outline-light" onClick={() => uploadModalRef.current?.show()}>Enviar Vídeo</button>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/enfermeira-examinando-mulher-idosa-ao-ar-livre-em-uma-casa-de-repouso.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Momentos Inesquecíveis</h2>
              <p>Registre e compartilhe as atividades, eventos e depoimentos que fazem a diferença na vida dos idosos</p>
              <a href="#videos-grid" className="btn btn-secondary">Ver Vídeos</a>
              <button className="btn btn-outline-light" onClick={() => uploadModalRef.current?.show()}>Enviar Vídeo</button>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/mulheres-trabalhando-juntas-no-campo.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Conectando Gerações</h2>
              <p>Através dos vídeos, criamos pontes entre diferentes gerações e compartilhamos experiências valiosas</p>
              <a href="#videos-grid" className="btn btn-secondary">Ver Vídeos</a>
              <button className="btn btn-outline-light" onClick={() => uploadModalRef.current?.show()}>Enviar Vídeo</button>
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
        {/* Seção de Upload */}
        <section className="upload-section py-5" id="upload-section" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="mb-4">Compartilhe Seus Vídeos</h2>
                <p className="lead mb-4">Faça parte da nossa comunidade e compartilhe momentos especiais, atividades, eventos e depoimentos que inspiram e emocionam.</p>
                
                <div className="upload-card p-4 rounded-4 shadow-lg bg-white">
                  <div className="upload-area border-2 border-dashed rounded-3 p-5 mb-4">
                    <i className="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
                    <h4>Arraste seu vídeo aqui ou clique para selecionar</h4>
                    <p className="text-muted">Formatos aceitos: MP4, AVI, MOV (máx. 100MB)</p>
                    <button className="btn btn-primary btn-lg" onClick={() => uploadModalRef.current?.show()}>
                      <i className="fas fa-plus me-2"></i>Selecionar Vídeo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divisor" />

        {/* Seção de Filtros */}
        <section className="filtros py-4" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="filter-buttons">
                  <button 
                    className={`btn btn-filter ${currentCategory === "todos" ? "active" : ""}`}
                    onClick={() => filterVideos("todos")}
                  >
                    Todos
                  </button>
                  <button 
                    className={`btn btn-filter ${currentCategory === "atividades" ? "active" : ""}`}
                    onClick={() => filterVideos("atividades")}
                  >
                    Atividades
                  </button>
                  <button 
                    className={`btn btn-filter ${currentCategory === "eventos" ? "active" : ""}`}
                    onClick={() => filterVideos("eventos")}
                  >
                    Eventos
                  </button>
                  <button 
                    className={`btn btn-filter ${currentCategory === "depoimentos" ? "active" : ""}`}
                    onClick={() => filterVideos("depoimentos")}
                  >
                    Depoimentos
                  </button>
                  <button 
                    className={`btn btn-filter ${currentCategory === "tutoriais" ? "active" : ""}`}
                    onClick={() => filterVideos("tutoriais")}
                  >
                    Tutoriais
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="search-box">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar vídeos..." 
                    value={currentSearch}
                    onChange={(e) => searchVideos(e.target.value)}
                  />
                  <i className="fas fa-search search-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Vídeos */}
        <section className="videos-section py-5" id="videos-grid" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <div className="row" id="videosContainer">
              {videos.map((video, index) => (
                <div key={video.id} className="col-lg-4 col-md-6 mb-4 video-item" data-category={video.category}>
                  <div className="video-card" onClick={() => openVideoPlayer(video)}>
                    <div className="video-thumbnail">
                      <img 
                        src={video.thumbnail || "/img/placeholder.jpg"} 
                        alt={video.title} 
                        className="img-fluid"
                      />
                      <div className="play-overlay">
                        <i className="fas fa-play"></i>
                      </div>
                      <span className="video-duration">{formatDuration(video.duration)}</span>
                    </div>
                    <div className="video-info">
                      <h5 className="video-title">{video.title}</h5>
                      <p className="video-description">{video.description}</p>
                      <div className="video-meta">
                        <span className="video-author">Por: {video.author}</span>
                        <span className="video-date">{formatDate(video.createdAt)}</span>
                      </div>
                      <div className="video-stats">
                        <span><i className="fas fa-eye"></i> {formatNumber(video.views)} visualizações</span>
                        <span><i className="fas fa-heart"></i> {formatNumber(video.likes)} curtidas</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading indicator */}
            {isLoading && (
              <div className="text-center mt-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            )}

            {/* Load more button */}
            {hasMore && !isLoading && (
              <div className="text-center mt-4">
                <button className="btn btn-outline-primary btn-lg" onClick={loadMoreVideos}>
                  Carregar Mais Vídeos
                </button>
              </div>
            )}
          </div>
        </section>

        <hr className="divisor" />

        {/* Seção de estatísticas */}
        <section className="estatisticas py-5" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <h2 className="text-center mb-5">Estatísticas da Comunidade</h2>
            <div className="row text-center">
              <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="100">
                <div className="stat-card">
                  <div className="stat-number" id="totalVideos">150+</div>
                  <div className="stat-label">Vídeos Compartilhados</div>
                </div>
              </div>
              <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="200">
                <div className="stat-card">
                  <div className="stat-number" id="totalViews">25k+</div>
                  <div className="stat-label">Visualizações</div>
                </div>
              </div>
              <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="300">
                <div className="stat-card">
                  <div className="stat-number" id="totalLikes">3.2k+</div>
                  <div className="stat-label">Curtidas</div>
                </div>
              </div>
              <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="400">
                <div className="stat-card">
                  <div className="stat-number" id="activeUsers">80+</div>
                  <div className="stat-label">Usuários Ativos</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divisor" />

        {/* CTA Section */}
        <section className="cta text-center py-5" data-aos="fade-up" data-aos-duration="800">
          <div className="container">
            <h2>Compartilhe Seus Momentos</h2>
            <p className="lead mb-4">Faça parte da nossa comunidade e compartilhe vídeos que inspiram e emocionam.</p>
            <div className="d-grid gap-2 d-md-block" data-aos="zoom-in" data-aos-delay="200">
              <button className="btn btn-secondary btn-lg" onClick={() => uploadModalRef.current?.show()}>Enviar Vídeo</button>
              <Link to="/cadastrovoluntario" className="btn btn-outline-light btn-lg">Tornar-se Voluntário</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Modal de Upload de Vídeo */}
      <div className="modal fade" id="uploadModal" tabIndex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="uploadModalLabel">Enviar Novo Vídeo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="uploadForm" onSubmit={handleVideoUpload}>
                <div className="mb-3">
                  <label htmlFor="videoFile" className="form-label">Selecionar Vídeo</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="videoFile" 
                    accept="video/*" 
                    required 
                    onChange={(e) => validateVideoFile(e.target.files[0])}
                  />
                  <div className="form-text">Formatos aceitos: MP4, AVI, MOV. Tamanho máximo: 100MB</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="videoTitle" className="form-label">Título do Vídeo</label>
                  <input type="text" className="form-control" id="videoTitle" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="videoDescription" className="form-label">Descrição</label>
                  <textarea className="form-control" id="videoDescription" rows="3" required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="videoCategory" className="form-label">Categoria</label>
                  <select className="form-select" id="videoCategory" required>
                    <option value="">Selecione uma categoria</option>
                    <option value="atividades">Atividades</option>
                    <option value="eventos">Eventos</option>
                    <option value="depoimentos">Depoimentos</option>
                    <option value="tutoriais">Tutoriais</option>
                  </select>
                </div>
                {uploadProgress > 0 && (
                  <div className="mb-3">
                    <div className="progress">
                      <div 
                        className="progress-bar progress-bar-striped progress-bar-animated" 
                        role="progressbar" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-center">Enviando vídeo... {uploadProgress}%</p>
                  </div>
                )}
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-primary">
                    {uploadProgress > 0 ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Enviando...
                      </>
                    ) : (
                      "Enviar Vídeo"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal do Player de Vídeo */}
      <div className="modal fade" id="videoPlayerModal" tabIndex="-1" aria-labelledby="videoPlayerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videoPlayerModalLabel">Reproduzir Vídeo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
              {selectedVideo && (
                <>
                  <div className="video-player-container">
                    <video ref={videoPlayerRef} className="w-100" controls>
                      <source src={selectedVideo.videoUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                  <div className="video-details p-4">
                    <h4>{selectedVideo.title}</h4>
                    <p>{selectedVideo.description}</p>
                    <div className="video-actions mt-3">
                      <button className="btn btn-outline-primary btn-sm me-2">
                        <i className="fas fa-heart"></i> Curtir
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="fas fa-share"></i> Compartilhar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;