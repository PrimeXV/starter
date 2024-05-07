'use strict';

const getElement = identifier => document.querySelector(identifier);

/**
 * DOM elements
 */
const score0El = getElement('#score--0'); // The first player's score element
const score1El = getElement('#score--1'); // The second player's score element
const name0El = getElement('#name--0'); // The first player's name element
const name1El = getElement('#name--1'); // The second player's name element
const current0El = getElement('#current--0'); // The first player's current score element
const current1El = getElement('#current--1'); // The second player's current score element
const player0El = getElement('.player--0'); // The first player element
const player1El = getElement('.player--1'); // The second player element
const diceEl = getElement('.dice'); // The dice element
const btnNew = getElement('.btn--new'); // The new game button element
const btnRoll = getElement('.btn--roll'); // The roll dice button element
const btnHold = getElement('.btn--hold'); // The hold button element

let scores, currentScore, activePlayer, playing; // variable to hold active score, current score, active player and game state

// Game state
const initialize = () => {
  scores = [0, 0]; // reset the scores to zero
  currentScore = 0; // reset the current score to zero
  activePlayer = 0; // reset the active player to zero
  playing = true; // resume the game

  // Reset the game to its starting conditions
  score0El.textContent = 0; // reset the score to zero
  score1El.textContent = 0; // reset the score to zero
  current0El.textContent = 0; // reset the current score to zero
  current1El.textContent = 0; // reset the current score to zero

  diceEl.classList.add('hidden'); // hide the dice image
  player1El.classList.remove('player--active'); // remove the active class from player 2
  player0El.classList.add('player--active'); // add the active class to player 1
  player0El.classList.remove('player--winner'); // remove the winner class from player 1
  player1El.classList.remove('player--winner'); // remove the winner class from player 2
};
initialize(); // call the function to reset the game

// Function to switch to the next player
const switchPlayer = () => {
  // Switch to the next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // switch player from active player 1 to 2
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll the dice
const roll = () => {
  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1; // Generate a random number between 1 and 6

  if (playing) {
    // 2. Display the dice
    diceEl.classList.remove('hidden'); // show the dice image
    diceEl.src = `dice-${dice}.png`; // Display the image based on the number of dice

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice; // update new score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Dynamically select the active player
    } else {
      switchPlayer();
    }
  }
};

// Hold the score
const hold = () => {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore; // update new score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden'); // hide the dice image
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // add the winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // remove active player
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
};

/* Event listeners */
// Rolling dice event listener
btnRoll.addEventListener('click', roll);

// Hold button event listener
btnHold.addEventListener('click', hold);

// New game button event listener
btnNew.addEventListener('click', initialize);
