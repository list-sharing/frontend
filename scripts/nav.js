const {axios} = require('./utils')

function init(){
   return axios('/auth/token')
        .then(result => {
            const id = result.data.id
            localStorage.setItem('uId', id)
            return axios(`/users/${id}`)
        })
        .then((result) => {
            document.querySelector('.welcome').textContent += ` ${result.data[0].first_name}!`
            document.querySelector('body').setAttribute('data-id', result.data[0].id)
            document.querySelector('.signoutDiv p').addEventListener('click', signout)
        })
        .catch(err => {
            if(err.reponse) console.error(err.response.data)
            if (querySelectorwindow.location.pathname !== '/' && window.location.pathname !== '/index.html') return signout()
        })
}

function signout(){
    localStorage.removeItem('token')
    localStorage.removeItem('uId')
    localStorage.removeItem('lId')
    localStorage.removeItem('edit')
    window.location.pathname = '/'
}



module.exports = {init}