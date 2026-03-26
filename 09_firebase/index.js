

//lev en ref til din collection
var testRef = db.collection('test')
console.log('oprettet ref til test')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //nu kommer det geniale: onSnapShot
    testRef.onSnapshot( snap => {
        console.log('modtog snap', snap.size)
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
        })
    })
}

