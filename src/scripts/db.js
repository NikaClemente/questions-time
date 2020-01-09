import { getQuestionList } from './main'

export class Question {
    static create(question) {

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
            .then(Question.renderList)
    }

    static renderList() {
        const questionsList = getQuestionsFromLocalStorage()
        const html = questionsList.length
            ? questionsList.map(toCard).join('')
            : `<span class="text-muted">Вы ещё не задавали вопросов!</span>`

        const personQuestionList = document.getElementById('personQuestionList')
        const personQuestions = getQuestionList(personQuestionList)

        personQuestions.innerHTML = html
    }
}

function addToLocalStorage(question) {
    const questionsList = getQuestionsFromLocalStorage()
    questionsList.push(question)
    localStorage.setItem('questions', JSON.stringify(questionsList))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
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