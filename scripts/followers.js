const {axios} = require('./utils')

const followersButton = document.querySelector('.followers')

followersButton.addEventListener('select', populateFollowers())

function populate(ele) {
    const newAvatar = `<a href="http://localhost:3000/users/:userId/followers/${ele.id}" class="ui bordered medium image followerImage">
    <img data-id="${ele.id} src="./placeholderIcon.png">
  </a>`
  const imageLinks = document.querySelectorAll('followerImage')
  imageLinks.forEach(item => {
    item.addEventListener('click', handleLinks)

    function handleLinks (event, item) {
const id = event.target.getAttribute('data-id')
item.setAttribute('click', 'LINK TO PROFILE PAGE involving ID')
    }
    return newAvatar
}
}
axios.get('http://localhost:3000/users/:userid/followers')
.then (response => {
    const main = document.querySelector('.mainContainer')
    main.innerHTML = response.data.data.map(populate).join('\n')
    window.location = '/followers.html'
})

