const {axios, addListenersToMany} = require('./utils')
const nav = require('./nav')
const {cardTemplate} = require('./templates')

// $('.ui.search').search({source: content});

function init(){
    nav.init()
        // return getUser(3)
    return getUser(3)
    .then( () => {
        $('.ui.accordion')
            .accordion()
            ;
    })

}

function getUser(id){
    return axios(`/users/${id}`)
    .then(result => {
        console.log(result)
        createHeader(result.data[0])
        return axios(`/users/${id}/lists`)
    })
    .then(result => {
        console.log(result)
        const listHTML = []
        result.data.forEach(list => listHTML.push(cardTemplate(list)))
        document.querySelector('.cardHolder').innerHTML = listHTML.join('')
    })
    .then( () => {
        addListenersToMany('.ui.accordion', 'click', function(e){getListItems(e)})
    })
}

function createHeader(data){
    document.querySelector('.profPic').style.backgroundImage = `url("${data.img}")`
    document.querySelector('.name').textContent = `${data.first_name} ${data.last_name}`
    document.querySelector('.profContent').textContent = data.bio
}

function getListItems(e){
    const id = e.currentTarget.parentElement.getAttribute('data-id')
    return axios(`/users/_/lists/${id}/items`)
}
module.exports = {init}