const axiosMod = require('axios')

function axios(url, method = 'get', body = null){
    let bearerToken = ''
    const token = localStorage.getItem('token')
    
    if(token) bearerToken = `Bearer ${token}`

    return axiosMod('https://list-in.herokuapp.com' + url, {
        method: method,
        headers: { Authorization: bearerToken },
        data:body
    })
}

function addListenersToMany(ele, trigger, fn){
    const elements = document.querySelectorAll(ele)
    for(element of elements){
        element.addEventListener(trigger, fn)
    }
}

function addManyListenersToOne(ele, triggerArr, fn){
    for(let trigger of triggerArr){
        document.querySelector(ele).addEventListener(trigger, fn)
    }
}

module.exports = {axios, addListenersToMany, addManyListenersToOne}