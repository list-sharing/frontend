const {axios} = require('./utils')

function init(){
    document.addEventListener('keyup', checkInputs)
    document.addEventListener('keyup', activateBtn)
}

function checkInputs(){
    
    const inputs = document.querySelectorAll('input[name="listItem"]')
    for(let input of inputs){
        if(input.value === '') return false
    }
    document.querySelector('#new').classList.remove('disabled')
    document.querySelector('#new').onclick = addNewField
    checkImg()
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
                        <input type="url" name="listItem" placeholder="Add a list item URL">
                    </div>

                    <div class="ui left icon input">
                        <i class="pencil icon"></i>
                        <input type="text" name="listItem" placeholder="Add a list item synopsis">
                    </div>
                </div>
                <button id="new" type="button" class="ui teal submit button disabled">+</button>`
    return reAddVals(vals)
}

function persistVals(){
    const inputs = document.querySelectorAll('input')
    let vals = []
    for(let input of inputs){
        vals.push(input.value)
    }
    return vals
}

function reAddVals(vals){
    const inputs = document.querySelectorAll('input')
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
            document.querySelector('#submit').addEventListener('click', submit)
             return document.querySelector('#submit').classList.remove('disabled')
        }
    }
}

function submit(){
    const listBody = accumulateListVals()
    const itemBody = accumulateItemVals()
    
}

function accumulateListVals(){
    const body = {}
    body.list_name = document.querySelector('#listName').value
    body.img = document.querySelector('#img').value
    body.desc = document.querySelector('textarea').value
    return body
}

function accumulateItemVals(){
    const body = {}
    body.items = []
    const inputs = document.querySelectorAll('input[name="listItem"]')
    for(let input of inputs){
        body.items.push(input.value)
    }
}


module.exports = {init}