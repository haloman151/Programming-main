var client
var topic = "karaktervalg"
function setup() {
    // Bind controllerens knapper og send handlinger over MQTT her.
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.
   
    //init mqtt
    getCharacters()
    //init mqtt
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', ()=> {
        showToast('Forbundet til MQTT')
        client.subscribe(topic)
    })
    client.on('message', (topic, ms) => {
        showToast('Modtog besked: ${ms.toString()}')
        var msObject = JSON.parse(ms.toString())
        console.log(msObject.name)
    })

    



    select('#playerA').mousePressed(()=> choosePlayer('A'))
}


function choosePlayer(){

}


function showCharacters(characters){
    characters.map(c => {
        var card = createCard(c.name, c.species, c.image)
        select('#characters').child(card)
    })
}



async function getCharacters(){
    //vi starter med at hente karatker fra api
    
}