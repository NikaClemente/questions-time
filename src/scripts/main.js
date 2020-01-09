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

export function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.20' + yy;
}

export function formatTime(date) {

    let hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    let mm = date.getMinutes();
    if (mm < 10) mm = '0' + mm;

    let ss = date.getSeconds();
    if (ss < 10) ss = '0' + ss;

    return hh + ':' + mm + ':' + ss;
}

export function fullDate(date) {
    return formatDate(date) + ' ' + formatTime(date)
}