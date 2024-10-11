// Оголошуємо масив для зберігання стану гри
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    // Перевіряємо, чи клітинка вже зайнята або гра закінчена
    if (gameBoard[clickedIndex] !== "" || !gameActive) {
        return;
    }

    // Встановлюємо "X" для користувача
    gameBoard[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Перевірка на переможця
    if (checkWinner(currentPlayer)) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // Хід комп'ютера (ставить "0" у випадкове порожнє місце)
    if (gameActive) {
        computerTurn();
    }
}

// Логіка ходу комп'ютера
function computerTurn() {
    const availableCells = gameBoard
        .map((value, index) => value === "" ? index : null)
        .filter(index => index !== null);

    if (availableCells.length === 0) {
        statusDisplay.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameBoard[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    // Перевіряємо, чи виграв комп'ютер
    if (checkWinner("O")) {
        statusDisplay.textContent = "O wins!";
        gameActive = false;
        return;
    }
}

// Функція для перевірки переможця
function checkWinner(player) {
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

    return winConditions.some(condition =>
        condition.every(index => gameBoard[index] === player)
    );
}

// Додаємо обробник подій для кліків на клітинках
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
