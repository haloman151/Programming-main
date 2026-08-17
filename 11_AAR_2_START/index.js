var client 

function setup(){

    //skit til den normale side
    shiftPage('#page5')

    //lav et kort med funktion createCard
    //createCard('her er teskten', "https://th.bing.com/th/id/R.726237d223dd49b6c96e951f684af619?rik=hnr5PEmvUa3SZA&pid=ImgRaw&r=0", "#cards")


    //mqtt er et objekt vi får fra mqtt bilbioteket i html siden 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        //console.log(msg)
        var toast = select('#toast')
        console.log('Forbundet til NEXT MQTT server')
        select('#toast').html('Forbundet til NEXT MQTT server')
        select('#toast').addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, 2000)
    })

    client.subscribe('sebastian')
    client.publish('sebastian/page')


    // her får vi beskder på forskallige topics vi abonner på
    client.on('message', (topic, msg) => {
        if(topic == 'sebastian/page'){
            msg = msg.toString()
            console.log('nu skal der skifte side')
            //er det et tal?
            msg = '#page' + msg
            shiftPage(msg)
            
         }
            if(topic == 'sebastian'){

            select('#msg').elt.textcontent ='besked på topic '+ topic + 'med texten' + msg
            }

    })

    
}



var currentPage = "#page5"
var readyToShift = true
function shiftPage(newPage){
    if(!select(newPage)) return
    select(currentPage).removeClass('show')
    currentPage = newPage
    select(currentPage).addClass('show')
    readyToShift = false
    setTimeout(()=>readyToShift = true, 5000)
}



function createCard(text, img, destId){
    console.log(img)
    var containerDiv = createDiv().addClass('container')
    var topDiv = createDiv(
        createImg(img)
    ).addClass('top')
    var bottomDiv = createDiv(text).addClass('bottom')
    containerDiv.child(topDiv)
    containerDiv.child(bottomDiv)
    select(destId).child(containerDiv)
}


