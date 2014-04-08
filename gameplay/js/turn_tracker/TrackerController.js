/**
The namespace for the turn tracker

@module catan.turntracker
@namespace turntracker
**/

var catan = catan || {};
catan.turntracker = catan.turntracker || {};

catan.turntracker.Controller = (function turntracker_namespace() {

  var Controller = catan.core.BaseController;
    
  /**
    The controller class for the Turn Tracker
    @class TurnTrackerController 
    @extends misc.BaseController
    @param {turntracker.View} view The view for this object to control.
    @param {core.Game} game The game for this object to control.
    @constructor
  **/
  var TurnTrackerController = (function TurnTrackerController_Class(){
  
    function TurnTrackerController(view, game){
      Controller.call(this,view,game);
      // TODO: This constructor should configure its view by calling view.setClientColor and view.initializePlayer
      // NOTE: The view.updateViewState and view.updatePlayer will not work if called from here.  Instead, these
      //          methods should be called later each time the client model is updated from the server.

      this.view = view;
      this.game = game;

      // Set local player color
      var currentPlayer = game.getCurrentPlayer();
      view.setClientColor(currentPlayer.getColor());

      // Init all the players
      var model = game.getModel();
      var players = model.getPlayers();
      players.forEach(function(player) {

        var color = player.getColor();
        var id = player.getOrderNumber();
        var name = player.getName();

        view.initializePlayer(id, name, color);

      });

      game.addObserver(this, this.onUpdatedModel);
    }

    core.forceClassInherit(TurnTrackerController,Controller);

    TurnTrackerController.prototype.onUpdatedModel = function() {
      var model = this.game.getModel();


      // 1) Update player changes
      var turnTracker = model.getTurn();
      var turnPlayerId  = turnTracker.getTurnPlayerId();
      var players = model.getPlayers();
      var self = this;
      players.forEach(function(player, index) {
        // Required update blob
        var Update = {
          playerIndex: player.getOrderNumber(),
          // TODO: Fix the Score
          score: player.getPoints(),
          // This is where we select the current active user
          highlight: (index == turnPlayerId),
          army: player.getLargestArmy(),
          road: player.getLongestRoad()
        };

        // Send update blob
        self.view.updatePlayer(Update);
      });

      // 2) Update Message state (updateStateView)
      if(!model.getTurn().isSetupPhase() && model.isMyTurn()) {
        this.view.updateStateView(true, "Finish Turn");
      } else {
        this.view.updateStateView(false, "Other Player's Turn");
      }
    };

    /**
     * Called by the view when the local player ends their turn.
     * @method endTurn
     * @return void
     */
    TurnTrackerController.prototype.endTurn = function(){
      this.view.updateStateView(false, "Finishing Turn");
      this.game.finishTurn(function() {});
    };
    
    return TurnTrackerController;
  } ());

  return TurnTrackerController;
} ());

