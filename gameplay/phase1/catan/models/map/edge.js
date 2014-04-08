var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};

/**
This class represents an edge. It inherits from BaseContainer.
The data in this class (that you get from the JSON model) is independent of the hexgrid, except for the location.
Therefore, we leave it up to you to decide how to implement it.
It must however implement one function that the hexgrid looks for: 'isOccupied' - look at its documentation.
From the JSON, this object will have two properties: location, and ownerID.
Besides the 'isOccupied' method, you may add any other methods that you need.

Domain: 
  edgejson: one edge portion of a hex on the map from the JSON returned by the server
  
Invariants:
  INVARIANT: Edge objects are read only
  
Constructor Specification:
  PRE: edgejson.value contains an EdgeValue object that defines the ownerID
  
  @class Edge
  @constructor
  @param {Object} edgejson One edge portion of a hex on the map from the JSON returned by the server
  @extends hexgrid.BaseContainer
*/
catan.models.map.Edge = (function Edge_Class(){
  
  //core.forceClassInherit(Edge, hexgrid.BaseContainer);

  //core.defineProperty(Edge.prototype, "value");


  function Edge(edgejson){
    this.ownerID = edgejson.value.ownerID;
    //this.value = new catan.models.map.EdgeValue(edgejson.value);
  }
  
  /**
  Returns true if edge is occupied by a player's piece (i.e. a road)
  <pre>
  PRE: None
  POST: returns a boolean that indicates whether a player has a piece on this edge
  </pre>

  @method isOccupied
  */
  Edge.prototype.isOccupied = function isOccupied(){
    if(this.ownerID > -1){
      return true;
    }
    return false;
  }

  /**
  REMOVED
  Returns the value of the edge, which contains the ownerID
  @method getValue
  
  Edge.prototype.getValue = function getValue(){
    return this.value;
  }*/

  /**
  Returns the value of ownerID
  A value of -1 means is it unoccupied
  <pre>
  PRE: None
  POST: Returns a value between -1 and 3 that represents the owner that occupies the edge.
  </pre>
  @method getOwnerId
  @return Integer between -1 and 3 that represents the owner that occupies the edge. -1 means it is unoccupied
  */
  Edge.prototype.getOwnerID = function() {
      return this.ownerID;
  };


  return Edge;
}());