var currentPage ='#page1'

pushButton = select('#pushButton')


function setup(){
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)


    let scores = [
    {name: "Rikke", seconds: 42},
    {name: "Peter", seconds: 55},
    {name: "Zenia", seconds: 38},
    {name: "Henrik", seconds: 29},
    {name: "Hans", seconds: 40}
    ]

    

    console.log(scores[0], "the first")

    console.log(scores.length, "hvor mange der er")

    console.log(scores)
    createList(scores)
    score.map((e)=>{
        console.log('Denne person i klassen hedder ' + e)
    
    select('#pushbutton').mousePressed(() => {
        console.log('du har gemt')
        saveScore()
    })
    
})



function loadHighScores() {
    score.orderBy('seconds', 'asc').limit(10)
      select('#scoreList').html(() => {
        
      })
    }l


    
       
    
       
           
    




function saveScore(){
    var save = select('#navnInput', '#sekInput')
    if (pushButton.mousePressed())  {
        console.log(pushButton.mousePressed())
        select(save).push(scores)
        
    }
    
    
}


// shift page funktion
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}