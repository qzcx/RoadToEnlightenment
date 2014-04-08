var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};

  /**
    Use this class to look up the numerical value of a EdgeDirection from JSON.
  These are the edge values in clockwise order starting at NW.
  They are in order so that modulo math makes this easy
  Edge and Vertex Directions give you the edge and then the vertex in clockwise order
    It's really just an enumeration. For example EdgeDirection["NW"] or EdgeDirection.NW returns 0;
    The possible edge directions are "NW","N","NE","SE","S","SW"
  
  @class EdgeDirection
  */
 catan.models.map.EdgeDirection = core.numberEnumeration(["NW","N","NE","SE","S","SW"]);

 catan.models.map.EdgeDirectionNum = ["NW","N", "NE", "SE", "S", "SW"];
    
  /**
  These are simply a copy of EdgeDirections. They can be fed to a hexgrid.HexLocation to get 
  the location of the hex next to it in that direction. It's really just an enumeration.
  @class HexDirection
  */
  catan.models.map.HexDirection = catan.models.map.EdgeDirection;
  /**
    Use this class to look up the numerical value of a VertexDirection from JSON.
  These are the vertex values in clockwise order starting at NW.
  They are in order so that modulo math makes this easy
  Edge and Vertex Directions give you the edge and then the vertex in clockwise order.
    It's really just an enumeration. For example VertexDirection["NW"] or VertexDirection.NW returns 1;
    The possible VertexDirection are "W","NW","NE","E","SE","SW"
  @class VertexDirection
  */
  catan.models.map.VertexDirection = core.numberEnumeration(["W","NW","NE","E","SE","SW"]);
  catan.models.map.VertexDirectionNum = ["W","NW","NE","E","SE","SW"];

    
   