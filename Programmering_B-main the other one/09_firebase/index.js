
//lev en ref til din collection
var quotesRef = db.collection('quotes_data')
console.log('oprettet ref til test')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //nu kommer det geniale: onSnapShot
    quotesRef.onSnapshot( snap => {
        //først skal vi trømme den der div med quotes 
        select('#quotes').html('')
        console.log('modtog snap', snap.size)
        
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
            //nu skal vi oprette en quote

            select('#quotes').child(
                createDiv().addClass('card').child(
                    createDiv(d.text)
                ).child(
                    createDiv(d.author).addClass('author')
                ).child(
                    createDiv(d.timestamp.toDate().toLocaleDateString("da-DK", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long',
                    })).addClass('date')
                
                ).child(
                    createImg('./assets/delete.svg')
                    .addClass('delete')
                    .mousePressed( () => {
                        if(confirm("Er du sikker på at du vil slette dette quote? - permanent og uopretteligt")) 
                        quotesRef.doc(doc.id).delete()
                    }
                )
            ).addClass('quoteBox'))
 
        })
    })
}

function keyPressed(){
        //console.log('key pressed', key)
        if(key == "Enter"){
            //hent teksten fra input feltet
            var q = select('#newQuote').value()
            var author = select('#authorInput').value()
            if(q == "") {
                confirm("Du skal skrive noget i feltet før du trykker enter")
                return
            }
            //Nu skal vi gemme det nye quote i firestore
            //funktion add() på en collection ref
            //Opretter en ny collecntion hvis den ikke findes
            quotesRef.add({
                text: q,
                author: author,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                //.then kaldes asynkront når add er færdig
            }).then(
                console.log('quote gemt i databasen', q) 
            )
            
            select('#newQuote').html('')
            select('#authorInput').html('')
        }
}