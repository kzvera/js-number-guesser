/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let player choose to play again
*/

// Game values
// can enter multiple values into a let/const on multiple lines separated with a comma on a new line
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
// Since the play-again class was added after the page loaded, we need to use event delegation,
// we need to add the listener to a parent and then we need to search for the target we want
game.addEventListener('mousedown', function(e) {
    // click causes the click of the button to automatically reload the page on the mouseup, mousedown stops that
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if (guess === winningNum) {
        // Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost
            gameOver(false, `GAME OVER, you lost. The correct number was ${winningNum}`);
        } else {
            // Game continues - answer wrong
            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            // Tell user guess is wrong
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red');
        }
    }
});

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;

    // Change border color
    guessInput.style.borderColor = color;

    // Set message
    setMessage(msg, color);

    // Play Again
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
    // Since the play-again class was added after the page loaded, we need to use event delegation, we need to add the listener to a parent and then we need to search for the target we want
}

// Get Random Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
