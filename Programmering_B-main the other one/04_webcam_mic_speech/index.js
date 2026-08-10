var currentPage ='#page4'
var capture
var otterSound, rainSound
var recBtn, recorder, audioFile
var Isrecording = false
var speakInp, speakBtn

function preload(){
    otterSound = loadSound('./assets/otter_sound.mp3')
}
//P5 setup() bliver kaldt en gang føre siden vises
function setup(){
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)

    capture = createCapture(VIDEO, {flipped:true})
    capture.size(720,468)
    select('#page1').child(capture)


    //sounds
    select('#otter').mousePressed(()=>{
        otterSound.play()
       //animeret gif
    fireGif = createImg('./assets/Fire.gif')
    select('#page2').child(fireGif)

    var pos = select('#otter').position()
    console.log(pos)
    fireGif.position(pos.x, pos.y + 110) 
})

    rainSound = createAudio('./assets/Riversound.mp3')
    rainSound.showControls()
    select('#page2').child(rainSound)
    //rainSound.play()

    //lydoptagelse
    //start browserens mikrofon
    var mic = new p5.AudioIn()
    mic.start()
    //opret en ny fil til at gemme lyd i
    audioFile = new p5.SoundFile()

    recorder = new p5.SoundRecorder()
    recorder.setInput(mic)

    //DOM binding til knappen
    recBtn = select('#recBtn')
    //start/stop optagelse
    recBtn.mousePressed(()=>{
        if(!Isrecording){
            recorder.record(audioFile)
            Isrecording = true
            recBtn.html('STOP recording')
        }else{
            recorder.stop()
            recBtn.html('Start recording')
            Isrecording = false
            recBtn.html("Start recording")
            setTimeout(()=>{
                audioFile.play()
                save(audioFile, "myVoice.wav")
            }, 20)
        }
    })

    //Speech Synth
    speakInp = select('#speakMe')
    speakBtn = select('#speakBtn')
    //Når man trykker på knappen, læses indholdet i input feltet op
    speakBtn.mousePressed(()=>{
        const utterrance = new SpeechSynthesisUtterance(speakInp.value())
        utterrance.lang = "ur-PK"
        utterrance.rate = 1.4
        utterrance.pitch = 1.4
        speechSynthesis.speak(utterrance)
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