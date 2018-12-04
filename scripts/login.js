const {axios} = require('./utils')
const signup = require('./signup')

function init(){
    document.querySelectorAll('.submit.button')[1].classList.add('disabled')
    document.addEventListener('keyup', checkVal)
    document.querySelectorAll('.submit.button')[0].onclick = signup.init
}

function checkVal(){
    const inputs = document.querySelectorAll('input')
    const login = document.querySelectorAll('.submit.button')[1]
    if(inputs[0].value == '' || inputs[1].value == '') return login.classList.add('disabled')
    login.classList.remove('disabled')
    login.addEventListener('click', tryLogin)
}

function tryLogin(){
    const body = getBody()
    axios('/auth/login', 'post', body)
    .then(result => {
        localStorage.setItem('token', result.data.token)
        window.location.pathname = '/signedInLandingPage/signedInLandingPage.html'
    })
    .catch(err => {
        console.error(err.response.data)
        document.querySelector('body').innerHTML = `<b style="color:red">Incorrect credentials</b> ${document.querySelector('body').innerHTML}`
    })
}

function getBody(){
    const body = {}
    body.email = document.querySelectorAll('input')[0].value
    body.password = document.querySelectorAll('input')[1].value
    
    return body
}


module.exports = {init}