'use strict';
// Selecting elements 
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
// Selecting elements (button)
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Selecting elements (active players)
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
// selectors & valuesscore0EL.textContent = 0;
score1EL.textContent = 0;diceEL.classList.add('hidden');
// on / off switch for game
let playGame;
// scores
let currentScore;
let scores;
// use for swapping player
let activePlayer;
// initialization (for reset)
// must declare those variable before this function
const init = function () {    
    playGame = true;    
    diceEL.classList.add('hidden');
    // reset scores text    
current0EL.textContent = 0;    
current1EL.textContent = 0;    
score0EL.textContent = 0;    
score1EL.textContent = 0;
    // reset scores actual value    
currentScore = 0;    
scores = [0, 0];
    // restart back to player 0     
activePlayer = 0;    
player0EL.classList.remove('player--winner');    
player1EL.classList.remove('player--winner');    
player0EL.classList.add('player--active');    
player1EL.classList.remove('player--active');};
// call this function after the function declaration in order to work
init();
// swap player functionconst 
swapPlayer = function () {    
    currentScore = 0;    
    document.getElementById(`current--${activePlayer}`).textContent = 0;    
    activePlayer = activePlayer === 0 ? 1 : 0;    
    player0EL.classList.toggle('player--active');    
    player1EL.classList.toggle('player--active');};
// roll Dice function 
const rollDice = function () {    
    if (playGame) {
        //roll dice        
const dice = Math.trunc(Math.random() * 6) + 1;        
// display dice        
diceEL.classList.remove('hidden');        
diceEL.src = `dice-${dice}.png`;        
//add dices to scores        
if (dice !== 1) {            
    currentScore += dice;            
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;        
} else { // swap players            
    swapPlayer();        
}    
}
};
// Roll dice button
btnRoll.addEventListener('click', function () {    
    rollDice();
});
// hold button (hold scores)
btnHold.addEventListener('click', function () {    
    // game on    
    if (playGame) {
        // if ! >= 100 ? if no then add to current score               
scores[activePlayer] += currentScore;        
document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // Win conditions : if >= 100 then announce winner        
if (scores[activePlayer] >= 20) {            
    // game off            
    playGame = false;            
    // update background image to declare winner            
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');            
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');            
    diceEL.classList.add('hidden');        
} else {            
    // swap player            
    swapPlayer();        
}    
}
});
// New Game button (Reset)// just call init(function) in this event handler
btnNew.addEventListener('click', init);