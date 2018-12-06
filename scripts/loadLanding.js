const {axios} = require('./utils')

function init(){
    axios('/auth/token')
    .then(result => {
        const id = result.data.id
        getCardList(id)
    })
}


const loadCards = (cardList, limit) => {
    if(cardList === undefined) {
        document.getElementById('cardColumnContainer').innerHTML = `
        <h5>There' nothing here.</h5>`
        return
    }
    let incrementTo
    if(cardList.length > limit) {
        incrementTo = limit
    } else {
        incrementTo = cardList.length
    }
    for(let i = 0; i < incrementTo; i++) {
        let card = document.getElementById(`${i}`)
        card.innerHTML = `
        <div class="ui card">
            <div class="image">
                <img src="${cardImage(cardList[i])}">
                </div>
                <div class="content">
                    <p class="header">${cardList[i].list_name}</p>
                    <div class="description">
                        ${cardDesc(cardList[i])}
                    </div>
                </div>
                <div class="ui accordion">
                    <div class="title">
                        <i class="dropdown icon"></i>
                    </div>
                    <div class="content">
                    </div>
                </div>
            </div>`
        card.addEventListener('click', (e) => {
            e.preventDefault()

            //add link to list page here
        })
    }
}


const sortedCards = cardList => cardList.sort(timeStampCompare)

const timeStampCompare = (a, b) => {
    const timeStampA = new Date(a.updated_at).getTime
    const timeStampB = new Date(b.updated_at).getTime

    if(timeStampA > timeStampB) 
        return 1
    
    return -1
}

const cardImage = obj => obj.img ? `${obj.img}` : '../Placeholder.png'

const cardDesc = obj => obj.desc ? `${obj.desc}` : "There's nothing here."

const getCardList = (userId) => {
    axios(`/users/${userId}/lists`)
    .then(result => loadCards(sortedCards(result.data)))
    .catch(() => loadCards())
}

module.exports = {init}