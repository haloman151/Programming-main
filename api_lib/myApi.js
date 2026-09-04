// Kopiér og videreudvikl funktionerne fra dit personlige API her.
//Demands an html element called with id toast
function showToast(txt, timeout=2000, type="notify"){
        var toast = select('#toast')
        toast.html(txt)
        toast.addClass('toastShow')
        toast.addClass(type)
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, timeout)

}

//funktion der henter og treturner JSON fra et api
async function getJSON( endpoint ){
    //vi starter med at kontakte serveren med et request
    var res = await fetch( endpoint )
    
    //hvis response er ok henter vi json data
    var json = await res.json()
    console.log('hentede poster fra fetchJSON')
    return json

}

// skifter til en ny side når kalt 
function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}


function createCard(tilte = "", text = "", image = ""){
    var card = createDiv().addClass('card')
    card.child(createImg(image))
    card.child(createElement('h2', tilte))
    card.child(createElement('p', text))
    return card 
   
    
    
}