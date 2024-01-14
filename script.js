// JavaScript code (script.js)

document.addEventListener("DOMContentLoaded", function () {
  const playerText = document.getElementById("playerText");
  const restartBtn = document.getElementById("restartBtn");
  const gameboard = document.getElementById("gameboard");
  const boxes = document.querySelectorAll(".box");

  let currentPlayer = "X";
  let gameBoardState = Array(9).fill("");

  // Function to handle box click
  function handleBoxClick(index) {
    if (gameBoardState[index] === "" && !checkWinner()) {
      gameBoardState[index] = currentPlayer;
      renderBoard();
      if (!checkWinner()) {
        togglePlayer();
      }
    }
  }

  // Function to toggle player
  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerText.textContent = `Player ${currentPlayer}'s turn`;
  }

  // Function to render the game board
  function renderBoard() {
    gameBoardState.forEach((value, index) => {
      boxes[index].textContent = value;
    });
  }

  // Function to check for a winner
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoardState[a] !== "" &&
        gameBoardState[a] === gameBoardState[b] &&
        gameBoardState[a] === gameBoardState[c]
      ) {
        playerText.textContent = `Player ${currentPlayer} wins!`;
        return true;
      }
    }

    if (!gameBoardState.includes("")) {
      playerText.textContent = "It's a tie!";
      return true;
    }

    return false;
  }

  // Function to reset the game
  function resetGame() {
    currentPlayer = "X";
    gameBoardState = Array(9).fill("");
    renderBoard();
    playerText.textContent = `Player ${currentPlayer}'s turn`;
  }

  // Event listeners
  restartBtn.addEventListener("click", resetGame);

  boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(index));
  });

  // Initial setup
  resetGame();
});
