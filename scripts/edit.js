const {checkImg} = require('./listOperations')
const {axios, addManyListenersToOne} = require('./utils')
const {editableItemTemplate} = require('./templates')
const listOperations = require('./listOperations')

function init(){
    const search = window.location.search.slice(1).split('&')
        .map(ele => ele.split('='))
        .reduce((acc, ele) => ({ ...acc, [ele[0]]: ele[1] }), {})
    //Need to add validation to prevent editing something you don't own
    // if(!isOwner || user_id === uId) return listOperations.init()
    const userId = localStorage.getItem('uId')

    addManyListenersToOne('#listContainer', ['click', 'keyup'], checkImg)
    return fillForm(userId, search.listId)
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
    document.querySelector('#new').remove()
    document.querySelector('.field:last-of-type').remove()
    const inputArr = []
    itemArr.forEach(item => inputArr.push(editableItemTemplate(item)))
    document.querySelector('.stacked.segment').innerHTML += inputArr.join('')
}

function prepButtons(){
    document.querySelector('#submit').textContent = "change"
    document.querySelector('#submit').classList.remove('disabled')
    document.querySelector('#listForm').innerHTML += '<button id="cancel" type="button" class="ui fluid large grey submit button">cancel</button>'
    document.querySelector('#cancel').addEventListener('click', cancel)
    document.querySelector('#submit').addEventListener('click', function(e){submit(e)})
}

function cancel(){
    document.location.href = '/listPage/listPage.html'
}

function submit(e){
    e.preventDefault()
    const userId = document.querySelector('body').getAttribute('data-id')
    const body = accumulateListVals()
    body.id = document.querySelector('#listContainer').getAttribute('data-id')
    const listId = body.id

    return axios(`/users/${userId}/lists/${listId}`, 'put', body)
    .then(result => {
        const itemBody = accumulateItemVals(listId, true)
        const promiseArray = []
        for(let item of itemBody){
            promiseArray.push(axios(`/users/${userId}/lists/${listId}/items/${item.id}`, 'put', item))
        }
        return Promise.all(promiseArray)
    })
    .then(() => {
        document.location.href = '/listPage/listPage.html'
    })

}

//These are duplicates! Ask roger about circular dependencies/two files that require each other
function accumulateListVals() {
    const body = {}
    body.list_name = document.querySelector('#list_name').value
    body.img = document.querySelector('#img').value
    body.desc = document.querySelector('textarea').value
    return body
}

function accumulateItemVals(lId, isEdit = false) {
    const body = []
    let entry = {
        source_url: undefined,
        synopsis: undefined,
        list_id: lId
    }

    const inputs = document.querySelectorAll('.itemData')
    for (let input of inputs) {
        if (input.getAttribute('type') === 'url') entry.source_url = input.value
        else entry.synopsis = input.value
        
        if (isEdit) {
            entry.id = input.parentElement.parentElement.getAttribute('data-id')
        }

        if (!!entry.source_url && !!entry.synopsis) {
            body.push(entry)
            entry = { list_id: lId }
        }
    }
    return body
}

module.exports = {init}