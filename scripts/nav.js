const {axios} = require('./utils')

function init(){
   return axios('/auth/token')
        .then(result => {
            const id = result.data.id
            return axios(`/users/${id}`)
        })
        .then((result) => {
            document.querySelector('.welcome').textContent += ` ${result.data[0].first_name}!`
            document.querySelector('body').setAttribute('data-id', result.data[0].id)
            document.querySelector('.signoutDiv p').addEventListener('click', signout)
        })
        .catch(err => {
            console.error(err.response.data)
            if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return signout()
        })
}

function signout(){
    localStorage.removeItem('token')
    localStorage.removeItem('uId')
    window.location.pathname = '/'
}



module.exports = {init}