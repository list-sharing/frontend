const {axios} = require('./utils')
const login = require('./login')

function init(){
    $('.ui.modal').modal('show')
    document.addEventListener('keyup', activateBtn)
}

function activateBtn() {
    checkPasswords()
    let result = checkInputs()
    if (!result) return false
    document.querySelector('#submit').classList.remove('disabled')
    document.querySelector('#submit').addEventListener('click', function (e) { submit(e, result) })
}

function checkInputs() {
    const inputs = document.querySelectorAll('.modal input')
    result = {}
    for (let input of inputs) {
        if (!input.value) return false
        result[input.id] = input.value
    }
    if (result.retypePassword !== result.password) return false
    delete result.retypePassword
    return result
}

function checkPasswords() {
    const retypePassword = document.querySelector('#retypePassword')
    retypePassword.addEventListener('keyup', isEqual)
}

function isEqual() {
    const retypePassword = document.querySelector('#retypePassword').value
    const password = document.querySelector('#password').value
    if (retypePassword !== password) document.querySelector('.passwordWarning').classList.remove('hidden')
    else document.querySelector('.passwordWarning').classList.add('hidden')
}

function submit(e, body){
    e.preventDefault()
    axios('/users/signup', 'post', body)
    .then(result => {
        $('.ui.modal').modal('hide')
        document.querySelector('.modals').remove()
        document.querySelector('body').innerHTML += `
            <div class="ui alert">${result.data.message}. Please log in</div> 
        `
        login.init()
        document.querySelector('.button').classList.add('disabled')
    })
    .catch(err => {
        if(err)
        document.querySelector('body').innerHTML += `
            <div class="ui alert">${err.response.data.message}.</div> 
        `
    })
}

module.exports = {init}