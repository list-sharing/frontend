const {axios} = require('./utils')

function init(){
    axios('/auth/token')
        .then(result => {
            const id = result.data.id
            return axios(`/users/${id}`)
        })
        .then((result) => {
            document.querySelector('.welcome').textContent += ` ${result.data[0].first_name}!`
            document.querySelector('.signoutDiv p').addEventListener('click', signout)
        })
        
}

function signout(){
    localStorage.removeItem('token')
    localStorage.removeItem('uId')
    window.location.pathname = '/'
}



module.exports = {init}