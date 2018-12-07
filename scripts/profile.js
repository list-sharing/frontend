const {axios, addListenersToMany} = require('./utils')
const nav = require('./nav')
const {cardTemplate, profileForm} = require('./templates')

function init(){
    const search = window.location.search.slice(1).split('&')
        .map(ele => ele.split('='))
        .reduce((acc, ele) => ({ ...acc, [ele[0]]: ele[1] }), {})
    let id = search.userId
    if(!id) id = localStorage.getItem('uId')

    return getUser(id)
    .then( () => {
        $('.ui.accordion').accordion();
    })
}

function getUser(id){
    return axios(`/users/${id}`)
    .then(result => {
        createHeader(result.data[0])
        return axios(`/users/${id}/lists`)
    })
    .then(result => {
        const listHTML = []
        result.data.forEach(list => listHTML.push(cardTemplate(list)))
        document.querySelector('.cardHolder').innerHTML = listHTML.join('')
    })
    .then( () => {
        addListenersToMany('.ui.accordion', 'click', function(e){getListItems(e)})
        return axios(`/auth/token`)
    })
    .then( (token) => { 
        if (token.data.id == document.querySelector('body').getAttribute('data-id')) userPrivs()
    })
}

function createHeader(data){
    document.querySelector('.profPic').style.backgroundImage = `url("${data.img}")`
    document.querySelector('.name').textContent = `${data.first_name} ${data.last_name}`
    document.querySelector('.profContent').textContent = data.bio
}

function getListItems(e){
    const listId = e.currentTarget.parentElement.getAttribute('data-id')
    return axios(`/users/_/lists/${listId}/items`)
    .then(result => {
        const contentSection = document.querySelector(`.card[data-id="${listId}"`).children[2].children[1]
        const listArray = []
        result.data.forEach(item => listArray.push(`<li><a href="${item.source_url}" target="_blank">${item.synopsis}</a></li>`))
        contentSection.innerHTML =  `<ul>${listArray.join('')}</ul>`
    })
}

function userPrivs(){
    document.querySelector('body').innerHTML += '<div class="editBtn"><i class="pencil icon"></i></div>'
    document.querySelector('.editBtn').addEventListener('click', edit)
}

function edit(){
    const userId = document.querySelector('body').getAttribute('data-id')
    return axios(`/users/${userId}`)
        .then(result => {
            user = result.data[0]
            document.querySelector('body').innerHTML += profileForm(user)        
        })
        .then(() => {
            $('.ui.modal').modal('show')
            prepButtons()
        })
}

function prepButtons() {
    document.querySelector('#submit').textContent = "change"
    document.querySelector('#submit').classList.remove('disabled')
    document.querySelector('#cancel').addEventListener('click', cancel)
    document.querySelector('#submit').addEventListener('click', function (e) { submit(e) })
}

function cancel(){
    $('.ui.modal').modal('hide')
    document.querySelector('.editBtn').onclick = function(){$('.ui.modal').modal('show')}
}

function submit(e) {
    e.preventDefault()
    const userId = document.querySelector('body').getAttribute('data-id')
    const body = {id:userId}
    const input = document.querySelectorAll('form input')
    body.first_name = input[0].value
    body.last_name = input[1].value
    body.img = input[2].value
    body.bio = document.querySelector('textarea').value
    console.log(body)    

    return axios(`/users/${userId}`, 'put', body)
        .then(result => {
            console.log(result)
            window.location.reload()
        })
}



module.exports = {init}