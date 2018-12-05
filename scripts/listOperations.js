const {axios} = require('./utils')

function init(){
    document.addEventListener('keyup', checkInputs)
    
}

function checkInputs(){
    console.log('firing')
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
    console.log(img.value)
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
    let inputs = document.querySelectorAll('input')
    for(let i = 0; i < vals.length; i++){
        inputs[i].value = vals[i]
    }
}
module.exports = {init}