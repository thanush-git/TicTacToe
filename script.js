
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
        });
    }


    function DisplayBoard(){
        mainContainer.innerHTML = "";

        const displayHTML = `
        <div class="display-container">
            <h1>TicTacToe</h1>

            <div class="player-header">
                <div class="player">
                    <p id="player-1-name">Player 1</p>
                    <p id="player-1-score">0</p>
                </div>
                <div class="player">
                    <p id="player-2-name">Player 2</p>
                    <p id="player-2-score">0</p>
                </div>
            </div>

            <div class="game-board">
                <div class="box" id="r0c1"></div>
                <div class="box" id="r0c2"></div>
                <div class="box" id="r0c3"></div>
                <div class="box" id="r1c1"></div>
                <div class="box" id="r1c2"></div>
                <div class="box" id="r1c3"></div>
                <div class="box" id="r2c1"></div>
                <div class="box" id="r2c2"></div>
                <div class="box" id="r2c3"></div>
            </div>
        </div>
        `

        mainContainer.innerHTML = displayHTML;
    }

    return {
        UserDialog,
        players,
        DisplayBoard
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


    function createPlayers() {
        DisplayFunctions.UserDialog();
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


    return { getGameBoard, createPlayers, userPositionPrompt, updateGameBoard, checkWinner }
})();


const gameFlow = (function () {
    //Step 1, initialise player symbols
    gameBoard.createPlayers();
    console.log("players initialised successfully",players);
    //step 2, show the board
    gameBoard.getGameBoard();
    //step3, logic for switching user turns
//     let isGameOver = false;
//     currentTurn = players.player1;
//     while (isGameOver === false) {
//         let position = gameBoard.userPositionPrompt();
//         gameBoard.updateGameBoard(position.row, position.column, currentTurn.symbol)
//         if (gameBoard.checkWinner() === true) {
//             console.log(currentTurn.name + " Wins!");
//             isGameOver = true;
//         }
//         currentTurn = currentTurn === players.player1 ? players.player2 : players.player1;
//     }
})



gameFlow();