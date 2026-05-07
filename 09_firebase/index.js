

//lev en ref til din collection
var quotesRef = db.collection('quotes_data')
console.log('oprettet ref til test')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //nu kommer det geniale: onSnapShot
    quotesRef.onSnapshot( snap => {
        console.log('modtog snap', snap.size)
        
        // ryd qoutes div og sæt de nye quotes ind
        snap.forEach
        // Call showQuotes til at vise de ny quotes
        //showQuotes(snap);
        
        snap.forEach(doc => {
            var d = doc.data();
            select('#quotes')
            .child(
                createDiv().child(
                    createDiv(d.text)
                )
            .child(
                createDiv(d.timestamp.toDate().toLocaleDateString("da-DK", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    }))
            .addClass('date')
            ).addClass('quote-box')
            ).child(
                createImg('./assets/delete.svg')
                .addClass('delete')
                .mousePressed( () => {
                    if(confirm("erdu sikker på du vil slette dette quote?"
                    )){
                        
                        quotesRef.doc(doc.id).delete()
                    }
                } )
            )

        })       
    })
}

//keu pressed er en indbygget p5.js funktion
function keyPressed(){
    //console.log(key)
    if(key == "Enter"){
        //hent teksten fra input feltet
        var q = select('#newQuote').value()
        if(q == ""){
            confirm('skrive venligt noget før du trykker enter')
            return
        }
        // nu skal vi gemmme det nye quote i firestore
        //funktion add() på en collectionref
        //opretter en ny collection hvis den ikke finds
        quotesRef.add({
            text: q,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            //.then kaldes asynkront når add() er færdig
        }).then(
            console.log('quote gemt i databasen', q)
        )
        select('#newQuote').html('')
    }
}




