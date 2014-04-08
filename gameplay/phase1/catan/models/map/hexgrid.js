var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};


/**
This class represents a HexGrid. 
 
Domain: 
  hexgridjson: the JSON returned by the server for a the HexGrid including its hexes, radius, and offsets for the hexes 
  
Invariants:
  INVARIANT: HexGrid objects are read only
  
Constructor Specification:
  PRE: hexgridjson.hexes contains a 2D array of hexes
  PRE: hexgridjson.radius contains the radius of the map
  PRE: hexgridjson.offsets is an array offsets for lineing up the map in its 2D array.

@constructor
@param {Object} hexgridjson the JSON returned by the server for a the HexGrid including its hexes, radius, and offsets for the hexes  

@class HexGrid
*/
catan.models.map.HexGrid = (function HexGrid_Class(){


  function HexGrid(hexgridjson){
    //console.log(hexgridjson);
    this.hexes = [];
    for(var i = 0; i < hexgridjson.hexes.length; i++){
      //console.log(hexgridjson.hexes[i]);
      /*var hexloc = new catan.models.map.HexLocation(hexgridjson.hexes[i].location.x, hexgridjson.hexes[i].location.y);
      var arrayloc = _getInternalHexRef(hexloc);
      this.hexes[arrayloc.y][arrayloc.x] = new catan.models.map.Hex(hexgridjson.hexes[i]);
      */
      this.hexes[i]= [];
      //console.log(hexgridjson.hexes[i].length);
      for(var j = 0; j < hexgridjson.hexes[i].length; j++){
        //console.log(j);
        //console.log(hexgridjson.hexes[i][j]);
        this.hexes[i][j] = new catan.models.map.Hex(hexgridjson.hexes[i][j]);      
      }
    }
    this.radius = hexgridjson.radius;
    this.x0 = hexgridjson.x0;
    this.y0 = hexgridjson.y0;

    this.offsets = hexgridjson.offsets;
  }

  /**
  Translate from hexlocation (where [0,0] is center hex) to the array of hexes
  @private
  */
  HexGrid.prototype._getInternalHexRef = function(hexLoc){
    var translatedX = hexLoc.getX() + this.x0;
    var translatedY = hexLoc.getY() + this.y0;
    var arrayX = translatedX - this.offsets[translatedY];
    var arrayY = translatedY;
    return {x:arrayX, y:arrayY};
  }

  /**
  Gets the Hex associated with the given HexLocation.
  Uses internal methods to match the HexLocation to a hex in the 2D array.
  @method getHex
  @param HexLocation
  @return Hex
  */
  HexGrid.prototype.getHex = function(hexLoc){
    var internalLoc = this._getInternalHexRef(hexLoc);
    if (this.hexes[internalLoc.y]){
      return this.hexes[internalLoc.y][internalLoc.x];
    } else {
      return undefined;
    }
  }

  
  /**
  Returns hexes as the raw array for easy iteration
  @method getHex
  @return Hex[]
  */
  HexGrid.prototype.getHexArray = function(){
    return this.hexes;
  }

  /**
  Gets the Vertex in the dir direction on the Hex determined by the HexLocation
  Returns null us vertex is only on water
  @method getVertex
  @param HexLocation, VertexDirection
  @return Vertex
  */
  HexGrid.prototype.getVertex = function(hexLoc, dir){
    var hex = this.getHex(hexLoc);
    if(!hex){
      return null;
    }
    //check if surrounded by water
    if(!hex.isLand()){
      var dirnum = catan.models.map.VertexDirection[dir];
      var leftdir = nextDirectionCounterClockwise(dirnum);
      var leftneighbor = this.getHex(hexLoc.getNeighborLocation(leftdir));
      var rightneighbor = this.getHex(hexLoc.getNeighborLocation(dirnum));
      var both = true;
      if(leftneighbor){
        if(leftneighbor.isLand()){
          both = false;
        }
      }
      if(rightneighbor){
        if(rightneighbor.isLand()){
          both = false;
        }
      }
      if(both){
        return null;
      }
    }
    return hex.getVertex(dir);
  }
  
  /**
  Gets the Edge in the dir direction on the Hex determined by the HexLocation
  Returns null is edge is totally surrounded by water
  @method getEdge
  @param HexLocation, EdgeDirection
  @return Edge
  */
  HexGrid.prototype.getEdge = function(hexLoc, dir){
    var hex = this.getHex(hexLoc);
    if(!hex){
      return null;
    }
    //check if surrounded by water
    if(!hex.isLand()){
      var dirnum = catan.models.map.EdgeDirection[dir];
      var neighborloc = hexLoc.getNeighborLocation(dir);
      var neighborhex = this.getHex(neighborloc);

      //edge is edge of map, no neighboring hex
      if(!neighborhex){
        return null;
      }

      //neighboring hex is water also
      if(!neighborhex.isLand()){
        return null;
      }
    }
    return hex.getEdge(dir);
  }

  /**
  Gets the Edges touching the Vertex in the dir direction on the Hex determined by the HexLocation

  @method getEdgesFromVertex
  @param HexLocation, VertexDirection
  @return array<Edge>
  */
  HexGrid.prototype.getEdgesFromVertex = function(hexLoc, dir){
    var hex = this.getHex(hexLoc);
    if(!hex){
      return null;
    }
    var vertex = hex.getVertex(dir);
    if(!vertex){
      return null;
    }
    var dirnum = catan.models.map.VertexDirection[dir];
    var right = hex.getEdge(dirnum);
    var edges = [];
    if(right){
      edges.push(right);
    }
    //edges.push(hex.getEdge((((dirnum-1)%6)+6)%6));
    var left = hex.getEdge(nextDirectionCounterClockwise(dirnum));
    if(left){
      edges.push(left);
    }


    var neighborloc = hexLoc.getNeighborLocation(dirnum);
    var neighborhex = this.getHex(neighborloc);
    if(neighborhex){
      //var oppdir = ((((dirnum+3)%6)+6)%6);
      var oppdir = getOppositeDirection(dirnum);
      var across = neighborhex.getEdge(nextDirectionClockwise(oppdir));
      if(across){
        edges.push(across);
      }
    }
    //edges.push(neighbor.getEdge((((oppdir-1)%6)+6)%6));
    return edges;
  }

  /**
  Gets the Vertexes touching the Edge in the dir direction on the Hex determined by the HexLocation

  @method getVertexesFromEdge
  @param HexLocation, EdgeDirection
  @return array<Vertex>
  */
  HexGrid.prototype.getVertexesFromEdge = function(hexLoc, dir){
    var hex = this.getHex(hexLoc);
    if(!hex){
      return null;
    }
    var edge = hex.getEdge(dir);
    if(!edge){
      return null;
    }
    var dirnum = catan.models.map.EdgeDirection[dir];
    var vertexes = [];
    var right = hex.getVertex(dirnum);
    if(right){
      vertexes.push(right);
    }
    var left = hex.getVertex(nextDirectionClockwise(dirnum));
    if(left){
      vertexes.push(left);
    }
    
    return vertexes;
  }

  /**
  Gets the Vertexes adjacent to the Vertex in the dir direction on the Hex determined by the HexLocation

  @method getAdjVertexes
  @param HexLocation, VertexDirection
  @return array<Vertex>
  */
  HexGrid.prototype.getAdjVertexes = function(hexLoc, dir){
    var hex = this.getHex(hexLoc);
    if(!hex){
      return null;
    }
    //console.log("dir is:" + dir);
    var vertex = hex.getVertex(dir);
    if(!vertex){
      return null;
    }
    var dirnum = catan.models.map.VertexDirection[dir];
    //console.log("Can we convert dirnum back?" + catan.models.map.VertexDirection[dirnum]);
    var right = hex.getVertex(nextDirectionClockwise(dirnum));
    var vertexes = [];
    if(right){
      vertexes.push(right);
    }
    var left = hex.getVertex(nextDirectionCounterClockwise(dirnum));
    if(left){
      vertexes.push(left);
    }

    var neighborloc = hexLoc.getNeighborLocation(dirnum);
    var neighborhex = this.getHex(neighborloc);
    if(neighborhex){
      var oppdir = getOppositeDirection(dirnum);
      var across = neighborhex.getVertex(nextDirectionCounterClockwise(dirnum));
      if(across){
        vertexes.push(across);
      }
    }
    return vertexes;
  }

  /**
  Gets the Edges adjacent to the Edge in the dir direction on the Hex determined by the HexLocation

  @method getAdjEdges
  @param HexLocation, EdgeDirection
  @return array<Edge>
  */
  HexGrid.prototype.getAdjEdges = function(hexLoc, dir){
    var hex = this.getHex(hexLoc);
    if(!hex){
      return null;
    }
    var edge = hex.getEdge(dir);
    if(!edge){
      return null;
    }
    var dirnum = catan.models.map.EdgeDirection[dir];
    var edges = [];
    var right = hex.getEdge(nextDirectionClockwise(dirnum));
    if(right){
      edges.push(right);
    }
    var left = hex.getEdge(nextDirectionCounterClockwise(dirnum));
    if(left){
      edges.push(left);
    }
    //console.log(dir);
    var neighborloc = hexLoc.getNeighborLocation(dir);
    var neighborhex = this.getHex(neighborloc);
    if(neighborhex){
      var oppdir = getOppositeDirection(dirnum);
      var acrossleft = neighborhex.getEdge(nextDirectionCounterClockwise(oppdir));
      if(acrossleft){
        edges.push(acrossleft);
      }

      var acrossright = neighborhex.getEdge(nextDirectionClockwise(oppdir));
      if(acrossright){
        edges.push(acrossright);
      }
    }
    return edges;
  }

  /**
  Returns true if the two edges are adjacent to one another

  @method areEdgesAdj
  @param HexLocation, EdgeDirection, HexLocation, EdgeDirection
  @return boolean
  */
  HexGrid.prototype.areEdgesAdj = function(hexLoc, dir, otherHexLoc, otherDir){
    var dirnum = catan.models.map.EdgeDirection[dir];
    var otherdirnum = catan.models.map.EdgeDirection[otherDir];
    var cw = nextDirectionClockwise(dirnum);
    var ccw = nextDirectionCounterClockwise(dirnum);
    //same hex
    if(hexLoc.equals(otherHexLoc) && (otherdirnum == cw || otherdirnum == ccw)){
      return true;      
    }
    else{
      //make sure it's a neighbor that can has an adjacent edge to this edge. namely across the edge, and across the clockwise
      // and counterclockwise edges from that edge
      var neighbor = hexLoc.getNeighborLocation(dir);
      var neighborcw = hexLoc.getNeighborLocation(cw);
      var neighborccw = hexLoc.getNeighborLocation(ccw);
      if(otherHexLoc.equals(neighbor)){
        var oppdir = getOppositeDirection(dirnum);
        var ocw = nextDirectionClockwise(oppdir);
        var occw = nextDirectionCounterClockwise(oppdir);
        if(otherdirnum == ocw || otherdirnum == occw){
          return true;
        }
      }
      else if (otherHexLoc.equals(neighborcw)){
        var oppdir = getOppositeDirection(cw);
        var ocw = nextDirectionClockwise(oppdir);
        if(otherdirnum == oppdir || otherdirnum == ocw){
          return true;
        }
      }
      else if (otherHexLoc.equals(neighborccw)){
        var oppdir = getOppositeDirection(ccw);
        var occw = nextDirectionCounterClockwise(oppdir);
        if(otherdirnum == oppdir || otherdirnum == occw){
          return true;
        }
      }
    }

    return false;
  }

  HexGrid.prototype.areSameEdge = function(hexLoc, dir, otherHexLoc, otherDir){
    if(hexLoc.equals(otherHexLoc)){
      if(dir == otherDir){
        return true;
      }
      return false;
    }
    var neighborloc = hexLoc.getNeighborLocation(dir);
    if(!neighborloc.equals(otherHexLoc)){
      return false;
    }
    var dirnum = catan.models.map.EdgeDirection[dir];
    var otherdirnum = catan.models.map.EdgeDirection[otherDir];
    var oppdir = getOppositeDirection(dirnum);
    if(otherdirnum == oppdir){
      return true;
    }
    return false;
  }

  function positiveModulo(lhs,rhs){
    // The inner paren makes the range -rhs to rhs
    // The addition puts it to 0 to 2rhs
    // The last modulo reduces it to 0 to rhs
    return ((lhs % rhs) + rhs) % rhs;
  }
  
  function getOppositeDirection(direction){
    return positiveModulo((direction + 3),6);
  }
  
  //Works on Hex, Edge and Vertex Directions
  function nextDirectionClockwise(direction){
    return positiveModulo((direction + 1),6);
  }
  
  //Works on Hex, Edge and Vertex Directions
  function nextDirectionCounterClockwise(direction){
    return positiveModulo((direction - 1),6);
  }
  return HexGrid;
}());