
class ComputerPlayer {

  static getValidMoves(grid) {
    let validMoves = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === ' ') {
          validMoves.push({row: i, col: j});
        }
      }
    }
    return validMoves;
  }

  static randomMove(grid) {
    let validMoves = this.getValidMoves(grid);
    let move = Math.floor(Math.random() * validMoves.length);
    return validMoves[move];
  }

  static getWinningMoves(grid, symbol) {

    // Your code here

  }

  static getSmartMove(grid, symbol) {
    let move;

    // select win move
    move = this.checkRow(grid, symbol);
    if (move) {
      return move;
    }

    move = this.checkCol(grid, symbol);
    if (move) {
      return move;
    }

    move = this.checkDiag(grid, symbol);
    if (move) {
      return move;
    }

    // select block move
    const opposingSymbol = symbol === 'X' ? 'O' : 'X';

    move = this.checkRow(grid, opposingSymbol);
    if (move) {
      return move;
    }

    move = this.checkCol(grid, opposingSymbol);
    if (move) {
      return move;
    }

    move = this.checkDiag(grid, opposingSymbol);
    if (move) {
      return move;
    }

    // select random move
    return this.randomMove(grid);
  }

  static checkRow(grid, symbol) {
    let numRows = grid.length, numCols = grid[0].length;
    for (let i = 0; i < grid.length; i++) {
      let count = 0, moveIndex = {row: 0, col: 0};
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === symbol) {
          count++;
        } else if (grid[i][j] === ' ') {
          moveIndex = {row: i, col: j};
        }
      }
      if (count === numCols - 1 && grid[moveIndex.row][moveIndex.col] === ' ') {
        return moveIndex;
      }
    }

    return false;
  }

  static checkCol(grid, symbol) {
    let numRows = grid.length, numCols = grid[0].length;
    for (let j = 0; j < grid[0].length; j++) {
      let count = 0, moveIndex = {row: 0, col: 0};
      for (let i = 0; i < grid.length; i++) {
        if (grid[i][j] === symbol) {
          count++;
        } else if (grid[i][j] === ' ') {
          moveIndex = {row: i, col: j};
        }
      }
      if (count === numRows - 1 && grid[moveIndex.row][moveIndex.col] === ' ') {
        return moveIndex;
      }
    }

    return false;
  }

  static checkDiag(grid, symbol) {
    let numRows = grid.length, numCols = grid[0].length;
    let diagLength = Math.min(numRows, numCols);
    let count = 0, moveIndex = {row: 0, col: 0};
    let i = 0, j = 0;
    while (i < numRows && j < numCols) {
      if (grid[i][j] === symbol) {
        count++;
      } else if (grid[i][j] === ' ') {
        moveIndex = {row: i, col: j};
      }
      i++; j++;
    }
    if (count === diagLength - 1 && grid[moveIndex.row][moveIndex.col] === ' ') {
      return moveIndex;
    }

    count = 0;
    i = 0, j = numCols - 1;
    while (i < numRows && j >= 0) {
      if (grid[i][j] === symbol) {
        count++;
      } else if (grid[i][j] === ' ') {
        moveIndex = {row: i, col: j};
      }
      i++; j--;
    }
    if (count === diagLength - 1 && grid[moveIndex.row][moveIndex.col] === ' ') {
      return moveIndex;
    }

    return false;
  }
}

// grid = [['X',' ',' '],
//         ['X',' ',' '],
//         ['O','O',' ']]

// let smartMove = ComputerPlayer.getSmartMove(grid, 'X');

// console.log(smartMove);

module.exports = ComputerPlayer;
