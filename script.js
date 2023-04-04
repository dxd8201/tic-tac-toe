


//module for generating the game board
const gameBoard = (() => {

    const resetBoardBtn = document.getElementById("resetBtn");
    const gameBoardElt = document.getElementById("gameBoardContainer");
    let board = [];

    const renderGameBoard = function () {
        for (i=0; i<9; i++) {
            board[i] = 0;
            const gameBoardSquare = document.createElement("div");
            gameBoardElt.appendChild(gameBoardSquare);
            gameBoardSquare.classList.add("game-board-square");
            gameBoardSquare.setAttribute("id", "gameBoardSquare");
            console.log("You rendered a game square");
        }
        
    }

    const resetBoard = function () {
        board = [];
        // renderGameBoard();
        console.log("You reset the board!");
    }

    
    resetBoardBtn.addEventListener("click", resetBoard());
    renderGameBoard();
    console.log(board)

    return {renderGameBoard, gameBoardSquare, board, resetBoard}
})();

//controls players and states of the game
const gameController = (() => {
    let victory = false;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    
    //function factory for generating players
    const playerFactory = (player) => {
        const introduction = () => console.log(`You are ${player}`);
        return { player, introduction };
    }

    const playerOne = playerFactory("Player 1");
    const playerTwo = playerFactory("Player 2");
    let currentPlayer = playerOne;
    
    playerOne.introduction();
    playerTwo.introduction();

    const winCheck = () => {
        if (
            (gameBoard.board[0] === 1 && gameBoard.board[1] === 1 && gameBoard.board[2] === 1) ||
            (gameBoard.board[3] === 1 && gameBoard.board[4] === 1 && gameBoard.board[5] === 1) ||
            (gameBoard.board[6] === 1 && gameBoard.board[7] === 1 && gameBoard.board[8] === 1) ||
            (gameBoard.board[0] === 1 && gameBoard.board[3] === 1 && gameBoard.board[6] === 1) ||
            (gameBoard.board[1] === 1 && gameBoard.board[4] === 1 && gameBoard.board[7] === 1) ||
            (gameBoard.board[2] === 1 && gameBoard.board[5] === 1 && gameBoard.board[8] === 1) ||
            (gameBoard.board[0] === 1 && gameBoard.board[4] === 1 && gameBoard.board[8] === 1)
            ) {
            victory = true;
            gameController.playerOneScore += 1;
            displayController.scoreDisplay();
            console.log("Player one wins!");
        } else if(
            (gameBoard.board[0] === 2 && gameBoard.board[1] === 2 && gameBoard.board[2] === 2) ||
            (gameBoard.board[3] === 2 && gameBoard.board[4] === 2 && gameBoard.board[5] === 2) ||
            (gameBoard.board[6] === 2 && gameBoard.board[7] === 2 && gameBoard.board[8] === 2) ||
            (gameBoard.board[0] === 2 && gameBoard.board[3] === 2 && gameBoard.board[6] === 2) ||
            (gameBoard.board[1] === 2 && gameBoard.board[4] === 2 && gameBoard.board[7] === 2) ||
            (gameBoard.board[2] === 2 && gameBoard.board[5] === 2 && gameBoard.board[8] === 2) ||
            (gameBoard.board[0] === 2 && gameBoard.board[4] === 2 && gameBoard.board[8] === 2)
        ) {
            victory = true;
            gameController.playerTwoScore += 1;
            displayController.scoreDisplay();
            console.log("Player two wins!");
        } else {
            console.log("No one has won yet!")
        }
    }   

    for(i=0; i<9; i++) {
        let gameBoardSquareListener = document.querySelectorAll("#gameBoardSquare");
            gameBoardSquareListener[i].addEventListener('click', function(i) {
                if (victory === true) {
                    return
                } else if(gameController.currentPlayer === playerOne && victory === false) {
                    gameBoard.gameBoardSquare[i].textContent = "X";
                    gameBoard.board[i] = 1;
                    console.log(gameBoard.board);
                    gameController.currentPlayer = playerTwo;
                    displayController.turnTracker();
                    winCheck();
                } else if (gameController.currentPlayer === playerTwo && victory === false) {
                    gameBoard.gameBoardSquare[i].textContent = "O";
                    gameBoard.board[i] = 2;
                    gameController.currentPlayer = playerOne;
                    displayController.turnTracker();
                    winCheck();
                } 
                console.log(`you clicked Game Board Square ${i}`);
                this.onclick = null;
                }.bind(null, i), {once: true});
    } 

    return { currentPlayer, playerOne, playerTwo, playerOneScore, playerTwoScore, victory }
})();

//module for generating displays
const displayController = (() => {
    const p1Score = document.getElementById("p1Score");
    const p2Score = document.getElementById("p2Score");
    const currentPlayer = document.getElementById("currentPlayerValue");

    const turnTracker = function () {
        if(gameController.currentPlayer === gameController.playerOne) {
            currentPlayer.textContent = "Player 1";
        } else if(gameController.currentPlayer === gameController.playerTwo) {
            currentPlayer.textContent = "Player 2";
        }
    }
    
    const scoreDisplay = function () {
        p1Score.textContent = gameController.playerOneScore;
        p2Score.textContent = gameController.playerTwoScore;
    }

    scoreDisplay();
    currentPlayer.textContent = gameController.currentPlayer.player;

    return {turnTracker, scoreDisplay}
})();