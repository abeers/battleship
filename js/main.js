/*----- constants -----*/
const ROWS = 10
const COLUMNS = 10
const AI_NAME = 'Computer'

/*----- state variables -----*/


/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
class Player {
  constructor (name = AI_NAME) {
    this.name = name
    this.board = new Board()
    this.ships = [
      new Ship('Carrier', 5),
      new Ship('Battleship', 4),
      new Ship('Cruiser', 3),
      new Ship('Submarine', 3),
      new Ship('Destroyer', 2)
    ]
  }

  hasLost = () => this.ships.every(ship => ship.isSunk)
}

class Board {
  constructor () {
    this.cells = this.createBoard()
  }

  createBoard = (rows = ROWS, columns = COLUMNS) => {
    const board = []
    for (let i = 0; i < rows; i++) {
      board.push([])
      for (let j = 0; j < columns; j++) {
        board[i].push(new Space())
      }
    }
    return board
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
    this.isSunk = false
    this.startSpace = null
    this.orientation = 'right'
  }
}

const me = new Player('Alex')
console.log(me.hasLost())