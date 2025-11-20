var currentPage ='#page3'
var mouseX = 0
var mouseY = 0
//P5 setup() bliver kaldt en gang føre siden vises
function setup(){
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)



    
    //Sæt menu op
    // hent alle sider som et array
  var allPages = selectAll('.page')
    // Løb listen igennem en for en
    allPages.map( 
        page => {
            // Lav et nyt <a> element 
            var menuItem = createElement('a')
            menuItem.html(page.attribute('title'))
            // sæt eventlistener på a tagget
            menuItem.mousePressed(
                ()=>shiftPage('#' + page.attribute('id'))      
            )
            // sæt a tagget ind i sidebaren
            select('.sidebar').child(menuItem)

        }
    )
}

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}


document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    //console.log(mouseY, mouseX)


   screenWidth = window.innerWidth
   screenHeight = window.innerHeight

    document.querySelectorAll(".parallax-mouse").forEach(elem => {
        elem.style.transform = `translate(${mouseX - screenWidth / 2}px, ${mouseY - screenHeight / 2}px)`
    })
})


