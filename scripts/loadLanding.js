const {axios} = require('./utils')

function init(){
    axios('/auth/token')
    .then(result => {
        const id = result.data.id
        getCardList(id)
    })

    axios('/lists')
    .then(result => {
        console.log(result.data)
        let sortedData = result.data.sort(timeStampCompare)
        console.log(sortedData)
        loadNewsFeed(sortedData)})
}


const loadCards = (cardList, limit) => {
    if(cardList === undefined) {
        document.getElementById('cardColumnContainer').innerHTML = `
        <h3 style="display:flex; justify-content: center; font-size: 2em;">There's nothing here.</h3>`
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
            <div class="cardImage" style="background-image: url('${cardImage(cardList[i])}')">
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

            window.location.pathname = `http://127.0.0.1:8080/listPage/listPage.html?listId=${cardList[i].id}`
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
    .then(result => loadCards(sortedCards(result.data), 12))
    .catch(() => loadCards())
}

const loadNewsFeed = (lists) => {
    if(lists === undefined) {
        document.getElementById('newsFeed').innerHTML = `
        <h3 style="display:flex; justify-content: center; font-size: 2em;">There's nothing here.</h3>`
        return
    }

    let feed = document.getElementById('newsFeed')
    let incrementTo

    if(lists.length > 10) {
        incrementTo = 10
    } else {
        incrementTo = lists.length
    }

    for(let i = 0; i < incrementTo; i++){
        if(i % 2 === 0) {
            feed.innerHTML += `
            <div class="item" id="newsFeedCard">
                <div class="content">
                    <a class="header">${lists[i].list_name}</a>
                    <div class="meta">
                        <span>${cardDesc(lists[i])}</span>
                    </div>
                <div class="description">
                    <p id="descfeed5"></p>
                </div>
                <div class="extra">
                        <p id="timefeed5"></p>
                </div>
                </div>
                <div class="image" id="feedImage" style="background-image: url('${cardImage(lists[i])}')">
                </div>
            </div>`
        } else {
            feed.innerHTML += `
            <div class="item" id="newsFeedCard">
                <div class="image" id="feedImage" style="background-image: url('${cardImage(lists[i])}')">
                </div>
                <div class="content">
                    <a class="header">${lists[i].list_name}</a>
                    <div class="meta">
                        <span>${cardDesc(lists[i])}</span>
                    </div>
                    <div class="description">
                        <p id="descfeed5"></p>
                    </div>
                    <div class="extra">
                        <p id="timefeed5"></p>
                    </div>
                </div>
            </div>`
        }
    }

}

module.exports = {init}