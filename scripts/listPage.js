const {axios} = require('./utils')
const {listItemTemplate} = require('./templates')

function init(){
    const userId = document.querySelector('body').getAttribute('data-id')
    const listId = localStorage.getItem('lId')
    return axios(`/users/${userId}/lists/${listId}`)
    .then(result => {
        console.log(result)
        addListInfo(result.data[0])
        return axios(`/users/${userId}/lists/${listId}/items`)
    })
    .then(result => {
        console.log(result)
        const cardHTML = []
        result.data.forEach(item => cardHTML.push(listItemTemplate(item)))
        document.querySelector('.cardHolder').innerHTML = cardHTML.join('')
    })
    .catch(err => console.log(err))
}

function addListInfo(list){
    document.querySelector('#listPage header').style.backgroundImage = `url("${list.img}")`
    document.querySelector('#listPage .name').textContent = list.list_name
    document.querySelector('#listPage .profContent').textContent = list.desc
}

module.exports = {init}