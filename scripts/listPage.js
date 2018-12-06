const {axios} = require('./utils')
const {listItemTemplate} = require('./templates')
const nav = require('./nav')

function init(){
    let userId
    let listId
    return nav.init()
    .then(() => {
        userId = document.querySelector('body').getAttribute('data-id')
        listId = localStorage.getItem('lId')
        return axios(`/users/${userId}/lists/${listId}`)    
    })
    .then(result => {
        console.log(result)
        console.log(result.data[0].user_id, userId)
        if (result.data[0].user_id == userId) addEditBtn()
        if (result.data[0].user_id) addListInfo(result.data[0])
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

function addEditBtn(){
    
}

function addListInfo(list){
    document.querySelector('#listPage header').style.backgroundImage = `url("${list.img}")`
    document.querySelector('#listPage .name').textContent = list.list_name
    document.querySelector('#listPage .profContent').textContent = list.desc
}

module.exports = {init}