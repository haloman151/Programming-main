var currentPage = '#page1'

// Array med filnavne på vores billeder - hvert billede står der to gange så vi kan få par
var images = [
    "assets/bambirhino.jpg", "assets/cropcoptub.jpg", "assets/dogtiger.jpg", "assets/elephorse.jpg",
    "assets/foxmockingbird.jpg", "assets/hamsterfinger.jpg", "assets/owlbear.jpg", "assets/rhinelephant.jpg",
    "assets/sealhorse.jpg", "assets/zeacat.jpg",
    "assets/bambirhino.jpg", "assets/cropcoptub.jpg", "assets/dogtiger.jpg", "assets/elephorse.jpg",
    "assets/foxmockingbird.jpg", "assets/hamsterfinger.jpg", "assets/owlbear.jpg", "assets/rhinelephant.jpg",
    "assets/sealhorse.jpg", "assets/zeacat.jpg"
]

function setup(){
    noCanvas() // Vi bruger HTML elementer, så vi behøver ikke et canvas   
    shiftPage(currentPage) // Skift til startsiden
}

// Funktion til at skifte mellem sider (skjuler den gamle, viser den nye)
function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
