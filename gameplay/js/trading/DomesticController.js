/**
 * This is the namespace for domestic trading
 * 
 * @module catan.trade
 * @submodule catan.trade.domestic
 * @namespace domestic
 */

var catan = catan || {};
catan.trade = catan.trade || {};
catan.trade.domestic = catan.trade.domestic || {};

catan.trade.domestic.Controller = (function trade_namespace() {

  var Controller = catan.core.BaseController;
  var Definitions = catan.definitions;
  var ResourceTypes = Definitions.ResourceTypes;
  var State;
  var DomesticController = (function DomesticController_Class() {

    /**
     * @class DomesticController
     * @constructor
     * @extends misc.BaseController
     * @param {domestic.View}
     *          view
     * @param {misc.WaitOverlay}
     *          waitingView
     * @param {domestic.AcceptView}
     *          acceptView
     * @param {core.Game}
     *          game
     */
    function DomesticController(view, waitingView, acceptView, game) {
      Controller.call(this, view, game);
      this.waitingView = waitingView;
      this.acceptView = acceptView;
      this.game = game;
      this.view = view;
      
      // Setup tradable players
      this.player = this.game.getCurrentPlayer();
      var self = this;
      var tradeablePlayers = this.game.getModel().getPlayers().filter(function(p) {
        if (p.getOrderNumber() != self.player.getOrderNumber()){
          p.index = p.getOrderNumber(); // the view expects this
          return true;
        }
        return false;
      });
      view.setPlayers(tradeablePlayers);
      
      // Setup callback method for observe pattern.
      this.game.addObserver(this, this.OnUpdatedModel);
    };
    
    DomesticController.prototype = core.inherit(Controller.prototype);
    
    /**
     *  OnUpdatedModel
     *  This function is the updating method that continually updates the view to reflect the model.
     */
    DomesticController.prototype.OnUpdatedModel = function(err){
      if (err) {
        console.log(err);
        return;// The trade failed somehow
      }
      this.player = this.game.getCurrentPlayer();
      if(this.game.model.isMyTurn() && this.game.model.getTurn().isPlayingPhase()){
        // set all of the trading interfaces to visible
        this.view.setPlayerSelectionEnabled(true);
        this.view.setResourceSelectionEnabled(true);
        this.updateState();
      } else if (!this.game.model.isMyTurn()){
        // set all of the trading interfaces to invisible
        this.view.setPlayerSelectionEnabled(false);
        this.view.setResourceSelectionEnabled(false);
        this.view.setTradeButtonEnabled(false);
      }
      var tradeOffer = this.game.model.getTradeOffer();
      if(tradeOffer){
        handleTradeOffer(tradeOffer, this);
      } else {
        // no active trade
        this.waitingView.closeModal();
        this.acceptView.closeModal();
      }
          
    };
    
    var handleTradeOffer = function(tradeOffer, self){
      if(tradeOffer.getSender() == self.player.getOrderNumber()){
        // we are the sender, please wait
        self.waitingView.showModal();
      } else if (tradeOffer.getReceiver() == self.player.getOrderNumber()){
        // we need to display the trade offer, so let's populate that view.
        self.acceptView.setPlayerName(self.game.model.getPlayerWithOrder(tradeOffer.getSender()).getName());
        self.acceptView.setAcceptEnabled(self.player.hasXResources(tradeOffer.getCardsOffered()));
        var giveResource;
        var getResource;
        var giveQty;
        var getQty;
        
        if (tradeOffer.getCardsOffered().getWheatCount() > 0){
          getQty = tradeOffer.getCardsOffered().getWheatCount();
          getResource = "wheat";
        }
        else if (tradeOffer.getCardsAskedFor().getWheatCount() > 0){
          giveQty = tradeOffer.getCardsAskedFor().getWheatCount();
          giveResource = "wheat";
        }
        
        if (tradeOffer.getCardsOffered().getBrickCount() > 0){
          getQty = tradeOffer.getCardsOffered().getBrickCount();            
          getResource = "brick";
        }
        else if (tradeOffer.getCardsAskedFor().getBrickCount() > 0){
          giveQty = tradeOffer.getCardsAskedFor().getBrickCount();            
          giveResource = "brick";
        }
        
        if (tradeOffer.getCardsOffered().getWoodCount() > 0){
          getQty = tradeOffer.getCardsOffered().getWoodCount();            
          getResource = "wood";
        }
        
        else if (tradeOffer.getCardsAskedFor().getWoodCount() > 0){
          giveQty = tradeOffer.getCardsAskedFor().getWoodCount();            
          giveResource = "wood";
        }
        
        if (tradeOffer.getCardsOffered().getSheepCount() > 0){
          getQty = tradeOffer.getCardsOffered().getSheepCount();
          getResource = "sheep";
        }
        else if (tradeOffer.getCardsAskedFor().getSheepCount() > 0){
          giveQty = tradeOffer.getCardsAskedFor().getSheepCount();            
          giveResource = "sheep";
        }
        
        if (tradeOffer.getCardsOffered().getOreCount() > 0){
          getQty = tradeOffer.getCardsOffered().getOreCount();
          getResource = "ore";
        }
        else if (tradeOffer.getCardsAskedFor().getOreCount() > 0){
          giveQty = tradeOffer.getCardsAskedFor().getOreCount();            
          giveResource = "ore";
        }
        // according to the ta opinion, we need to show nothing if the qty is zero
        if (giveResource)
          self.acceptView.addGiveResource(giveResource, giveQty);
        if (getResource)
          self.acceptView.addGetResource(getResource, getQty);
        
        self.acceptView.showModal();
      } else {
        // we do not care because we're in the trade deal anyway, so there should not be a modal for us
        self.waitingView.closeModal();
        self.acceptView.closeModal();
      }
    };

    core.defineProperty(DomesticController.prototype, "resourceToSend");// int
    core.defineProperty(DomesticController.prototype, "resourceToReceive");// int
    core.defineProperty(DomesticController.prototype, "otherPlayer");
    core.defineProperty(DomesticController.prototype, "receiveQty");// int
    core.defineProperty(DomesticController.prototype, "sendQty");// int

    /** ****** Methods called by the Domestic View ******** */

    /**
     * @method setResourceToSend
     * @param{String} resource the resource to send
     *                ("wood","brick","sheep","wheat","ore")
     * @return void
     */
    DomesticController.prototype.setResourceToSend = function(resource) {
      var self = this;
      if (self.sendQty != undefined){
        // another resource has already been set to send
        this.unsetResource(self.resourceToSend);
      } 
      if (self.resourceToReceive == resource){
        // Originally this resource was set to be received
        this.receiveQty = undefined;
        self.resourceToReceive = undefined;
      }
      self.sendQty = 0;
      var quickJson = { 
          "brick" : 0,
          "ore" : 0,
          "sheep" : 0,
          "wheat" : 0,
          "wood" : 0
      };
      quickJson[resource] = self.sendQty + 1;
      var shouldIncrease = this.player.hasXResources(new catan.models.ResourceList(quickJson));
      var shouldDecrease = false; // Can't offer negative numbers
      this.resourceToSend = resource;
      this.getView().setResourceAmountChangeEnabled(resource, shouldIncrease,shouldDecrease);
      this.getView().setResourceAmount(resource, self.sendQty);
      
      this.updateState();
    };

    /**
     * @method setResourceToReceive
     * @param{String} resource the resource to receive
     *                ("wood","brick","sheep","wheat","ore")
     * @return void
     */
    DomesticController.prototype.setResourceToReceive = function(resource) {
      // TODO: figure out how to set other radio buttons to null if they are on RECEIVE
      var self = this;
      if (self.receiveQty != undefined){
        this.unsetResource(self.resourceToReceive);
      }
      if (self.resourceToSend == resource){
        this.sendQty = undefined;
        self.resourceToSend = undefined;
      }    
      self.receiveQty = 0;
      var shouldIncrease = true; // You can demand all you want
      var shouldDecrease = false; // Can't demand negative numbers
      this.resourceToReceive = resource;
      this.getView().setResourceAmountChangeEnabled(resource, shouldIncrease,shouldDecrease);
      this.getView().setResourceAmount(resource, self.receiveQty);
      
      this.updateState();
    };

    /**
     * @method unsetResource
     * @param{String} resource the resource to clear
     *                ("wood","brick","sheep","wheat","ore")
     * @return void
     */
    DomesticController.prototype.unsetResource = function(resource) {
      if (this.resourceToReceive == resource){
        this.resourceToReceive = undefined;
        this.receiveQty = undefined;
      } else if (this.resourceToSend == resource){
        this.resourceToSend = undefined;
        this.sendQty = undefined;
      }

      // make it disappear
      this.getView().setResourceAmountChangeEnabled(resource, false, false);
      this.getView().setResourceAmount(resource, undefined);
      this.getView().clearTradeViewForResource(resource);
    };

    /**
     * @method setPlayerToTradeWith
     * @param{int} playerNumber the player to trade with
     * @return void
     */
    DomesticController.prototype.setPlayerToTradeWith = function(playerNumber) {
      if (playerNumber == undefined){
        playerNumber = undefined;
      } else if (playerNumber != -1)
        this.otherPlayer = this.ClientModel.getModel().getPlayerWithOrder(playerNumber);
      else
        this.otherPlayer = undefined;
      this.updateState();
    };

    /**
     * Increases the amount to send or receive of a resource
     * 
     * @method increaseResourceAmount
     * @param{String} resource ("wood","brick","sheep","wheat","ore")
     * @return void
     */
    DomesticController.prototype.increaseResourceAmount = function(resource) {
      var shouldDecrease;
      var shouldIncrease;
      var amount;
      var self = this;

      if (this.resourceToReceive == resource) {
        this.receiveQty++;
        shouldIncrease = true;
        shouldDecrease = self.receiveQty != 0;
        amount = self.receiveQty;
      } else if (this.resourceToSend == resource) {
        this.sendQty++;
        var quickJson = { 
            "brick" : 0,
            "ore" : 0,
            "sheep" : 0,
            "wheat" : 0,
            "wood" : 0
        };
        quickJson[resource] = self.sendQty + 1;
        shouldIncrease = this.player.hasXResources(new catan.models.ResourceList(quickJson));
        shouldDecrease = self.sendQty != 0;
        amount = self.sendQty;
      } else
        return;

      this.getView().setResourceAmountChangeEnabled(resource, shouldIncrease,
          shouldDecrease);
      this.getView().setResourceAmount(resource, amount);
    };

    /**
     * Decreases the amount to send or receive of a resource
     * 
     * @method decreaseResourceAmount
     * @param{String} resource ("wood","brick","sheep","wheat","ore")
     * @return void
     */
    DomesticController.prototype.decreaseResourceAmount = function(resource) {
      var shouldDecrease;
      var shouldIncrease;
      var amount;
      var self = this;
      
      if (this.resourceToReceive == resource) {
        this.receiveQty--;
        shouldIncrease = true;
        shouldDecrease = self.receiveQty != 0;
        amount = self.receiveQty;
      } else if (this.resourceToSend == resource) {
        this.sendQty--;
        var quickJson = { 
            "brick" : 0,
            "ore" : 0,
            "sheep" : 0,
            "wheat" : 0,
            "wood" : 0
        };
        quickJson[resource] = self.sendQty + 1;
        shouldIncrease = this.player.hasXResources(new catan.models.ResourceList(quickJson));
        shouldDecrease = self.sendQty != 0;
        amount = self.sendQty;
      } else
        return;

      this.getView().setResourceAmountChangeEnabled(resource, shouldIncrease,
          shouldDecrease);
      this.getView().setResourceAmount(resource, amount);
    };
    
    DomesticController.prototype.updateState = function(){
      if (this.resourceToSend == undefined || this.resourceToReceive == undefined){
        this.getView().setStateMessage("Select resources");
        this.getView().setTradeButtonEnabled(false);
      } else if (this.otherPlayer == undefined){
        this.getView().setStateMessage("Select a player");
        this.getView().setTradeButtonEnabled(false);
      } else {
        this.getView().setStateMessage("TRADE!");
        this.getView().setTradeButtonEnabled(true);
      }
      
    };

    /**
     * Sends the trade offer to the accepting player
     * 
     * @method sendTradeOffer
     * @return void
     */
    DomesticController.prototype.sendTradeOffer = function() {
      // prepare our trade offer (in the form of a ResourceList)
      var brick = 0;
      var sheep = 0;
      var wheat = 0;
      var ore = 0;
      var wood = 0;

      if (this.resourceToReceive === "brick")
        brick = -this.receiveQty;
      else if (this.resourceToSend === "brick")
        brick = this.sendQty;

      if (this.resourceToReceive === "sheep")
        sheep = -this.receiveQty;
      else if (this.resourceToSend === "sheep")
        sheep = this.sendQty;

      if (this.resourceToReceive === "wheat")
        wheat = -this.receiveQty;
      else if (this.resourceToSend === "wheat")
        wheat = this.sendQty;

      if (this.resourceToReceive === "ore")
        ore = -this.receiveQty;
      else if (this.resourceToSend === "ore")
        ore = this.sendQty;

      if (this.resourceToReceive === "wood")
        wood = -this.receiveQty;
      else if (this.resourceToSend === "wood")
        wood = this.sendQty;

      var list = new catan.models.ResourceList({ 
        "brick" : brick,
        "ore" : ore,
        "sheep" : sheep,
        "wheat" : wheat,
        "wood" : wood
      });
      var self = this;
      this.game.offerTrade(this.otherPlayer.getOrderNumber(), list, undefined);
      this.waitingView.showModal();
      
      //reset the view to where it began
      this.getView().setTradeButtonEnabled(false);
      this.getView().clearTradeView();
      this.resourceToReceive = undefined;
      this.receiveQty = undefined;
      this.resourceToSend = undefined;
      this.sendQty = undefined;
    };

    /** ***************** Methods called by the Accept Overlay ************ */

    /**
     * Finalizes the trade between players
     * 
     * @method acceptTrade
     * @param{Boolean} willAccept
     * @return void
     */
    DomesticController.prototype.acceptTrade = function(willAccept) {
      this.game.acceptTrade(willAccept, undefined);
      this.acceptView.closeModal();
    };

    return DomesticController;
  }());

  return DomesticController;
}());
