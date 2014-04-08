var catan = catan || {};
catan.util = catan.util || {};
catan.util.dice = catan.util.dice || {};

/**
  This module contains the game's util functinos

  @module                catan.util
  @namespace             catan.util
*/

/**
  This module is the dice util methods

  @module                catan.util.dice
  @namespace             catan.util.dice
*/

/**
  Play soldier card
  <pre>
  PRE: None
  POST: Receive a number between 1 - 6
  </pre>
   
  @method rollDie
  @return {integer} the result of the die roll
*/
catan.util.dice.rollDie = function() {
  return Math.floor(Math.random() * 6) + 1;
};