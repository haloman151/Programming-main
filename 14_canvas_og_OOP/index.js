var gravity 
var friction
var b
var f
var points = 1000
var db
var bSound
var startTime
var timerRunning = false
var santa
var rocket
var isHit = false
var background1
var floatingBalls = []
var nextSpawnTime
var finalTime
var santaData

async function setup() {
  shiftPage('#page1')
  background1 = await loadImage("./assets/sky.png")
  santa = await loadImage("./assets/santa.png")
  rocket = await loadImage("./assets/rocket.png")
  bSound = await loadSound("/api_lib/sounds/Kilroy.mp3")
  
  var c = createCanvas(windowWidth, windowHeight);
  select('#page2').child(c)
  select('#startButton').mousePressed(startGame)
  select('#restartButton').mousePressed(restartGame)
  select('#saveHighscore').mousePressed(saveHighscore)

  santaData = db.collection('santaGame_data')
  
  gravity = createVector(0, 0.5)
  friction = 0.99
  select('#info').html(points)
  b = new Ball(windowWidth/2, 0, 100, "orange", 12, santa)
  f = new FloatingBall(100, 100, 70, "lightblue", 0, 4, rocket)
  floatingBalls.push(f)


  var fb = new Firebase('santaGame_data')
  fb.listen(updateHighscore, 5, 'time', 'desc')
}

function updateHighscore(scores){
  var container = select('#highScore')
  container.html('')
  scores.forEach(s => {
    var da = createDiv()
    da.elt.textContent = s.name + ': ' + s.time + 's'
    da.parent(container)
  })
}

function saveHighscore(){
  santaData.add({
    name: select('#name').value(),
    time: finalTime,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
}

function restartGame() {
  shiftPage('#page2')
  startTime = millis()
  timerRunning = true
  isHit = false
  floatingBalls = [f]
  nextSpawnTime = millis() + 10000
}

function startGame() {
  shiftPage('#page2')
  startTime = millis()
  timerRunning = true
  isHit = false
  floatingBalls = [f]
  nextSpawnTime = millis() + 10000
}


function draw() {
  background(background1) 
  b.update()
  b.constrain()
  b.show()
  if(!isHit && floatingBalls.some(fb => b.hit(fb))){
    isHit = true
    points--
    bSound.play()
    timerRunning = false
    finalTime = floor((millis() - startTime) / 1000)
    select('#finalTime').html(finalTime)
    shiftPage('#page3')
  }
  select('#info').html(points)

  if(timerRunning){
    select('#counter').html(floor((millis() - startTime) / 1000))
    // der her er en timer der spawner en floatingball hvert 10 sekund(det var også såen at fandt ud af "random" fuktionen)
    if(millis() >= nextSpawnTime){
      floatingBalls.push(new FloatingBall(100, random(100, 1200), 70, "lightblue", 0, 4, rocket))
      nextSpawnTime += 10000
    }
  }

  for(var fb of floatingBalls){
    fb.update()
    fb.constrain()
    fb.show()
  }
}

function keyPressed() {
  if(key == " "){
    b.jump()
    floatingBalls.forEach(fb => fb.jump())
  }
}

