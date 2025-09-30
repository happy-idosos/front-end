<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Asilo - Happy Idosos</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style-cadastroasilo.css">
</head>
<body>
    <!-- Back Button -->
    <button class="back-btn" onclick="window.history.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
        </svg>
        Voltar
    </button>

    <div class="container">
        <!-- Logo Section -->
        <div class="logo-section">
            <img src="img/happyidosos.png" alt="Happy Idosos" class="logo">
            <!-- Updated title and description for nursing homes -->
            <h1>Cadastro de Asilo</h1>
            <p>Conecte sua instituição e ofereça o melhor cuidado aos idosos</p>
        </div>

        <!-- Form Container -->
        <div class="form-container">
            <form id="asiloForm" class="asilo-form">
                <!-- Updated form section for nursing home data -->
                <div class="form-section">
                    <h3>🏥 Dados da Instituição</h3>
                    <div class="form-grid">
                        <div class="form-group full-width">
                            <label for="nome">Nome da Instituição *</label>
                            <input type="text" id="nome" name="nome" required>
                        </div>
                        <div class="form-group">
                            <label for="cnpj">CNPJ *</label>
                            <input type="text" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" maxlength="18" required>
                        </div>
                        <div class="form-group">
                            <label for="telefone">Telefone *</label>
                            <input type="tel" id="telefone" name="telefone" placeholder="(11) 99999-9999" maxlength="15" required>
                        </div>
                        <div class="form-group full-width">
                            <label for="endereco">Endereço *</label>
                            <input type="text" id="endereco" name="endereco" required>
                        </div>
                        <div class="form-group">
                            <label for="cidade">Cidade *</label>
                            <input type="text" id="cidade" name="cidade" required>
                        </div>
                        <div class="form-group">
                            <label for="estado">Estado *</label>
                            <select id="estado" name="estado" required>
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
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="senha">Senha *</label>
                            <input type="password" id="senha" name="senha" minlength="6" required>
                        </div>
                    </div>
                </div>

                <!-- Terms -->
                <div class="form-section">
                    <label class="checkbox-group">
                        <input type="checkbox" id="termos" name="termos" required>
                        <span class="checkmark"></span>
                        Aceito os <a href="#" class="link">Termos de Uso</a> e <a href="#" class="link">Política de Privacidade</a> *
                    </label>
                </div>

                <!-- Submit Button -->
                <!-- Updated button text for nursing home registration -->
                <button type="submit" class="submit-btn">
                    <span class="btn-text">Cadastrar Instituição</span>
                    <span class="btn-loading">
                        <div class="spinner"></div>
                        Processando...
                    </span>
                </button>
            </form>

            <!-- Login Link -->
            <!-- Updated login link for nursing homes -->
            <div class="login-link">
                <p>Já é cadastrado? <a href="loginasilo.html" class="link">Faça login aqui</a></p>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.getElementById("asiloForm")
            const submitBtn = form.querySelector(".submit-btn")
            const btnText = submitBtn.querySelector(".btn-text")
            const btnLoading = submitBtn.querySelector(".btn-loading")

            // Input masks
            setupInputMasks()

            // Form validation
            setupFormValidation()

            // Form submission
            form.addEventListener("submit", handleFormSubmit)

            function setupInputMasks() {
                const cnpjInput = document.getElementById("cnpj")
                cnpjInput.addEventListener("input", (e) => {
                    let value = e.target.value.replace(/\D/g, "")
                    if (value.length <= 14) {
                        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
                    }
                    e.target.value = value
                })

                // Phone mask - exactly 11 digits (DDD + number)
                const phoneInput = document.getElementById("telefone")
                phoneInput.addEventListener("input", (e) => {
                    let value = e.target.value.replace(/\D/g, "")
                    if (value.length <= 11) {
                        value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
                        if (value.length < 14) {
                            value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
                        }
                    }
                    e.target.value = value
                })
            }

            function setupFormValidation() {
                const inputs = form.querySelectorAll("input[required], select[required]")

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

                // Specific field validations
                if (value && field.type === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(value)) {
                        isValid = false
                        message = "Digite um e-mail válido."
                    }
                }

                if (value && field.id === "cnpj") {
                    const cnpjDigits = value.replace(/\D/g, "")
                    if (cnpjDigits.length !== 14) {
                        isValid = false
                        message = "CNPJ deve conter exatamente 14 dígitos."
                    } else if (!isValidCNPJ(cnpjDigits)) {
                        isValid = false
                        message = "CNPJ inválido."
                    }
                }

                if (value && field.id === "telefone") {
                    const phoneDigits = value.replace(/\D/g, "")
                    if (phoneDigits.length !== 11) {
                        isValid = false
                        message = "Telefone deve conter exatamente 11 dígitos (DDD + número)."
                    }
                }

                if (value && field.id === "senha") {
                    if (value.length < 6) {
                        isValid = false
                        message = "Senha deve ter pelo menos 6 caracteres."
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

            function isValidCNPJ(cnpj) {
                if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false

                let sum = 0
                let weight = 2
                for (let i = 11; i >= 0; i--) {
                    sum += parseInt(cnpj.charAt(i)) * weight
                    weight = weight === 9 ? 2 : weight + 1
                }
                let remainder = sum % 11
                let digit1 = remainder < 2 ? 0 : 11 - remainder

                if (digit1 !== parseInt(cnpj.charAt(12))) return false

                sum = 0
                weight = 2
                for (let i = 12; i >= 0; i--) {
                    sum += parseInt(cnpj.charAt(i)) * weight
                    weight = weight === 9 ? 2 : weight + 1
                }
                remainder = sum % 11
                let digit2 = remainder < 2 ? 0 : 11 - remainder

                return digit2 === parseInt(cnpj.charAt(13))
            }

            function clearValidation(e) {
                const field = e.target
                field.classList.remove("error", "success")

                const errorMsg = field.parentNode.querySelector(".error-message")
                if (errorMsg) {
                    errorMsg.remove()
                }
            }

            function showFieldError(field, message) {
                const errorMsg = document.createElement("div")
                errorMsg.className = "error-message"
                errorMsg.textContent = message
                field.parentNode.appendChild(errorMsg)
            }

            async function handleFormSubmit(e) {
                e.preventDefault()

                // Validate all fields
                const inputs = form.querySelectorAll("input[required], select[required]")
                let isFormValid = true

                inputs.forEach((input) => {
                    const fieldValid = validateField({ target: input })
                    if (!fieldValid) isFormValid = false
                })

                // Check terms acceptance
                const termsCheckbox = document.getElementById("termos")
                if (!termsCheckbox.checked) {
                    isFormValid = false
                    showAlert("Você deve aceitar os termos de uso para continuar.", "error")
                }

                if (!isFormValid) {
                    showAlert("Por favor, corrija os erros no formulário antes de continuar.", "error")
                    return
                }

                // Show loading state
                btnText.style.display = "none"
                btnLoading.style.display = "flex"
                submitBtn.disabled = true

                try {
                    const formData = {
                        cnpj: document.getElementById("cnpj").value.replace(/\D/g, ""),
                        nome: document.getElementById("nome").value.trim(),
                        endereco: document.getElementById("endereco").value.trim(),
                        cidade: document.getElementById("cidade").value.trim(),
                        estado: document.getElementById("estado").value,
                        telefone: document.getElementById("telefone").value.replace(/\D/g, ""),
                        email: document.getElementById("email").value.trim(),
                        senha: document.getElementById("senha").value
                    }

                    // Here you would send to your backend API
                    console.log("Data to send to backend:", formData)
                    
                    // Simulate API call
                    await new Promise((resolve) => setTimeout(resolve, 2000))

                    // Show success message
                    showSuccessMessage()
                } catch (error) {
                    console.error("Erro ao enviar formulário:", error)
                    showAlert("Ocorreu um erro ao processar seu cadastro. Tente novamente.", "error")
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

            function showSuccessMessage() {
                // Clear form
                form.reset()

                // Remove all validation classes
                const validatedFields = form.querySelectorAll(".error, .success")
                validatedFields.forEach((field) => {
                    field.classList.remove("error", "success")
                })

                // Remove all error messages
                const errorMessages = form.querySelectorAll(".error-message")
                errorMessages.forEach((msg) => msg.remove())

                // Show success message
                showAlert("Cadastro da instituição realizado com sucesso! Entraremos em contato em breve.", "success")

                // Scroll to top of form
                form.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        })
    </script>
</body>
</html>
