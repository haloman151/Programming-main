// ============================================
// STATE
// ============================================
var currentPage = '#start'
var gameState = 0
var timerInterval = null
var seconds = 0

// Rum 1: antal fundne symboler
var symbolsFound = 0

// Rum 2: lock clicks
var lockClicks = 0
let lockTimer = null  //Holde styr på alle indegående timeouts

// Rum 3: button puzzle
var correctButton = 2  // button 2 is correct (index 2 means room3-btn2)
// Rum 3: Zomboss sound
var zombossSound

// Rum 4: Music hint sound
var musikHintSound

// Rum 4: 10-step sequence — change node at any step to reconfigure the puzzle
var nodeAnswer = ['node1', 'node2', 'node1', 'node2', 'node3', 'node4', 'node3', 'node4', 'node2', 'node4']
var nodeStep = 0

// Rum 4: Node sounds
var nodeSounds = {}

// rum 6: keypad input
var keypadAnswer = ['1212']
// Firestore reference
var scoresRef = db.collection('User_score')

// ============================================
// PRELOAD — Load lydefilerne før setup
// ============================================
function preload() {
    nodeSounds['node1'] = loadSound('./assets/Node1.mp3')
    nodeSounds['node2'] = loadSound('./assets/Node2.mp3')
    musikHintSound = loadSound('./assets/MusikHint.mp3')
    nodeSounds['node3'] = loadSound('./assets/Node3.mp3')
    nodeSounds['node4'] = loadSound('./assets/Node4.mp3')
    zombossSound = loadSound('./assets/zomboss_voiceline.mp3')
}

// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {
    noCanvas()
    shiftPage('#start')
    loadHighScores()

    // ---- STARTSIDE ----
    select('#btn-start').mousePressed(() => {
        startGame()
    })

    // ---- RUM 1: Hotspots ----
    select('#room1 #symbol1').mousePressed(() => findSymbol('#room1 #symbol1'))
    select('#room1 #symbol2').mousePressed(() => findSymbol('#room1 #symbol2'))
    select('#room1 #symbol3').mousePressed(() => findSymbol('#room1 #symbol3'))
    select('#room1 #symbol4').mousePressed(() => findSymbol('#room1 #symbol4'))
    select('#room1 #symbol5').mousePressed(() => findSymbol('#room1 #symbol5'))
    select('#room1 #symbol6').mousePressed(() => findSymbol('#room1 #symbol6'))
    select('#room1 #symbol7').mousePressed(() => findSymbol('#room1 #symbol7'))
    select('#room1 #symbol8').mousePressed(() => findSymbol('#room1 #symbol8'))
    select('#room1 #symbol9').mousePressed(() => findSymbol('#room1 #symbol9'))
    select('#room1 #symbol10').mousePressed(() => findSymbol('#room1 #symbol10'))
    select('#room1 #symbol11').mousePressed(() => findSymbol('#room1 #symbol11'))
    select('#room1 #symbol12').mousePressed(() => findSymbol('#room1 #symbol12'))

    
    // ---- RUM 2: Lock ----
    select('#room2 #symbol1').mousePressed(() => clickLock())

    // ---- RUM 3: Button Puzzle ----
    
    select('#Zomboss-Sound').mousePressed(() => {
        zombossSound.play()
    })

    selectAll('.room3-choice').forEach(btn => {
        btn.mousePressed(() => checkRoom3Answer(btn.attribute('data-choice')))
    })

    // ---- RUM 4: Noder ----
    select('#room4 #node1').mousePressed(() => clickNode('node1'))
    select('#room4 #node2').mousePressed(() => clickNode('node2'))
    select('#room4 #node3').mousePressed(() => clickNode('node3'))
    select('#room4 #node4').mousePressed(() => clickNode('node4'))

    select('#room4 #room4-btn1').mousePressed(() => {
        musikHintSound.play()
    })

    // ---- RUM 5: Navigation buttons ----
    select('#room5-btn1').mousePressed(() => {
        shiftPage('#room6')
    })

    select('#room5-btn2').mousePressed(() => {
        enterRoom7()
    })

    // ---- RUM 6: KEYPAD ----
    select('#keypad-btn1').mousePressed(() => {
        keypadInput('1')
    })
    select('#keypad-btn2').mousePressed(() => {
        keypadInput('2')
    })
    select('#keypad-btn3').mousePressed(() => {
        keypadInput('3')
    })
    select('#keypad-btn4').mousePressed(() => {
        keypadInput('4')
    })
    select('#keypad-btn5').mousePressed(() => {
        keypadInput('5')
    })
    select('#keypad-btn6').mousePressed(() => {
        keypadInput('6')
    })
    select('#keypad-btn7').mousePressed(() => {
        keypadInput('7')
    })
    select('#keypad-btn8').mousePressed(() => {
        keypadInput('8')
    })
    select('#keypad-btn9').mousePressed(() => {
        keypadInput('9')
    })
    select('#keypad-btn0').mousePressed(() => {
        keypadInput('0')
        
    })
    select('#codeCheck').mousePressed(() => {
        checkKeypadAnswer()
        
    })

    // ---- RUM 7: Quiz ----
    select('#room7-submit').mousePressed(() => {
        checkRoom7Answer()
    })

    



    // ---- SLUTSIDE ----
    select('#btn-save').mousePressed(() => {
        saveHighScore()
    })

    select('#btn-restart').mousePressed(() => {
        resetGame()
    })
}

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

// ============================================
// ROOM 7 — Character fade-in then quiz
// ============================================
function enterRoom7() {
    shiftPage('#room7')
    
    // Hide the quiz initially
    select('#room7-quiz').style('display', 'none')
    
    // Start the fade-in animation
    select('#room7-character').addClass('fade-in')
    
    // After fade-in completes, show the quiz
    setTimeout(() => {
        select('#room7-quiz').style('display', 'grid')
    }, 3000)
}

// ============================================
// TIMER — tæller 1 op hvert sekund
// ============================================
function startTimer() {
    seconds = 0
    timerInterval = setInterval(() => {
        seconds++
        select('#timer').html(seconds + ' sek')
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval)
}

// ============================================
// START SPIL
// ============================================
function startGame() {
    gameState = 0
    symbolsFound = 0
    lockClicks = 0
    cloudStep = 0
    startTimer()
    shiftPage('#room5')
}

// ============================================
// RUM 1: Click på alle sol symbolerne
// ============================================
function findSymbol(id) {
    select(id).hide()
    symbolsFound++
    select('#room1-found').html('Fundet: ' + symbolsFound + ' / 12')

    if (symbolsFound === 12) {
        gameState = 1
        shiftPage('#room2')
    }
}

// ============================================
// RUM 2: KLIK LÅS 12 GANGE
// ============================================
function clickLock() {
        if (lockTimer !== null) {
        clearTimeout(lockTimer)
        lockTimer = null
    }   
    lockClicks++
    select('#room2 #symbol1').html('🔒 (' + lockClicks + ')')
    
//The player has to click and wait 3 seconds on the 12th click to get through the door. If they click more or less than 12 times, the counter resets and they have to start over.
    if (lockClicks === 12) {
        lockTimer = setTimeout(() => {
            if (lockClicks === 12) {
                select('#room2 #symbol1').html('🔓')
                gameState = 2
                shiftPage('#room3')
            }
            lockTimer = null
        }, 3000)
    }else{ //(lockClicks > 12 || lockClicks < 12) 
    lockTimer = setTimeout(() => {
        lockClicks = 0
        select('#room2 #symbol1').html('🔒')
        lockTimer = null
        }, 3000)
    }
}

// ============================================
// RUM 3: BUTTON PUZZLE
// ============================================
function clickPuzzleButton(buttonNum) {
    if (buttonNum === correctButton) {
        gameState = 2
        shiftPage('#room4')
    } else {
        select('#room3-hint').html('Forkert knap! Prøv igen')
        setTimeout(() => {
            select('#room3-hint').html('Vælg den korrekte knap')
        }, 1500)
    }
}


function checkRoom3Answer(choice) {
    if (choice === 'zomboss') {
        gameState = 4
        shiftPage('#room4')
    } else {
        loseGame()
        setTimeout(() => {
            select('#room3-hint').html('Lyt til lyden og vælg det rigtige billede')
        }, 1500)
    }
}
// ============================================
// RUM 4: KLIK NODER I RÆKKEFØLGE
// ============================================


function clickNode(id) {
    if (nodeSounds[id]) {
        nodeSounds[id].play()
    }

    // Check if correct sequence
    if (id === nodeAnswer[nodeStep]) {
        nodeStep++
    } else {
        nodeStep = 0
    }

    if (nodeStep === nodeAnswer.length) {
        shiftPage('#room5')
    }
    
}

function checkRoom7Answer() {
    var answer = select('#room7-answer').value().toLowerCase()
    if (answer.includes('light')) {
        gameState = 5
        stopTimer()
        select('#final-time').html('Du slap fri på ' + seconds + ' sekunder!')
        shiftPage('#complete')
    } else {
        select('#room7-error').html('Ikke helt - prøv igen!')
    }
}


// ============================================
// RUM 6: KEYPAD INPUT
// ============================================

function keypadInput(num) {
    var currentInput = select('#keypad-display').html() 
    select('#keypad-display').html(currentInput + num)
}

function checkKeypadAnswer() {
    var input = select('#keypad-display').html()
    if (input === keypadAnswer[0]) {
        stopTimer()
        select('#final-time').html('Du slap fri på ' + seconds + ' sekunder!')
        gameState = 5
        shiftPage('#complete')
    } else {
        select('#room6-hint').html('tænk over de 2 første rum du var i. Hvor mange sol var der i rum1 og hvor mange gang skulle du trykke på låsen i rum2.')
        select('#keypad-display').html('')
    }
}



// ============================================
// HIGH SCORE (Firestore)
// ============================================
function loadHighScores() {
    scoresRef.orderBy('seconds', 'asc').limit(10).onSnapshot(snap => {
        select('#score-list').html('')
        snap.forEach(doc => {
            var d = doc.data()
            var li = createElement('li')
            li.child(createElement('span', d.name))
            li.child(createElement('span', d.seconds + ' sek'))
            select('#score-list').child(li)
        })
    })
}


function saveHighScore() {
    var name = select('#player-name').value().trim()
    if (name === '') {
        select('#player-name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    console.log('Du trykkede Gem! Navn:', name, '— Tid:', seconds, 'sek')
    console.log('TODO: Åbn firebase.js og indsæt jeres Firebase-config. Derefter virker scoresRef.add() og gemmer data i Firestore.')

    // Udkommenter linjen herunder når firebase.js er sat op:
    scoresRef.add({ name: name, seconds: seconds }).then(() => {
         select('#btn-save').attribute('disabled', true)
         select('#btn-save').html('Gemt!')
    })
}


// ============================================
// LOSE page
// ============================================
    function loseGame() {
        stopTimer()
        var loseReset = shiftPage('#lose')
        select('#btn-restart-lose').mousePressed(() => {
            resetGame()
        })
    }    


// ============================================
function resetGame() {
    stopTimer()
    gameState = 0
    symbolsFound = 0
    seconds = 0
// RESET #symbol1').html('🔒')
    select('#room2 #symbol1').show()
    lockClicks = 0
    select('#timer').html('0 sek')

    // Nulstil rum 1
    select('#room1-found').html('Fundet: 0 / 12')
    select('#room1-hint').html('Find de 12 sol symboler ved at klikke på dem')
    select('#room1 #symbol1').show()
    select('#room1 #symbol2').show()
    select('#room1 #symbol3').show()
    select('#room1 #symbol4').show()
    select('#room1 #symbol5').show()
    select('#room1 #symbol6').show()
    select('#room1 #symbol7').show()
    select('#room1 #symbol8').show()
    select('#room1 #symbol9').show()
    select('#room1 #symbol10').show()
    select('#room1 #symbol11').show()
    select('#room1 #symbol12').show()

    // Nulstil rum 2
    select('#room2-hint').html('Klik et ukendt antal gange og vent 3 sek for at komme igennem døren (Numret er mellem 1-20 og starter med T)')
    select('#room2 #symbol1').show()


    // Nulstil rum 3
    select('#room3-hint').html('Vælg den korrekte knap')

    // Nulstil rum 4

    //Nulstil rum 6
    select('#room6-hint').html('Find det korrekte nummer på tastaturet')
    select('#keypad-display').html('')

    // Nulstil rum 7
    select('#room7-character').removeClass('fade-in')
    select('#room7-quiz').style('display', 'none')
    select('#room7-answer').value('')
    select('#room7-error').html('')

    // Nulstil slutside
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')

    shiftPage('#start')
}