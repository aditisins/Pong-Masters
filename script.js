const ball = document.getElementById('ball');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const playAgain = document.getElementById('playAgain');
const winnerText = document.createElement('div'); 
winnerText.id = 'winner';
document.getElementById('pongGame').appendChild(winnerText);

let ballX = 300, ballY = 200;
let velocityX = 2, velocityY = 2;
let paddle1Y = 165, paddle2Y = 165;
let paddleSpeed = 9;
let keyState = {};
let score1 = 0, score2 = 0;

document.addEventListener('keydown', function(event) {
    keyState[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    keyState[event.key] = false;
});

let interval = setInterval(gameLoop, 10);

function updatePaddlePositions() {
    if (keyState['w'] && paddle1Y > 0) paddle1Y -= paddleSpeed;
    if (keyState['s'] && paddle1Y < 330) paddle1Y += paddleSpeed;
    if (keyState['ArrowUp'] && paddle2Y > 0) paddle2Y -= paddleSpeed;
    if (keyState['ArrowDown'] && paddle2Y < 330) paddle2Y += paddleSpeed;

    paddle1.style.top = paddle1Y + 'px';
    paddle2.style.top = paddle2Y + 'px';
}

function gameLoop() {
    updatePaddlePositions();
    ballX += velocityX;
    ballY += velocityY;

    if (ballY <= 0 || ballY >= 385) velocityY *= -1;

    if (velocityX < 0 && ballX <= 35 && ballX > 20 && ballY >= paddle1Y && ballY <= paddle1Y + 70) {
        velocityX *= -1.1;
    } else if (velocityX > 0 && ballX >= 565 && ballX < 580 && ballY >= paddle2Y && ballY <= paddle2Y + 70) {
        velocityX *= -1.1;
    }

    if (ballX < 0 || ballX > 600) {
        updateScore(ballX < 0 ? 2 : 1);
    } else {
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
    }
}

function updateScore(winner) {
    if (winner === 1) {
        score1++;
    } else {
        score2++;
    }
    score1Display.innerText = score1;
    score2Display.innerText = score2;

    // Randomly choose the ball's direction
    velocityX = Math.random() < 0.5 ? -2 : 2;
    ballX = 300;
    ballY = 200;
    velocityY = 2;

    if (score1 >= 5 || score2 >= 5) {
        announceWinner();
    }
}

function restartGame() {
    ballX = 300;
    ballY = 200;
    velocityX = 2;
    velocityY = 2;
    paddle1Y = 165;
    paddle2Y = 165;
    score1 = 0;
    score2 = 0;
    score1Display.innerText = score1;
    score2Display.innerText = score2;
    winnerText.style.display = 'none';
    interval = setInterval(gameLoop, 10);
    playAgain.style.display = 'none';
}

function announceWinner() {
    clearInterval(interval);
    const winner = score1 >= 5 ? "Player 1 Wins!" : "Player 2 Wins!";
    winnerText.innerText = winner;
    winnerText.className = 'winner ' + (score1 >= 5 ? 'player1' : 'player2');
    winnerText.style.display = 'block';
    playAgain.style.display = 'block';
}
let gamePaused = false;

function togglePlayPause() {
    if (gamePaused) {
        // Resume the game
        interval = setInterval(gameLoop, 10);
        document.getElementById('togglePlay').innerHTML = '&#10073;&#10073;'; // Set to Pause symbol
    } else {
        // Pause the game
        clearInterval(interval);
        document.getElementById('togglePlay').innerHTML = '&#9658;'; // Set to Play symbol
    }
    gamePaused = !gamePaused; // Toggle the paused state
}

function restartGame() {
    clearInterval(interval);
    ballX = 300;
    ballY = 200;
    velocityX = 2;
    velocityY = 2;
    paddle1Y = 165;
    paddle2Y = 165;
    score1 = 0;
    score2 = 0;
    score1Display.innerText = score1;
    score2Display.innerText = score2;
    winnerText.style.display = 'none';
    playAgain.style.display = 'none';
    interval = setInterval(gameLoop, 10);
    gamePaused = false;
    document.getElementById('togglePlay').innerHTML = '&#10073;&#10073;'; // Reset to Pause symbol
}