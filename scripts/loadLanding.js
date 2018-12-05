const {axios, addListenersToMany} = require('./utils')
const cardTemplate = require('./templates')

function init(){
    axios('/auth/token')
    .then(result => {
        const id = result.data.id
        return axios(`/users/${id}`)
    })
    .then((result) => {
        document.querySelector('.welcome').textContent += ` ${result.data[0].first_name}!`
        return getUser(3)
    })
    .then( (result) => {
        getCardList(id)
    })

}

function getUser(id){
    axios(`/users/${id}`)
    .then(result => {
        console.log(result)
        createHeader(result.data[0])
        return axios(`/users/${id}/lists`)
    })
    .then(result => {
        console.log(result)
    })
}

const loadCards = cardList => {
    for(let i = 0; i < cardList.length; i++) {
        let card = document.getElementById(`#listCard${i}`)
        card.innerHTML = `
        <div class="image">
            <img src="${cardList[i].img}">
            </div>
            <div class="content">
                <p class="header">${cardList[i].list_name}</p>
                <div class="description">
                    ${cardList[i].desc}
                </div>
            </div>
            <div class="ui accordion">
                <div class="title">
                    <i class="dropdown icon"></i>
                    items
                </div>
                <div class="content">
                </div>
            </div>`
        card.addEventListener('click', (e) => {
            e.preventDefault()

            //add link to list page here
        })
    }
}

const getCardList = (userId) => {
    axios.get(`/users/${userId}/lists`)
    .then(result => loadCards(result))
}

module.exports = {init}