const cardUrls = [
    'https://i0.wp.com/www.deteched.com/wp-content/uploads/2018/03/36048.jpg?fit=400%2C9999',
    'https://amp.businessinsider.com/images/4f6b6457ecad042a6a000004-320-240.jpg',
    'https://www.lifewire.com/thmb/ZP9CbvCL0JbG-QXQPEYnasuFLYo=/400x300/filters:no_upscale():max_bytes(150000):strip_icc()/shade-free-beach-wallpapers-blirknet-579bd9e43df78c32767d16db.jpg',
    'http://3.bp.blogspot.com/-S8RKzVR9Eiw/TpQ6l17P--I/AAAAAAAABTM/R26pk_gvweI/s400/Rain+wallpapers+for+desktop+1.jpg',
    'http://2.bp.blogspot.com/-8mhU0rT05H8/UoN6q3-_ScI/AAAAAAAAGqU/bqV3LiJiObs/s400/Beautiful-Fish-Wallpapers-For-Desktop.jpg'

]
function cardTemplate(list){
    if(!list.img) list.img = cardUrls[Math.floor(Math.random() * 5)]
    return `
    <div class="ui fluid card" data-id="${list.id}">

        <div class="image">
            <img src="${list.img}">
        </div>

        <div class="content">
            <p class="header">${list.list_name}</p>
            <div class="description">${list.desc}</div>
        </div>

        <div class="ui accordion">
            <div class="title">
                <i class="dropdown icon"></i>
                items
            </div>

            <div class="content"></div>
        </div>

    </div>`
}

function listItemTemplate(item){
    return `
    <a href="${item.source_url}" target="_blank">
    <div class="ui fluid card" data-id="${item.id}">

        <div class="image">
            <iframe src="${item.source_url}" scrolling="no"></iframe>
        </div>
        
        <div class="content">
            <div class="description">${item.synopsis}</div>
        </div>

    </div>
    </a>`
    }

function editableItemTemplate(item = {}){
    return `
    <div class="field">
        <div class="ui left icon input">
            <i class="circle plus icon"></i>
            <input class="itemData listInput" type="url" name="listItem" placeholder="Add a list item URL" value="${item.source_url || ''}">
                    </div>

            <div class="ui left icon input">
                <i class="pencil icon"></i>
                <input class="itemData listInput" type="text" name="listItem" placeholder="Add a list item synopsis" value="${item.synopsis || ''}">
            </div>
    </div>`
}
    
module.exports = {cardTemplate, listItemTemplate, editableItemTemplate}