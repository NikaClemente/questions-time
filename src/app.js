import './styles.css'
import { hideElement, getHideBtn, getQuestionList, isValid } from './scripts/main'
import { modalLogIN } from './scripts/modal'
import { DB } from './scripts/db'

const personQuestionList = document.getElementById('personQuestionList')
const personQuestionList_hideBtn = getHideBtn(personQuestionList)
const personQuestions = getQuestionList(personQuestionList)

// const globalQuestionList = document.getElementById('globalQuestionList')
// const globalQuestionList_hideBtn = getHideBtn(globalQuestionList)
// const globalQuestions = getQuestionList(globalQuestionList)

const questionInputForm = document.getElementById('questionPostForm')
const questionInput = questionInputForm.querySelector('#questionInput')
const questionSubmit = questionInputForm.querySelector('#submit')

const modalLogINBlock = document.getElementById('modalLogIN')
const logINbtn = document.getElementById('logINbtn')

window.addEventListener('load', () => {
    DB.renderQuestionList()
})



personQuestionList_hideBtn.addEventListener('click', () => hideElement(personQuestions))
// globalQuestionList_hideBtn.addEventListener('click', () => hideElement(globalQuestions))
questionInputForm.addEventListener('submit', submitQuestionFormHandler)
logINbtn.addEventListener('click', () => {
    modalLogIN(modalLogINBlock)
})

function submitQuestionFormHandler(event) {
    event.preventDefault()
    const inputFeedback = questionInputForm.querySelector('#feedback')
    const date = new Date().toJSON()
    if (isValid(questionInput.value)) {
        questionSubmit.disabled = true
        DB.createQuestion({ value: questionInput.value, date })
            .then(() => {
                questionSubmit.disabled = false
            })
        questionInput.classList.remove('is-invalid')
        inputFeedback.style.display = 'none'
        questionInput.value = ''
    }
    else {
        questionInput.classList.add('is-invalid')
        inputFeedback.style.display = 'block'
    }
}


