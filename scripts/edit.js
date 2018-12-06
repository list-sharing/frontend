const listOperations = require('./listOperations')
const {axios} = require('./utils')

function init(){
    const listId = localStorage.getItem('edit')
    if(!listId) return listOperations.init()
    const userId = localStorage.getItem('uId')
    console.log(listId, userId)
    return fillForm(userId, listId)
}

function fillForm(userId, listId){
    return axios(`/users/${userId}/lists/${listId}`)
    .then(result => {
        console.log(result)
        addListInfo(result.data[0])
        return axios(`/users/${userId}/lists/${listId}/items`)
    })
    .then(results => console.log(results))
}

function addListInfo(list){
    document.querySelector('#list_name').value = list.list_name
    document.querySelector('#img').value = list.img
    document.querySelector('header').style.backgroundImage = `url('${list.img}')`
    document.querySelector('#listContainer').setAttribute('data-id', list.id)
    document.querySelector('textarea').value = list.desc
}

function addItemInfo(itemArr){}

module.exports = {init}