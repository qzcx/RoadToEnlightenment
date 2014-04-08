/*var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};



catan.models.map.EdgeValue = (function() {

  /**
  @property ownerID
 
  //core.defineProperty(Map.prototype, "ownerID");

  /**
  EdgeValue class to hold an Edge's values
  Domain:
    json: JSON that contains a value for ownerID

  Invariants:
    INVARIANT: EdgeValue objects are read only

  Constructor Specification:
    PRE: json contains an ownerID value that is an integer between -1 and 3
  
    @class EdgeValue
    @constructor
    @param {Object} json Contains a value for ownerID



    // Constructor 
/*  function EdgeValue(json) {
    this.ownerID = json.ownerID;
  }


  /**
  Returns the value of ownerID
  A value of -1 means is it unoccupied
  <pre>
  PRE: None
  POST: Returns a value between -1 and 3 that represents the owner that occupies the edge.
  </pre>
  @method getOwnerId
  @return Integer between -1 and 3 that represents the owner that occupies the edge. -1 means it is unoccupied
  EdgeValue.prototype.getOwnerID = function() {
      return this.ownerID;
  };

  return EdgeValue;
})();*/