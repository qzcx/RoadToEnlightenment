var catan = catan || {};
catan.models = catan.models || {};

catan.models.Player = (function() {

  var cities;
  var color;
  var discarded;
  var largestArmy;
  var longestRoad;
  var monuments;
  var name;
  var newDevCards;
  var oldDevCards;
  var orderNumber;
  var playedDevCard;
  var playerID;
  var resources;
  var points;
  /**
    @author Steve Allred
    The Player class contains information about a player and has methods that query the state of the player.
    Domain:
      userdata: The user's specific data that is used to create the Player object.  This will be in the form of JSON when it comes from the server.

    Read-only:
      The player object on the client side is read-only.  The server will update the client side model with a new version.

    Constructor Specification:
      PRE: userdata provides a name (string) and a color (string).  All other data is either calculated or generated.

      POST: The constructor creates an object that has all of the following fields initialized:
      -cities : number
      -color : string
      -discarded : boolean
      -largestArmy : boolean
      -longestRoad : boolean
      -monuments : number
      -name : string
      -newDevCards : DevCardList
      -oldDevCards : DevCardList
      -orderNumber : number
      -playedDevCard : boolean
      -playerID : integer
      -resources : ResourceList

      @class Player
      @constructor
      @param {Object} the data containing the user name and color
  */
  function Player(data) {
    this.cities = data.cities;
    this.roads = data.roads;
    this.settlements = data.settlements;
    this.color = data.color;
    this.discarded = data.discarded;
    this.largestArmy = data.largestArmy;
    this.longestRoad = data.longestRoad;
    this.monuments = data.monuments;
    this.name = data.name;
    this.newDevCards = data.newDevCards;
    this.oldDevCards = data.oldDevCards;
    this.orderNumber = data.orderNumber;
    this.playedDevCard = data.playedDevCard;
    this.playerID = data.playerID;
    this.resources = new catan.models.ResourceList(data.resources);
    this.soldiers = data.soldiers;
    this.points = data.victoryPoints;
  }
  //Getters
  Player.prototype.getCities = function(){
    return this.cities;
  };
  Player.prototype.getRoads = function(){
    return this.roads;
  };
  Player.prototype.getSettlements = function(){
    return this.settlements;
  };
  Player.prototype.getColor = function(){
    return this.color;
  };
  Player.prototype.getDiscarded = function(){
    return this.discarded;
  };
  Player.prototype.getLargestArmy = function(){
    return this.largestArmy;
  };
  Player.prototype.getLongestRoad = function(){
    return this.longestRoad;
  };
  Player.prototype.getMonuments = function(){
    return this.monuments;
  };
  Player.prototype.getName = function(){
    return this.name;
  };
  Player.prototype.getNewDevCards = function(){
    return this.newDevCards;
  };
  Player.prototype.getOldDevCards = function(){
    return this.oldDevCards;
  };
  Player.prototype.getOrderNumber = function(){
    return this.orderNumber;
  };
  Player.prototype.getPlayedDevCard = function(){
    return this.playedDevCard;
  };
  Player.prototype.getPlayerID = function(){
    return this.playerID;
  };
  Player.prototype.getPoints = function(){
    return this.points;
  };
  Player.prototype.getSoldierCount = function(){
    return this.soldiers;
  };
  //
  // New DevCard Get Methods
  //
  Player.prototype.getNewSoldierCount = function(){
    return this.newDevCards.soldier;
  };
  Player.prototype.getNewDevCardCount = function(){
    return this.newDevCards.monument;
  };
  Player.prototype.getNewMonopolyCount = function(){
    return this.newDevCards.monopoly;
  };
  Player.prototype.getNewRoadBuildingCount = function(){
    return this.newDevCards.roadBuilding;
  };
  Player.prototype.getNewYearOfPlentyCount = function(){
    return this.newDevCards.yearOfPlenty;
  };



  /**
    Checks with the internal data to find out if it can use a dev card.
    PRE:  This object has already been initialized.
    POST: The method returns whether the user can use a dev card.
  */
  Player.prototype.canPlayDevCard = function(){
    return !this.playedDevCard;
  };

  /**
  Checks with the internal data to find out if it can use Year of Plenty.
  PRE:  This object has already been initialized.
  POST: The method returns whether the user can use Year of Plenty.
   */
  Player.prototype.canPlayYearOfPlenty= function(){
    return this.oldDevCards.yearOfPlenty > 0 && this.canPlayDevCard();
  }

  /**
  Checks with the internal data to find out if it can use Road Building.
  PRE:  This object has already been initialized.
  POST: The method returns whether the user can use Road Building.
   */
  Player.prototype.canPlayRoadBuilding = function(){
    return this.oldDevCards.roadBuilding > 0 && this.canPlayDevCard();
  }

  /**
  Checks with the internal data to find out if it can play a Soldier card.
  PRE:  This object has already been initialized.
  POST: The method returns whether the user can play a Soldier card.
   */
  Player.prototype.canPlaySoldier = function(){
    return this.oldDevCards.soldier > 0 && this.canPlayDevCard();
  }

  /**
  Checks with the internal data to find out if it can play a monument card.
  PRE:  This object has already been initialized.
  POST: The method returns whether the user can play a monument card.
   */
  Player.prototype.canPlayMonument = function(){
    return (this.oldDevCards.monument > 0 || this.newDevCards.monument > 0) && this.canPlayDevCard();
  }

  /**
  Checks with the internal data to find out if it can play monopoly.
  PRE:  This object has already been initialized.
  POST: The method returns whether the user can play monopoly.
   */
  Player.prototype.canPlayMonopoly = function(){
    return this.oldDevCards.monopoly > 0 && this.canPlayDevCard();
  }

  /**
    Checks with the internal data to find out if it can buy a dev card.

    PRE:  This object has already been initialized.
    POST: The method returns whether the user can buy a dev card.
  No parameters are necessary to check this value.
  */
  Player.prototype.canAffordToBuyDevCard = function() {
    return this.resources.hasAtLeast(0,1,1,1,0);
  };

  /**

    Checks with the internal data to find out if it can buy a road.

    PRE:  This object has already been initialized.
          The road location is open
          The road location is connected to another road
          The road location is not on water
          You have the resources (1 wood, 1 brick; 1 road)

    POST: The method returns whether the user can buy a road.
  No parameters are necessary to check this value.
  */
  Player.prototype.canAffordToBuyRoad = function() {
    return this.resources.hasAtLeast(1,0,0,0,1) && this.roads > 0;
  };

  /**

    Checks with the internal data to find out if it can buy a settlement.

    PRE:  This object has already been initialized.
          The settlement location is open
          The settlement location is not on water
          The settlement location is connected to one of your roads
          You have the resources (1 wood, 1 brick, 1 wheat, 1 sheep; 1 settlement)
    POST: The method returns whether the user can buy a settlement.
  No parameters are necessary to check this value.
  */
  Player.prototype.canAffordToBuySettlement = function() {
    return this.resources.hasAtLeast(1,0,1,1,1) && this.settlements > 0;
  };

  /**

    Checks with the internal data to find out if it can buy a city.

    PRE:  This object has already been initialized.
    POST: The method returns whether the user can buy a settlement.
  No parameters are necessary to check this value.
  */
  Player.prototype.canAffordToBuyCity = function() {
    return this.resources.hasAtLeast(0,3,0,2,0) && this.cities > 0;
  };

  /**

    Checks with the internal data to find out if it can offer a trade.

    PRE:  This object has already been initialized.
    POST: The method returns whether the user can offer a trade.
    @param {resourceList} cardsTraded - cards the client wants to trade in
  */
  Player.prototype.canAffordToOfferTrade = function(cardsToGive) {
    return this.resources.hasAtLeast(cardsToGive.brick, cardsToGive.ore, cardsToGive.sheep, cardsToGive.wheat, cardsToGive.wood);
  };

  /**

    Checks with the internal data to find out if it can accept a trade.

    PRE:  This object has already been initialized.
    POST: The method returns whether the user can accept a trade.
    @param {resourceList} cardsToDiscard -cards the client will need to give
  */
  Player.prototype.canAcceptTrade = function(cardsToGive) {
    return this.resources.hasAtLeast(cardsToGive.brick < 0 ? -cardsToGive.brick : 0, cardsToGive.ore < 0 ? -cardsToGive.ore : 0, cardsToGive.sheep < 0 ? -cardsToGive.sheep : 0, cardsToGive.wheat < 0 ? -cardsToGive.wheat : 0, cardsToGive.wood < 0 ? -cardsToGive.wood : 0);
  };

  /**

    Checks with the internal data to find out if the user needs to discard a card.

    PRE:  This object has already been initialized.
    POST: The method returns whether the user needs to discard a card.
  No parameters are necessary to check this value.
  */
  Player.prototype.hasMoreThan7Cards = function() {
    return this.resources.getTotalCount() > 7;
  };

  /**
    This functions is used to see if a player can be robbed.
  */
  Player.prototype.hasNoCards = function(){
    return this.resources.getTotalCount() <= 0;
  };

  /**

      Checks with the internal data to find out if the player has the given cards

      PRE:  This object has already been initialized.
      Assuming that the only time that the user can't discard a card is if they have none.
      The specs didn't clarify this well.
      POST: The method returns whether the user can can discard a card.
    @method canDiscardCard
    @param {resourceList} cardsToDiscard -the cards to be discarded
  */
  Player.prototype.canDiscardCards = function(cardsToDiscard) {
    return this.resources.hasAtLeast(cardsToDiscard.brick, cardsToDiscard.ore, cardsToDiscard.sheep, cardsToDiscard.wheat, cardsToDiscard.wood);
  };

  /**
    PRE: There are resources associated with the user (there can be none, but we have to at least be able to check).
    POST: The method returns whether the user has the resources in the list.

    @param {array} resourceList The list of resources that you want to check.
    @return {boolean}
  */
  Player.prototype.hasXResources = function(resourceList) {
    return this.resources.hasAtLeast(resourceList.brick, resourceList.ore, resourceList.sheep, resourceList.wheat, resourceList.wood);
  };

  /**
   * This is a getter that wraps up all of the resources in a single object (without the methods of resourceList)
   */
  Player.prototype.getResources = function() {
    //just pass out a ResourceList
    return this.resources;
    /* var resourcesOut = {
        "brick" : this.resources.brick,
        "ore" : this.resources.ore,
        "sheep" : this.resources.sheep,
        "wheat" : this.resources.wheat,
        "wood" : this.resources.wood
    };
    return resourcesOut; */
  }
  /**
     @returns an array of the resources in the order needed by the controllers.
   */
  Player.prototype.getResourceArray = function(){
    return this.resources.getResourceArray();
  };
  return Player;
})();
