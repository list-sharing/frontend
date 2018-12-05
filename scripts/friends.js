const knex = require('knex')

const friendsButton = document.querySelector('.friends')

friendsButton.addEventListener('select', populateFriends())

function populateFriends(userId) {
    return knex('friends')
    .innerJoin('users', 'friends.user_id', 'users.id')
    .where({'users.id':userId})
    .then(response=> {
        window.location = '/friends.html'
        return response.name
    })
}