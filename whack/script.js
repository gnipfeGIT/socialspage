let score = 0;
const maxFaces = 3; // Adjust the maximum number of faces displayed simultaneously

function whack(event) {
    if (event.target.classList.contains('face')) {
        score += 1; // Increment score for hitting the face
        event.target.classList.add('fade-out'); // Add fade-out class for transition effect
        setTimeout(() => {
            event.target.remove(); // Remove the face element after the transition
        }, 300); // Adjust the duration of the transition (in milliseconds)
    } else {
        score -= 1; // Decrement score for missing the face
    }

    updateScore();
    respawnFace();
}

function getRandomInterval() {
    return Math.floor(Math.random() * 1000) + 500; // Random interval between 500ms and 1500ms
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomEmoji() {
    const emojis = ['😄', '😃', '😁', '😆', '😅', '😂', '😊', '😎', '😍', '🥳'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function showFaces() {
    const faces = document.querySelectorAll('.face');

    faces.forEach(face => {
        face.style.display = Math.random() > 0.5 ? 'flex' : 'none';
        if (face.style.display === 'flex') {
            const randomColumn = Math.floor(Math.random() * 3) + 1;
            const randomRow = Math.floor(Math.random() * 3) + 1;
            face.style.gridColumn = randomColumn;
            face.style.gridRow = randomRow;
            face.style.backgroundColor = getRandomColor();
            face.textContent = getRandomEmoji();
        }
    });

    setTimeout(() => {
        faces.forEach(face => (face.style.display = 'none'));
        showFaces();
    }, getRandomInterval());
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');

    for (let i = 0; i < maxFaces; i++) {
        const face = document.createElement('div');
        face.classList.add('face');
        face.textContent = '😄';
        gameBoard.appendChild(face);
    }

    showFaces();

    gameBoard.addEventListener('click', whack);
});
