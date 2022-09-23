
const tiles = document.querySelectorAll('.tile')
const resetButton = document.querySelectorAll('.reset')
const colors1 = document.querySelectorAll('.colors1')
const colors2 = document.querySelectorAll('.colors2')
const notifBoxStyle = document.querySelector('.centered').style
const winTrios = ['.row1', '.row2', '.row3',
                  '.col1', '.col2', '.col3',
                  '.diag1', '.diag2']
let player = true
let colorToggle
let turns = 0
const tileSound = new Howl({
    src: ['assets/sounds/tileplace.wav']
});
const winSound = new Howl({
    src: ['assets/sounds/winSound.mp3']
});
const tieSound = new Howl({
    src: ['assets/sounds/tieSound.mp3']
});
const resetSound = new Howl({
    src: ['assets/sounds/reset.mp3']
});
alert('Pick a color?')

//Adda check to make sure player1Color !== player2Color
//player acts as a boolean vlalue to switch between the two players
let player1Color = 'rgb(34, 193, 195)'
let player2Color = 'rgb(253, 187, 45)'

function hideColorChoice() {
     document.querySelector('.colorContainer1').style.display = 'none'
     document.querySelector('.colorContainer2').style.display = 'none'
}

function showColorhoice() {
    document.querySelector('.colorContainer1').style.display = 'flex'
    document.querySelector('.colorContainer2').style.display = 'flex'
}
function endCheck(){
    winTrios.forEach(trio => {
        let checker = document.querySelectorAll(trio)
        let arrayChecks = 0
        checker.forEach(e => e.style.background == colorToggle ? arrayChecks += 1 : 0)
        //check.forEach(e => console.log(`Style background: ${e.style.background}`, '\n', `Color toggle: ${colorToggle}`,
        //'\n', colorToggle == e.style.background    ))
        //console.log(`Array checks: ${arrayChecks}` )
        if (arrayChecks === 3) {
            turns = 0
            let pWinner = player === true ? 'Player 1' : 'Player 2'
            pNotification(`${pWinner} Wins`)
         //   console.log('At arrayChecks')
           
        }
    })

    if (turns === 9) {
        pNotification('Its a tie')
    }
}
//sets colors to equal properties
colors1.forEach(color1 => {
    color1.addEventListener('click', function playerColorSelect() {
        //console.log(`Color is ${color1.style.background} nothing`, getComputedStyle(color1).backgroundColor)
        player1Color = getComputedStyle(color1).backgroundColor
        document.querySelector('.name1').style.background = player1Color
        //console.log(`Player1 Color is ${player1Color}`)
        document.querySelector(':root').style.setProperty('--player1', player1Color);

        return player1Color
    })
})
colors2.forEach(color2 => {
    color2.addEventListener('click', function playerColorSelect() {
        //console.log(`Color is ${color1.style.background} nothing`, getComputedStyle(color1).backgroundColor)
        player2Color = getComputedStyle(color2).backgroundColor
        //console.log(`Player1 Color is ${player1Color}`)
        document.querySelector('.name2').style.background = player2Color
        document.querySelector(':root').style.setProperty('--player2', player2Color);
        return player2Color
    })
    
})


function pNotification(str) {
    notifBoxStyle.display = 'flex'
    document.querySelector('h2').innerHTML = str
    str.toLowerCase() === 'its a tie' ? tieSound.play() : winSound.play()
      
}

//add event listener to all elements with class tile


function clear() {
    resetSound.play()
    notifBoxStyle.display = 'none'
    document.querySelector('#result').innerHTML = 'Board Reset, Waiting for Players..'
    showColorhoice()
    tiles.forEach(tile => tile.style.background = '#F0FFFF')
    turns = 0
}

function checkPlayerColors() {
    if (player1Color === player2Color) {
        alert('Please Pick Different colors for Player1 and Player2')
        showColorhoice()
        clear()
        return false
    } else {
        hideColorChoice()
    }
}


tiles.forEach(tile => {
    
    tile.addEventListener('click', function playerChoiceResponse() {
        //player1 equals true
        player === true ? colorToggle = player1Color : colorToggle = player2Color
        tile.style.background = colorToggle
        tileSound.play()
        turns += 1
        endCheck()
        //function to change to next player color
        player === false ? player = true : player = false
        checkPlayerColors()
        
    })
})
resetButton.forEach(button => button.addEventListener('click', clear))