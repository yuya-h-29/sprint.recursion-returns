class Board {
  constructor(size) {
    this.board = [];
    for (let row = 0; row < size; row += 1) {
      this.board.push([]);
      for (let col = 0; col < size; col += 1) {
        this.board[row].push(false);
      }
    }
  }

  togglePiece(row, col) {
    this.board[row][col] = !this.board[row][col];
    return this.board;
  }
  hasBeenVisited(row, col) {
    return this.board[row][col];
  }
}

class RobotPaths {
  // initialize all your options
  // you may want to change this code later on, too
  constructor(size) {
    this.board = new Board(size);
    this.row = 0;
    this.col = 0;
  }

  solve() {
    const output = 0;
    const boardSize = this.board.board.length;

    function movement(rows, columns) {
      if (rows === boardSize - 1 && columns === boardSize - 1) {
        output += 1;
        return;
      }
      if (
        rows < 0 ||
        rows >= boardSize ||
        columns < 0 ||
        columns >= boardSize
      ) {
        return;
      }
      if (this.board.hasBeenVisited(rows, columns)) {
        return;
      } else {
        this.board.togglePiece(rows, columns);
        movement(rows - 1, columns);
        movement(rows, columns - 1);
        movement(rows + 1, columns);
        movement(rows, columns + 1);
        this.board.togglePiece(rows, columns);
      }
    }

    movement(this.row, this.col);
    return output;
  }
}

const ourRobot = new RobotPaths(2);
console.log(ourRobot.solve());
console.log(ourRobot.board);

module.exports = { RobotPaths };
