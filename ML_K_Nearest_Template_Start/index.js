// ------------------------------------------------------------------
// UNDERVISNINGS-MANUSKRIPT: ML & KNN (Chart.js Version)
// ------------------------------------------------------------------
// MÅL FOR TIMEN:
// 1. Indlæse data fra CSV
// 2. Rense data og konvertere til objekter
// 3. Visualisere data med Chart.js (Scatter plot)
// 4. Implementere KNN algoritmen (Afstand, Sortering, Afgørelse)
// ------------------------------------------------------------------

// -------------------------------------------------------------
// TRIN 1: GLOBALE VARIABLER OG INDSTILLINGER
// (Start her: Vi skal definere hvad vores program skal kunne huske)
// -------------------------------------------------------------
var table           // Her gemmer vi den rå CSV fil fra p5's loadTable
var data = []       // Her gemmer vi vores rensede data (objekter med x, y, label)
var myChart         // Her gemmer vi selve graf-objektet fra Chart.js

// INDSTILLINGER FOR DATA
var filename = 'assets/exoplanets.csv'
var colX = 'Mass (MJ)'     // X-aksen: Variabel 1 (input)
var colY = 'Semi-major axis (AU)'      // Y-aksen: Variabel 2 (input)
var colLabel = 'Period (days)' // Facit: Hvilken gruppe hører man til?

// GUI Overskrifter (Gør det pænt for brugeren)
var mainTitle = "Burnout Risk Predictor"
var sectionTitle1 = "1. Indtast dine tal"
var instructionText = "Angiv antal pauser og søvntimer:"
var sectionTitle2 = "2. Se Resultat i Grafen"

// Farver til vores grupper (Labels) - Chart.js bruger disse
var colorList = ['red', 'green', 'blue', 'orange', 'purple', 'cyan', 'magenta', 'teal']

function preload() {
    // Indlæs data fil før programmet starter
    table = loadTable(filename, 'csv', 'header')
}



function setup() {
    // 0. SÆT TITLER I HTML
    select('#main-header').html(mainTitle)
    select('#section-1-title').html(sectionTitle1)
    select('#instruction-text').html(instructionText)
    select('#section-2-title').html(sectionTitle2)
    select('#label-x').html(colX)
    select('#label-y').html(colY)

    // -------------------------------------------------------------
    // TRIN 2: RENS DATA
    // (Forklar: Vi konverterer tekst-rækker til rigtige Javascript-objekter)
    // -------------------------------------------------------------
    var rows = table.rows
    rows = shuffle(rows).slice(0, 1000) // Vi begrænser til 1000 punkter for hastighedens skyld
    console.log(rows)

    data = rows.map(row => {
        // Hent værdier fra de kolonner vi valgte i toppen
        // HUSK: Alt fra CSV er tekst, så vi bruger Number() til tallene
        var x = Number(row.get(colX))
        var y = Number(row.get(colY))
        var label = "Ikke kategoriseret" 
        var t = Number(row.get(colLabel))
        if(t < 10){
            label = "10 eller under(dage)"
        }
        if(t > 10 && t < 50){
            label = "mellem 10 til 50"
        }        
        if(t > 50 && t < 150){
            label = "mellem 50 til 150"
        }        
        if(t > 150 && t < 300){
            label = "mellem 150 til 300"
        }        
        if(t > 300 && t < 500){
            label = "mellem 300 til 500"
        }        
        if(t > 500 && t < 800){
            label = "mellem 500 til 800"
        }        
        if(t > 800 && t < 1500){
            label = "mellem 800 til 1500"
        }        
        if(t > 1500 && t < 3000){
            label = "mellem 1500 til 3000"
        }        

        // Tjek om data er gyldig (ikke NaN og har en label)
        if (!isNaN(x) && !isNaN(y) && label) {
            if(y < 50){
                return { x, y, label }
            }
            if(x < 120){
                return { x, y, label }
            }
        }
    }).filter(p => {
        if(p && p.x > 0 && p.y > 0){
            return p
        }
    }) // Fjern tomme pladser i arrayet

    console.log("Data klar:", data.length, "punkter")
    
    // nu skal vi forberede data til at blive vist med chart.js
    var uniqueLabels = []
    data.map( point => {
        //vu kigger på punktets labes. hvis vi ikke har set det label før. Så må der være et uniquelabel.
        if(!uniqueLabels.includes(point.label)){
            uniqueLabels.push(point.label)
        }
    })
    console.log('vi kiggede alle punter igennem og dandt disse labels', uniqueLabels)

    //omdan data til grupper ud fra de forskellige labels
    var datasets = uniqueLabels.map((label, index)=>{
        //FDilter funktion giver os en gruppe med et bestemt label
        var groupData = data.filter( point => {
            return point.label == label
        })
        var col = colorList[index]

        //returner den færdige gruppe med alle datapunkterne for hvert label til dataset
        return {
            label:label,
            data: groupData,
            backgroundColor: col,
            pointRadius: 5,
            pointHoverRadius: 8
        }
    } )
    //Nu indsætter vi et enkelt dataset med brugerens gæt
    datasets.push({
        label: "Dit gæt",
        data:[],
        pointStyle:"crossRot",
        pointRadius: 12,
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 4
    })
    
    console.log('Så fik vi lavet dataset grupperne', datasets)

    //Vi vil nu oprette grafen med chart.js
    const canvasChart = document.getElementById('chartCanvas')
    //så kommer vi til noget lidt objektorienteret
    myChart = new Chart(canvasChart, {
        //scatter et et punktdiagram i 2D (x,Y)
        type: 'scatter',
        data: { datasets:datasets },
        options:{
            //scales styrer havd x og y askerne hedder
            scales:{
                x:{title:{display:true,text:colX}},
                y:{title:{display:true,text:colY}},
            }
        }

    })
    setupControls()
}


function setupControls(){
    //1 find alle x og y værdiger i data
    //2 fordi vi skal bruge dem til at bestmme havd de der sliderre skal gå fra og til
    //Det her betyder map data arreyert og returner alle points.x værdier
    var xValues = data.map( point => point.x)
    var yValues = data.map( point => point.y)
    // beregn misdste og største værdier
    var minX = Math.min(...xValues)
    var minY = Math.min(...yValues)
    var maxX = Math.max(...xValues)
    var maxY = Math.max(...yValues)
    console.log('her er jeres min og max data', minX, maxX, minY, maxY)


    var xSlider = select("#input-x")
    var ySlider = select("#input-y")

    xSlider.attribute('min', Math.floor(minX))
    xSlider.attribute('max', Math.ceil(maxX))
    xSlider.attribute('max', Math.ceil(maxX))
    xSlider.value(minX + maxX / 2)
    //vi gøre det samme med y
    ySlider.attribute('min', Math.floor(minY))
    ySlider.attribute('max', Math.ceil(maxY))
    ySlider.value(minY + maxY / 2)

    //input er sliderens "onchange" event, altså når man flytter den kladens input funktion
    xSlider.input( () => select('#val-x').html( xSlider.value() ) )
    ySlider.input( () => select('#val-y').html( ySlider.value() ) )

    select('#val-x').html( xSlider.value())
    select('#val-y').html( ySlider.value())

    var kSlider = select('#k-slider')
    kSlider.input(()=> select('#k-value').html(kSlider.value() ) )

    select('#predict-btn').mousePressed(classifyUnknown)
    
}

function classifyUnknown(){
    //aflæse værdierne fra sliderne og gem dem i to variabler
    var inputX = select('#input-x').value()
    var inputY = select('#input-y').value()
    //indsæt punket fra sliderne i grafen
    var guessDataset = myChart.data.datasets[myChart.data.datasets.length -1]
    guessDataset.data = [{x: inputX, y: inputY}]
    myChart.update()
    //løb data igennem - atlså alle data punkterne - og find hver og ens afstand til vores gæt
    data.map( p => {
        //dist ligger i p5.js og den laver pythagoras for os 
        p.distance = dist(inputX, inputY, p.x,p.y)
        return p
    })
    //console.log(data)

    //så sorterer vi dem så dem med mindst afstand gættet kommer først
    //sort (a,b) = > tag hvert punkt og sammelign deres distance og sæt dem mindste forrest
    data.sort((a,b) => a.distance - b.distance)
    //spørg de [k] nærmeste hvilken gruppe de høre til
    //neighbours er nu de første k elementer i data arrayet 
    var k = select('#k-slider').value()
    var neighbours = data.slice(0, k)

    //De stemmer om resultatet og vinderen er fundet
    // votes er et tomt objekt 
    var votes = {}
    neighbours.map( n => {
        //vi kigger nu på hvert punkts label
        //hvis det er et nyt label for os, er vi nødt til lige at sætte dets værdi til nul
        //eller kan vi ikke lægge point til bagefter 
        if(votes[n.label] === undefined){
            votes[n.label] = 0

        }
        votes[n.label] += 1
    })

    console.log(votes, 'Her er votes')
    //Obejkt.keys giver os navnene på nøglerne i et objekt, idette tilfælde er det jo vores labels

    var allLabels = Object.keys(votes)

    // start med bare at sige at vinderen er den første label
    var winner = allLabels[0]

    //løb alle labelsne igennem og se hvem der så virkelig er vinderen
    allLabels.map( l => {
        if(votes[l] > votes[winner]){
            winner = l
        }
    })

    //vis i resultatet feltet hvilken klasse gætte tilhøre

    console.log('og vinderen er', winner)

    select('#winner').html(winner)
}