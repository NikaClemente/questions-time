export class Auth {
    static createNewUser(email, pass) {
        console.log('createNewUser', email, pass)
    }

    static login(email, pass) {
        console.log('login', email, pass)

        // fetch()
    }
}

export function isValidAuthForm(type, element) {
    element.style.borderColor = '#ced4da'

    const value = element.value
    if (value.length == 0) {
        validError(element)
        return false
    }

    switch (type) {
        case 'email':
            if (value.length < 5 || value.length > 256) {
                validError(element)
                return false
            }
        case 'password':
            if (value.length < 6 && value.length > 16) {
                validError(element)
                return false
            }
    }

    return true
}

function validError(element) {
    element.style.borderColor = 'red'
}
