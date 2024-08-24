let currentPlayer = 'X';
let gameActive = true;
const winningMessageElement = document.getElementById("winnerMessage");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function makeMove(button) {
    if (button.textContent === "" && gameActive) {
        button.textContent = currentPlayer;
        button.disabled = true;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const buttons = document.querySelectorAll(".board button");
    const buttonValues = Array.from(buttons).map(button => button.textContent);

    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (buttonValues[a] && buttonValues[a] === buttonValues[b] && buttonValues[a] === buttonValues[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        winningMessageElement.textContent = `Player ${currentPlayer} Wins!`;
        highlightWinningCombination(buttonValues);
    } else if (!buttonValues.includes("")) {
        gameActive = false;
        winningMessageElement.textContent = "It's a Draw!";
    }
}

function highlightWinningCombination(buttonValues) {
    const buttons = document.querySelectorAll(".board button");
    winConditions.forEach(combination => {
        const [a, b, c] = combination;
        if (buttonValues[a] === buttonValues[b] && buttonValues[b] === buttonValues[c] && buttonValues[a] !== "") {
            buttons[a].style.backgroundColor = "#ffff00";
            buttons[b].style.backgroundColor = "#ffff00";
            buttons[c].style.backgroundColor = "#ffff00";
        }
    });
}

function resetGame() {
    const buttons = document.querySelectorAll(".board button");
    buttons.forEach(button => {
        button.textContent = "";
        button.disabled = false;
        button.style.backgroundColor = "#000";
    });
    currentPlayer = 'X';
    gameActive = true;
    winningMessageElement.textContent = "";
}