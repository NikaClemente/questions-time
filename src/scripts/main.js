export function isValid(value) {
    if (value.length < 5 || value.length > 256) return false
    return true
}

export function getHideBtn(element) {
    return element.querySelector('#hideBtn')
}

export function getQuestionList(element) {
    return element.querySelector('#questionsList')
}

export function hideElement(element) {
    if (element.style.display == 'none') element.style.display = 'block'
    else element.style.display = 'none'
}
