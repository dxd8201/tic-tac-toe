


//module for generating the game board
const gameBoard = (() => {

    const gameBoardElt = document.getElementById("gameBoardContainer");
    const board = [];

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

    renderGameBoard();
    console.log(board)
    return {renderGameBoard, gameBoardSquare, board}
})();

//controls players and states of the game
const gameController = (() => {
    let victory = false;
    
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
            victory = true
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
            console.log("Player two wins!");
        } else {
            console.log("No one has won yet!")
        }
    }   


    const gameClickHandler = function (i) {
        
    }

    for(i=0; i<9; i++) {
        let gameBoardSquareListener = document.querySelectorAll("#gameBoardSquare");
            gameBoardSquareListener[i].addEventListener('click', function(i) {
                if(gameController.currentPlayer === playerOne && victory === false) {
                    gameBoard.gameBoardSquare[i].textContent = "X";
                    gameBoard.board[i] = 1;
                    console.log(gameBoard.board);
                    gameController.currentPlayer = playerTwo;
                    winCheck();
                } else if (gameController.currentPlayer === playerTwo && victory === false) {
                    gameBoard.gameBoardSquare[i].textContent = "O";
                    gameBoard.board[i] = 2;
                    gameController.currentPlayer = playerOne;
                    winCheck();
                } else if(victory === true) {
                    // const removeHandler = (function(i) {
                    //     gameBoard.gameBoardSquareListener[i].removeEventListener('click', removeHandler)
                    //     console.log("You removed an event handler")
                    // })();
                }
                console.log(`you clicked Game Board Square ${i}`);
                this.onclick = null;
                }.bind(null, i), {once: true});
    } 

    return { currentPlayer, playerOne, playerTwo }
})();

//module for generating displays
const displayController = (() => {

})();