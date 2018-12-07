const profile = require('./profile')
const landingPage = require('./loadLanding')
const login = require('./login')
const listOperations = require('./listOperations')
const nav = require('./nav')
const listPage =  require('./listPage')
const followers = require('./followers')
const [path,query] = window.location.pathname.split('?')


const pageInit = {
    '/': login.init,
    'index.html': login.init,
    '/profilePage/profile.html': profile.init,
    '/signedInLandingPage/signedInLandingPage.html': landingPage.init,
    '/listOperations/listOperations.html': listOperations.init,
    '/listPage/listPage.html': listPage.init,
    '/friendsPage/followers.html': followers.init
}


nav.init()
pageInit[path]()