import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginVoluntario.css';

const LoginVoluntario = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateField = (name, value) => {
    let error = '';

    if (!value.trim()) {
      error = 'Este campo é obrigatório.';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Digite um e-mail válido.';
      }
    } else if (name === 'senha') {
      if (value.length < 6) {
        error = 'A senha deve ter pelo menos 6 caracteres.';
      }
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would normally send the data to your backend
      console.log('Login data:', formData);

      // Show success and redirect
      setTimeout(() => {
        // Redirect to dashboard or main page
        navigate('/dashboard'); // Adjust the route as needed
      }, 1500);

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrors({ submit: 'E-mail ou senha incorretos. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-voluntario">
      <button className="back-btn" onClick={handleBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Voltar
      </button>

      <div className="container">
        <div className="logo-section">
          <img src="/img/happyidosos.png" alt="Happy Idosos" className="logo" />
          <h1>Bem-vindo de volta!</h1>
          <p>Acesse sua conta e continue fazendo a diferença</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="login-form">
            {errors.submit && (
              <div className="alert alert-error fade-in">
                {errors.submit}
              </div>
            )}

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu e-mail"
                  className={errors.email ? 'error' : formData.email ? 'success' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="senha">Senha *</label>
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha"
                    className={errors.senha ? 'error' : formData.senha ? 'success' : ''}
                  />
                  <button 
                    type="button" 
                    className="toggle-password" 
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg className="eye-off-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.senha && <div className="error-message">{errors.senha}</div>}
              </div>

              <div className="forgot-password">
                <Link to="/esquecia-senha" className="link">Esqueceu sua senha?</Link>
              </div>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="btn-loading">
                  <div className="spinner"></div>
                  Entrando...
                </span>
              ) : (
                <span className="btn-text">Entrar</span>
              )}
            </button>
          </form>

          <div className="register-link">
            <p>Não tem conta? <Link to="/cadastro-voluntario" className="link">Cadastre-se aqui</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginVoluntario;