const {axios} = require('./utils')

function init(){
    axios('/auth/token')
    .then(result => {
        const id = result.data.id
        getCardList(id)
    })
}

const loadCards = cardList => {
    if(cardList === undefined) {
        document.getElementById('cardColumnContainer').innerHTML = `
        <h5>There' nothing here.</h5>`
        return
    }
    for(let i = 0; i < cardList.length; i++) {
        let card = document.getElementById(`listCard${i}`)
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
    axios(`/users/${userId}/lists`)
    .then(result => loadCards(result.data))
    .catch(() => loadCards())
}


module.exports = {init}