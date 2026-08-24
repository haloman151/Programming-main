// Dine genbrugelige API-funktioner kommer her.


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

// skifter til en ny side når kalt 
function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}