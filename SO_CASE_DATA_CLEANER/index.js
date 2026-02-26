//This script takes a csv file and clean the data into a js array


var table 
//cleanData will hold the javascript objects we intend to use 
var cleanData = []

const csvFile = './assets/exoplanets.csv'
//vi vil kun bruge max tusind rækker - da vi skal tegne dem på skærmen
const maxRows = 100
function preload(){
    //load table er en p5 funktion der henter en table fra en fil
    table = loadTable(csvFile, 'csv', 'header')
    console.log('Data table loaded', table)

}

//kan jeg lave en alguretme som kan forudse hilvken byer som var mest berrøet af chernobyl aka kraft tal 
function setup(){
    console.log("rå data kolonner:", table.columns)
    var xValue = "Mass (MJ)"
    var yVaule = "Semi-major axis (AU)" 
    var labelVaule = "Period (days)"

    //table.rows er et array med alle data objeckter i 
    //map returnerer et nyt array med de dimensioner vi gerne vil have
    cleanData = table.rows.map( row => {
        var x = row.get(xValue)
        var y = row.get(yVaule)
        var returnObj = {
            [xValue] : Number(x),
            [yVaule] : Number(y)
        }
        if(labelVaule){
            returnObj.label = Number(row.get(labelVaule))
        }
        return returnObj
    })
    // Vi filterer så lige arrayet så vi er sikre på at alle de dimensioner vi skal bruge er
    cleanData = cleanData.filter( row => {
        // valid er true hvis begge felter er et tal.
        var valid = !isNaN(row[xValue]) && !isNaN(row[yVaule])
        //Men vi skal også tjekke om label er noget hvis vi har en label
        if(labelVaule && !row.label){
            valid = false
        } 
        return valid
    })
    //bland data vilkårligt (p5 funktion der blader et array)
    cleanData = shuffle(cleanData)

    cleanData = cleanData.slice(0, maxRows)


    console.log('Så have vi renset data:', cleanData)
    select('#status').html('vi har nu renset data og skåret det ned til max 100rækker - kig i konsollen')
}




