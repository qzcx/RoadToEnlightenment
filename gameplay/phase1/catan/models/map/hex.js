var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};

/**
This class represents a Hex. 
 
Domain: 
  hexjson: the JSON returned by the server for an individual Hex, including its edges, vertexes, location, and type 
  
Invariants:
  INVARIANT: Hex objects are read only
  
Constructor Specification:
  PRE: hexjson.location contains the information for a HexLocation object
  PRE: hexjson.edges is an array of objects to define Edge objects
  PRE: hexjson.vertexes is an array of objects to define Vertex objects
  PRE: hexjson.landtype may be omitted or may contain a string defining the type of land the hex represents
  PRE: hexjson.island is a boolean that defines whether the hex is land or water

@constructor
@param {Object} hexjson The JSON returned by the server for an individual Hex, including its edges, vertexes, location, and type 

@class Hex
*/
catan.models.map.Hex = (function CatanHex_Class(){

  
  /**
  @property location
  @type HexLocation
  */
  //core.defineProperty(Hex.prototype, "location");
  /**
  @property edges
  @type array<Edges>
  */
  //core.defineProperty(Hex.prototype, "edges");
  /**
  @property vertexes
  @type array<Vertexes>
  */
  //core.defineProperty(Hex.prototype, "vertexes");
  /**
  @property landtype
  @type string
  */
  //core.defineProperty(Hex.prototype, "landtype");
  /**
  @property island
  @type Boolean
  */
  //core.defineProperty(Hex.prototype, "island");

  //constructor
  function Hex(hexjson){
    //set location
    this.location = new catan.models.map.HexLocation(hexjson.location.x, hexjson.location.y);
    this.island = hexjson.isLand;
    this.edges = [];
    if(this.isLand){
      this.landtype = hexjson.landtype;
    }
    //make edges
    for(var i = 0; i < hexjson.edges.length; i++){
      this.edges[i] = new catan.models.map.Edge(hexjson.edges[i]);
    }

    //make vertexes
    this.vertexes = [];
    for(var i = 0; i < hexjson.vertexes.length; i++){
      this.vertexes[i] = new catan.models.map.Vertex(hexjson.vertexes[i]);
    }      
  }

  /**
  Returns the location of the Hex
  <pre>
  PRE: none
  POST: returns a HexLocation that is the location for the Hex
  </pre>

  @method getLocation
  @return HexLocation
  */
  Hex.prototype.getLocation = function(){
    return this.location;
  }
  
  /**
  Returns the edge belonging to the Hex at direction given
  <pre>
  PRE: A valid EdgeDirection indicator(like "NE" or 0 through 5) that specifies a direction on the Hex
  POST: returns an Edge belonging to the hex in the specified direction
  </pre>

  @method getEdge
  @param EdgeDirection -> string or number
  @return Edge
  */
  Hex.prototype.getEdge = function(direction){
    if(typeof direction == 'string'){
      var dir = catan.models.map.EdgeDirection[direction];
    }
    else if(typeof direction == 'number'){
      var dir = direction;
    }
    else{
      throw new Error("Not a string or number");
    }
    if((!dir && dir != 0) || dir < 0 || dir > 5){
      throw new Error("Invalid Direction");
    }
    return this.edges[dir];
  }

  /**
  Returns the vertex belonging to the Hex at direction given
  <pre>
  PRE: A valid VertexDirection indicator (like "NE" or 0 through 5) that specifies a direction on the Hex
  POST: returns a Vertex belonging to the hex in the specified direction
  </pre>

  @method getVertex
  @param VertexDirection -> string or number
  @return Vertex
  */
  Hex.prototype.getVertex = function(direction){
    if(typeof direction == 'string'){
      var dir = catan.models.map.VertexDirection[direction];
    }
    else if(typeof direction == 'number'){
      var dir = direction;
    }
    else{
      throw new Error("Not a string or number");
    }    
    if((!dir && dir != 0) || dir < 0 || dir > 5){
      throw new Error("Invalid Direction");
    }
    return this.vertexes[dir];
  }

  /**
  REMOVED
  Returns the vertex belonging to the Hex at direction given
  <pre>
  PRE: A number that corresponds to a vertex is given.
  POST: returns a Vertex belonging to the hex in the specified direction
  </pre>

  @method getVertexNum
  @param number
  @return Vertex
  
  Hex.prototype.getVertexNum = function(direction){
    if(direction < 0 || direction > 5){
      throw new Error("Invalid Direction");
    }
    return this.vertexes[direction];
  }*/

  /**
  REMOVED
  Returns the edge belonging to the Hex at direction given
  <pre>
  PRE: A valid EdgeDirection object that specifies a direction on the Hex
  POST: returns an Edge belonging to the hex in the specified direction
  </pre>

  @method getEdgeNum
  @param number
  @return Edge
  Hex.prototype.getEdgeNum = function(direction){
    if(direction < 0 || direction > 5){
      throw new Error("Invalid Direction");
    }
    return this.edges[direction];
  }*/


  /**
  Specifies whether the hex is land or water
  <pre>
  PRE: none
  POST: returns a boolean that is true if the Hex represents land
  </pre>

  @method isLand
  @return boolean
  */
  Hex.prototype.isLand = function(){
    return this.island;
  }

  /**
  Returns what kind of land the Hex is
  If it is not land, returns "water" which should not be passed to server.
  <pre>
  PRE: Caller has already determined that it is land using isLand()
  POST: returns a string indicating what kind of land it is
  </pre>

  @method getLandType
  @return string
  */
  Hex.prototype.getLandType = function(){
    if(this.island){
      if(!this.landtype){
        return "desert";
      }
      return this.landtype
    }
    else{
      return "water";
    }
  }
  return Hex;
}());