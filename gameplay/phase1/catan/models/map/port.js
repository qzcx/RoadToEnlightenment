var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};

catan.models.map.Port = (function() {

  function Port(portjson) {
    //init type
    this.type = portjson.inputResource;
    //init location
    this.location = new catan.models.map.HexLocation(portjson.location.x, portjson.location.y);
    //init orientation
    this.orientation = portjson.orientation;
    //init ratio
    this.ratio = portjson.ratio;
    //init validVertices
    this.validVertices = [
      new catan.models.map.VertexLocation(portjson.validVertex1),
      new catan.models.map.VertexLocation(portjson.validVertex2)
    ];
  }

  /**
  @property type
  @type String
  */
  Port.prototype.getType = function(){
      return this.type;
  };
  //core.defineProperty(Port.prototype,"type");
  
  /**
  @property location
  @type HexLocation
  */
  Port.prototype.getLocation = function(){
      return this.location;
  };
  //core.defineProperty(Port.prototype,"location");
  
  /**
  @property orientation
  @type EdgeDirection
  */
  Port.prototype.getOrientation = function(){
      return this.orientation;
  };
  //core.defineProperty(Port.prototype,"orientation");
  
  /**
  @property ratio
  @type number
  */
  Port.prototype.getRatio = function(){
      return this.ratio;
  };
  //core.defineProperty(Port.prototype,"ratio");
  
  /**
  @property validVertices
  @type vertexLocation[]
  */
  Port.prototype.getValidVertices = function(){
      return this.validVertices;
  };
  //core.defineProperty(Port.prototype,"validVertices");

  /**
    @author Jon George
    Port class contains data about a port
    Domain: 
      portjson: the port json data from server used to intialize the port
      
    Invariants:
      INVARIANT: port objects are read only
      
    Constructor Specification:
      PRE: portjson.inputResource is a string enum or ommitted 
      PRE: portjson.location {HexLocation} containing valid x,y location for an ocean tile
      PRE: portjson.orientation is a string enum ("NW","N","NE","E","SE","SW")
      PRE: portjson.ratio is a positive int
      PRE: portjson.validVertex1 contains valid x,y tile position and direction
      PRE: portjson.validVertex2 contains valid x,y tile position and direction
      
      @class Port
      @constructor
      @param {Object} portjson the port json data from server used to intialize the port
  */
  

  return Port;
})();


catan.models.map.VertexLocation = (function() {
  /**
    @author Jon George
    VertexLocation class contains a location and direction of a given vertex
    Domain: 
      vertexjson: the vertex json data from server used to intialize the VertexLocation
      
    Invariants:
      INVARIANT: vertex objects are read only
      
    Constructor Specification:
      PRE: vertexjson.x {Number} contains valid x coordinate
      PRE: vertexjson.y {Number} contains valid y coordinate
      PRE: vertexjson.direction {String} enum ("W","NW","NE","E","SE","SW")
      
      @class VertexLocation
      @constructor
      @param {Object} portjson the port json data from server used to intialize the port
  */
  function VertexLocation(vertexjson) {
    this.location = new catan.models.map.HexLocation(vertexjson.x, vertexjson.y);
    this.direction = vertexjson.direction;
  }
  /**
  @property location
  @type HexLocation
  */
  VertexLocation.prototype.getLocation = function(){
      return this.location;
  };
  //core.defineProperty(HexLocation.prototype,"location");
  /**
  @property direction
  @type VertexDirection
  */
  VertexLocation.prototype.getDirection = function(){
      return this.direction;
  };
  
  //core.defineProperty(HexLocation.prototype,"direction");


  return VertexLocation;
}());
