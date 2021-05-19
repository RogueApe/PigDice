'use strict';

// Selecting elements
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');

// Selecting elements (buttons)
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Selecting elements (actice players)
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
// starting conditions (Selectors & values)
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

// on /off switch for game
let playGame;

// const scores = [0, 0];
let currentScore;
let scores;
let activePlayer;

const init = function () {
  playGame = true;

  // score reset
  currentScore = 0;
  scores = [0, 0];
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  // hide dice
  diceEL.classList.add('hidden');
  // reset background image n player
  activePlayer = 0;
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
};
init();

// roll dice function
const rollDice = function () {
  if (playGame) {
    // 1. make a dice generate 1 to 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display the dice
    diceEL.classList.remove('hidden');
    diceEL.src = `img/dice-${dice}.png`;

    // 3. if dice is 2-6.. do this
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      // current0EL.textContent = currentScore;
    } else {
      swapPlayer();
    }
  }
};

// roll dice button
btnRoll.addEventListener('click', function () {
  rollDice();
});

// swap player function
const swapPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// hold button
btnHold.addEventListener('click', function () {
  if (playGame) {
    // solutions
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playGame = false;
      
      diceEL.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      swapPlayer();
    }
  }
});

// new game button (reset everything)
btnNew.addEventListener('click', init);
