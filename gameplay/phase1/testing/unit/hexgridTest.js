//This file is for testing the hexgrid class and the underlying classes.
var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};

test("vertex.getValue", function(){
  var vertex = new catan.models.map.Vertex(modelJson.map.hexGrid.hexes[3][3].vertexes[5]);
  //var value = vertex.getValue();
  ok(vertex.getBuildSite() == 1 && vertex.getOwnerID() == 2, "Occupied by Blue(ownerID = 2) Settlement(worth = 1)");
});

test("vertex.isOccupied", function(){
  var vertex = new catan.models.map.Vertex(modelJson.map.hexGrid.hexes[3][3].vertexes[5]);
  ok(vertex.isOccupied(), "True: Occupied by a player 2");
  var vertex2 = new catan.models.map.Vertex(modelJson.map.hexGrid.hexes[3][3].vertexes[0]);
  ok(!vertex2.isOccupied(), "False: unoccupied");
});

test("edge.getValue", function(){
  var edge = new catan.models.map.Edge(modelJson.map.hexGrid.hexes[3][3].edges[4]);
  //var value = edge.getValue();
  ok(edge.getOwnerID() == 2, "Occupied by Blue(ownerID = 2) road");
});

test("edge.isOccupied", function(){
  var edge = new catan.models.map.Vertex(modelJson.map.hexGrid.hexes[3][3].edges[4]);
  ok(edge.isOccupied(), "True: Occupied by a player 2");
  var edge2 = new catan.models.map.Vertex(modelJson.map.hexGrid.hexes[3][3].edges[0]);
  ok(!edge2.isOccupied(), "False: unoccupied");
});

test("hex.getLocation", function(){
  var hex = new catan.models.map.Hex(modelJson.map.hexGrid.hexes[3][3]);
  var location = hex.getLocation();
  ok(location.getX() == 0 && location.getY() == 0, "[3][3] in Json corresponds to x:0 y:0 on actual map");
});

test("hex.getEdge", function(){
  var hex = new catan.models.map.Hex(modelJson.map.hexGrid.hexes[3][3]);
  var edge = hex.getEdge("S");
  ok(edge.getOwnerID() == 2, "Got south edge that belongs to player 2  at (0,0)");
 
});

test("hex.getEdgeNum", function(){
  var hex = new catan.models.map.Hex(modelJson.map.hexGrid.hexes[3][3]);
  var edgenum = hex.getEdge(4);
  ok(edgenum.getOwnerID() == 2, "Got 4th(=South) edge that belong to player 2  at (0,0)")
});

test("hex.getVertex", function(){
  var hex = new catan.models.map.Hex(modelJson.map.hexGrid.hexes[3][3]);
  var vertex = hex.getVertex("SW");
  ok(vertex.getOwnerID() == 2, "Got southwest vertex that belongs to player 2  at (0,0)");
 
});

test("hex.getVertexNum", function(){
  var hex = new catan.models.map.Hex(modelJson.map.hexGrid.hexes[3][3]);
  var vertexnum = hex.getVertex(5);
  ok(vertexnum.getOwnerID() == 2, "Got 5th(=Southwest) vertex that belong to player 2 at (0,0)")
});

test("hexgrid.getHex", function(){
  var hexgrid = new catan.models.map.HexGrid(modelJson.map.hexGrid);
  var hexLoc = new catan.models.map.HexLocation(0, 0);
  var hex = hexgrid.getHex(hexLoc);
  var location = hex.getLocation();
  ok(location.getX() == 0 && location.getY() == 0, "getHex gets the proper hex from location (0,0)");
  hexLoc = new catan.models.map.HexLocation(99, 100); //invalid hexlocation in this particular map
  hex = hexgrid.getHex(hexLoc);
  ok(!hex, "undefined: location out of the array");
});

test("hexgrid.getVertex", function(){
  var hexgrid = new catan.models.map.HexGrid(modelJson.map.hexGrid);
 
  //normal vertex
  var hexLoc = new catan.models.map.HexLocation(0, 0);
  var vertex = hexgrid.getVertex(hexLoc, "SW");
  ok(vertex.getOwnerID() == 2, "Southwest Vertex of (0,0) is owned by player 2");
  //bad direction
  stop();
  try{
    hexgrid.getVertex(hexLoc, "S");
  }
  catch(err) {
    ok(true, "Error Thrown: Invalid Direction");
  }
  finally {
    start();
  }

  //vertex on coast
  hexLoc = new catan.models.map.HexLocation(3, -2);
  vertex = hexgrid.getVertex(hexLoc, "SW");
  ok(vertex.getOwnerID() == 0, "Coast vertex of (3, -2) occupied by player 0");

  //vertex in water
  vertex = hexgrid.getVertex(hexLoc, "E");
  ok(!vertex, "Null: vertex entirely in water. Invalid for all uses");
});

test("hexgrid.getEdge", function(){
  var hexgrid = new catan.models.map.HexGrid(modelJson.map.hexGrid);

  //normal vertex
  var hexLoc = new catan.models.map.HexLocation(0, 0);
  var edge = hexgrid.getEdge(hexLoc, "S");
  ok(edge.getOwnerID() == 2, "South Edge of (0,0) is owned by player 2");
  
  //bad direction
  stop();
  try{
    hexgrid.getEdge(hexLoc, "W");
  }
  catch(err) {
    ok(true, "Error Thrown: Invalid Direction");
  }
  finally {
    start();
  }

  //edge on coast
  hexLoc = new catan.models.map.HexLocation(3, -2);
  edge = hexgrid.getEdge(hexLoc, "SW");
  ok(edge.getOwnerID() == 0, "Coast edge of (3, -2) occupied by player 0");

  //edge inbetween waters
  edge = hexgrid.getEdge(hexLoc, "N");
  ok(!edge, "Null: edge entirely in water. Invalid for all uses");

  //edge of map on water
  edge = hexgrid.getEdge(hexLoc, "NE");
  ok(!edge, "Null: edge entirely in water. Invalid for all uses");
});

test("hexgrid.getEdgesFromVertex", function(){
  var hexgrid = new catan.models.map.HexGrid(modelJson.map.hexGrid);
  
  var hexLoc = new catan.models.map.HexLocation(0, 0);
  var edges = hexgrid.getEdgesFromVertex(hexLoc, "W");
  ok(edges.length == 3, "Three edges correspond to a vertex");
});

test("hexgrid.getVertexesFromEdge", function(){
  var hexgrid = new catan.models.map.HexGrid(modelJson.map.hexGrid);  
  var hexLoc = new catan.models.map.HexLocation(0, 0);
  var vertexes = hexgrid.getVertexesFromEdge(hexLoc, "N");
  ok(vertexes.length == 2, "Two vertexes correspond to a edge");
});

test("hexgrid.getAdjEdges", function(){
  var hexgrid = new catan.models.map.HexGrid(modelJson.map.hexGrid);
  var hexLoc = new catan.models.map.HexLocation(0, 0);
  var edges = hexgrid.getAdjEdges(hexLoc, "N");
  ok(edges.length == 4, "Four edges are adjacent to an edge.");
});

test("hexgrid.getAdjVertexes", function(){
  var hexgrid = new catan.models.map.HexGrid(modelJson.map.hexGrid);
  var hexLoc = new catan.models.map.HexLocation(0, 0);
  var vertexes = hexgrid.getAdjVertexes(hexLoc, "W");
  ok(vertexes.length == 3, "Three vertexes are adjacent to a vertex.");
});
