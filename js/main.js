document.querySelector('#reset').addEventListener('click', clear)
const tiles = document.querySelectorAll('.tile')
const colors1 = document.querySelectorAll('.colors1')
const colors2 = document.querySelectorAll('.colors2')
const winTrios = ['.row1', '.row2', '.row3',
                  '.col1', '.col2', '.col3',
                  '.diag1', '.diag2']
let player = true
let colorToggle
let turns = 0
//Adda check to make sure player1Color !== player2Color
//player acts as a boolean vlalue to switch between the two players
let player1Color = 'rgb(34, 193, 195)'
let player2Color = 'rgb(253,187,45)'

function endCheck(){
    winTrios.forEach(trio => {
        let checker = document.querySelectorAll(trio)
        let arrayChecks = 0
        checker.forEach(e => e.style.background == colorToggle ? arrayChecks += 1 : console.log(e.style.background, colorToggle))
        //check.forEach(e => console.log(`Style background: ${e.style.background}`, '\n', `Color toggle: ${colorToggle}`,
        //'\n', colorToggle == e.style.background    ))
        console.log(`Array checks: ${arrayChecks}` )
        if (arrayChecks === 3) {
            turns = 0
            let pWinner = player === true ? 'Player 1' : 'Player 2'
            pNotification(`${pWinner} Wins`)
            console.log('At arrayChecks')
           
        }
    })

    if (turns === 9) {
        pNotification('Its a tie')
    }
}
//sets colors to equal properties
colors1.forEach(color1 => {
    console.log(color1)
    color1.addEventListener('click', function playerColorSelect() {
        document.querySelector('h1').innerHTML = 'selecting color'
        //console.log(`Color is ${color1.style.background} nothing`, getComputedStyle(color1).backgroundColor)
        player1Color = getComputedStyle(color1).backgroundColor
        document.querySelector('.name1').style.background = player1Color
        //console.log(`Player1 Color is ${player1Color}`)
        document.querySelector(':root').style.setProperty('--player1', player1Color);

        return player1Color
    })
})
colors2.forEach(color2 => {
    console.log(color2)
    color2.addEventListener('click', function playerColorSelect() {
        document.querySelector('h1').innerHTML = 'selecting color'
        //console.log(`Color is ${color1.style.background} nothing`, getComputedStyle(color1).backgroundColor)
        player2Color = getComputedStyle(color2).backgroundColor
        //console.log(`Player1 Color is ${player1Color}`)
        document.querySelector('.name2').style.background = player2Color
        document.querySelector(':root').style.setProperty('--player2', player2Color);
        return player2Color
    })
})

function playerColorChoice() {



    //Make a button to change the gradient?
    //

}

function pNotification(str) {
    console.log(str)
    setTimeout(clear(), 10000)
}

//add event listener to all elements with class tile
tiles.forEach(tile => {
    tile.addEventListener('click', function playerChoiceResponse() {
        document.querySelector('h1').innerHTML = 'A match has begun!'

        //player1 equals true
        player === true ? colorToggle = player1Color : colorToggle = player2Color
        tile.style.background = colorToggle
        turns += 1
        endCheck()
        //function to change to next player color
        player === false ? player = true : player = false
    })
})


function clear() {
    document.querySelector('h1').innerHTML = 'Board Reset, Waiting for Players..'
    tiles.forEach(tile => tile.style.background = '#F0FFFF')
    turns = 0
}
