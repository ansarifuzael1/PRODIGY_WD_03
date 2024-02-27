let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const playerXScoreDisplay = document.getElementById('player-x-score');
const playerOScoreDisplay = document.getElementById('player-o-score');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

function handleClick(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        statusMessage.innerText = `${currentPlayer} wins!`;
        updateScore();
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        statusMessage.innerText = 'It\'s a tie!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.innerText = `${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function updateScore() {
    if (currentPlayer === 'X') {
        playerXScore++;
    } else {
        playerOScore++;
    }
    playerXScoreDisplay.innerText = `Player X: ${playerXScore}`;
    playerOScoreDisplay.innerText = `Player O: ${playerOScore}`;
}