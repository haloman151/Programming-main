// Dine genbrugelige API-funktioner kommer her.

let currentPage = '#page1'
let timerInterval = null
let timerSeconds = 0
let minLyd;

function preload() {
  minLyd = loadSound('assets/Kilroy.mp3');
}   


//Demands an html element with id="toast
function showToast(txt, timeout=2000, type="notfiy"){
    var toast = select('#toast')
    console.log('Forbundet til NEXT MQTT server')
        toast.html(txt)
        toast.addClass('toastShow')
        toast.addClass(type)
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, timeout)
}

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

function startTimer(displayId = '#timer') {
    stopTimer()
    timerSeconds = 0
    updateTimerDisplay(displayId)
    timerInterval = setInterval(() => {
        timerSeconds++
        updateTimerDisplay(displayId)
                if (currentPage === '#page2' && timerSeconds === 15) {
            if (minLyd && minLyd.isLoaded()) {
                minLyd.play();
            }
        }
    }, 1000)
}

function updateTimerDisplay(displayId) {
    let el = select(displayId)
    if (el) {
        let text = timerSeconds + ' sek'
        el.html(text)
        return text
    }
    return null
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
    }
}




