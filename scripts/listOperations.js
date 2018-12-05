const {axios, addManyListenersToOne} = require('./utils')

function init(){
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
                <div class="field">
                    <div class="ui left icon input">
                        <i class="circle plus icon"></i>
                        <input class="itemData listInput" type="url" name="listItem" placeholder="Add a list item URL">
                    </div>

                    <div class="ui left icon input">
                        <i class="pencil icon"></i>
                        <input class="itemData listInput" type="text" name="listItem" placeholder="Add a list item synopsis">
                    </div>
                </div>
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
    const listBody = accumulateListVals()
    
    const itemBody = accumulateItemVals()
    
    console.log(listBody, itemBody)
}

function accumulateListVals(){
    const body = {}
    body.list_name = document.querySelector('#list_name').value
    body.img = document.querySelector('#img').value
    body.desc = document.querySelector('textarea').value
    return body
}

function accumulateItemVals(){
    const body = []
    let entry = []
    const inputs = document.querySelectorAll('.itemData')
    for(let input of inputs){
        entry.push(input.value)
        if(entry.length === 2){
            body.push(entry)
            entry = []
        }
    }
    return body
}


module.exports = {init}