// src/pages/CadastroAsilo/CadastroAsilo.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 🎯 IMPORTS CORINGA - COPIE E COLE ESTA SEÇÃO
// ============================================
// Componentes de Layout
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// CSS da Página
import './CadastroAsilo.css';

// CSS Global e Bibliotecas
import '../../assets/css/global.css'; // Se tiver um CSS global
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; // Para animações

// Bibliotecas JavaScript
import AOS from 'aos';
// ============================================

// Importar imagens
import logo from '../../assets/img/happyidosos.png';

export default function CadastroAsilo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    email: '',
    senha: '',
    termos: false
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    // Inicializa animações
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // Função para voltar
  const handleBack = () => {
    navigate(-1);
  };

  // Máscaras de input
  const applyCnpjMask = (value) => {
    let maskedValue = value.replace(/\D/g, "");
    if (maskedValue.length <= 14) {
      maskedValue = maskedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
    return maskedValue;
  };

  const applyPhoneMask = (value) => {
    let maskedValue = value.replace(/\D/g, "");
    if (maskedValue.length <= 11) {
      if (maskedValue.length === 11) {
        maskedValue = maskedValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      } else {
        maskedValue = maskedValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
      }
    }
    return maskedValue;
  };

  // Manipulação de mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    // Aplicar máscaras
    if (name === 'cnpj') {
      processedValue = applyCnpjMask(value);
    } else if (name === 'telefone') {
      processedValue = applyPhoneMask(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validação de campos
  const validateField = (name, value) => {
    let error = '';

    // Validação de campo obrigatório
    if (!value && name !== 'termos') {
      error = 'Este campo é obrigatório.';
    }

    // Validações específicas
    if (value) {
      switch (name) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = 'Digite um e-mail válido.';
          }
          break;
        case 'cnpj':
          const cnpjDigits = value.replace(/\D/g, "");
          if (cnpjDigits.length !== 14) {
            error = 'CNPJ deve conter exatamente 14 dígitos.';
          } else if (!isValidCNPJ(cnpjDigits)) {
            error = 'CNPJ inválido.';
          }
          break;
        case 'telefone':
          const phoneDigits = value.replace(/\D/g, "");
          if (phoneDigits.length !== 11) {
            error = 'Telefone deve conter exatamente 11 dígitos (DDD + número).';
          }
          break;
        case 'senha':
          if (value.length < 6) {
            error = 'Senha deve ter pelo menos 6 caracteres.';
          }
          break;
        default:
          break;
      }
    }

    return error;
  };

  // Validação de CNPJ
  const isValidCNPJ = (cnpj) => {
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    let sum = 0;
    let weight = 2;
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;

    if (digit1 !== parseInt(cnpj.charAt(12))) return false;

    sum = 0;
    weight = 2;
    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;

    return digit2 === parseInt(cnpj.charAt(13));
  };

  // Mostrar alerta
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validar campos obrigatórios
    Object.keys(formData).forEach(key => {
      if (key !== 'termos') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    // Validar termos
    if (!formData.termos) {
      newErrors.termos = 'Você deve aceitar os termos de uso para continuar.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showAlert('Por favor, corrija os erros no formulário antes de continuar.', 'error');
      return;
    }

    setLoading(true);

    try {
      // Preparar dados para envio
      const submitData = {
        cnpj: formData.cnpj.replace(/\D/g, ""),
        nome: formData.nome.trim(),
        endereco: formData.endereco.trim(),
        cidade: formData.cidade.trim(),
        estado: formData.estado,
        telefone: formData.telefone.replace(/\D/g, ""),
        email: formData.email.trim(),
        senha: formData.senha
      };

      console.log("Data to send to backend:", submitData);
      
      // Simular chamada API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mostrar mensagem de sucesso
      showAlert('Cadastro da instituição realizado com sucesso! Entraremos em contato em breve.', 'success');
      
      // Limpar formulário
      setFormData({
        nome: '',
        cnpj: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        email: '',
        senha: '',
        termos: false
      });

    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      showAlert('Ocorreu um erro ao processar seu cadastro. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      
      <main>
        {/* Back Button */}
        <button className="back-btn" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Voltar
        </button>

        <div className="container">
          {/* Logo Section */}
          <div className="logo-section">
            <img src={logo} alt="Happy Idosos" className="logo" />
            <h1>Cadastro de Asilo</h1>
            <p>Conecte sua instituição e ofereça o melhor cuidado aos idosos</p>
          </div>

          {/* Form Container */}
          <div className="form-container">
            {alert.show && (
              <div className={`alert alert-${alert.type} fade-in`}>
                {alert.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="asilo-form">
              {/* Dados da Instituição */}
              <div className="form-section">
                <h3>🏥 Dados da Instituição</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label htmlFor="nome">Nome da Instituição *</label>
                    <input 
                      type="text" 
                      id="nome" 
                      name="nome" 
                      value={formData.nome}
                      onChange={handleInputChange}
                      className={errors.nome ? 'error' : formData.nome ? 'success' : ''}
                      required 
                    />
                    {errors.nome && <div className="error-message">{errors.nome}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cnpj">CNPJ *</label>
                    <input 
                      type="text" 
                      id="cnpj" 
                      name="cnpj" 
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      placeholder="00.000.000/0000-00" 
                      maxLength="18" 
                      className={errors.cnpj ? 'error' : formData.cnpj ? 'success' : ''}
                      required 
                    />
                    {errors.cnpj && <div className="error-message">{errors.cnpj}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone *</label>
                    <input 
                      type="tel" 
                      id="telefone" 
                      name="telefone" 
                      value={formData.telefone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999" 
                      maxLength="15" 
                      className={errors.telefone ? 'error' : formData.telefone ? 'success' : ''}
                      required 
                    />
                    {errors.telefone && <div className="error-message">{errors.telefone}</div>}
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="endereco">Endereço *</label>
                    <input 
                      type="text" 
                      id="endereco" 
                      name="endereco" 
                      value={formData.endereco}
                      onChange={handleInputChange}
                      className={errors.endereco ? 'error' : formData.endereco ? 'success' : ''}
                      required 
                    />
                    {errors.endereco && <div className="error-message">{errors.endereco}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cidade">Cidade *</label>
                    <input 
                      type="text" 
                      id="cidade" 
                      name="cidade" 
                      value={formData.cidade}
                      onChange={handleInputChange}
                      className={errors.cidade ? 'error' : formData.cidade ? 'success' : ''}
                      required 
                    />
                    {errors.cidade && <div className="error-message">{errors.cidade}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="estado">Estado *</label>
                    <select 
                      id="estado" 
                      name="estado" 
                      value={formData.estado}
                      onChange={handleInputChange}
                      className={errors.estado ? 'error' : formData.estado ? 'success' : ''}
                      required
                    >
                      <option value="">Selecione o estado</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                    {errors.estado && <div className="error-message">{errors.estado}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : formData.email ? 'success' : ''}
                      required 
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="senha">Senha *</label>
                    <input 
                      type="password" 
                      id="senha" 
                      name="senha" 
                      value={formData.senha}
                      onChange={handleInputChange}
                      minLength="6" 
                      className={errors.senha ? 'error' : formData.senha ? 'success' : ''}
                      required 
                    />
                    {errors.senha && <div className="error-message">{errors.senha}</div>}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="form-section">
                <label className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="termos" 
                    name="termos" 
                    checked={formData.termos}
                    onChange={handleInputChange}
                    required 
                  />
                  <span className="checkmark"></span>
                  Aceito os <a href="#" className="link">Termos de Uso</a> e <a href="#" className="link">Política de Privacidade</a> *
                </label>
                {errors.termos && <div className="error-message">{errors.termos}</div>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn" disabled={loading}>
                {!loading ? (
                  <span className="btn-text">Cadastrar Instituição</span>
                ) : (
                  <span className="btn-loading">
                    <div className="spinner"></div>
                    Processando...
                  </span>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="login-link">
              <p>Já é cadastrado? <Link to="/loginasilo" className="link">Faça login aqui</Link></p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}