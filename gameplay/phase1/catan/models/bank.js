var catan = catan || {};
catan.models = catan.models || {};

catan.models.Bank = (function() {

  var resources;
  /**
    @author Steve Allred
    The Bank has a bunch of read-only variables that the controller can query.  It is a wrapper object of a resources object, which actually contains the values.
    Domain: 
      JSON: This should contain the initial values of our resources.
      
    Read-only:
      The player object on the client side is read-only.  The server will update the client side model with a new version.
      
    Constructor Specification:
      PRE: the JSON provides values for each of the resources.  All other data is either calculated or generated.
      
      POST: The constructor creates an object that has all of the following fields initialized:
        brick : integer
        ore : integer
        sheep : integer
        wheat : integer
        wood : integer
    
    @class Bank
    @constructor
    @param {JSON} the data containing the initialized objects
  */
  function Bank(json) {
    this.resources = new catan.models.ResourceList(json);
  }

  Bank.prototype.hasResource = function(resource){
    var resourceLC = resource.toLowerCase();
    if(resourceLC == "brick"){
      if(this.getBrickCount() > 0)
        return true;
    } else if(resourceLC == "ore"){
      if(this.getOreCount() > 0)
        return true;
    } else if(resourceLC == "sheep"){
      if(this.getSheepCount() > 0)
        return true;
    } else if(resourceLC == "wheat"){
      if(this.getWheatCount() > 0)
        return true;
    } else if(resourceLC == "wood"){
      if(this.getWoodCount() > 0)
        return true;
    } 
    return false
  };

  /**
  Gets the quantity of Brick resources in the bank.

    @class Bank
    @return an integer of the desired property
  */
  Bank.prototype.getBrickCount = function() {
    return this.resources.getBrickCount();
  };

  /**
  Gets the quantity of Ore in the bank.

    @class Bank
    @return an integer of the desired property
  */
  Bank.prototype.getOreCount = function() {
    return this.resources.getOreCount();
  };

  /**
  Gets the quantity of Sheep in the bank.

    @class Bank
    @return an integer of the desired property
  */
  Bank.prototype.getSheepCount = function() {
    return this.resources.getSheepCount();
  };

  /**
  Gets the quantity of Wheat in the bank.

    @class Bank
    @return an integer of the desired property
  */
  Bank.prototype.getWheatCount = function() {
    return this.resources.getWheatCount();
  };

  /**
  Gets the quantity of Wood in the bank.

    @class Bank
    @return an integer of the desired property
  */
  Bank.prototype.getWoodCount = function() {
    return this.resources.getWoodCount();
  };
  
  return Bank;
})();