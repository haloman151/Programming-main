
//mqtt walkie talke kalder for client
var chars = []
var client
//topic
var topic = "karaktervalg"


function setup() {
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.
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
}




async function getCharacters(){
    //vi starter med at hente karatker fra api
   var characters = await getJSON('https://rickandmortyapi.com/api/character?page=1')
   showCharacters(characters.results)
}


function showCharacters(characters){
    characters.map(c => {
        var card = createCard(c.name, c.species, c.image)
        select('#characters').child(card)
    })
}

