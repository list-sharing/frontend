const profile = require('./profile')
const landingPage = require('./loadLanding')
const login = require('./login')
const listOperations = require('./listOperations')
const nav = require('./nav')
const path = window.location.pathname


const pageInit = {
    '/': login.init,
    'index.html': login.init,
    '/profilePage/profile.html': profile.init,
    '/signedInLandingPage/signedInLandingPage.html': landingPage.init,
    '/listOperations/listOperations.html': listOperations.init
}

nav.init()
pageInit[path]()