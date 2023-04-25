//It looks like gameBoard.board has not been reset after the reset button is clicked. Figure this out. 
//fixed the bug, now resetbtn only resets the board once. 


//module for generating the game board
const gameBoard = (() => {

    const resetBoardBtn = document.getElementById("resetBtn");
    const gameBoardElt = document.getElementById("gameBoardContainer");
    let board = [];

    const renderGameBoard = function () {
        let divsToRemove = document.querySelectorAll('.game-board-square');

        //removes old board
        for (i = divsToRemove.length - 1; i >= 0; i--) {
            divsToRemove[i].remove();
        }

        for (i=0; i<9; i++) {
            board[i] = 0;
            console.log(board[i]);
            const gameBoardSquare = document.createElement("div");
            gameBoardElt.appendChild(gameBoardSquare);
            gameBoardSquare.classList.add("game-board-square");
            gameBoardSquare.setAttribute("id", "gameBoardSquare");
            console.log("You rendered a game square");
        }
    }

    const resetBoard = function () {
        for (i=0; i<9; i++) {
            gameBoard.board[i] = 0;
        }
        console.log(gameController.victory);
        board = [];
        renderGameBoard();
        gameController.victory = false;
        console.log(gameController.victory);
        gameController.currentPlayer = gameController.playerOne;
        displayController.turnTracker();
        console.log("You reset the board!");
    }

    
    resetBoardBtn.addEventListener("click", function() {
            console.log(gameBoard.board);
            resetBoard();
            console.log(gameBoard.board);
            gameController.gameSquareListener();
            displayController.btnDisplay();
            console.log("Board has been reset");
    });
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
            (gameBoard.board[0] === 1 && gameBoard.board[4] === 1 && gameBoard.board[8] === 1) ||
            (gameBoard.board[2] === 1 && gameBoard.board[4] === 1 && gameBoard.board[6] === 1)
            ) {
            gameController.victory = true;
            gameController.playerOneScore += 1;
            displayController.scoreDisplay();
            displayController.btnDisplay();
            console.log("Player one wins!");
        } else if(
            (gameBoard.board[0] === 2 && gameBoard.board[1] === 2 && gameBoard.board[2] === 2) ||
            (gameBoard.board[3] === 2 && gameBoard.board[4] === 2 && gameBoard.board[5] === 2) ||
            (gameBoard.board[6] === 2 && gameBoard.board[7] === 2 && gameBoard.board[8] === 2) ||
            (gameBoard.board[0] === 2 && gameBoard.board[3] === 2 && gameBoard.board[6] === 2) ||
            (gameBoard.board[1] === 2 && gameBoard.board[4] === 2 && gameBoard.board[7] === 2) ||
            (gameBoard.board[2] === 2 && gameBoard.board[5] === 2 && gameBoard.board[8] === 2) ||
            (gameBoard.board[0] === 2 && gameBoard.board[4] === 2 && gameBoard.board[8] === 2) ||
            (gameBoard.board[2] === 2 && gameBoard.board[4] === 2 && gameBoard.board[6] === 2)
        ) {
            gameController.victory = true;
            gameController.playerTwoScore += 1;
            displayController.scoreDisplay();
            displayController.btnDisplay();
            console.log("Player two wins!");
        } else {
            console.log("No one has won yet!")
        }
    }   

    const gameSquareListener = function () {
        for(i=0; i<9; i++) {
            let gameBoardSquareListener = document.querySelectorAll("#gameBoardSquare");
                gameBoardSquareListener[i].addEventListener('click', function(i) {
                    if (gameController.victory === true) {
                        console.log("Soething happened");
                        console.log(gameController.victory);
                        console.log(gameBoard.board[i]);
                        return
                    } else if(gameController.currentPlayer === playerOne && gameController.victory === false && gameBoard.board[i] === 0) {
                        gameBoard.gameBoardSquare[i].textContent = "X";
                        gameBoard.board[i] = 1;
                        console.log(gameBoard.board);
                        gameController.currentPlayer = playerTwo;
                        displayController.turnTracker();
                        winCheck();
                    } else if (gameController.currentPlayer === playerTwo && gameController.victory === false && gameBoard.board[i] === 0) {
                        gameBoard.gameBoardSquare[i].textContent = "O";
                        gameBoard.board[i] = 2;
                        gameController.currentPlayer = playerOne;
                        displayController.turnTracker();
                        winCheck();
                    } 
                    console.log(`you clicked Game Board Square ${i}`);
                    this.onclick = null;
                    }.bind(null, i));
                    console.log("Game board square should have been added");
        } 

        
        
    }
    gameSquareListener();

    return { currentPlayer, playerOne, playerTwo, playerOneScore, playerTwoScore, victory, gameSquareListener }
})();

//module for generating displays
const displayController = (() => {
    const p1Score = document.getElementById("p1Score");
    const p2Score = document.getElementById("p2Score");
    const currentPlayer = document.getElementById("currentPlayerValue");
    const btnListener = document.getElementById("resetBtn");

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

    const btnDisplay = function () {
        btnListener.classList.toggle("no-display");
    }

    scoreDisplay();
    currentPlayer.textContent = gameController.currentPlayer.player;

    return {turnTracker, scoreDisplay, btnDisplay}
})();