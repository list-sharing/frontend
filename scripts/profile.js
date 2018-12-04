const {axios, addListenersToMany} = require('./utils')

// $('.ui.search').search({source: content});

function init(){
    axios('/auth/token')
    .then(result => {
        const id = result.data.id
        return axios(`/users/${id}`)
    })
    .then((result) => {
        document.querySelector('.welcome').textContent += ` ${result.data[0].first_name}!`
        return getUser(2)
    })
}

function getUser(id){
    axios(`/users/${id}`)
    .then(result => {
        console.log(result)
    })
}
module.exports = {init}