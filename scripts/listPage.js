const {axios} = require('./utils')
const {listItemTemplate} = require('./templates')
const nav = require('./nav')

function init(){
   const search = window.location.search.slice(1).split('&')
   .map(ele => ele.split('='))
   .reduce((acc, ele) => ({...acc, [ele[0]]: ele[1]}),{})



    let userId
    let listId = search.listId
    
    nav.init()
    
    axios('/auth/token')
    .then(response=> {
        userId = response.data.id
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

function addListInfo(list) {
    document.querySelector('#listPage header').style.backgroundImage = `url("${list.img}")`
    document.querySelector('#listPage .name').textContent = list.list_name
    document.querySelector('#listPage .profContent').textContent = list.desc
    document.querySelector('title').textContent = list.list_name
}

function addEditBtn(){
    document.querySelector('body').innerHTML += '<div class="editBtn"><i class="pencil icon"></i></div>'
    document.querySelector('.editBtn').addEventListener('click', editList)
}

function editList(){
    const lId = document.querySelector('header').getAttribute('data-id')
    console.log('works', lId)
    localStorage.setItem('edit', lId)
    window.location.pathname = '/listOperations/listOperations.html'
}



module.exports = {init}