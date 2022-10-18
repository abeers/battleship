/*----- constants -----*/
const ROWS = 10
const COLUMNS = 10
const AI_NAME = 'Computer'

/*----- state variables -----*/
let isPlacing = true
let mainPlayer
let game

/*----- cached elements  -----*/
const mainBoard = document.querySelector('#main-board')
const sideBoard = document.querySelector('#side-board')
const shipCenter = document.querySelector('#ship-center')
const newGameButton = document.querySelector('#new-game')
const finishPlacementButton = document.querySelector('#finish-placement')

/*----- event listeners -----*/
newGameButton.addEventListener('click', () => {
  game = new Game('Alex')
  game.startGame()
})

mainBoard.addEventListener('click', event => {
  console.log(event.target.dataset.position)
})

shipCenter.addEventListener('click', event => {
  console.log(event.target.dataset.classification)
})

/*----- functions -----*/
class Game {
  constructor (playerName) {
    this.players = [
      new Player(playerName, false),
      new Player()
    ]
    this.currentPlayer = 0
    this.isPlacing = true
  }

  startGame = () => {
    this.players.forEach(player => {
      player.board.createBoard()
    })
    
    mainPlayer = this.players[0]
    mainPlayer.board.displayBoard(mainBoard)

    mainBoard.classList.remove('hidden')
    sideBoard.classList.remove('hidden')
    shipCenter.classList.remove('hidden')
    finishPlacementButton.classList.remove('hidden')

    this.showShipsToPlace()
    console.log(this)
  }

  showShipsToPlace () {
    mainPlayer.ships.forEach(ship => {
      const newShip = document.createElement('div')
      newShip.classList.add('ship')
      newShip.style.width = `${ship.size * 40}px`

      newShip.dataset.classification = ship.name

      shipCenter.appendChild(newShip)
    })
  }
}

class Player {
  constructor (name = AI_NAME, isAI = true) {
    this.name = name
    this.board = new Board()
    this.ships = [
      new Ship('Carrier', 5),
      new Ship('Battleship', 4),
      new Ship('Cruiser', 3),
      new Ship('Submarine', 3),
      new Ship('Destroyer', 2)
    ]
    this.isAI = isAI
  }

  hasLost = () => this.ships.every(ship => ship.isSunk)
}

class Board {
  constructor() {
    this.cells = []
  }

  createBoard = (rows = ROWS, columns = COLUMNS) => {
    const board = []

    for (let i = 0; i < rows; i++) {
      board.push([])

      for (let j = 0; j < columns; j++) {
        const position = j + i * rows
        board[i].push(new Space(position))
      }
    }

    this.cells = board
  }

  displayBoard(boardEl) {
    boardEl.innerHTML = ''
    
    let templateRows = ''
    let templateColumns = ''

    for (let i = 0; i < this.cells.length; i++) {
      templateRows += '1fr '

      for (let j = 0; j < this.cells[i].length; j++) {
        if (j === 0) {
          templateColumns += '1fr '
        }

        const newBoardSpace = document.createElement('div')
        const position = j + i * this.cells.length

        newBoardSpace.classList.add('board-space')
        newBoardSpace.dataset.position = position

        boardEl.appendChild(newBoardSpace)
      }
    }

    boardEl.style.gridTemplateRows = templateRows
    boardEl.style.gridTemplateColumns = templateColumns

    // boardEl.addEventListener('click', (event) =>
    //   console.log(event.target.dataset.position)
    // )
  }
}

class Space {
  constructor () {
    this.hasShip = false
    this.marker = null
  }
}

class Ship {
  constructor (name, size) {
    this.name = name
    this.size = size

    this.hits = 0
    this.isSunk = false

    this.startSpace = null
    this.isHorizontal = true
  }

  rotateShip () {
    this.isHorizontal = !this.isHorizontal
  }

  placeShip (space) {
    this.startSpace = space
  }

  hitShip () {
    this.hits++
    if (this.hits >= this.size) {
      this.isSunk = true
    }
  }
}
