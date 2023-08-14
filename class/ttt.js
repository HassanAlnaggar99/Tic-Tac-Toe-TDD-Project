const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require('./computer-player');

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.ai = false;

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

/*     // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand); */
    Screen.addCommand('u', 'move cursor up', this.cursor.up);
    Screen.addCommand('d', 'move cursor down', this.cursor.down);
    Screen.addCommand('r', 'move cursor right', this.cursor.right);
    Screen.addCommand('l', 'move cursor left', this.cursor.left);
    Screen.addCommand('m', 'mark the current position', this.putMark);
    Screen.addCommand('c', 'play against the computer AI', this.computerAI);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

/*   // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  } */

  computerAI = () => {
    this.ai = true;

    if (this.playerTurn === 'X') {
      let cpuMove = ComputerPlayer.getSmartMove(this.grid, 'X');
      this.grid[cpuMove.row][cpuMove.col] = 'X';
      Screen.setGrid(cpuMove.row, cpuMove.col, 'X');
      this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';
    }

    const gameState = TTT.checkWin(this.grid);
    if (gameState) {
      TTT.endGame(gameState);
    }
  }

  putMark = () => {
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;

    this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';

    const gameState = TTT.checkWin(this.grid);
    if (gameState) {
      TTT.endGame(gameState);
    }

    if (this.ai) {
      this.computerAI();
    }
  }

  static checkRow(grid) {
    for (let i = 0; i < grid.length; i++) {
      // const row = grid[i];
      let flag = true;
      for (let j = 1; j < grid[i].length; j++) {
        if (grid[i][j - 1] !== grid[i][j] || grid[i][j] === ' ') {
          flag = false;
          break;
        }
      }
      if (flag) {
        return grid[i][0];
      }
    }

    return false;
  }

  static checkCol(grid) {
    for (let j = 0; j < grid[0].length; j++) {
      let flag = true;
      for (let i = 1; i < grid.length; i++) {
        if (grid[i - 1][j] !== grid[i][j] || grid[i][j] === ' ') {
          flag = false;
          break;
        }
      }
      if (flag) {
        return grid[0][j];
      }
    }

    return false;
  }

  static checkDiag(grid) {
    let flag = true;
    let i = 0, j = 0;
    let numRows = grid.length, numCols = grid[0].length;
    while (i < numRows - 1 && j < numCols - 1) {
      if (grid[i][j] !== grid[i + 1][j + 1] || grid[i][j] === ' ') {
        flag = false;
        break;
      }
      i++; j++;
    }
    if (flag) {
      return grid[0][0];
    }

    flag = true;
    i = 0, j = numCols - 1;
    while (i < numRows - 1 && j >= 0) {
      if (grid[i][j] !== grid[i + 1][j - 1] || grid[i][j] === ' ') {
        flag = false;
        break;
      }
      i++; j--;
    }
    if (flag) {
      return grid[0][numCols - 1];
    }
  }

  static checkEnd(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === ' ') {
          return false;
        }
      }
    }
    return true;
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    const rowResult = this.checkRow(grid);
    if (rowResult) {
      return rowResult;
    }
    const colResult = this.checkCol(grid);
    if (colResult) {
      return colResult;
    }
    const diagResult = this.checkDiag(grid);
    if (diagResult) {
      return diagResult;
    }
    const endResult = this.checkEnd(grid);
    if (endResult) {
      return 'T';
    } else {
      return false;
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
