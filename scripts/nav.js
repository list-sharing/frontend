const {axios} = require('./utils')

function init(){
    axios('/auth/token')
        .then(result => {
            const id = result.data.id
            return axios(`/users/${id}`)
        })
        .then((result) => {
            document.querySelector('.welcome').textContent += ` ${result.data[0].first_name}!`
        })
}

module.exports = {init}