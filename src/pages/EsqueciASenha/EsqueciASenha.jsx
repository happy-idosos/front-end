import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './EsqueciASenha.css';

// Importações de bibliotecas
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EsquecidASenha = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        // Initialize AOS animations
        if (window.AOS) {
            window.AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação básica
        if (!email || !isValidEmail(email)) {
            showMessage('Por favor, digite um e-mail válido.', 'danger');
            return;
        }

        setLoading(true);

        try {
            // Aqui você fará a chamada para sua API
            const response = await fetch('/api/esqueci-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Token enviado com sucesso! Verifique seu e-mail.', 'success');
                setEmail('');
            } else {
                showMessage(data.message || 'Erro ao enviar token. Tente novamente.', 'danger');
            }
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Erro de conexão. Tente novamente mais tarde.', 'danger');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, 5000);
    };

    return (
        <div className="esquecid-a-senha">
            {/* Added back button like in cadastrovoluntario.html */}
            <button className="back-btn" onClick={handleBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m12 19-7-7 7-7"/>
                    <path d="M19 12H5"/>
                </svg>
                Voltar
            </button>

            <main>
                {/* Seção de Recuperação de Senha */}
                <section className="recuperacao-senha py-5" data-aos="fade-up" data-aos-duration="800">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-lg-5">
                                <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
                                    <div className="card-body p-5">
                                        <div className="text-center mb-4">
                                            <img src="/img/happyidosos.png" alt="Logo Happy Idosos" style={{ height: '60px' }} className="mb-3" />
                                            <h2 className="mb-2" style={{ color: '#244a96' }}>Esqueci a Senha</h2>
                                            <p className="text-muted">Digite seu e-mail para receber um token de recuperação</p>
                                        </div>
                                        
                                        <form onSubmit={handleSubmit} noValidate>
                                            <div className="mb-4">
                                                <label htmlFor="email" className="form-label fw-semibold">E-mail</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control form-control-lg" 
                                                    id="email" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required 
                                                    placeholder="Digite seu e-mail cadastrado"
                                                    style={{ borderRadius: '15px', border: '2px solid #e9ecef', padding: '15px' }}
                                                />
                                                <div className="invalid-feedback">
                                                    Por favor, digite um e-mail válido.
                                                </div>
                                            </div>
                                            
                                            <div className="d-grid mb-4">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary btn-lg"
                                                    disabled={loading}
                                                    style={{ borderRadius: '15px', padding: '15px', fontWeight: '600' }}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Enviando...
                                                        </>
                                                    ) : (
                                                        'Enviar Token'
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                        
                                        {/* Mensagem de sucesso/erro */}
                                        {message.text && (
                                            <div className={`alert alert-${message.type} mt-3`} role="alert">
                                                {message.text}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Seção de Instruções */}
                <section className="instrucoes py-5 bg-light" data-aos="fade-up" data-aos-duration="800">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="text-center">
                                    <h3 className="text-primary mb-4">Como funciona a recuperação?</h3>
                                    <div className="row">
                                        <div className="col-md-4 mb-3" data-aos="zoom-in" data-aos-delay="100">
                                            <div className="p-3">
                                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                                     style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>1</div>
                                                <h5>Digite seu e-mail</h5>
                                                <p className="text-muted">Informe o e-mail cadastrado em sua conta</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3" data-aos="zoom-in" data-aos-delay="200">
                                            <div className="p-3">
                                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                                     style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>2</div>
                                                <h5>Receba o token</h5>
                                                <p className="text-muted">Um código será enviado para seu e-mail</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3" data-aos="zoom-in" data-aos-delay="300">
                                            <div className="p-3">
                                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                                     style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>3</div>
                                                <h5>Redefina a senha</h5>
                                                <p className="text-muted">Use o token para criar uma nova senha</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer bg-dark text-white text-center py-3" data-aos="fade-up">
                <div className="container">
                    <p className="mb-0">Happy Idosos &copy; 2025. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default EsquecidASenha;