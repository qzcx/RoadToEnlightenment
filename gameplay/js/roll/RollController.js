/**
    This is the namespace the rolling interface
    @module catan.roll
    @namespace roll
*/

var catan = catan || {};
catan.roll = catan.roll || {};

catan.roll.Controller = (function roll_namespace(){

	var Controller = catan.core.BaseController;
    
	/**
		 * @class RollController
		 * @constructor
		 * @extends misc.BaseController
		 * @param{roll.View} view
		 * @param{roll.ResultView} resultView
		 * @param{models.ClientModel} clientModel
		 */

	var RollController = (function RollController_Class(){
		
		core.forceClassInherit(RollController,Controller);
 
		core.defineProperty(RollController.prototype,"rollResultView");
    core.defineProperty(RollController.prototype,"displayFlag");
    core.defineProperty(RollController.prototype,"game");
		
		function RollController(view,resultView, game){
			this.setRollResultView(resultView);
			Controller.call(this,view,game);

      this.game = game;
      this.displayFlag = false;
      this.serverUpdated = true;
			this.timerStarted = false;
			this.timerID = null;
      this.game.addObserver(this, this.onModelUpdate);
     
		};
    /**
    * This method will begin to roll phase only if current user is in isRollingPhase() 
    * @method onUpdate
    * @return void
    **/
    RollController.prototype.onModelUpdate = function(){
      //check flag if already displaying
      if(this.displayFlag || !this.serverUpdated)
        return;
      //check if my turn
      var turnTracker = this.game.getModel().getTurn();
     // console.log("Turn:"+turnTracker.getTurnPlayerId());
      //console.log("playerId:" + this.game.getCurrentPlayerId());
      //debugger;
      if(!this.game.getModel().isMyTurn())
        return;
      //check if roll phase
      if(!turnTracker.isRollingPhase())
        return;
      //set flag to true
      this.displayFlag = true;
      this.serverUpdated = false;
      //display view
      this.getView().showModal();
      // init timer
      this.initTimer();
      //start roll
      this.startTimer();
      this.timerStarted = true;
    };

		/**
		 * This is called from the roll result view.  It should close the roll result view and allow the game to continue.
		 * @method closeResult
		 * @return void
		**/
		RollController.prototype.closeResult = function(){
       this.rollResultView.closeModal();
       this.displayFlag = false;
       //resume refreshing the client
       this.game.resumeRefresh();
		}
		
		/**
		 * This method generates a dice roll
		 * @method rollDice
		 * @return void
		**/
		RollController.prototype.rollDice = function(){
	    this.stopTimer();
      
      //calculate result
      var rolledNumber = catan.util.dice.rollDie() + catan.util.dice.rollDie();   
      //hide view modal
      this.getView().closeModal();
      //set result modal message
      this.rollResultView.setAmount(rolledNumber);
      //show result modal
      this.rollResultView.showModal();
      //send the server request
      var that = this;
      this.game.rollDice(rolledNumber, function() {
        that.serverUpdated = true;
      }); 
      //pause the updates to the client
      this.game.pauseRefresh();  
		};
    /**
     * This method set the length of timer to 3 seconds
     * @method initTimer
     * @return void
    **/
    RollController.prototype.initTimer = function(){
     // Set the length of the timer, in seconds
     this.secs = 10;
     this.stopTimer();
    }

   /**
    * This method clear timeout
    * @method stopTimer
    * @return void
    **/
   RollController.prototype.stopTimer = function(){ 
     if(this.timerStarted)
        clearTimeout(this.timerID);
	   this.timeStarted = false;
   }

  /**
  * This method automatically start to roll time for 3 seconds 
  * @method startRoll
  * @return void
  **/
  RollController.prototype.startTimer = function(){
      var that = this;
      this.getView().changeMessage("Click roll. Auto Rolling in " + this.secs + " seconds");
     
      this.secs = this.secs - 1;
      
      var timer = function(){
        that.startTimer();
      }

      if (this.secs==0){
        this.stopTimer();
		    this.rollDice();
	    }
      else{  
        this.timerID = window.setTimeout(timer, 1000);
      } 
  }	
		return RollController;
	}());
	
	return RollController;

}());

