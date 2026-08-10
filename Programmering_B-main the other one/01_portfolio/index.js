var currentPage ='#page5'

//P5 setup() bliver kaldt en gang føre siden vises
function setup(){
    console.log('P5 setup kaldt')
    //set menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //Løb listen igennem for en
    allPages.map(
        page =>  {
            //Lav et nyt <a> element
            var menuItem = createElement('a')
            //Sæt a taggets html til sidens titel
            menuItem.html(page.attribute('title'))
            //Sæt evenlistener på a tagget
            menuItem.mousePressed(
                ()=> shiftPage('#' + page.attribute('id'))
            )
            //Sæt a tagget ind i sidebaren
            select('.sidebar').child(menuItem)
        }
    )
}



function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}