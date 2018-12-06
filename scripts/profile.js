const {axios, addListenersToMany} = require('./utils')
const nav = require('./nav')
const {cardTemplate, addModalTemplate} = require('./templates')

function init(){
    let otherUserId = localStorage.getItem('otherUserId')
    nav.init()
    return getUser(otherUserId)
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
    const id = document.querySelector('body').getAttribute('data-id')
    document.querySelector('body').innerHTML += addModalTemplate(function(){profileForm(id)})
    $('.ui.modal').modal('show')
}

function profileForm(userId){
    return axios(`/users/${userId}`)
    .then( result =>{
        user = result.data[0]
        console.log(user)
    return `
        <form id="profileForm" class="ui large form>
              <div class="ui stacked segment">
                        <div class="fields">
                            <div class="field">
                                <input id="first_name" type="text" required maxlength="150" value="${user.first_name}">
                                <input id="last_name" type="text" required maxlength="150" value="${user.last_name}">
                            </div>
                        </div>
    
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="user icon"></i>
                                <input id="img" type="url" name="img" value="${user.img}">
                            </div>
                        </div>

                        <div class="field">
                                <textarea id="bio" name="bio">${user.bio}</textarea>
                        </div>
                    </div>
    
                    <div class="ui error message"></div>
                    <button id="submit" type="submit" class="ui fluid large teal submit button disabled">submit</button>
                </form>`
        })
}

module.exports = {init}