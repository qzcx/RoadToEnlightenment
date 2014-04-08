/**
    This is the namespace for maritime trading
    @module catan.trade
    @submodule catan.trade.maritime
    @namespace maritime
*/

var catan = catan || {};
catan.trade = catan.trade || {};
catan.trade.maritime = catan.trade.maritime || {};

catan.trade.maritime.Controller = (function trade_namespace(){
    
  var Definitions = catan.definitions;
  var ResourceTypes = Definitions.ResourceTypes;
    
  var MaritimeController = ( function MaritimeController_Class() {

    var Controller = catan.core.BaseController;
        
    /**
    @class MaritimeController
    @constructor 
    @extends misc.BaseController
    @param {maritime.View} view
    @param {models.ClientModel} clientModel
    */
    function MaritimeController(view,game){
      Controller.call(this,view,game);

      this.game = game;
      this.init = false;
      // TODO: This needs to be worked on so THIS is preserved.
      this.game.addObserver(this, this.OnUpdatedModel);
      
      //this.state = selGiveState;
    }

    MaritimeController.prototype = core.inherit(Controller.prototype);

    // Because Controller is too vague
    var DiscardController = catan.discard.Controller;
    core.defineProperty(DiscardController.prototype,"typeToGet");
    core.defineProperty(DiscardController.prototype,"giveAmount");
    core.defineProperty(DiscardController.prototype,"typeToGive");
    core.defineProperty(DiscardController.prototype,"init");
    core.defineProperty(DiscardController.prototype,"ratios");


    

    MaritimeController.prototype.OnUpdatedModel = function(){
      if(!this.init){
        this.getView().hideGiveOptions();
        this.getView().hideGetOptions();
        this.getView().setMessage("Select Trade Types");
      }
      //handle turn
      if(this.handleTurn()){
        
        if(this.updateGiveType()){
          this.updateGetType();
        }
        
        if(this.typeToGet && this.typeToGive){
          this.getView().enableTradeButton(true);
          this.getView().setMessage("Trade?");
        }
      }
      this.init = true;
    };


    MaritimeController.prototype.updateGiveType = function(){
      var types = catan.definitions.ResourceTypes;
      //this.getView().hideGiveOptions();
        //updates if not yet selected give value
      if(!this.typeToGive){
        var canTradeResources = [];
        this.ratios = {};
        for(var i=0; i<types.length; i++){
          var ratio = this.canTrade(types[i]);
          if(ratio > 0){
            this.ratios[types[i]] = ratio;
            canTradeResources.push(types[i]);
          }
        }
        if(canTradeResources.length > 0){
          this.getView().showGiveOptions(canTradeResources);
          return true;
        }else{
          this.typeToGet = undefined;
          this.typeToGive = undefined;
          this.getView().setMessage("No trades are possible");
          this.getView().enableTradeButton(false);
          this.getView().hideGiveOptions();
          this.getView().hideGetOptions();
          return false;
        }
      }
    };

    MaritimeController.prototype.updateGetType = function(){
      var types = catan.definitions.ResourceTypes;
      //this.getView().hideGetOptions();
      //updates if not yet selected get value
      if(!this.typeToGet){
        var canGetResources = [];
        var bankResources = this.game.getBankResources();
        for(var i=0; i<types.length; i++){
          if(bankResources[types[i]] > 0){
            canGetResources.push(types[i]);
          }
        }
        this.getView().hideGetOptions();
        if(canGetResources.length > 0){
          if(this.typeToGive){ //remove the type giving from the get options
            var index = canGetResources.indexOf(this.typeToGive);
            canGetResources.splice(index,1);
          }
          this.getView().showGetOptions(canGetResources);
        }else{
          this.getView().hideGiveOptions();
          this.getView().hideGetOptions();
          this.getView().setMessage("The Bank is broke!");
          this.getView().enableTradeButton(false);
          return;
        }
      }
    };

    /**
     * Called by the view when the player "undoes" their give selection
     * @method unsetGiveValue
     * @return void
     */
    MaritimeController.prototype.unsetGiveValue = function(){
      this.typeToGive = undefined;
      this.OnUpdatedModel(this);
      this.getView().enableTradeButton(false);
      this.getView().setMessage("Select Trade Types");
    };
        
    /**
         * Called by the view when the player "undoes" their get selection
     * @method unsetGetValue
     * @return void
     */
    MaritimeController.prototype.unsetGetValue = function(){
      this.typeToGet = undefined;
      this.getView().enableTradeButton(false);
      this.OnUpdatedModel();
      this.getView().setMessage("Select Trade Types");
    };
        
    /**
         * Called by the view when the player selects which resource to give
     * @method setGiveValue
     * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
     * @return void
     */
    MaritimeController.prototype.setGiveValue = function(resource){
      if(this.typeToGet == resource) //if you decide you actually want to trade the one you selected
        this.typeToGet = undefined; //deselect this guy
      this.typeToGive = resource;
      this.getView().selectGiveOption(resource, this.ratios[resource]);
      this.OnUpdatedModel();
    };
        
    /**
         * Called by the view when the player selects which resource to get
     * @method setGetValue
     * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
     * @return void
     */
    MaritimeController.prototype.setGetValue = function(resource){
      this.typeToGet = resource;
      //for some reason this has a port amount parameter as well???
      this.getView().selectGetOption(resource, 1);
      this.OnUpdatedModel();
    };
        
    /** Called by the view when the player makes the trade
     * @method makeTrade
     * @return void
     */
    MaritimeController.prototype.makeTrade= function(){
      this.game.maritimeTrade(this.typeToGive, this.typeToGet,
      this.ratios[this.typeToGive],  function(){});
      this.typeToGet = undefined;
      this.typeToGive = undefined;
      this.OnUpdatedModel();
    };

    MaritimeController.prototype.handleTurn = function(){
      if(!this.game.getModel().isMyTurn()){
        //this.getView().hideGiveOptions();
        //this.getView().hideGetOptions();
        this.typeToGive = undefined;
        this.typeToGet = undefined;
        this.getView().setMessage("It is not your turn");
        this.getView().hideGiveOptions();
        this.getView().enableTradeButton(false);
        this.getView().hideGetOptions();
        return false;
      }
      return true;
    };

    /**
    Private function
    checks a given resource to see if the player can trade it.
    */
    MaritimeController.prototype.canTrade = function(resourceType){
      var model = this.game.getModel();
      var player = this.game.getCurrentPlayer();
      var playerOrder = this.game.getCurrentPlayerOrder();
      var map = model.getMap();
      var resources = player.getResources();
      if(resources[resourceType] >= 2){
        if(map.canMaritimeTrade(playerOrder, 2 ,resourceType))
          return 2;
      }
      if(resources[resourceType] >= 3){
        if(map.canMaritimeTrade(playerOrder, 3))
          return 3;
      }
      if(resources[resourceType] >= 4){
        return 4;
      }
      return -1;
    };
    
    return MaritimeController;
  }());

  return MaritimeController;
}());


