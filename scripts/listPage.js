const {axios} = require('./utils')
const {listItemTemplate, editableItemTemplate} = require('./templates')

function init(){
    let userId = localstorage.getItem('uId')
    let listId = localStorage.getItem('lId')
    let isCopied = false
    let isOwner = false
    document.querySelector('header').setAttribute('data-id', listId)

    return axios(`/users/${userId}/lists/${listId}`)    
    .then(result => {
        for(let i = 0; i < result.data.length; i++) {
            if(result.data[i].is_owner === true && result.data[i].user_id == userId) {
                isOwner = true
                break;
            }
            if(result.data[i].user_id == userId) isCopied = true
        }
        if (result.data[0].user_id) addListInfo(result.data[0])
        return axios(`/users/${userId}/lists/${listId}/items`)
    })
    .then(result => {
        const cardHTML = []
        result.data.forEach(item => cardHTML.push(listItemTemplate(item)))
        document.querySelector('.cardHolder').innerHTML = cardHTML.join('')
        userPrivs(isCopied, isOwner)
    })
    .catch(err => console.log(err))
}

function addListInfo(list) {
    document.querySelector('#listPage header').style.backgroundImage = `url("${list.img}")`
    document.querySelector('#listPage .name').textContent = list.list_name
    document.querySelector('#listPage .profContent').textContent = list.desc
    document.querySelector('title').textContent = list.list_name
}

function userPrivs(copiedBool, ownBool){
    if(!copiedBool && !ownBool) {
        document.querySelector('main').innerHTML += '<div id="takeList" class="ui fluid card"><i class="copy icon"></i></i></div>'
        document.getElementById('takeList').addEventListener('click', takeList)
    }
    if(ownBool) {
        document.querySelector('main').innerHTML += '<div id="addItem" class="ui fluid card"><i class="circle plus icon"></i></i></div>'
        document.querySelector('body').innerHTML += '<div class="editBtn"><i class="pencil icon"></i></div>'
        document.querySelector('.editBtn').addEventListener('click', editList)
        document.querySelector('#addItem').addEventListener('click', addItem) 
    }
}

function takeList(){
    const lId = document.querySelector('header').getAttribute('data-id')
    const userId = localStorage.getItem('uId')

    axios(`/users/${userId}/lists/`, 'put')
    
}

function editList(){
    const lId = document.querySelector('header').getAttribute('data-id')
    localStorage.setItem('edit', lId)
    window.location.pathname = '/listOperations/listOperations.html'
}

function addItem(){
    document.querySelector('body').innerHTML += addItemTemplate(editableItemTemplate)
    $('.ui.modal').modal('show');
    document.querySelector('.cancel').onclick = minimize
    document.addEventListener('keyup', disableIfEmpty)
}

function addItemTemplate(fn){
    return `<div class="ui modal">
        <div class="header">Header</div>
        <form class="ui segment stacked content">
           ${fn()}
            <div class="segment">
                <button type="submit" class="ui approve button teal disabled">add</button>
                <button type="button" class="ui cancel button">cancel</button>
            </div>
        </form>
    </div>`
}

function minimize(){
    const inputs = document.querySelectorAll('.itemData')
    for(let input of inputs){
        input.value = ''
    }
    $('.ui.modal').modal('hide')
    document.querySelector('#addItem').onclick = function(){
        $('.ui.modal').modal('show')
        document.querySelector('keyup', disableIfEmpty)
    }
}

function disableIfEmpty(){
    const approve = document.querySelector('.approve')
    const inputs = document.querySelectorAll('.itemData')
    for (let input of inputs) {
        if (input.value === '') approve.classList.add('disabled')
    }
    approve.classList.remove('disabled')
    approve.onclick = function(e){submit(e)}
}

function submit(e){
    e.preventDefault()
    const userId = document.querySelector('body').getAttribute('data-id')
    const listId = document.querySelector('header').getAttribute('data-id')
    const body = {list_id: listId}
    body.source_url = document.querySelectorAll('.itemData')[0].value
    body.synopsis = document.querySelectorAll('.itemData')[1].value
    return axios(`/users/${userId}/lists/${listId}/items`, 'post', body)
    .then(result => {
        minimize()
        window.location.reload()
    })
    .catch(err =>{
        if(err.response) console.error(err.response.data)
        else console.log('something broke')
    })
}

module.exports = {init, addItemTemplate}