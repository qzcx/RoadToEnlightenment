/**
    This is the namespace for the intitial game round
    @module catan.setup
    @namespace setup
*/

var catan = catan || {};
catan.setup= catan.setup || {};

catan.setup.Controller = (function(){
  
  var Controller = catan.core.BaseController;
    
  /** 
    @class SetupRoundController
    @constructor 
    @extends misc.BaseController
    @param {models.ClientModel} clientModel
    @param {map.MapController} mapController
  */
  var SetupRoundController = (function (){

    
    var SetupRoundController = function (game, mapController){
      
      this.mapController = mapController;
      this.game = game;
      this.state = Waiting;

      Controller.call(this,undefined,game);
      this.game.addObserver(this, this.onModelUpdate);
   };
        
   core.forceClassInherit(SetupRoundController,Controller);
   core.defineProperty(SetupRoundController.prototype, "state");
   core.defineProperty(SetupRoundController.prototype, "numOfRoads");
   core.defineProperty(SetupRoundController.prototype, "numOfSettlements");
   core.defineProperty(SetupRoundController.prototype, "mapController");
 
  /**
    This is the callback function passed into the game in order to update
    <pre>
    PRE: current player's turn
    PRE: is in setup phase
    PRE: is less then two round
    POST: set up two rounds(eatch round has one road and one setlement)
    POST: forward to Cantan.html if finished setup two rounds. 
    </pre>
    @return {None}
    */
  SetupRoundController.prototype.onModelUpdate = function(){
    
    var turnTracker = this.game.getModel().getTurn(); 
    //console.log(turnTracker);
    if (!turnTracker.isFirstSetup() && !turnTracker.isSecondSetup()){
      //console.log("Trying to change pages");
      window.location = "/catan.html";
      return;
    }

    if(this.state.onUpdateModel)
      this.state.onUpdateModel(this);
  };
    
    /**
      SetupRound State Classes
      A. c: Checks if is my turn and setupRound, then set state to BuildRoad
      D. BuildSettlement: Initiate build settlement, set state to WaitForSettlement
      E. WaitForSettlement: checks original settlement count against new settlement count, 
                            if different then set to FinishTurn.
      D. BuildRoad: Initiate Build road, set state to WaitForRoad
      E. WaitForRoad: checks original road count against new Road count, if different then set to FinishTurn
      F. FinishTurn: calls this.game.FinishTurn() and sets state to Settlement
    */
    var Waiting = {
      onUpdateModel: function(controller){
        var turnTracker = controller.game.getModel().getTurn();
        if(!controller.game.getModel().isMyTurn())
          return;
        //console.log("is setupPhase " + turnTracker.isSetupPhase())
        
        //check if setup phase
        if (!turnTracker.isFirstSetup() && !turnTracker.isSecondSetup())
           return;

        var client = controller.game.getModel();
        var currentPlayer = controller.game.getCurrentPlayer();
        controller.setState(BuildSettlement);

        if(controller.getState().execute)
          controller.getState().execute(controller, turnTracker.isFirstSetup());
      }
    };
    var BuildSettlement = {
      execute: function(controller, firstRound){
        //need to check if the settlement has already been built for this round
        var expectedNum = 5;
        if(!firstRound){
          expectedNum = 4;
        }
        if(controller.game.getModel().getSettlementCount() < expectedNum){
          controller.setState(BuildRoad);
          controller.getState().execute(controller);
          return;
        }

        controller.mapController.startMove("settlement", true, true);
        controller.setNumOfSettlements(controller.game.getModel().getSettlementCount());
        controller.state = WaitForSettlement;
       }
    };

    var WaitForSettlement = {
      onUpdateModel: function(controller){
        var updatedSettlementCount = controller.game.getModel().getSettlementCount();
        //this is hacky... wish they gave us a better way.
        //checks if the number of settlements has changed before going on.
        if(controller.getNumOfSettlements() > updatedSettlementCount){
          controller.setNumOfSettlements(0);
          controller.setState(BuildRoad);
          if(controller.getState().execute){
            controller.getState().execute(controller);
          }
        }
      }
    };

    var BuildRoad = {
      execute: function(controller){
      //need to check if the settlement has already been built for this round
      var turnTracker = controller.game.getModel().getTurn();
      var expectedNum = 15;
      if(turnTracker.isSecondSetup()){
        expectedNum = 14;
      }
      if(controller.game.getModel().getRoadCount() < expectedNum){
        controller.setState(FinishTurn);
        controller.getState().execute(controller);
        return;
      }

      controller.mapController.startMove("road", true, true);
	    controller.setNumOfRoads(controller.game.getModel().getRoadCount());
      controller.state = WaitForRoad;
      }
    };
    var WaitForRoad = {
      onUpdateModel: function(controller){
        var updatedRoadCount = controller.game.getModel().getRoadCount();
        if(controller.getNumOfRoads() > updatedRoadCount){
          controller.setNumOfRoads(0);
          controller.setState(FinishTurn);
          if(controller.getState().execute){
            controller.getState().execute(controller);
          }
        }
      }
    };
    var FinishTurn = {
      execute: function(controller){
        controller.game.finishTurn(function(){
          controller.setState(Waiting);
        });
      }
    };
    


    return SetupRoundController;
  }());
    
  return SetupRoundController;
}());

