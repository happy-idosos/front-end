import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Eventos.css';

// Importações de bibliotecas
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Eventos = () => {
    const navigate = useNavigate();
    
    // API Configuration
    const API_BASE_URL = "https://api.happyidosos.com"; // Substitua pela URL da sua API
    
    // State management
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    
    // Form state
    const [eventForm, setEventForm] = useState({
        title: '',
        category: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        contact: ''
    });

    // Refs
    const eventosSectionRef = useRef(null);

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
        
        loadEvents();
        loadStats();
    }, []);

    // Filter events when filters change
    useEffect(() => {
        filterEvents();
    }, [searchTerm, selectedCategory, selectedDate, allEvents]);

    // Load events from API
    const loadEvents = async (page = 1) => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            // Simulated API call - replace with actual API endpoint
            const response = await fetch(`${API_BASE_URL}/eventos?page=${page}&limit=12`);

            if (!response.ok) {
                throw new Error("Erro ao carregar eventos");
            }

            const data = await response.json();

            if (page === 1) {
                setAllEvents(data.events || []);
            } else {
                setAllEvents(prev => [...prev, ...(data.events || [])]);
            }

            setHasMore(data.hasMore || false);
            setCurrentPage(page);
        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
            loadMockEvents();
        } finally {
            setIsLoading(false);
        }
    };

    const loadMockEvents = () => {
        const categories = ["musica", "arte", "conversa", "exercicio", "culinaria"];
        const mockEvents = [];
        
        for (let i = 1; i <= 6; i++) {
            mockEvents.push({
                id: i,
                title: `Evento ${i}`,
                description: `Descrição do evento ${i}`,
                category: categories[i % categories.length],
                date: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                time: "14:00",
                location: `Local ${i}`,
                capacity: 30,
                registered: Math.floor(Math.random() * 25),
                status: "disponivel",
                organizer: `Organizador ${i}`,
                contact: `contato${i}@exemplo.com`
            });
        }

        setAllEvents(mockEvents);
    };

    // Filter events based on search and filters
    const filterEvents = () => {
        const filtered = allEvents.filter((event) => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = !selectedCategory || event.category === selectedCategory;

            let matchesDate = true;
            if (selectedDate) {
                const eventDate = new Date(event.date);
                const today = new Date();

                switch (selectedDate) {
                    case "hoje":
                        matchesDate = eventDate.toDateString() === today.toDateString();
                        break;
                    case "semana":
                        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                        matchesDate = eventDate >= today && eventDate <= weekFromNow;
                        break;
                    case "mes":
                        const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
                        matchesDate = eventDate >= today && eventDate <= monthFromNow;
                        break;
                }
            }

            return matchesSearch && matchesCategory && matchesDate;
        });

        setFilteredEvents(filtered);
    };

    // Load more events
    const loadMoreEvents = () => {
        loadEvents(currentPage + 1);
    };

    // Create new event
    const createEvent = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/eventos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventForm),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar evento");
            }

            const newEvent = await response.json();

            // Add to events list
            setAllEvents(prev => [newEvent, ...prev]);

            // Close modal and reset form
            setShowModal(false);
            setEventForm({
                title: '',
                category: '',
                description: '',
                date: '',
                time: '',
                location: '',
                capacity: '',
                contact: ''
            });

            // Show success message
            showSuccessMessage("Evento criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar evento:", error);
            showErrorMessage("Erro ao criar evento. Tente novamente.");
        }
    };

    // Subscribe to event
    const inscreverEvento = async (eventId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/eventos/${eventId}/inscricao`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao se inscrever no evento");
            }

            // Update event in local array
            setAllEvents(prev => prev.map(event => {
                if (event.id === eventId) {
                    const updatedRegistered = event.registered + 1;
                    const newStatus = updatedRegistered >= event.capacity ? "lotado" : "disponivel";
                    return {
                        ...event,
                        registered: updatedRegistered,
                        status: newStatus
                    };
                }
                return event;
            }));

            showSuccessMessage("Inscrição realizada com sucesso!");
        } catch (error) {
            console.error("Erro ao se inscrever:", error);
            showErrorMessage("Erro ao se inscrever. Tente novamente.");
        }
    };

    // Load statistics
    const loadStats = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/eventos/stats`);

            if (!response.ok) {
                throw new Error("Erro ao carregar estatísticas");
            }

            const stats = await response.json();
            // Implementar animação dos contadores se necessário
        } catch (error) {
            console.error("Erro ao carregar estatísticas:", error);
            // Fallback para dados mock se necessário
        }
    };

    // Utility functions
    const showCreateEventModal = () => {
        setShowModal(true);
    };

    const scrollToEvents = () => {
        eventosSectionRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const showSuccessMessage = (message) => {
        alert(message); // Substituir por toast/notification component
    };

    const showErrorMessage = (message) => {
        alert(message); // Substituir por toast/notification component
    };

    // Event card component
    const EventCard = ({ event }) => {
        const categoryIcons = {
            musica: "fas fa-music",
            arte: "fas fa-palette",
            conversa: "fas fa-comments",
            exercicio: "fas fa-dumbbell",
            culinaria: "fas fa-utensils",
        };

        const statusText = {
            disponivel: "Disponível",
            lotado: "Lotado",
            cancelado: "Cancelado",
        };

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        };

        const formatTime = (timeStr) => {
            return timeStr.substring(0, 5);
        };

        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card event-card">
                    <div className={`event-status ${event.status}`}>
                        {statusText[event.status]}
                    </div>
                    <div className="card-body text-center">
                        <div className="event-icon">
                            <i className={categoryIcons[event.category] || "fas fa-calendar"}></i>
                        </div>
                        <div className="event-category">
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </div>
                        <h3 className="event-title">{event.title}</h3>
                        <p className="event-description">{event.description}</p>
                        <ul className="event-details">
                            <li><i className="fas fa-calendar-days"></i> {formatDate(event.date)}</li>
                            <li><i className="fas fa-clock"></i> {formatTime(event.time)}</li>
                            <li><i className="fas fa-location-dot"></i> {event.location}</li>
                            <li><i className="fas fa-users"></i> {event.registered}/{event.capacity} inscritos</li>
                        </ul>
                        <button 
                            className="btn-inscricao" 
                            onClick={() => inscreverEvento(event.id)}
                            disabled={event.status === "lotado" || event.status === "cancelado"}
                        >
                            {event.status === "lotado"
                                ? "Evento Lotado"
                                : event.status === "cancelado"
                                ? "Evento Cancelado"
                                : "Inscrever-se"}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="eventos-page">
            <Header />
            
            {/* Carousel */}
            <div id="carouselExampleCaptions" className="carousel slide hero-carousel" data-bs-ride="carousel" data-aos="fade-up" data-aos-duration="1200">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/img/mulheres-trabalhando-juntas-no-campo (1).jpg" className="d-block w-100" alt="Voluntários em atividade" />
                        <div className="carousel-caption d-none d-md-block">
                            <h2>Eventos para Voluntários e Idosos</h2>
                            <p>Participe de eventos ou crie o seu próprio para promover a interação entre voluntários e idosos</p>
                            <button className="btn btn-secondary" onClick={showCreateEventModal}>Criar Evento</button>
                            <button className="btn btn-outline-light" onClick={scrollToEvents}>Ver Eventos</button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/img/enfermeira-examinando-mulher-idosa-ao-ar-livre-em-uma-casa-de-repouso.jpg" className="d-block w-100" alt="Cuidado com idosos" />
                        <div className="carousel-caption d-none d-md-block">
                            <h2>Conecte-se Através de Eventos</h2>
                            <p>Descubra oportunidades únicas de voluntariado e participe de atividades significativas</p>
                            <button className="btn btn-secondary" onClick={showCreateEventModal}>Criar Evento</button>
                            <button className="btn btn-outline-light" onClick={scrollToEvents}>Ver Eventos</button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/img/mulheres-trabalhando-juntas-no-campo.jpg" className="d-block w-100" alt="Trabalho em equipe" />
                        <div className="carousel-caption d-none d-md-block">
                            <h2>Faça a Diferença</h2>
                            <p>Organize eventos especiais e crie momentos inesquecíveis para nossa comunidade</p>
                            <button className="btn btn-secondary" onClick={showCreateEventModal}>Criar Evento</button>
                            <button className="btn btn-outline-light" onClick={scrollToEvents}>Ver Eventos</button>
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
                {/* Filtros e Busca */}
                <section className="eventos-filtros py-4" data-aos="fade-up" data-aos-duration="800">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="search-box">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Buscar eventos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <i className="fas fa-search search-icon"></i>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex gap-2 flex-wrap">
                                    <select 
                                        className="form-select"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Todas as categorias</option>
                                        <option value="musica">Música</option>
                                        <option value="arte">Arte</option>
                                        <option value="conversa">Conversa</option>
                                        <option value="exercicio">Exercício</option>
                                        <option value="culinaria">Culinária</option>
                                    </select>
                                    <select 
                                        className="form-select"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    >
                                        <option value="">Todas as datas</option>
                                        <option value="hoje">Hoje</option>
                                        <option value="semana">Esta semana</option>
                                        <option value="mes">Este mês</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Lista de Eventos */}
                <section className="eventos-lista py-5" id="eventosSection" ref={eventosSectionRef} data-aos="fade-up" data-aos-duration="800">
                    <div className="container">
                        <h2 className="text-center mb-5">Próximos Eventos</h2>
                        
                        {/* Loading spinner */}
                        {isLoading && (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Carregando...</span>
                                </div>
                            </div>
                        )}

                        {/* Container para os eventos */}
                        {!isLoading && filteredEvents.length > 0 && (
                            <div className="row">
                                {filteredEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        )}

                        {/* Mensagem quando não há eventos */}
                        {!isLoading && filteredEvents.length === 0 && (
                            <div className="text-center py-5">
                                <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                                <h4 className="text-muted">Nenhum evento encontrado</h4>
                                <p className="text-muted">Tente ajustar os filtros ou criar um novo evento.</p>
                            </div>
                        )}

                        {/* Botão carregar mais */}
                        {hasMore && (
                            <div className="text-center mt-4">
                                <button className="btn btn-outline-primary btn-lg" onClick={loadMoreEvents}>
                                    Carregar Mais Eventos
                                </button>
                            </div>
                        )}
                    </div>
                </section>  
            </main>

            {/* Modal para Criar Evento */}
            {showModal && (
                <div className="modal fade show" style={{display: 'block'}} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Criar Novo Evento</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => { e.preventDefault(); createEvent(); }}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="eventTitle" className="form-label">Título do Evento *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="eventTitle" 
                                                value={eventForm.title}
                                                onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                                                required 
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="eventCategory" className="form-label">Categoria *</label>
                                            <select 
                                                className="form-select" 
                                                id="eventCategory"
                                                value={eventForm.category}
                                                onChange={(e) => setEventForm({...eventForm, category: e.target.value})}
                                                required
                                            >
                                                <option value="">Selecione uma categoria</option>
                                                <option value="musica">Música</option>
                                                <option value="arte">Arte</option>
                                                <option value="conversa">Conversa</option>
                                                <option value="exercicio">Exercício</option>
                                                <option value="culinaria">Culinária</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="eventDescription" className="form-label">Descrição *</label>
                                        <textarea 
                                            className="form-control" 
                                            id="eventDescription" 
                                            rows="3"
                                            value={eventForm.description}
                                            onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="eventDate" className="form-label">Data *</label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                id="eventDate"
                                                value={eventForm.date}
                                                onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                                                required 
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="eventTime" className="form-label">Horário *</label>
                                            <input 
                                                type="time" 
                                                className="form-control" 
                                                id="eventTime"
                                                value={eventForm.time}
                                                onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8 mb-3">
                                            <label htmlFor="eventLocation" className="form-label">Local *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="eventLocation"
                                                value={eventForm.location}
                                                onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                                                required 
                                            />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="eventCapacity" className="form-label">Capacidade</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="eventCapacity" 
                                                min="1"
                                                value={eventForm.capacity}
                                                onChange={(e) => setEventForm({...eventForm, capacity: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="eventContact" className="form-label">Contato do Organizador *</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="eventContact"
                                            value={eventForm.contact}
                                            onChange={(e) => setEventForm({...eventForm, contact: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary">
                                            <i className="fas fa-plus me-2"></i>Criar Evento
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Eventos;