const {
    axios
} = require('./utils')

function init() {

    axios('/auth/token')
    .then(function(response){
        const id = response.data.id
        return axios(`/users/${id}/followers`)
    })
        .then(response => {
            const main = document.querySelector('.mainContainer')
            main.innerHTML = response.data.map(renderFollowers).join('\n')
        })
}

function renderFollowers(ele){
    localStorage.setItem('otherUserId', ele.id)
    return `<div class="three wide column"><div class="ui card"><a href="http://localhost:3000/profilePage/profile.html" class="ui bordered medium image followerImage">
<img data-id="${ele.id}" src="${ele.img}"><label>${ele.first_name} ${ele.last_name}</label></a></div></div>`
}



module.exports = {
    init
}

