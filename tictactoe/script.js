let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { 'X': 0, 'O': 0 };

function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        const cellElement = document.getElementById('board').children[index];
        cellElement.textContent = currentPlayer;

        // Remove previous player color class
        cellElement.classList.remove('X', 'O');
        
        // Add current player color class
        cellElement.classList.add(currentPlayer.toLowerCase());

        if (checkWinner()) {
            scores[currentPlayer] += 1; // Increment the score for the winning player
            updateScores(); // Update the displayed scores
            showWinMessage(`Player ${currentPlayer} wins!`);
            resetGame();
        } else if (board.every(cell => cell !== '')) {
            showWinMessage('It\'s a draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayer();
        }
    }
}

function updateScores() {
    document.getElementById('scoreX').textContent = `Player X: ${scores['X']}`;
    document.getElementById('scoreO').textContent = `Player O: ${scores['O']}`;
}

function updateCurrentPlayer() {
    const currentPlayerElement = document.getElementById('currentPlayer');
    currentPlayerElement.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.getElementById('board').children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].classList.remove('X', 'O'); // Remove player color classes
    }

    updateCurrentPlayer();
}

// Initial setup
updateCurrentPlayer();
updateScores();