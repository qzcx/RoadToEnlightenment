var catan = catan || {};
catan.models = catan.models || {};

/**
  This module contains the top-level client model class

  @module                catan.models
  @namespace             catan.models
*/

catan.models.ClientModel = (function() {


  /**
    The model class for ClientModel. This Class and it's children are supposed to be immutable. This serves as the foundational model piece, through which all state is accessed. 

    <pre>
    Domain:
      - JSON has valid ClinetModel Schema referencing the TA provided spec
      - Has a player Id that's an integer

    PRE: A player ID
    PRE: A JavaScript Object from /game/model
    POST: A fully stocked ClientModel, ready to be used
    </pre>

    @class ClientModel
    @constructor
      
    @param {integer} playerId to the current logged in player
    @param {Object} json object from /game/model
  */
  function ClientModel(playerId, json) {
    if(!json){
      console.error("Could not find game, Go back to login page");
      return undefined;
    }

    // JSON attribures
    this._biggestArmyId = json.biggestArmy;
    this._longestRoadId = json.longestRoad;
    this._winnerId = json.winner;

    // Children attributes
    this._deck = new catan.models.Deck(json.deck);
    this._log = new catan.models.chat.Log(json.log);
    this._bank = new catan.models.Bank(json.bank);
    this._map = new catan.models.map.Map(json.map);
    this._turn = new catan.models.Turn(json.turnTracker);
    this._chat = new catan.models.chat.Chat(json.chat);
    this._tradeOffer = json.tradeOffer ? new catan.models.TradeOffer(json.tradeOffer) : null;
    // Using the collection map function, it's awesome,
    // you it just may not be super familiar to everyone.
    this._players = json.players.map(function(player) {
      // Create a new user for each in list with json `player'
      return new catan.models.Player(player);
    });

    //figure out the current players order.
    var results = this.getPlayers().filter(function(p) {
      // Add to results if expression is true
      return p.playerID == playerId;
    });
    if(results[0]){
      this._currentUserOrder = results[0].getOrderNumber();
    }else{
      console.error("Bug with playerID");
    }
    // TODO: Fix the trade offer thing. Not always there it seems.

    // This isn't needed, but last item is the implicit return.
    //return this;
  }

  //
  // Getters
  //


  /**
    Get List of Players

    <pre>
    PRE: None
    POST: Returns a list of players
    </pre>
      
    @return {array} List of players
  */
  ClientModel.prototype.getPlayers = function() {
    return this._players;
  };

  /**
    Get the ClientModel Bank

    <pre>
    PRE: None
    POST: Returns the Bank Model
    </pre>
      
    @return {Bank} the bank model
  */
  ClientModel.prototype.getBank = function() {
    return this._bank;
  };

  ClientModel.prototype.getBankResources = function() {
    return this._bank.resources;
  };


  /**
    Get the ClientModel Deck, that is, the game Deck

    <pre>
    PRE: None
    POST: Returns the Deck
    </pre>
      
    @return {Deck} the deck model
  */
  ClientModel.prototype.getDeck = function() {
    return this._deck;
  };

  /**
    Get the Chat model, which contains all the chat logs from the game

    <pre>
    PRE: None
    POST: Returns a Chat model
    </pre>
      
    @return {Chat} the chat log
  */
  ClientModel.prototype.getChat = function() {
    return this._chat;
  };

/**
    Get the Log model, which contains all the logs from the game

    <pre>
    PRE: None
    POST: Returns a Log model
    </pre>
      
    @return {Log} the log
  */
  ClientModel.prototype.getLog= function() {
    return this._log;
  };
  /**
    Get the current Turn model, the current Turn state

    <pre>
    PRE: None
    POST: Returns the Turn Model
    </pre>
      
    @return {Turn} the Turn model
  */
  ClientModel.prototype.getTurn = function() {
    return this._turn;
  };

  /**
    Get the any trade offers if availible

    <pre>
    PRE: None
    POST: Returns the TradeOffer Model
    </pre>
      
    @return {TradeOffer} the TradeOffer model
  */
  ClientModel.prototype.getTradeOffer = function() {
    return this._tradeOffer;
  };

  /**
    Get the Map model

    <pre>
    PRE: None
    POST: Returns the Map Model
    </pre>
      
    @return {Map} the Map model
  */
  ClientModel.prototype.getMap = function() {
    // Called gameMap so it's not confused with collections `map'
    return this._map;
  };

  /**
    Get the player id for longest road

    <pre>
    PRE: None
    POST: Returns the player id for longest road or none
    </pre>
      
    @return {integer}
  */
  ClientModel.prototype.getLongestRoadId = function() {
    return this._longestRoadId;
  };

  /**
    Get the player id for biggest army

    <pre>
    PRE: None
    POST: Returns the player id for biggest army or none
    </pre>
      
    @return {integer}
  */
  ClientModel.prototype.getBiggestArmyId = function() {
    return this._biggestArmyId;
  };


  /**
    Get the winning player id

    <pre>
    PRE: None
    POST: Returns the winning player id or none
    </pre>
      
    @return {integer}
  */
  ClientModel.prototype.getWinnerId = function() {
    return this._winnerId;
  };

  /**
    Get player object for some id

    <pre>
    PRE: None
    POST: Returns some player or empty player if no player is found
    </pre>
      
    @return {Player}
  */
  ClientModel.prototype.getPlayerWithOrder = function(playerOrder) {
    // Filter is another great method to clean up for loops
    var results = this._players.filter(function(p) {
      // Add to results if expression is true
      return p.getOrderNumber() == playerOrder;
    });
    // Return the first result, or null
    return results[0] || null;
  };

  //
  // Cans
  //

  /**
    Can the current player place a road at a location?

    <pre>
    PRE: There is a playerId
    PRE: Any location

    if (valid location)
      POST: Returns true
    else 
      POST: Returns false
    </pre>

    @param {Locaion} location 
      
    @return {boolean}
  */
  ClientModel.prototype.canPlaceRoad = function(location, direction, free) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);

    var isSetupPhase = this._turn.isSetupPhase();
    var isPlayPhase = this._turn.isPlayingPhase();
    var canPlaceRoad = this._map.canBuildRoad(this._currentUserOrder, location, direction, isSetupPhase);
    if(!free){
          var canAffordToBuyRoad = player.canAffordToBuyRoad();
    }
    else{
      var canAffordToBuyRoad = true;
    }

    // Can build road logic
    var status = isSetupPhase || isPlayPhase;
    status = status && canPlaceRoad && this.isMyTurn();
    if(!isSetupPhase) {
      status = status && canAffordToBuyRoad;
    }
    return status;
  };

  /**
    Can the current player place a settlement at a location?

    <pre>
    PRE: There is a playerId
    PRE: There are resouce cards in hand

    if (valid location)
      POST: Returns true
    else 
      POST: Returns false
    </pre>

    @param {Locaion} location 
      
    @return {boolean}
  */
  ClientModel.prototype.canPlaceSettlement = function(location, direction) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);

    var isSetupPhase = this._turn.isSetupPhase();
    var isPlayPhase = this._turn.isPlayingPhase();
    var canPlaceSettlement = this._map.canBuildSettlement(this._currentUserOrder, location, direction, isSetupPhase);

    var canAffordToBuySettlement = player.canAffordToBuySettlement();

    // Can build road logic
    var status = isSetupPhase || isPlayPhase;
    status = status && canPlaceSettlement && this.isMyTurn();
    if(!isSetupPhase) {
      status = status && canAffordToBuySettlement;
    }
    return status;
  
  };

  /**
    Can the current player place a city at a location?

    <pre>
    PRE: There is a playerId
    PRE: There are resouce cards in hand

    if (location is a settlement owned by the user)
      POST: Returns true
    else 
      POST: Returns false
    </pre>

    @param {Locaion} location 
      
    @return {boolean}
  */
  ClientModel.prototype.canPlaceCity = function(location, direction) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);

    var isPlayPhase = this._turn.isPlayingPhase();
    var turnPlayerId = this._turn.getTurnPlayerId();
    var canPlaceCity = this._map.canBuildCity(this._currentUserOrder, location, direction);

    var canAffordToBuyCity = player.canAffordToBuyCity();

    // Can build road logic
    var status = isPlayPhase;
    status = status && canPlaceCity && turnPlayerId == this._currentUserOrder;
    status = status && canAffordToBuyCity;
    
    return status;
  };

  /**
    <pre>
    PRE: The client has the cards he wants to trade in
    POST: returns whether or not the trade is valid based 
    </pre>
     
    @method canMaritimeTrade
    @param 
  */
  ClientModel.prototype.canMaritimeTrade = function(typeToGive, ratio, typeToGet) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    var isPlayPhase = this._turn.isPlayingPhase();
    var turnPlayerId = this._turn.getTurnPlayerId();
    var canMaritimeTrade = this._map.canMaritimeTrade(this._currentUserOrder, ratio, typeToGive);
    var resources = player.getResources();
    var canAffordTrade = resources[typeToGive] >= ratio;
    var bankCanAfford = this._bank.resources[typeToGet] > 0;
    
    var status = isPlayPhase && turnPlayerId == this._currentUserOrder &&
                 canMaritimeTrade && canAffordTrade && bankCanAfford;
    return status;
  };
  
   /**
    Checks with the internal data to find out if it can buy a dev card.
    
    PRE:  This object has already been initialized.
    POST: The method returns whether the user can buy a dev card.  
    @method canBuyDevelomentCard
  */
  ClientModel.prototype.canBuyDevelopmentCard = function() {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    var isPlayPhase = this._turn.isPlayingPhase();
    var turnPlayerId = this._turn.getTurnPlayerId();
    var canAfford = player.canAffordToBuyDevCard();
    var status = isPlayPhase && turnPlayerId == this._currentUserOrder && canAfford;
    return status;
  };
  
  /**
    Checks with the internal data to find out if it can offer a trade.
    
    PRE:  This object has already been initialized.
    POST: The method returns whether the user can offer a trade. 
    @method canOfferTrade
    
    @param {resourceList} cardsTraded - cards the client wants to trade in
  */
  ClientModel.prototype.canOfferTrade = function(cardsTraded) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    var isPlayPhase = this._turn.isPlayingPhase();
    var turnPlayerId = this._turn.getTurnPlayerId();
    var canAfford = player.canAffordToOfferTrade(cardsTraded);
    var status = isPlayPhase && turnPlayerId == this._currentUserOrder && canAfford;
    return status;
  };
  
  /**
    Checks with the internal data to find out if it can accept a trade.
    
    PRE:  This object has already been initialized.
    POST: The method returns whether the user can accept a trade. 
    @method canAcceptTrade
    @param {resourceList} cardsRecieved -cards the client will receive
  */
  ClientModel.prototype.canAcceptTrade = function() {
    if(this._tradeOffer === null) return false;

    var player = this.getPlayerWithOrder(this._currentUserOrder);
    var isPlayPhase = this._turn.isPlayingPhase();
    var turnPlayerId = this._turn.getTurnPlayerId();
    var canAfford = player.canAcceptTrade(this._tradeOffer.getCardsAskedFor());
    var status = isPlayPhase && turnPlayerId == this._currentUserOrder && canAfford;
    return status;
  };
  
  /**
    Checks with the internal data to find out if the player has the given cards
      
    PRE:  This object has already been initialized.
    POST: The method returns whether the user can can discard a card.
    
    @method canDiscardCard
    @param {resourceList} cardsDiscarded -the cards to be discarded
  */
  ClientModel.prototype.canDiscardCards = function(cardsDiscarded) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    return player.canDiscardCards(cardsDiscarded);
  };
  
  ClientModel.prototype.canPlayYearOfPlenty = function(resource1, resource2) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    var status = this.isMyTurn();
    var status = status && this._bank.hasResource(resource1) && this._bank.hasResource(resource2);
    
    return player.canPlayYearOfPlenty() && status;
  };
  
  
  ClientModel.prototype.canPlayRoadBuilding = function(loc1, dir1, loc2, dir2) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    var status = this.isMyTurn() && this._map.canPlayRoadBuilder(this._currentUserOrder, loc1, dir1, loc2, dir2);
    return player.canPlayRoadBuilding() && status;
  };
  
  ClientModel.prototype.canPlayRobber = function(playerIdToRob, newRobberLoc) {
    var status = this.isMyTurn();
    if(playerIdToRob != -1){
      status = status && this._map.canRobPlayer(playerIdToRob, newRobberLoc);
    }
    status = status && this._map.canPlaceRobber(newRobberLoc);
    return status;
  };
  
  ClientModel.prototype.canPlaySoldier = function(playerIdToRob, newRobberLoc) {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    return this.canPlayRobber(playerIdToRob, newRobberLoc) && player.canPlaySoldier();
  };
  
  ClientModel.prototype.canPlayMonopoly = function() {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    var status = this.isMyTurn();
    return player.canPlayMonopoly() && status;
  };
  
  ClientModel.prototype.canPlayMonument = function() {
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    var status = this.isMyTurn();
    return player.canPlayMonument() && status;
  };
  
  ClientModel.prototype.canRoll = function() {
    var isRollingPhase = this._turn.isRollingPhase();
    var turnPlayerId = this._turn.getTurnPlayerId();
    var status = isRollingPhase && this.isMyTurn();
    return status;
  };
  
  ClientModel.prototype.isMyTurn = function(){
    var turnPlayerId = this._turn.getTurnPlayerId();
    var status = turnPlayerId == this._currentUserOrder;
    return status;
  };


  ClientModel.prototype.getRoadCount = function(){
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    return player.getRoads();
  };

  ClientModel.prototype.getSettlementCount = function(){
    var player = this.getPlayerWithOrder(this._currentUserOrder);
    return player.getSettlements();
  };
  
  return ClientModel;
})();