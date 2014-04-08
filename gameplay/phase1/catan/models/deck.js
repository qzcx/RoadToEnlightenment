var catan = catan || {};
catan.models = catan.models || {};

catan.models.Deck = (function() {
  var devCards;
  /**
  @author Steve Allred
  The Deck is a wrapper object of the DevCards object, and represents what's in the deck.
  Domain: 
    JSON: This should contain the initial values of our resources.
    
  Read-only:
    The player object on the client side is read-only.  The server will update the client side model with a new version.
    
  Constructor Specification:
    PRE: the JSON provides values for each of the resources.  All other data is either calculated or generated.
    
    POST: The constructor creates an object that has all of the following fields initialized:
      monopoly : number
      monument : number
      roadBuilding : number
      soldier : number
      yearOfPlenty : number
    
    @class Deck
    @constructor
    @param {JSON} the data containing the initialized objects
*/
  function Deck(devCardsList) {
    this.devCards = new catan.models.DevCards(devCardsList);
  }
  /**
  Gets the Monopoly card count.

    @class Deck
    @return an integer of the desired property
  */
  Deck.prototype.getMonopolyCount = function() {
      return this.devCards.getMonopolyCount();
  };
  /**
  Gets the Monument card count.

    @class Deck
    @return an integer of the desired property
  */
  Deck.prototype.getMonumentCount = function() {
      return this.devCards.getMonumentCount();
  };
  /**
  Gets the roadBuilding card count.

    @class Deck
    @return an integer of the desired property
  */
  Deck.prototype.getRoadBuildingCount = function() {
      return this.devCards.getRoadBuildingCount();
  };
  /**
  Gets the Soldier card count.

    @class Deck
    @return an integer of the desired property
  */
  Deck.prototype.getSoldierCount = function() {
      return this.devCards.getSoldierCount();
  };
  /**
  Gets the year of plenty card count.

    @class Deck
    @return an integer of the desired property
  */
  Deck.prototype.getYearOfPlentyCount = function() {
      return this.devCards.getYearOfPlentyCount();
  };

  return Deck;
})();