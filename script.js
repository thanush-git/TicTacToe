// ---- State & Players ----
let gameOver = false;
let currPlayer;
let players = {
  player1: { player: 1, name: "Player 1", symbol: "X", score: 0 },
  player2: { player: 2, name: "Player 2", symbol: "O", score: 0 },
};

// ---- Display Module ----
const DisplayFunctions = (function () {
  const mainContainer = document.querySelector(".main-container");

  function UserDialog() {
    mainContainer.innerHTML = `
      <dialog open id="input-dialog">
        <form method="dialog" id="nameForm">
          <label for="p1name">Enter Player 1 name</label>
          <input type="text" name="p1name" id="p1name"><br>
          <label for="p2name">Enter Player 2 name</label>
          <input type="text" name="p2name" id="p2name"><br>
          <input type="submit" id="enter-button">
        </form>
      </dialog>
    `;

    document
      .getElementById("enter-button")
      .addEventListener("click", function (e) {
        e.preventDefault();
        // update names
        const p1 = document.getElementById("p1name").value.trim();
        const p2 = document.getElementById("p2name").value.trim();s
        players.player1.name = p1 || "Player 1";
        players.player2.name = p2 || "Player 2";
        document.getElementById("input-dialog").close();

        // 🚀 IMPORTANT: initialize game state and draw board
        resetGame();
      });
  }

  function DisplayBoard() {
    mainContainer.innerHTML = `
      <div class="display-container">
        <h1>TicTacToe</h1>
        <div class="player-header">
          <div class="player">
            <table>
              <tr><td id="player-1-name"></td></tr>
              <tr><td id="player-1-score"></td></tr>
            </table>
          </div>
          <div class="player">
            <table>
              <tr><td id="player-2-name"></td></tr>
              <tr><td id="player-2-score"></td></tr>
            </table>
          </div>
        </div>
        <div class="game-board">
          ${[0,1,2].map(i =>
            [0,1,2].map(j =>
              `<div class="box" id="r${i}c${j}"></div>`
            ).join("")
          ).join("")}
        </div>
      </div>
    `;

    // populate names and scores
    document.getElementById("player-1-name").textContent = players.player1.name;
    document.getElementById("player-2-name").textContent = players.player2.name;
    updateGameBoardDisplay();
  }

  function updateGameBoardDisplay() {
    const board = gameBoard.getBoard();
    document.getElementById("player-1-score").textContent = players.player1.score;
    document.getElementById("player-2-score").textContent = players.player2.score;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        document.getElementById(`r${i}c${j}`).textContent =
          board[i][j] === "*" ? "" : board[i][j];
      }
    }
  }

  return { UserDialog, DisplayBoard, updateGameBoardDisplay };
})();

// ---- Game‑Board Module ----
const gameBoard = (function () {
  let _board = [
    ["*", "*", "*"],
    ["*", "*", "*"],
    ["*", "*", "*"],
  ];

  const allEqual = (arr) => arr[0] !== "*" && arr.every((v) => v === arr[0]);

  function getBoard() {
    return _board;
  }

  function resetBoard() {
    _board = [
      ["*", "*", "*"],
      ["*", "*", "*"],
      ["*", "*", "*"],
    ];
  }

  function checkWinner() {
    // rows & columns
    for (let i = 0; i < 3; i++) {
      if (allEqual(_board[i])) return true;
      if (allEqual([_board[0][i], _board[1][i], _board[2][i]])) return true;
    }
    // diagonals
    if (allEqual([_board[0][0], _board[1][1], _board[2][2]])) return true;
    if (allEqual([_board[0][2], _board[1][1], _board[2][0]])) return true;
    return false;
  }

  function markCell(i, j, symbol) {
    if (_board[i][j] === "*") {
      _board[i][j] = symbol;
      return true;
    }
    return false;
  }

  return { getBoard, resetBoard, checkWinner, markCell };
})();

// ---- Click Handler (delegated) ----
function handleClick(e) {
  const box = e.target;
  if (!box.classList.contains("box") || gameOver) return;

  const i = +box.id[1],
        j = +box.id[3];

  // only mark empty cells
  if (!gameBoard.markCell(i, j, currPlayer.symbol)) return;

  DisplayFunctions.updateGameBoardDisplay();

  // win?
  if (gameBoard.checkWinner()) {
    gameOver = true;
    currPlayer.score++;
    setTimeout(() => {
      alert(`${currPlayer.name} wins the round`);
      resetGame();
    }, 500);
    return;
  }

  // draw?
  if (!gameBoard.getBoard().flat().includes("*")) {
    gameOver = true;
    setTimeout(() => {
      alert("It's a draw!");
      resetGame();
    }, 500);
    return;
  }

  // switch turn
  currPlayer =
    currPlayer === players.player1 ? players.player2 : players.player1;
}

// ---- Initialization & Reset ----
function initialiseGame() {
  DisplayFunctions.UserDialog();
  // attach once; will handle clicks for every board render
  document
    .querySelector(".main-container")
    .addEventListener("click", handleClick);
}

function resetGame() {
  gameBoard.resetBoard();
  gameOver = false;
  currPlayer = players.player1;
  DisplayFunctions.DisplayBoard();
}

// start
initialiseGame();
