


//module for generating the game board
const gameBoard = (() => {

    const gameBoardElt = document.getElementById("gameBoardContainer");
    const board = [];

    const renderGameBoard = function () {
        for (i=0; i<9; i++) {
            board[i] = i;
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

    for(i=0; i<9; i++) {
        let gameBoardSquareListener = document.querySelectorAll("#gameBoardSquare");
            gameBoardSquareListener[i].addEventListener('click', function(i) {
                if(gameController.currentPlayer === playerOne) {
                    gameBoard.gameBoardSquare[i].textContent = "X";
                    gameController.currentPlayer = playerTwo;
                } else if (gameController.currentPlayer === playerTwo) {
                    gameBoard.gameBoardSquare[i].textContent = "O";
                    gameController.currentPlayer = playerOne;
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