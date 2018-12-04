function cardTemplate(list){
    return `
    <div class="ui card">
        <div class="image">
            <img src="/images/avatar2/large/kristy.png">
            </div>
            <div class="content">
                <p class="header">${list.list_name}</p>
                <div class="description">
                    ${list.desc}
                </div>
            </div>
            <div class="ui accordion">
                <div class="title">
                    <i class="dropdown icon"></i>
                    items
                </div>
                <div class="content">
                </div>
            </div>
        </div>`
}