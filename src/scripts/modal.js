import { Auth, isValidAuthForm } from './auth'

export function modalLogIN(element) {
    const content = `
        <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" id="email" required
                aria-describedby="emailHelp">
            <div id="feedback" class="email invalid-feedback">
                Вопрос не должен быть короче 5 и более 256 символов.
            </div>
        </div>
        <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" class="form-control" id="password" required>
            <div id="feedback" class="password invalid-feedback">
                Вопрос не должен быть короче 5 и более 256 символов.
            </div>
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="Check">
            <label class="form-check-label" for="Check">Запомнить меня</label>
        </div>
    `

    const btn = `
        <button type="button" class="btn btn-primary reg" data-dismiss="modal">Регистрация</button>
        <button type="button" class="btn btn-success login">Войти</button>
    `

    element.innerHTML = createModal('Авторзация', content, btn, element)
    const closeBtn = element.querySelector('.close')
    const regBtn = element.querySelector('.reg')
    const loginBtn = element.querySelector('.login')

    const email = element.querySelector('#email')
    const pass = element.querySelector('#password')

    closeBtn.addEventListener('click', () => {
        closeModal(element)
    })


    let isValid = false

    regBtn.addEventListener('click', () => {
        isValid = isValidAuthForm('email', email) && isValidAuthForm('password', pass)
        if (isValid) {
            closeModal(element)
            Auth.createNewUser(email.value, pass.value)
        }
    })
    loginBtn.addEventListener('click', () => {
        isValid = isValidAuthForm('email', email) && isValidAuthForm('password', pass)
        if (isValid) {
            closeModal(element)
            Auth.login(email.value, pass.value)
        }

    })
}

function closeModal(element) {
    element.innerHTML = ''
}




export function createModal(title, content, btn, element) {
    return `
    <div class="modal fade show" id="logIN" tabindex="-1" role="dialog" aria-labelledby="logINLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="logINLabel">${title}</h5>
                    <button type="button" class="close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    ${btn}
                </div>
            </div>
        </div>
    </div>
    `
}

