const listOperations = require('./listOperations')
const {axios} = require('./utils')
const {editableItemTemplate} = require('./templates')

function init(){
    const listId = localStorage.getItem('edit')
    if(!listId) return listOperations.init()
    const userId = localStorage.getItem('uId')
    return fillForm(userId, listId)
}

function fillForm(userId, listId){
    
    return axios(`/users/${userId}/lists/${listId}/items`)
    .then(results => {
        addItemInfo(results.data)
        prepButtons()
        return axios(`/users/${userId}/lists/${listId}`)
    })
    .then(result => {
        addListInfo(result.data[0])    
    })
    
}

function addListInfo(list){
    document.querySelector('#list_name').value = list.list_name
    document.querySelector('#img').value = list.img
    document.querySelector('header').style.backgroundImage = `url('${list.img}')`
    document.querySelector('#listContainer').setAttribute('data-id', list.id)
    document.querySelector('textarea').value = list.desc
}

function addItemInfo(itemArr){
    console.log(itemArr)
    document.querySelector('#new').remove()
    document.querySelector('.field:last-of-type').remove()
    const inputArr = []
    itemArr.forEach(item => inputArr.push(editableItemTemplate(item)))
    document.querySelector('.stacked.segment').innerHTML += inputArr.join('')
}

function prepButtons(){
    document.querySelector('#submit').textContent = "change"
    document.querySelector('#listForm').innerHTML += '<button id="cancel" type="button" class="ui fluid large grey submit button">cancel</button>'
    document.querySelector('#cancel').addEventListener('click', cancel)
}

function cancel(){
    localStorage.removeItem('edit')
    window.location.pathname = '/listPage/listPage.html'
}
module.exports = {init}