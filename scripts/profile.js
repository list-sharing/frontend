const {axios, addListenersToMany} = require('./utils')

// $('.ui.search').search({source: content});

function init(){
    let id = localStorage.getItem('uId')
    console.log('hello')
    axios(`/users/${id}`)
    .then(result => {
        console.log(result)
        const name = result.data.email
        document.querySelector('.welcome').textContent += ` ${name}`
    })
}
module.exports = {init}