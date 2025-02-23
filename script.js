
const gameBoard = (function () {
    const allEqual = arr => arr.every(val => val !== "*" && val === arr[0]);
    let gameBoard = [
        ["*", "*", "*"],
        ["*", "*", "*"],
        ["*", "*", "*"]
    ];

    function getGameBoard() {
        for (let i = 0; i < 3; i++) {
            let rowString = "";
            for (let j = 0; j < 3; j++) {
                rowString += gameBoard[i][j] + " ";
            }
            console.log(rowString.trim());
        }
    }


    function createPlayers(name1, name2) {

        return {
            player1: { player: 1, name: name1, symbol: "X" },
            player2: { player: 2, name: name2, symbol: "O" }
        };
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
    //Step 1, create players
    players = gameBoard.createPlayers("A", "B");
    //step 2, show the board
    gameBoard.getGameBoard();
    //step3, logic for switching user turns
    let isGameOver = false;
    currentTurn = players.player1;
    while (isGameOver === false) {
        let position = gameBoard.userPositionPrompt();
        gameBoard.updateGameBoard(position.row, position.column, currentTurn.symbol)
        if (gameBoard.checkWinner() === true) {
            console.log(currentTurn.name + " Wins!");
            isGameOver = true;
        }
        currentTurn = currentTurn === players.player1 ? players.player2 : players.player1;
    }
})


gameFlow();