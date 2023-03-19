'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');

let score;
let currentScore;
let activePlayer;
let playing;

// Init function
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  // Set player 1 as starting player
};

// Switch Player functionality
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// User rolls a dice
const rollsDice = function () {
  if (playing) {
    // 1. Generating a random number for dice roll
    let diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. displaying the dice value
    diceEl.src = `/public/img/dice-${diceRoll}.png`;
    diceEl.classList.remove('hidden');

    document.querySelector('.dice').textContent = diceRoll;

    // 3. checking if dice roll is 1
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

// User click hold button
const holdScore = function () {
  // 1. Add current score to active player's score
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // check if player's score is >= 100
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
      alert(
        `🥇YaaY! Congratulations! player${activePlayer + 1} is the winner! 🎉`
      );
    } else {
      switchPlayer();
    }
  }
};

init();
btnRoll.addEventListener('click', rollsDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', init);
