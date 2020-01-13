import { getQuestionList } from './main'
import { Auth } from './auth'

export class DB {
    static getDateToToken(data) {
        const token = data.idToken
        const userUid = data.localId
        if (!token) {
            document.getElementById('nickname').innerHTML = ''
            return alert('Нет токена!')
        }
        return fetch(`https://questions-time.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(questions => {
                console.log('Questions', questions)
            })
            .then(DB.getUserDate(data))
    }

    static createQuestion(question) {

        return fetch('https://questions-time.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderQuestionList)
    }

    static renderQuestionList() {
        const questionsList = getQuestionsFromLocalStorage()
        const html = questionsList.length
            ? questionsList.map(toCard).join('')
            : `<span class="text-muted">Вы ещё не задавали вопросов!</span>`

        const personQuestionList = document.getElementById('personQuestionList')
        const personQuestions = getQuestionList(personQuestionList)

        personQuestions.innerHTML = html
    }

    static regNewUser(email, password) {
        Auth.createNewUser(email, password)
    }

    static loginUser(email, password) {
        Auth.login(email, password)
            .then(data => DB.getDateToToken(data))
    }

    static getUserDate(data) {
        let user = ''
        return fetch(`https://questions-time.firebaseio.com/users.json?auth=${data.idToken}`)
            .then(users => users.json())
            .then(users => {
                for (const uid in users) {
                    if (uid == data.localId) {
                        user = users[uid]
                    }
                }
                document.getElementById('nickname').innerHTML = user.nickname

            })
    }
}

function addToLocalStorage(question) {
    const questionsList = getQuestionsFromLocalStorage()
    questionsList.push(question)
    localStorage.setItem('questions', JSON.stringify(questionsList))
}

function addToLocalStorageUser(token) {
    localStorage.setItem('cashData', JSON.stringify(token))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cashData') || '')
}

function toCard(question) {
    const isLike = question.badge && question.badge !== 'undefined'

    let html = `
        <li>
        <div class="d-flex justify-content-between align-items-center">
            <div><b>[Вопрос]</b>${question.value}</div>
    `
    if (isLike) {
        html += `<span class="badge badge-success">Like</span>`
    }

    html += `
        </div>
        <div class="dateTime text-muted">
            ${new Date(question.date).toLocaleDateString()} ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div><b>[Ответ]</b>Бла бла бла</div>
        <div class="dateTime text-muted">01.01.2020 00:00</div>
    </li>
    `

    return html
}