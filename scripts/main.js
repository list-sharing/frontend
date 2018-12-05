const profile = require('./profile')
const landingPage = require('./loadLanding')
const login = require('./login')
const path = window.location.pathname

const pageInit = {
    '/': login.init,
    'index.html': login.init,
    '/profilePage/profile.html': profile.init,
    '/signedInLandingPage/signedInLandingPage.html': landingPage.init
}

pageInit[path]()