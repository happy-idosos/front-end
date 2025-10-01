import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CadastroVoluntario.css';

// Importar logo
import logo from '../assets/happyidosos.png';

const CadastroVoluntario = () => {
    useEffect(() => {
        // Inicializar máscaras e validações quando o componente montar
        setupInputMasks();
        setupFormValidation();
    }, []);

    const setupInputMasks = () => {
        // CPF mask - exactly 11 digits
        const cpfInput = document.getElementById("cpf");
        if (cpfInput) {
            cpfInput.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length <= 11) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                }
                e.target.value = value;
            });
        }

        // Phone mask - exactly 11 digits (DDD + number)
        const phoneInput = document.getElementById("telefone");
        if (phoneInput) {
            phoneInput.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length <= 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
                    if (value.length < 14) {
                        value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
                    }
                }
                e.target.value = value;
            });
        }
    };

    const setupFormValidation = () => {
        const form = document.getElementById("voluntarioForm");
        if (!form) return;

        const inputs = form.querySelectorAll("input[required]");
        inputs.forEach((input) => {
            input.addEventListener("blur", validateField);
            input.addEventListener("input", clearValidation);
        });
    };

    const validateField = (e) => {
        const field = e.target;
        const value = field.value.trim();

        clearValidation(e);

        let isValid = true;
        let message = "";

        // Required field validation
        if (field.hasAttribute("required") && !value) {
            isValid = false;
            message = "Este campo é obrigatório.";
        }

        // Specific field validations
        if (value && field.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = "Digite um e-mail válido.";
            }
        }

        if (value && field.id === "cpf") {
            const cpfDigits = value.replace(/\D/g, "");
            if (cpfDigits.length !== 11) {
                isValid = false;
                message = "CPF deve conter exatamente 11 dígitos.";
            } else if (!isValidCPF(cpfDigits)) {
                isValid = false;
                message = "CPF inválido.";
            }
        }

        if (value && field.id === "telefone") {
            const phoneDigits = value.replace(/\D/g, "");
            if (phoneDigits.length !== 11) {
                isValid = false;
                message = "Telefone deve conter exatamente 11 dígitos (DDD + número).";
            }
        }

        if (value && field.id === "data_nascimento") {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 16 || age > 100) {
                isValid = false;
                message = "Idade deve estar entre 16 e 100 anos.";
            }
        }

        if (value && field.id === "senha") {
            if (value.length < 6) {
                isValid = false;
                message = "Senha deve ter pelo menos 6 caracteres.";
            }
        }

        // Apply validation classes and feedback
        if (!isValid) {
            field.classList.add("error");
            showFieldError(field, message);
        } else if (value) {
            field.classList.add("success");
        }

        return isValid;
    };

    const isValidCPF = (cpf) => {
        // Basic CPF validation algorithm
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cpf.charAt(10));
    };

    const clearValidation = (e) => {
        const field = e.target;
        field.classList.remove("error", "success");

        const errorMsg = field.parentNode.querySelector(".error-message");
        if (errorMsg) {
            errorMsg.remove();
        }
    };

    const showFieldError = (field, message) => {
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.textContent = message;
        field.parentNode.appendChild(errorMsg);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector(".submit-btn");
        const btnText = submitBtn.querySelector(".btn-text");
        const btnLoading = submitBtn.querySelector(".btn-loading");

        // Validate all fields
        const inputs = form.querySelectorAll("input[required]");
        let isFormValid = true;

        inputs.forEach((input) => {
            const fieldValid = validateField({ target: input });
            if (!fieldValid) isFormValid = false;
        });

        // Check terms acceptance
        const termsCheckbox = document.getElementById("termos");
        if (!termsCheckbox.checked) {
            isFormValid = false;
            showAlert("Você deve aceitar os termos de uso para continuar.", "error");
        }

        if (!isFormValid) {
            showAlert("Por favor, corrija os erros no formulário antes de continuar.", "error");
            return;
        }

        // Show loading state
        btnText.style.display = "none";
        btnLoading.style.display = "flex";
        submitBtn.disabled = true;

        try {
            // Collect form data for backend
            const formData = {
                nome: document.getElementById("nome").value.trim(),
                cpf: document.getElementById("cpf").value.replace(/\D/g, ""),
                telefone: document.getElementById("telefone").value.replace(/\D/g, ""),
                data_nascimento: document.getElementById("data_nascimento").value,
                email: document.getElementById("email").value.trim(),
                senha: document.getElementById("senha").value
            };

            // Here you would send to your backend API
            console.log("Data to send to backend:", formData);
            
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Show success message
            showSuccessMessage(form);
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
            showAlert("Ocorreu um erro ao processar seu cadastro. Tente novamente.", "error");
        } finally {
            // Reset button state
            btnText.style.display = "inline";
            btnLoading.style.display = "none";
            submitBtn.disabled = false;
        }
    };

    const showAlert = (message, type) => {
        const form = document.getElementById("voluntarioForm");
        if (!form) return;

        // Remove existing alerts
        const existingAlert = form.querySelector(".alert");
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement("div");
        alert.className = `alert alert-${type} fade-in`;
        alert.textContent = message;

        form.insertBefore(alert, form.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    };

    const showSuccessMessage = (form) => {
        // Clear form
        form.reset();

        // Remove all validation classes
        const validatedFields = form.querySelectorAll(".error, .success");
        validatedFields.forEach((field) => {
            field.classList.remove("error", "success");
        });

        // Remove all error messages
        const errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach((msg) => msg.remove());

        // Show success message
        showAlert("Cadastro realizado com sucesso! Entraremos em contato em breve.", "success");

        // Scroll to top of form
        form.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="cadastro-voluntario-page">
            {/* Back Button */}
            <button className="back-btn" onClick={() => window.history.back()}>
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
                    <h1>Cadastro de Voluntário</h1>
                    <p>Transforme vidas e faça a diferença na vida dos idosos</p>
                </div>

                {/* Form Container */}
                <div className="form-container">
                    <form id="voluntarioForm" className="volunteer-form" onSubmit={handleFormSubmit}>
                        {/* Simplified form with only required database fields */}
                        <div className="form-section">
                            <h3>👤 Dados para Cadastro</h3>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label htmlFor="nome">Nome Completo *</label>
                                    <input type="text" id="nome" name="nome" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpf">CPF *</label>
                                    <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" maxLength="14" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefone">Telefone *</label>
                                    <input type="tel" id="telefone" name="telefone" placeholder="(11) 99999-9999" maxLength="15" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="data_nascimento">Data de Nascimento *</label>
                                    <input type="date" id="data_nascimento" name="data_nascimento" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail *</label>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="senha">Senha *</label>
                                    <input type="password" id="senha" name="senha" minLength="6" required />
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="form-section">
                            <label className="checkbox-group">
                                <input type="checkbox" id="termos" name="termos" required />
                                <span className="checkmark"></span>
                                Aceito os <a href="#" className="link">Termos de Uso</a> e <a href="#" className="link">Política de Privacidade</a> *
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="submit-btn">
                            <span className="btn-text">Cadastrar como Voluntário</span>
                            <span className="btn-loading">
                                <div className="spinner"></div>
                                Processando...
                            </span>
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="login-link">
                        <p>Já é cadastrado? <Link to="/loginvoluntario" className="link">Faça login aqui</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroVoluntario;