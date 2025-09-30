<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Happy Idosos</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style-loginvoluntario.css">
</head>
<body>  
    <button class="back-btn" onclick="window.history.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
        </svg>
        Voltar
    </button>

    <div class="container">
        <div class="logo-section">
            <img src="img/happyidosos.png" alt="Happy Idosos" class="logo">
            <h1>Bem-vindo de volta!</h1>
            <p>Acesse sua conta e continue fazendo a diferença</p>
        </div>

        <div class="form-container">
            <form id="loginForm" class="login-form">
                <div class="form-section">
                    <div class="form-group">
                        <label for="email">E-mail *</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="senha">Senha *</label>
                        <div class="password-field">
                            <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required>
                            <button type="button" class="toggle-password" onclick="togglePassword()">
                                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <svg class="eye-off-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="forgot-password">
                        <a href="esqueciasenha.html" class="link">Esqueceu sua senha?</a>
                    </div>
                </div>
                
                <button type="submit" class="submit-btn">
                    <span class="btn-text">Entrar</span>
                    <span class="btn-loading">
                        <div class="spinner"></div>
                        Entrando...
                    </span>
                </button>
            </form>

            <div class="register-link">
                <p>Não tem conta? <a href="cadastrovoluntario.html" class="link">Cadastre-se aqui</a></p>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.getElementById("loginForm")
            const submitBtn = form.querySelector(".submit-btn")
            const btnText = submitBtn.querySelector(".btn-text")
            const btnLoading = submitBtn.querySelector(".btn-loading")

            // Form validation
            setupFormValidation()

            // Form submission
            form.addEventListener("submit", handleFormSubmit)

            function setupFormValidation() {
                const inputs = form.querySelectorAll("input[required]")

                inputs.forEach((input) => {
                    input.addEventListener("blur", validateField)
                    input.addEventListener("input", clearValidation)
                })
            }

            function validateField(e) {
                const field = e.target
                const value = field.value.trim()

                clearValidation(e)

                let isValid = true
                let message = ""

                // Required field validation
                if (field.hasAttribute("required") && !value) {
                    isValid = false
                    message = "Este campo é obrigatório."
                }

                // Email validation
                if (value && field.type === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(value)) {
                        isValid = false
                        message = "Digite um e-mail válido."
                    }
                }

                // Password validation
                if (value && field.type === "password") {
                    if (value.length < 6) {
                        isValid = false
                        message = "A senha deve ter pelo menos 6 caracteres."
                    }
                }

                // Apply validation classes and feedback
                if (!isValid) {
                    field.classList.add("error")
                    showFieldError(field, message)
                } else if (value) {
                    field.classList.add("success")
                }

                return isValid
            }

            function clearValidation(e) {
                const field = e.target
                field.classList.remove("error", "success")

                const errorMsg = field.closest(".form-group").querySelector(".error-message")
                if (errorMsg) {
                    errorMsg.remove()
                }
            }

            function showFieldError(field, message) {
                const errorMsg = document.createElement("div")
                errorMsg.className = "error-message"
                errorMsg.textContent = message
                field.closest(".form-group").appendChild(errorMsg)
            }

            async function handleFormSubmit(e) {
                e.preventDefault()

                // Validate all fields
                const inputs = form.querySelectorAll("input[required]")
                let isFormValid = true

                inputs.forEach((input) => {
                    const fieldValid = validateField({ target: input })
                    if (!fieldValid) isFormValid = false
                })

                if (!isFormValid) {
                    showAlert("Por favor, corrija os erros no formulário antes de continuar.", "error")
                    return
                }

                // Show loading state
                btnText.style.display = "none"
                btnLoading.style.display = "flex"
                submitBtn.disabled = true

                try {
                    // Simulate API call
                    await new Promise((resolve) => setTimeout(resolve, 1500))

                    // Collect form data
                    const formData = {
                        email: document.getElementById("email").value,
                        senha: document.getElementById("senha").value
                    }

                    // Here you would normally send the data to your backend
                    console.log("Login data:", formData)

                    // Show success and redirect
                    showAlert("Login realizado com sucesso! Redirecionando...", "success")
                    
                    setTimeout(() => {
                        // Redirect to dashboard or main page
                        window.location.href = "dashboard.html"
                    }, 1500)

                } catch (error) {
                    console.error("Erro ao fazer login:", error)
                    showAlert("E-mail ou senha incorretos. Tente novamente.", "error")
                } finally {
                    // Reset button state
                    btnText.style.display = "inline"
                    btnLoading.style.display = "none"
                    submitBtn.disabled = false
                }
            }

            function showAlert(message, type) {
                // Remove existing alerts
                const existingAlert = form.querySelector(".alert")
                if (existingAlert) {
                    existingAlert.remove()
                }

                const alert = document.createElement("div")
                alert.className = `alert alert-${type} fade-in`
                alert.textContent = message

                form.insertBefore(alert, form.firstChild)

                // Auto-remove after 5 seconds
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.remove()
                    }
                }, 5000)
            }
        })

        function togglePassword() {
            const passwordInput = document.getElementById("senha")
            const eyeIcon = document.querySelector(".eye-icon")
            const eyeOffIcon = document.querySelector(".eye-off-icon")

            if (passwordInput.type === "password") {
                passwordInput.type = "text"
                eyeIcon.style.display = "none"
                eyeOffIcon.style.display = "block"
            } else {
                passwordInput.type = "password"
                eyeIcon.style.display = "block"
                eyeOffIcon.style.display = "none"
            }
        }
    </script>
</body>
</html>
