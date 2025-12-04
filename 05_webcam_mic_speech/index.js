var currentPage ='#page4'
var capture
var otterSound, rainSound, fireGif
var recBtn, recorder, audioFile
var isRecording = false
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
        //Gif
        fireGif = createImg('./assets/fire.gif')
        select('#page2').child(fireGif)

        var pos = select('#otter').position()
        console.log(pos)

        fireGif.position(pos.x, pos.y)
        //skjul odderem så den kan brænde og dø
        select('#otter').hide()
        otterSound.play()

   } )
    //rain sound play
    rainSound = createAudio('./assets/rain.mp3')
    rainSound.showControls()
    select('#page2').child(rainSound)

    //lydoptagelse
    //start browserens mikrofon
    var mic = new p5.AudioIn()
    mic.start()
   //opret en ny fil til at gemme lyd i
   audioFile = new p5.SoundFile()

   recorder = new p5.SoundRecorder()
   recorder.setInput(mic)

   // dom binding til knappen
   recBtn = select('#recBtn')
   //start/stop optagelse
   recBtn.mousePressed(()=> {
        if(!isRecording){
            recorder.record(audioFile)
            isRecording = true
            recBtn.html('STOP recording')
        }else{
            recorder.stop()
            isRecording = false
            recBtn.html("Start recording")
            setTimeout(()=>{
                audioFile.play()
                save(audioFile, "myVoice.wav")

            }, 500)

        }
   })


   //speech synth
   speakInp = select('#speakMe')
   speakBtn = select('#speakBtn')
   // når man trykker på Btn læses inholdet i input up
   speakBtn.mousePressed(()=>{
    const utterance = new SpeechSynthesisUtterance(speakInp.value())
    utterance.lang = "ur-PK"
    utterance.rate = 1.4
    utterance.pitch = 1.4
    speechSynthesis.speak(utterance)
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





