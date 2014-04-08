var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};

  /**
    This represents a location of a hex on a hex grid.
   
    @class HexLocation
    @constructor
    @param {Integer} x
    @param {Integer} y
  */
catan.models.map.HexLocation = (function HexLocationClass(){

    function HexLocation(x, y){
      this.x = x;
      this.y = y;
    }
    
    core.defineProperty(HexLocation.prototype,"x");
    core.defineProperty(HexLocation.prototype,"y");   
    
        
        /**
          This represents a location of a hex on a hex grid.
         
            @method equals
            @param {hexgrid.HexLocation} otherLocation
            @return boolean Returns true if the other location has the same x,y
        */
    HexLocation.prototype.equals =  function(otherLocation){
      return (this.getX() == otherLocation.getX() && otherLocation.getY() == this.getY()); 
    }
    
        /**
          This represents a location of a hex on a hex grid.
         
            @method getNeighborLocation
            @param {[HexDirection]} hexDirection -> string(like "NE") or number between 0 and 5
            @return hexgrid.HexLocation Returns a location next to this one, in the direction of the 'hexDirection' given
        */
    HexLocation.prototype.getNeighborLocation = function getNeighborLocation(hexDir){
      var x,  y , z = 0;
      if(typeof hexDir == 'string'){
        var hexDirection = catan.models.map.HexDirection[hexDir];
      }
      else if(typeof hexDir == 'number'){
        var hexDirection = hexDir;
      }
      else{
        throw new Error("Direction not a string or number");
      }
        switch (hexDirection) {
        case catan.models.map.HexDirection.SE:
          x = 1; y = 0; z = -1;
          break;
        case catan.models.map.HexDirection.S:
          x = 0; y = 1; z = -1;
          break;
        case catan.models.map.HexDirection.SW:
          x = -1; y = 1; z = 0;
          break;
        case catan.models.map.HexDirection.NW:
          x = -1; y = 0; z = 1;
          break;
        case catan.models.map.HexDirection.N:
          x = 0; y = -1; z = 1;
          break;
        case catan.models.map.HexDirection.NE:
          x = 1; y = -1; z = 0;
          break;
        default:
          console.log(hexDirection,this);
          core.assert(false);
          throw new Error("Invalid Direction");
      }
      return new catan.models.map.HexLocation(this.getX() + x,this.getY() + y);
    }

        /**
          This represents a location of a hex on a hex grid.
         
            @method getNeighborLocation
            @param number
            @return hexgrid.HexLocation Returns a location next to this one, in the direction of the 'hexDirection' given
        
  HexLocation.prototype.getNeighborLocationNum = function getNeighborLocationNum(hexDirection){
      var x,  y , z = 0;
        switch (hexDirection) {
        case 3:
          x = 1; y = 0; z = -1;
          break;
        case 4:
          x = 0; y = 1; z = -1;
          break;
        case 5:
          x = -1; y = 1; z = 0;
          break;
        case 0:
          x = -1; y = 0; z = 1;
          break;
        case 1:
          x = 0; y = -1; z = 1;
          break;
        case 2:
          x = 1; y = -1; z = 0;
          break;
        default:
          console.log(hexDirection,this);
          core.assert(false);
          throw new Error("Invalid Direction");
      }
      return new catan.models.map.HexLocation(this.getX() + x,this.getY() + y);
    }*/
    
    return HexLocation;
  }());