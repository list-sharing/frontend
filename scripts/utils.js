const axiosMod = require('axios')

function axios(url, method = 'get', body = null){
    let bearerToken = ''
    const token = localStorage.getItem('token')
    
    if(token) bearerToken = `Bearer ${token}`

    return axiosMod('http://localhost:3000' + url, {
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

module.exports = {axios, addListenersToMany}