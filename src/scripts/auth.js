import config from "../config"
import { DB } from "./db"

export class Auth {
    static createNewUser(email, password) {
        console.log('createNewUser', email, password)
    }

    static login(email, password) {
        console.log('login', email, password)

        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
                email, password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })

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
