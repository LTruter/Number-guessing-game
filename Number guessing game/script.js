'use strict';

// Selector variables
const pointsEl = document.querySelector('.points');
const messageEl = document.querySelector('.message');
const highscoreEl = document.querySelector('.highscore');
const checkEl = document.querySelector('.check');
const numberEl = document.querySelector('.number');
const againEl = document.querySelector('.again');
const guessEl = document.querySelector('.guess');
const bodyEl = document.querySelector('body');

// Autofocus on input field once page loads
document.addEventListener('DOMContentLoaded', function () {
  guessEl.focus();
});

// Output message
function outputMessage(msg) {
  messageEl.textContent = msg;
}

// Generate random number
function randNumGen() {
  return Math.trunc(Math.random() * 20) + 1;
}

let randNum = randNumGen();

// Update points
function updateScore(points) {
  pointsEl.textContent = points;
}

// Processes the guess input
function processGuess() {
  // Prevent the event listener from running if the player has already guessed correctly
  if (!endGame) {
    const guess = Number(guessEl.value);

    // Checks if a guess was made
    if (!guess) {
      outputMessage('⛔ Please enter a number from 1 to 20!');

      // Checks if guess is outside the range of the game
    } else if (guess > 20 || guess < 1) {
      outputMessage(
        'HINT: The secret number could be any number from 1 to 20!'
      );

      // Checks if guess is correct
    } else if (guess === randNum) {
      // Checks if the guessed number is correct
      outputMessage('🥳 Correct!');

      // Update highscore if it's higher than current high score
      if (points > highScore) {
        highScore = points;
        highscoreEl.textContent = highScore;
      }

      // Displays the secret number
      numberEl.textContent = randNum;
      endGame = true;

      // Change the background colour
      bodyEl.style.backgroundColor = '#60b347';

      // Update the box size
      numberEl.style.width = '30rem';
    } else {
      incorrectGuess(guess);
    }
  }
}

// Displays outputMessage depending on incorrect
function incorrectGuess(guess) {
  // Checks if guess is off by 1
  if (guess === randNum + 1 || guess === randNum - 1) {
    outputMessage('😲Almost!');

    // Checks if guess is higher
  } else if (guess > randNum) {
    outputMessage('📈Too High!');

    // Checks if guess is lower
  } else {
    outputMessage('📉Too Low!');
  }

  points--;
  updateScore(points);

  // Checks if points is greater than 1
  if (points < 1) {
    outputMessage('☠ Play again!');
    endGame = true;
    return;
  }
}

// points
let points = Number(pointsEl.textContent);

// High points
let highScore = Number(highscoreEl.textContent);

// Variable will be used to end the game if true
let endGame = false;

// Enter key event listener for the input
guessEl.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    processGuess();
  }
});

// Click Event listener for the check button
checkEl.addEventListener('click', () => {
  processGuess();
});

// Event listener for again button
againEl.addEventListener('click', () => {
  points = 20;

  updateScore(points);

  outputMessage('Start guessing...');

  randNum = randNumGen();

  numberEl.textContent = '?';

  guessEl.value = '';

  guessEl.focus();

  endGame = false;

  bodyEl.style.backgroundColor = '#222';

  numberEl.style.width = '15rem';
});
