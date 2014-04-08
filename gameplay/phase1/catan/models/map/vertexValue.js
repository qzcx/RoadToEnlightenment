/*var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};

/*
REMOVED
catan.models.map.VertexValue = (function() {

  /**
  @property ownerID
  
  //core.defineProperty(Map.prototype, "ownerID");

  /**
  @property buildsite
  @type BuildStatus(enumeration)
  
  //core.defineProperty(Map.prototype, "buildsite");

  /**
  VertexValue class to hold an Vertex's values
  Domain:
    json: JSON that contains a value for ownerID and for worth(translated to buildsite)

  Invariants:
    INVARIANT: VertexValue objects are read only

  Constructor Specification:
    PRE: json contains an ownerID value that is an integer between -1 and 3 and a worth value that is an integer between 0 and 2
  
    @class VertexValue
    @constructor
    @param {Object} json Contains a value for ownerID and for worth


/*
  // Constructor 
  function VertexValue(json) {
    this.ownerID = json.ownerID;
    this.buildsite = json.worth; //need to add enumeration here...
  }

  /**
  Returns the value of ownerID
  A value of -1 means is it unoccupied
  <pre>
  PRE: None
  POST: Returns a value between -1 and 3 that represents the owner that occupies the vertex.
  </pre>
  @method getOwnerId
@return Integer between -1 and 3 that represents the owner that occupies the vertex. -1 means it is unoccupied

/*  VertexValue.prototype.getOwnerID = function() {
      return this.ownerID;
  };

  /**
  Returns the value of worth
  0 has nothing, 1 has settlement and 2 and city
  <pre>
  PRE: None
  POST: Returns a value between 0 and 2 that represents the owner that occupies the vertex.
  </pre>
  @method getBuildSite
  @return Integer between 0 and 2 representing the worth of a vertex

/*  VertexValue.prototype.getBuildSite= function() {
      return this.buildsite;
  };

  return VertexValue;
})();*/