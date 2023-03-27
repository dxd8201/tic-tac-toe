
//function factory for generating players
const playerFactory = (player) => {
    const introduction = () => console.log(`You are ${player}`);
    // const placeMarker = () => {

    // }
    return { player, introduction };
}

const playerOne = playerFactory("Player 1");
const playerTwo = playerFactory("Player 2");

playerOne.introduction();
playerTwo.introduction();

//module for generating the game board
const gameBoard = (() => {

    const gameBoardElt = document.getElementById("gameBoardContainer");
    let currentPlayer = playerOne;
    const board = [];
    console.log(currentPlayer);
    

    const renderGameBoard = function () {
        for (i=0; i<9; i++) {
            board[i] = i;
            console.log(board);
            
            const gameBoardSquare = document.createElement("div");
            gameBoardElt.appendChild(gameBoardSquare);
            gameBoardSquare.classList.add("game-board-square");
            gameBoardSquare.setAttribute("id", "gameBoardSquare");
            
            let gameBoardSquareListener = document.querySelectorAll("#gameBoardSquare");
            gameBoardSquareListener[i].addEventListener('click', function(i) {
                
                if(currentPlayer === playerOne) {
                    gameBoardSquare.textContent = "X";
                    currentPlayer = playerTwo;
                } else if (currentPlayer === playerTwo) {
                    gameBoardSquare.textContent = "O";
                    currentPlayer = playerOne;
                }

                console.log(`You clicked Game Board Square ${i}`);
                this.onclick = null;
                }.bind(null, i), {once: true});
            
            console.log("You rendered a game square");
        }
    }
    return {renderGameBoard}
})();

//module for generating displays
const displayController = (() => {

})();



gameBoard.renderGameBoard();