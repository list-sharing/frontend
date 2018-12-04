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
        return getUser(3)
    })
    .then( () => {
        $('.ui.accordion')
            .accordion()
            ;
    })

}

function getUser(id){
    axios(`/users/${id}`)
    .then(result => {
        console.log(result)
        createHeader(result.data[0])
        return axios(`/users/${id}/lists`)
    })
    .then(result => {
        console.log(result)
    })
}

function createHeader(data){
    document.querySelector('.profPic').style.backgroundImage = `url("${data.img}")`
    document.querySelector('.name').textContent = `${data.first_name} ${data.last_name}`
    document.querySelector('.profContent').textContent = data.bio
}
module.exports = {init}