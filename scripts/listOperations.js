const {axios, addManyListenersToOne} = require('./utils')
const {editableItemTemplate} = require('./templates')
const edit = require('./edit')

function init(){
    console.log('x')
    const search = window.location.search.slice(1).split('&')
        .map(ele => ele.split('='))
        .reduce((acc, ele) => ({ ...acc, [ele[0]]: ele[1] }), {})
    console.log(search)
    if(search.edit === 'true') return edit.init()
    document.addEventListener('keyup', checkInputs)
    document.addEventListener('keyup', activateBtn)
    addManyListenersToOne('#listContainer', ['click', 'keyup'], checkImg)
}

function checkInputs(){
    const inputs = document.querySelectorAll('input[name="listItem"]')
    for(let input of inputs){
        if(input.value === '') return false
    }
    document.querySelector('#new').classList.remove('disabled')
    document.querySelector('#new').onclick = addNewField
}

function checkImg(){
    const img = document.querySelector('#img')
    if(img.value !== '')
    document.querySelector('#listOps header').style.backgroundImage = `url("${img.value}")`
}

function addNewField(e){
    let vals = persistVals()
    document.querySelector('#new').remove()
    document.querySelector('.ui.stacked').innerHTML += `
                ${editableItemTemplate()}
                <button id="new" type="button" class="ui teal submit button disabled">+</button>`
    return reAddVals(vals)
}

function persistVals(){
    const inputs = document.querySelectorAll('.listInput')
    let vals = []
    for(let input of inputs){
        vals.push(input.value)
    }
    return vals
}

function reAddVals(vals){
    const inputs = document.querySelectorAll('.listInput')
    for(let i = 0; i < vals.length; i++){
        inputs[i].value = vals[i]
    }
}

function activateBtn(){
    const inputs = document.querySelectorAll('input[name="listItem"]')
    const listName = document.querySelector('#list_name')
    if(listName.value === '') return false
    for(let input of inputs){
        if (input.value !== ''){
            document.querySelector('#submit').onclick = function(e){submit(e)}
            return document.querySelector('#submit').classList.remove('disabled')
        }
    }
}

function submit(e){
    e.preventDefault()
    const id = document.querySelector('body').getAttribute('data-id')
    const listBody = accumulateListVals()
    return axios(`/users/${id}/lists`, 'post', listBody)
    .then(result => {
        return result.data.id
    })
    .then(lId => {
        const itemBody = accumulateItemVals(lId)
        const promiseArray = []
        for(let item of itemBody){
            promiseArray.push(axios(`/users/${id}/lists/${lId}/items`, 'post', item))
        }
        Promise.all(promiseArray)
        .then(results =>{
            window.location.pathname = '/signedInLandingPage/signedInLandingPage.html'
        })
    })
    .catch(err => console.error(err.response.data))
}

function accumulateListVals(){
    const body = {}
    body.list_name = document.querySelector('#list_name').value
    body.img = document.querySelector('#img').value
    body.desc = document.querySelector('textarea').value
    return body
}

function accumulateItemVals(lId){
    const body = []
    let entry = {
        source_url: undefined, 
        synopsis: undefined,
        list_id: lId
    }

    const inputs = document.querySelectorAll('.itemData')
    for(let input of inputs){
        if(input.getAttribute('type') === 'url') entry.source_url = input.value
        else entry.synopsis = input.value
        
        if(!!entry.source_url && !!entry.synopsis){
            body.push(entry)
            entry = {list_id: lId} 
        }
    }
    return body
}


module.exports = {init, accumulateItemVals, accumulateListVals, checkImg}