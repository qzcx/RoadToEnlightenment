var catan = catan || {};
catan.models = catan.models || {};

catan.models.ResourceList = (function() {

  var brick;
  var ore;
  var sheep;
  var wheat;
  var wood;
  
  /**
  @author Steve Allred
  The Resources object has a bunch of read-only variables that the controller can query.  It actually contains the data in local variables.
  Domain: 
    JSON: This should contain the initial values of the resources.
    
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
    
    @class Resources
    @constructor
    @param {JSON} the data containing the initialized objects
*/
  function ResourceList(json){
    this.brick = json.brick;
    this.ore = json.ore;
    this.sheep = json.sheep;
    this.wheat = json.wheat;
    this.wood = json.wood;
    return this;
  }

  /**
    @returns an array of the resources in the order needed by the controllers. 
  */
  ResourceList.prototype.getResourceArray = function(){
    return [this.wood,this.brick,this.sheep, this.wheat, this.ore];
  };

  /**
  Gets the quantity of Brick resources in the Resources.

    @class Resources
    @return an integer of the desired property
  */
  ResourceList.prototype.getBrickCount = function() {
      return this.brick;
  };

  /**
  Gets the quantity of Ore in the Resources.

    @class Resources
    @return an integer of the desired property
  */
  ResourceList.prototype.getOreCount = function() {
    return this.ore;
  };

  /**
  Gets the quantity of Sheep in the Resources.

    @class Resources
    @return an integer of the desired property
  */
  ResourceList.prototype.getSheepCount = function() {
    return this.sheep;
  };

  /**
  Gets the quantity of Wheat in the Resources.

    @class Resources
    @return an integer of the desired property
  */
  ResourceList.prototype.getWheatCount = function() {
    return this.wheat;
  };

  /**
  Gets the quantity of Wood in the Resources.

    @class Resources
    @return an integer of the desired property
  */
  ResourceList.prototype.getWoodCount = function() {
    return this.wood;
  };

  /**
   * Checks to see if this resource list has at least the amount in the new resourceList.
   * @return true if this ResourceList has at least the same as the number of resources in the passed in ResourceList, false otherwise
   */
  ResourceList.prototype.hasAtLeast = function(br, or, sh, wh, wo) {
      return this.brick >= br && this.ore >= or && this.sheep >= sh && this.wheat >= wh && this.wood >= wo;
  };
  
  /**
   * Checks to see if this resource list has at least the amount in the new resourceList.
   * @return true if this ResourceList has at least the same as the number of resources in the passed in ResourceList, false otherwise
   */
  ResourceList.prototype.getTotalCount = function() {
      return this.getBrickCount() + this.getOreCount() + this.getSheepCount() + this.getWheatCount() + this.getWoodCount();
  };
  
  return ResourceList;
})();