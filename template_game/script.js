//we select the game container form html - and save it in a var called game_container
var game_container = document.querySelector('#game-container')
var points_display = document.querySelector('#points-display')
var time_display = document.querySelector('#time-display')
var timeout = 2000
var points = 0
var time_left = 10

//the function takes a asta div element as argument 
function killAsta(asta) {
    game_container.removeChild(asta)
    points += 5
    points_display.textContent = points
    SpawnAsta()
}

function TimeoutAsta(asta) {
    if (game_container.contains(asta))
        game_container.removeChild(asta)
        points -= 2
        points_display.textContent = points
        SpawnAsta()
}

//setInterval is a javascript that runs a function every x millseconds
// in this case we use the function to make new image elements and put them inside the game_container
function SpawnAsta() {
    //vi laver et img element i variablen new_asta
    var new_asta = document.createElement('img')
    var top = Math.random() * 98
    var left = Math.random() * 98
    new_asta.style = `left: ${left}%; top: ${top}%;`
    //we add a source to the new img
    new_asta.src = 'assets/asta.png'
    //we add a classname to it so we can style it 
    new_asta.className = 'asta'
    //we put tuhe new img element inside the game container 
    game_container.appendChild(new_asta)
    //when we click the new img element, we call the KillAsta function which removes it 
    new_asta.addEventListener('click', () => { killAsta(new_asta)} )
    setTimeout(() => {
        TimeoutAsta(new_asta)
    }, timeout )
}
setInterval(() =>{
    time_left -= 1
    time_display.textContent = time_left
    if (time_left == 0) {
            confirm(`You got ${points} points!`)
            location.reload()
    }
    

}, 1000)

time_display.textContent = time_left

points_display.textContent = points
SpawnAsta()


