var currentPage = '#page1'
var videoButton, theVideo
var videoPlaying = true

//P5 setup() bliver kaldt en gang føre siden vises
function setup() {
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)

    //videoen
    theVideo = select('#theVideo')
    //Video control button
    videoButton = select('#videoButton')
    videoButton.mousePressed(()=>{
        if(videoPlaying){
            theVideo.pause()
            videoPlaying = false
        }else{
            theVideo.play()
            videoPlaying = true
        }
    })

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
                () => shiftPage('#' + page.attribute('id'))
            )
            // sæt a tagget ind i sidebaren
            select('.sidebar').child(menuItem)

        }
    )


const dropdown = document.getElementById('baggrundsvaelger');
const body = document.body;

const alleBaggrunde = ['Dirtmouth', 'Greenpath', 'Cityoftears', 'Crystalpeak', 'Hive', 'Abyss']; 


function skiftBaggrund(nyKlasse) {

    body.classList.remove(...alleBaggrunde);
    

    body.classList.add(nyKlasse); 
}


dropdown.addEventListener('change', function() {

    const valgtKlasse = dropdown.value; 
    skiftBaggrund(valgtKlasse);
});


document.addEventListener('DOMContentLoaded', function() {
    skiftBaggrund(dropdown.value);
});

    //Drop Downs
    //var theDropdown = select('#theDropdown')
    //Event listener: changed
    //theDropdown.changed(() => {
        //select('#page3').style('background-image', theDropdown.value())
    //})
}

function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}