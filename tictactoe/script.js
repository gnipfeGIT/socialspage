let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;

        // Add animation class
        const cellElement = document.getElementById('board').children[index];
        cellElement.textContent = currentPlayer;
        cellElement.classList.add('tile-clicked');

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        } else if (board.every(cell => cell !== '')) {
            alert('It\'s a draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayer();
            updateBoardColors();
            setTimeout(() => {
                // Remove animation class after a delay
                cellElement.classList.remove('tile-clicked');
            }, 300);
        }
    }
}


function updateBoardColors() {
    const cells = document.getElementById('board').children;

    for (let i = 0; i < cells.length; i++) {
        const cellValue = board[i];
        cells[i].style.backgroundColor = cellValue === 'X' ? '#87ceeb' : (cellValue === 'O' ? '#ff8c00' : '#eee');
    }
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
        cells[i].style.backgroundColor = '';
    }

    updateCurrentPlayer();
}

// Initial setup
updateCurrentPlayer();
