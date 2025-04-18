
let players = {
    player1: { player: 1, name: "Player 1", symbol: "X" },
    player2: { player: 2, name: "Player 2", symbol: "O" }
};


const DisplayFunctions = (function () {

    let mainContainer = document.querySelector(".main-container");

    function UserDialog() {

        let getUser =
            `<dialog open id="input-dialog">
            <form method="dialog" id="nameForm">
                <label for="p1name">Enter Player 1 name</label>
                <input type="text" name="p1name" id="p1name">
                <br>
                <label for="p2name">Enter Player 2 name</label>
                <input type="text" name="p2name" id="p2name">
                <br>
                <input type="submit" id="enter-button">
            </form>
        </dialog>`;

        mainContainer.innerHTML = getUser;

        const enterBtn = document.getElementById("enter-button");

        enterBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const p1name = document.getElementById("p1name").value.trim();
            const p2name = document.getElementById("p2name").value.trim();

            players.player1.name = p1name;
            players.player2.name = p2name;

            document.getElementById("input-dialog").close();
            console.log(players);

            DisplayFunctions.DisplayBoard();
        });


    }


    function DisplayBoard() {
        mainContainer.innerHTML = "";

        const displayHTML = `
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
        </table></div></div>

            <div class="game-board">
                <div class="box" id="r0c0"></div>
                <div class="box" id="r0c1"></div>
                <div class="box" id="r0c2"></div>
                <div class="box" id="r1c0"></div>
                <div class="box" id="r1c1"></div>
                <div class="box" id="r1c2"></div>
                <div class="box" id="r2c0"></div>
                <div class="box" id="r2c1"></div>
                <div class="box" id="r2c2"></div>
            </div>
        </div>
        `

        mainContainer.innerHTML = displayHTML;
        const p1nameCard = document.getElementById("player-1-name");
        const p2nameCard = document.getElementById("player-2-name");

        p1nameCard.textContent = players.player1.name;
        p2nameCard.
            textContent = players.player2.name;

        //Call a function here that can loop the game logic
        gameFlow.gameLoop();
    }

    function updateGameBoardDisplay() {
        let gameboard = gameBoard.gameBoard;

        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                let cellId = `r${i}c${j}`;
                let cellElement = document.getElementById(cellId);
                if (gameboard[i][j] !== "*") {
                    cellElement.textContent = gameboard[i][j];
                }
            }
        }
    }

    return {
        UserDialog,
        players,
        DisplayBoard,
        updateGameBoardDisplay
    };
})();



const gameBoard = (function () {
    const allEqual = arr => arr.every(val => val !== "*" && val === arr[0]);
    let gameBoard = [
        ["*", "*", "*"],
        ["*", "*", "*"],
        ["*", "*", "*"]
    ];

    function getGameBoard() {
        //The console method
        for (let i = 0; i < 3; i++) {
            let rowString = "";
            for (let j = 0; j < 3; j++) {
                rowString += gameBoard[i][j] + " ";
            }
            console.log(rowString.trim());
        }

        //Calling the display method
        DisplayFunctions.DisplayBoard();
    }

    function userPositionPrompt() {
        const row = parseInt(prompt("Enter row (0,1,2)"));
        const column = parseInt(prompt("Enter column (0,1,2)"));
        return { row, column };
    }

    function updateGameBoard(row, column, symbol) {
        if (gameBoard[row][column] === "*") {
            gameBoard[row][column] = symbol;
        }
        else {
            console.log("Already marked");
        }
        getGameBoard();
    }

    function checkWinner() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            let currentRow = gameBoard[i];
            if (allEqual(currentRow)) {
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            let col = [gameBoard[0][i], gameBoard[1][i], gameBoard[2][i]];
            if (allEqual(col)) {
                return true;
            }
        }

        // Check diagonals
        let mainDiagonal = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];
        let antiDiagonal = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]];

        if (allEqual(mainDiagonal)) {
            return true;
        }

        if (allEqual(antiDiagonal)) {
            return true;
        }

        return false;
    }


    return { gameBoard, getGameBoard, userPositionPrompt, updateGameBoard, checkWinner }
})();


const gameFlow = (function () {
    function initialiseGame() {
        DisplayFunctions.UserDialog();
        console.log("players initialised successfully", players);
    }

    function gameLoop() {
        //Game loop starts only after the displayboard is created 
        //step 1: wait for user interaction
        console.log("gameloop started");
        DisplayFunctions.updateGameBoardDisplay();
        let gameOver = false;

        let boxes = document.querySelectorAll(".box");
        let currPlayer = players.player1;

        callGame();

        function callGame() {

            console.log("Current Turn: ", currPlayer.name);
            console.log("Current Symbol: ", currPlayer.symbol);

            boxes.forEach(box => {
                box.addEventListener("click", (e) => {
                    if (gameOver !== true) {
                        console.log(box.id);
                        let i = Number(box.id[1]);
                        let j = Number(box.id[3]);
                        gameBoard.gameBoard[i][j] = currPlayer.symbol;
                        DisplayFunctions.updateGameBoardDisplay();

                        //Check if Game is over
                        gameOver = gameBoard.checkWinner();

                        //Logic to swap Players
                        if (currPlayer == players.player1) {
                            currPlayer = players.player2;
                        }
                        else {
                            currPlayer = players.player1;
                        }
                    }
                })
            })
        }


    }


    return {
        initialiseGame,
        gameLoop
    }
})();


gameFlow.initialiseGame();