import './styles.css'
import { hideElement, getHideBtn, getQuestionList, formatDate, formatTime, fullDate, isValid } from './scripts/main'
import { postEvent } from './scripts/db'

const personQuestionList = document.getElementById('personQuestionList')
const personQuestionList_hideBtn = getHideBtn(personQuestionList)
const personQuestions = getQuestionList(personQuestionList)

personQuestionList_hideBtn.addEventListener('click', () => hideElement(personQuestions))


const globalQuestionList = document.getElementById('globalQuestionList')
const globalQuestionList_hideBtn = getHideBtn(globalQuestionList)
const globalQuestions = getQuestionList(globalQuestionList)

globalQuestionList_hideBtn.addEventListener('click', () => hideElement(globalQuestions))



const questionInputForm = document.getElementById('questionPostForm')
const questionInput = questionInputForm.querySelector('#questionInput')
const questionSubmit = questionInputForm.querySelector('#submit')


questionInputForm.addEventListener('submit', submitQuestionFormHandler)

function submitQuestionFormHandler(event) {
    event.preventDefault()
    const inputFeedback = questionInputForm.querySelector('#feedback')
    const date = new Date()
    if (isValid(questionInput.value)) {
        postEvent({ question: questionInput.value, date: formatDate(date), time: formatTime(date) })
        questionInput.classList.remove('is-invalid')
        inputFeedback.style.display = 'none'
    }
    else {
        questionInput.classList.add('is-invalid')
        inputFeedback.style.display = 'block'
    }

    questionInput.value = ''
}
