var catan = catan || {};
catan.models = catan.models || {};

catan.models.Turn = (function() {
  var phases = {
    Playing: "playing",
    Rolling: "rolling",
    Discarding: "discarding",
    Robbing: "robbing",
    FirstRound: "firstround",
    SecondRound: "secondround"
  };

  /**
    The model class keeps current turn of player's playing phase and its player's ID
    <pre>      
    Domain:

    var phases =
    {
   
      Playing: "playing",
      Rolling: "rolling",
      Discarding: "discarding",
      Robbing: "robbing",
   
    };

    JSON: This should contain the initial values of current trun:
      
      currentTurn: current player's id, Number
      status:  playing phase, Stirng
           
    Constructor Specification:
    PRE: the JSON provides value for keeping current turn
    POST: The constructor creates an object that has all of the following fields initialized:
        -playerID: current player's ID, integer
        -phase: current player's playing phase, integer
    </pre>

    @class catan.models.Turn
    @constructor
          
    @param {json} the data containing the initialized objects
  */

  function Turn(json) {

    this.playerID = json.currentTurn;
    this.phase = json.status;

  }

  /**
  Returns current player's ID
  <pre>
  PRE: None
  </pre>
         
  @method getTurnPlayerId
  @return {Number} player's ID    
  */
  Turn.prototype.getTurnPlayerId = function() {
    return this.playerID;
  };

  /**
  Returns current turn phase
  <pre>
  PRE: None
  </pre>
         
  @method getphase
  @return {String } phase
  */
  Turn.prototype.getPhase = function() {
    return this.phase;
  };
	
  /**
  Returns ture if the phase is playing phase otherwise, false.

  @method isPlayingPhase
  @return {boolean} true or false
  */
  Turn.prototype.isPlayingPhase = function() {
    if (this.phase.toLowerCase() == phases.Playing)
      return true;
    else
      return false;
  };

  Turn.prototype.isSetupPhase = function(){
    return this.isFirstSetup() || this.isSecondSetup();
  }
  /**
  Returns ture if the phase is in 1st setup phase otherwise, false.

  @method isSetupPhase
  @return {boolean} true or false
  */
  Turn.prototype.isFirstSetup = function() {
    if (this.phase.toLowerCase() == phases.FirstRound)
      return true;
    else
      return false;
  };

  /**
  Returns ture if the phase is in 2ns setup phase otherwise, false.

  @method isSetupPhase
  @return {boolean} true or false
  */
  Turn.prototype.isSecondSetup = function() {
    if (this.phase.toLowerCase() == phases.SecondRound)
      return true;
    else
      return false;
  };

  /**
  Returns ture if the phase is rolling phase otherwise, false.
         
  @method isRollingPhase
  @return {boolean} true or false
  */
  Turn.prototype.isRollingPhase = function() {
    if (this.phase.toLowerCase() == phases.Rolling )
      return true;
    else
      return false;
  };
	
  /**
  Returns ture if the phase is discard Phase otherwise, false.
         
  @method isDiscardingPhase
  @return {boolean} true or false
  */
  Turn.prototype.isDiscardingPhase = function() {
    if (this.phase.toLowerCase() == phases.Discarding )
      return true;
    else
      return false;
      
  };
  
  /**
  Returns ture if the phase is robbing Phase otherwise, false.
         
  @method isRobbingPhase
  @return {boolean} true or false
  */
  Turn.prototype.isRobbingPhase = function() {
    if (this.phase.toLowerCase() == phases.Robbing )
      return true;
    else
      return false;
      
  };

  return Turn;
})();