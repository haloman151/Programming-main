var gravity 
var friction
var b
var f
var points = 1000
var db
var bSound


    


async function setup() {
  shiftPage('#page1')
 bSound = await loadSound("/api_lib/sounds/Kilroy.mp3")
  var c = createCanvas(windowWidth, windowHeight);
  select('#page2').child(c)
  select('#startButton').mousePressed(startGame)
  select('#restartButton').mousePressed(restartGame)
  gravity = createVector(0, 0.5)
  friction = 0.99
  select('#info').html(points)
  b = new Ball(windowWidth/2, 0, 100, "orange", 12)
  f = new FloatingBall(100, 100, 50, "lightblue", 0, 4)
  

  var fb = new Firebase('jumping_cabbage_data')
  fb.listen(updateHighscore, 5, 'points', 'asc')
}

function updateHighscore(scores){
  console.log('Got result', score)
}

function restartGame() {
  resetGame()
  shiftPage('#page2')

}

function startGame() {
  shiftPage('#page2')

  
}


function draw() {
  background(220)
  b.update()
  b.constrain()
  b.show()
  if(b.hit(f)){
    points--
    bSound.play()
  }
  select('#info').html(points)

  f.update()
  f.constrain()
  f.show()
}

function keyPressed() {
  if(key == " "){
    b.jump()
    f.jump()
  }
}

