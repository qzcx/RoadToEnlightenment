var catan = catan || {};
catan.models = catan.models || {};

catan.models.DevCards = (function() {
  var monopoly;
  var monument;
  var roadBuilding;
  var soldier;
  var yearOfPlenty;
  /**
  @author Steve Allred
  DevCards contains values of various development cards.
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
    
    @class DevCards
    @constructor
    @param {JSON} the data containing the initialized objects
*/
  function DevCards(json) {
    this.setIndividualValues(json.monopoly, json.monument, json.roadBuilding, json.soldier, json.yearOfPlenty);
    return this;
  }
  
  DevCards.prototype.setIndividualValues = function(mono, monu, road, sold, year){
    this.monopoly = mono;
    this.monument = monu;
    this.roadBuilding = road;
    this.soldier = sold;
    this.yearOfPlenty = year;
  };
  /**
  Gets the Monopoly card count.

    @class DevCards
    @return an integer of the desired property
  */
  DevCards.prototype.getMonopolyCount = function() {
    return this.monopoly;
  };
  /**
  Gets the Monument card count.

    @class DevCards
    @return an integer of the desired property
  */
  DevCards.prototype.getMonumentCount = function() {
    return this.monument;
  };
  /**
  Gets the roadBuilding card count.

    @class DevCards
    @return an integer of the desired property
  */
  DevCards.prototype.getRoadBuildingCount = function() {
    return this.roadBuilding;
  };
  /**
  Gets the Soldier card count.

    @class DevCards
    @return an integer of the desired property
  */
  DevCards.prototype.getSoldierCount = function() {
    return this.soldier;
  };
  /**
  Gets the year of plenty card count.

    @class DevCards
    @return an integer of the desired property
  */
  DevCards.prototype.getYearOfPlentyCount = function() {
    return this.yearOfPlenty;
  };
  /**
   * Checks to see if this devCard list has at least the amount in the new devCardList.
   * @return true if this devCard List has at least the same as the number of resources in the passed in devCardList, false otherwise
   */
  DevCards.prototype.hasAtLeast = function(devCards) {
    return !(this.monopoly < devCards.monopoly || this.monument < devCards.monument || this.roadBuilding < devCards.roadBuilding || this.soldier < devCards.soldier || this.yearOfPlenty < devCards.yearOfPlenty);
  };

  /**
   * Checks to see if this resource list has at least the amount in the new resourceList.
   * @return true if this ResourceList has at least the same as the number of resources in the passed in ResourceList, false otherwise
   */
  DevCards.prototype.getTotalCount = function() {
    return this.getMonopolyCount() + this.getMonumentCount() + this.getRoadBuildingCount() + this.getSoldierCount() + this.getYearOfPlentyCount();
  };
  
  return DevCards;
})();