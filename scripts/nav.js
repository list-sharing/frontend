const {axios} = require('./utils')

function init(){
axios('/auth/token')
        .then(result => {
            const id = result.data.id
            localStorage.setItem('uId', id)
            return axios(`/users/${id}`)
        })
        .then((result) => {
            document.querySelector('.welcome').textContent += ` ${result.data[0].first_name}!`
            document.querySelector('body').setAttribute('data-id', result.data[0].id)
            document.querySelector('.viewFollowersDiv i').addEventListener('click', viewFollowers)
            document.querySelector('.addListDiv i').addEventListener('click', viewYourLists)
            document.querySelector('.signoutDiv i').addEventListener('click', signout)
        })
        axios('/lists')
        .then((result)=>{
            var content =[]
            for(let i = 0;i<result.data.length;i++){
                content.push({title: result.data[i].list_name,description:result.data[i].desc,url:`/listPage/listPage.html?listId=${result.data[i].id}`})
            }
            $('.ui.search')
        .search({
            source: content,
            searchFullText: false
        });
        })  
        axios('/lists')
        .then((result)=>{
            var content =[]
            for(let i = 0;i<result.data.length;i++){
                content.push({title: result.data[i].list_name,description:result.data[i].desc,url:`/listPage/listPage.html?listId=${result.data[i].id}`})
            }
            $('.ui.search')
        .search({
            source: content,
            searchFullText: false
        });
        })
        .catch(err => {
            if(err.reponse) console.error(err.response.data)
            if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return signout()
        })
}

function signout(){
    localStorage.removeItem('token')
    localStorage.removeItem('uId')
    localStorage.removeItem('lId')
    localStorage.removeItem('edit')
    window.location.pathname = '/'
}

function viewFollowers () {
    window.location.pathname = "./friendsPage/followers.html"
}

function viewYourLists () {
    window.location.pathname = "./listPage/listPage.html"
}


module.exports = {init}