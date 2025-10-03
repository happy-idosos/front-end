"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "aos/dist/aos.css"
import AOS from "aos"
import "./LoginVoluntario.css"

import logo from "../../assets/img/happyidosos.jpg"

const LoginVoluntario = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: "", type: "" })
  const [errors, setErrors] = useState({})

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateField = (name, value) => {
    let error = ""

    if (!value.trim()) {
      error = "Este campo é obrigatório."
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        error = "Digite um e-mail válido."
      }
    } else if (name === "senha") {
      if (value.length < 6) {
        error = "A senha deve ter pelo menos 6 caracteres."
      }
    }

    return error
  }

  const validateForm = () => {
    const newErrors = {}

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key])
      if (error) {
        newErrors[key] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      showAlert("Por favor, corrija os erros no formulário antes de continuar.", "error")
      return
    }

    setLoading(true)

    try {
      const loginData = {
        email: formData.email,
        senha: formData.senha,
        tipoUsuario: "voluntario",
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Login data ready for API:", loginData)

      showAlert("Login realizado com sucesso! Redirecionando...", "success")

      setTimeout(() => {
        navigate("/dashboard-voluntario")
      }, 1500)
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      showAlert("E-mail ou senha incorretos. Tente novamente.", "error")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className="login-voluntario-page">
      <button className="login-voluntario-back-btn" onClick={handleBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Voltar para Home
      </button>

      <div className="login-voluntario-container">
        <div className="login-voluntario-logo-section" data-aos="fade-down">
          <img src={logo || "/placeholder.svg"} alt="Happy Idosos" className="cadastro-voluntario-logo" />
          <h1>Bem-vindo de volta!</h1>
          <p>Acesse sua conta e continue fazendo a diferença</p>
        </div>

        <div className="login-voluntario-form-container" data-aos="fade-up" data-aos-delay="200">
          <form onSubmit={handleSubmit} className="login-voluntario-form">
            {alert.show && (
              <div className={`login-voluntario-alert login-voluntario-alert-${alert.type}`} data-aos="fade-in">
                {alert.message}
              </div>
            )}

            <div className="login-voluntario-form-section">
              <div className="login-voluntario-form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu e-mail"
                  className={errors.email ? "login-voluntario-error" : formData.email ? "login-voluntario-success" : ""}
                />
                {errors.email && <div className="login-voluntario-error-message">{errors.email}</div>}
              </div>

              <div className="login-voluntario-form-group">
                <label htmlFor="senha">Senha *</label>
                <div className="login-voluntario-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha"
                    className={
                      errors.senha ? "login-voluntario-error" : formData.senha ? "login-voluntario-success" : ""
                    }
                  />
                  <button
                    type="button"
                    className="login-voluntario-toggle-password"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.senha && <div className="login-voluntario-error-message">{errors.senha}</div>}
              </div>

              <div className="login-voluntario-forgot-password">
                <Link to="/esqueciasenha" className="login-voluntario-link">
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>

            <button type="submit" className="login-voluntario-submit-btn" disabled={loading}>
              {loading ? (
                <span className="login-voluntario-btn-loading">
                  <div className="login-voluntario-spinner"></div>
                  Entrando...
                </span>
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </form>

          <div className="login-voluntario-register-link">
            <p>
              Não tem conta?{" "}
              <Link to="/cadastrovoluntario" className="login-voluntario-link">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginVoluntario
