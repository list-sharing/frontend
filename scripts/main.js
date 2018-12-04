const profile = require('./profile')
const login = require('./login')
const path = window.location.pathname

const pageInit = {
    '/': login.init,
    'index.html': login.init,
    '/profilePage/profile.html': profile.init
}

pageInit[path]()